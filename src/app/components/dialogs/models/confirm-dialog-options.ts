import { ColoredIcon } from "../../../directives/icon/models/colored-icon";
import { DialogActionCallback } from "./dialog-action-callback";

export interface ConfirmDialogOptions {
  message: string;
  title?: string;
  icon?: string | ColoredIcon;
  dismissable?: boolean;
  submit: DialogActionCallback;
  dismiss?: () => void;
}
