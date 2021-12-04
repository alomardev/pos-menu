import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { ClassList } from '../../../models/class-list';
import { BootstrapColor } from '../../../models/bootstrap-color';
import { BootstrapModalSize } from '../../../models/bootstrap-modal-size';
import { BOOTSTRAP_ZINDEX } from '../../../models/bootstrap-zindex';
import { DIALOG_ENTER_LEAVE_ANIMATION } from '../constants/animations';
import { PREDEFINED_ACTIONS } from '../constants/predefined-actions';
import { DialogActionCallback } from '../models/dialog-action-callback';
import { DialogAction } from '../models/dialog-actions';
import { PredefinedDialogActions } from '../models/predefined-dialog-actions';
import { ScpDialogManager } from '../services/dialog-manager.service';
import { ColoredIcon } from '../../../directives/icon/models/colored-icon';

@Component({
  selector: 'scp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    DIALOG_ENTER_LEAVE_ANIMATION,
  ],
})
export class ScpDialogComponent {

  readonly containerClassName = 'scp-dialog'

  @Input() message: string | undefined;
  @Input() title: string | undefined;
  @Input() dismissable = true;
  @Input() size: BootstrapModalSize = 'default';

  private _icon!: ColoredIcon | string;
  @Input() set icon (val: ColoredIcon | string) {
    this._icon = val;
    this.resolveIconValue(val);
  }
  get icon() {
    return this._icon;
  }
  /** @internal */
  resolvedIconValue: ColoredIcon | undefined;

  private _actions!: PredefinedDialogActions | DialogAction[];
  @Input() set actions(val: PredefinedDialogActions | DialogAction[]) {
    this._actions = val;
    this.resolvedActionsValue = this.resolveActionsValue(val);
  }
  get actions() {
    return this._actions;
  }
  /** @internal */
  resolvedActionsValue!: DialogAction[];

  @Output() dismissed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<string>();

  state: DialogState = 'idle';
  iconWrapperClassList: ClassList | undefined;
  actionButtonsClassList: ClassList[] = [];
  disabledActions: { [key: string]: boolean } = {};
  zIndex = BOOTSTRAP_ZINDEX.modal;

  waiting: string | boolean = false;

  constructor(private dialogManager: ScpDialogManager) {}

  show(submit?: DialogActionCallback, dismiss?: () => void) {
    this.dialogManager.show(this, submit, dismiss);
  }

  dismiss() {
    if (this.state === 'shown' || this.state === 'hidden') {
      this.dismissed.next();
    }
  }

  onActionClick(action: DialogAction) {
    this.submitted.next(action.key);
  }

  @HostListener('document:keydown.escape')
  onEscapeKeyPress() {
    if (this.dismissable) {
      this.dismiss();
    }
  }

  onModalClick(excludedElement: HTMLElement, event: MouseEvent) {
    if (this.state !== 'shown')
      return;

    if (!excludedElement.contains(event.target as Node) && this.dismissable) {
      this.dismiss();
    }
  }

  setState(state: DialogState) {
    this.state = state;
  }

  disableAction(key: string) {
    this.disabledActions[key] = true;
  }

  enableAction(key: string) {
    this.disabledActions[key] = false;
  }

  configureActionButtonElement(element: ElementRef, action: DialogAction) {
    if (action.focused) {
      element.nativeElement.focus();
    }
  }

  private resolveIconValue(icon: string | ColoredIcon) {
    if (!icon) {
      this.iconWrapperClassList = this.resolvedIconValue = undefined;
      return;
    }
    // TODO: Pass predefined colored icons or fallback to color-less icon
    this.resolvedIconValue = (typeof icon === 'string' ? undefined : icon as ColoredIcon);
    if (!this.resolvedIconValue) {
      this.iconWrapperClassList = undefined;
      console.warn(`TODO: Implement predefined dialog icons`)
    }
    this.iconWrapperClassList = `text-${this.resolvedIconValue?.color}`;
  }

  private resolveActionsValue(actions: PredefinedDialogActions | DialogAction[]): DialogAction[] {
    let result: DialogAction[] | undefined;
    if (typeof actions === 'string') {
      result = PREDEFINED_ACTIONS[actions];
    } else if (Array.isArray(actions)) {
      result = actions;
    }

    if (!result) {
      throw new Error(`Couldn't resolve dialog actions named '${actions}'`);
    }

    result = [...result];

    const pushedIndex = result.findIndex(item => item.pushed);
    if (pushedIndex > -1) {
      const pushed = result.splice(pushedIndex, 1)[0];
      result.forEach(item => {
        item.pushed = false;
      });
      result.push(pushed);
    }
    result =  result.reverse();

    this.actionButtonsClassList = [];
    for (let i = 0; i < result.length; i++) {
      this.actionButtonsClassList.push(this.resolveActionButtonClassList(result[i], i === result.length - 1));
    }

    return result;
  }

  private resolveActionButtonClassList(action: DialogAction, last: boolean): string[] {
    const classList = [];

    const solid = (last || action.shape === 'solid') && action.shape !== 'outline';
    const color: BootstrapColor = action.color ? action.color : last ? 'primary' : 'secondary';
    const buttonColorClass = solid ? `btn-${color}` : `btn-outline-${color}`;
    classList.push(buttonColorClass);

    if (action.pushed) {
      classList.push('mr-auto');
    }

    return classList;
  }

}

type DialogState = 'idle' | 'dismissed' | 'shown' | 'hidden';
