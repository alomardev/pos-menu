import { ConfirmDialogOptions } from "./confirm-dialog-options";

export interface DynamicDialogsInterface {
  confirm(options: ConfirmDialogOptions): Promise<void>;
}
