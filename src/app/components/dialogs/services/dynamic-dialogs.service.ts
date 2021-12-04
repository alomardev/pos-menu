import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from "@angular/core";
import { DIALOG_ENTER_LEAVE_ANIMATION_DURATION } from "../constants/animations";
import { ScpDialogComponent } from "../dialog/dialog.component";
import { ConfirmDialogOptions } from "../models/confirm-dialog-options";
import { DynamicDialogsInterface } from "../models/dynamic-dialogs-interface";

@Injectable()
export class ScpDynamicDialogsService implements DynamicDialogsInterface {

  private dynamicallyCreatedDialogs = new Set<ComponentRef<ScpDialogComponent>>();

  private dialogComponentClass: Type<ScpDialogComponent> | undefined;
  private dialogContainerRef: ViewContainerRef | undefined;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef) {}

  async confirm(options: ConfirmDialogOptions) {
    // const factory = this.componentFactoryResolver.resolveComponentFactory(await this.loadDialogComponentClass());
    const componentRef = this.acquireRootContainerRef().createComponent(await this.loadDialogComponentClass());
    const instance = componentRef.instance;

    instance.title = options.title;
    instance.message = options.message;
    instance.actions = 'confirm';
    instance.size = 'sm';

    instance.show(options.submit, options.dismiss);
    this.dynamicallyCreatedDialogs.add(componentRef);
  }

  resolveDynamicallyCreatedDialog(dialog: ScpDialogComponent) {
    for(const value of this.dynamicallyCreatedDialogs.values()) {
      if (dialog === value.instance) {
        const index = this.acquireRootContainerRef().indexOf(value.hostView);
        if (index > -1) {
          setTimeout(() => {
            this.acquireRootContainerRef().remove(index);
          }, DIALOG_ENTER_LEAVE_ANIMATION_DURATION);
        }
        break;
      }
    }
  }

  /**
   * Required to avoid circular dependency
   */
  private async loadDialogComponentClass() {
    return this.dialogComponentClass ??
      (this.dialogComponentClass = (await import('../dialog/dialog.component')).ScpDialogComponent);
  }

  private acquireRootContainerRef(): ViewContainerRef {
    if (this.dialogContainerRef) return this.dialogContainerRef;
    this.dialogContainerRef = this.appRef.components?.[0]?.injector.get(ViewContainerRef);
    if (!this.dialogContainerRef) throw new Error(`Couldn't obtain root component's ViewContainerRef`);
    return this.dialogContainerRef;
  }

}
