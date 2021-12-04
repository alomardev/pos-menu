import { BootstrapButtonStyle } from "../../../models/bootstrap-button-style";
import { BootstrapColor } from "../../../models/bootstrap-color";

export interface DialogAction {
  label: string;
  key: string;
  color?: BootstrapColor;
  shape?: BootstrapButtonStyle;
  focused?: boolean;
  pushed?: boolean;
}
