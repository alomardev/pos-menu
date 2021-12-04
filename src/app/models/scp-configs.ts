import { IconsConfig } from "../directives/icon/models/icons-config";
import { CreatePopperFunction } from "../directives/poppers/models/create-popper-function";

export interface ScpConfigs {
  icons?: IconsConfig;
  popper?: CreatePopperFunction,
}
