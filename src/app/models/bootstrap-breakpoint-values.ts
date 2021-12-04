import { BOOTSTRAP_BREAKPOINTS } from "../constants/bootstrap";

type BreakpointKey = keyof typeof BOOTSTRAP_BREAKPOINTS;

export type BootstrapBreakpointValues<T = any> = {
  [key in BreakpointKey]?: T
}
