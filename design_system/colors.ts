import { SemanticTokens } from "@pandacss/dev";

export const colors: SemanticTokens["colors"] = {
  surface: {
    s0: { value: { base: "#ffffff", _dark: "#1B1D22" } },
    s1: { value: { base: "#F4F5F7", _dark: "#23272F" } },
  },
  border: {
    value: { base: "#dadada", _dark: "#363b45" },
  },
  primaryClr: {
    value: { base: "#57C4DC", _dark: "#57C4DC" },
  },
  text: {
    normal: {
      value: { base: "#141414", _dark: "#fff" },
    },
    secondary: {
      value: { base: "#B2B2B2", _dark: "#B2B2B2" },
    },
  },
  base: {
    white: { value: { base: "#fff", _dark: "#141414" } },
    black: { value: { base: "#141414", _dark: "#fff" } },
  },
};
