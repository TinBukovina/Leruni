import { BreakpointToken } from "./design_system/brakepoints";

declare module "@pandacss/dev" {
  interface CustomBreakpoints {
    breakpoints: BreakpointToken;
  }
}
