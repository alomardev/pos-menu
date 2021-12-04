import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { BOOTSTRAP_ZINDEX } from "../../../models/bootstrap-zindex";
import { isPromise } from "../../../utils/is-promise-function";
import { ScpDialogComponent } from "../dialog/dialog.component";
import { ConfirmDialogOptions } from "../models/confirm-dialog-options";
import { DialogActionCallback } from "../models/dialog-action-callback";
import { DynamicDialogsInterface } from "../models/dynamic-dialogs-interface";
import { ScpBackdropService } from "./backdrop.service";
import { ScpDynamicDialogsService } from "./dynamic-dialogs.service";

@Injectable()
export class ScpDialogManager implements DynamicDialogsInterface {

  private dialogStack: DialogRef[] = [];

  constructor(
    private backdropService: ScpBackdropService,
    private dynamicDialogs: ScpDynamicDialogsService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  confirm(options: ConfirmDialogOptions): Promise<void> {
    // Hide shown dialog in advance for correct async dialogs maintenance
    this.hideShownDialogs();
    return this.dynamicDialogs.confirm(options);
  }

  show(dialog: ScpDialogComponent, submit?: DialogActionCallback, dismiss?: () => void) {
    dialog.setState('shown');

    const index = this.dialogStack.findIndex(({ instance }) => instance === dialog);

    let state: DialogState;
    if (index > -1) {
      state = this.dialogStack[index].state;
      this.dialogStack.splice(index, 1);
    } else {
      state = {
        submitSubscription: dialog.submitted.subscribe(key => {
          if (!submit) {
            this.dismiss(dialog);
            return;
          }

          const result = submit(key);
          if (isPromise<boolean>(result)) {
            const dismissability = dialog.dismissable;
            dialog.waiting = key;
            dialog.dismissable = false;
            result.then(promiseResult => {
              if (promiseResult) {
                setTimeout(() => {
                  this.dismiss(dialog);
                })
              }
            }).finally(() => {
              dialog.waiting = false;
              dialog.dismissable = dismissability;
            });
          } else if (typeof result === 'boolean') {
            if (result) {
              this.dismiss(dialog);
            }
          } else {
            this.dismiss(dialog);
          }
        }),
        dismissSubscription: dialog.dismissed.subscribe(() => {
          this.dismiss(dialog);
          if (dismiss) dismiss();
        }),
      };
    }

    this.dialogStack.push({
      instance: dialog,
      state,
    });

    if (this.document.activeElement && this.document.activeElement instanceof HTMLElement) {
      this.document.activeElement.blur();
    }

    this.maintainStatus();
  }

  /**
   * Dismiss all dialogs in the stack.
   */
  dismiss(): void;

  /**
   * Dismiss a dialog from the stack
   * @param dialog Dialog to be dismissed
   */
  dismiss(dialog: ScpDialogComponent): void;

  dismiss(dialog?: ScpDialogComponent) {
    if (!dialog) {
      this.clearDialogStack();
      this.maintainStatus();
      return;
    }

    dialog.setState('dismissed');

    const index = this.dialogStack.findIndex(({ instance }) => instance === dialog);
    if (index < 0) return;

    this.removeDialogRef(index);
    this.maintainStatus();
  }

  private maintainStatus() {
    this.dialogStack.forEach(({ instance }, index) => {
      instance.zIndex = BOOTSTRAP_ZINDEX.modal + index;
      if (instance.state === 'shown' && index !== this.dialogStack.length - 1) {
        instance.setState('hidden');
      }
      if (instance.state === 'hidden' && index === this.dialogStack.length - 1) {
        instance.setState('shown');
      }
    });

    if (this.dialogStack.length > 0) {
      this.backdropService.create();
    } else {
      this.backdropService.destroy();
    }
  }

  private removeDialogRef(index: number) {
    const { state, instance } = this.dialogStack[index];
    if (instance.state !== 'dismissed') instance.setState('dismissed');
    state.submitSubscription.unsubscribe();
    state.dismissSubscription.unsubscribe();
    this.dialogStack.splice(index, 1);

    this.dynamicDialogs.resolveDynamicallyCreatedDialog(instance);
  }

  private clearDialogStack() {
    for (let i = this.dialogStack.length - 1; i >= 0; i--) {
      this.removeDialogRef(i);
    }
  }

  private hideShownDialogs() {
    this.dialogStack.forEach(({ instance }) => {
      if (instance.state === 'shown') {
        instance.state = 'hidden';
      }
    });
  }

}

interface DialogState {
  submitSubscription: Subscription;
  dismissSubscription: Subscription;
}

interface DialogRef {
  instance: ScpDialogComponent;
  state: DialogState;
}
