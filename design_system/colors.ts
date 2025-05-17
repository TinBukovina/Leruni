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
      value: { base: "#969696", _dark: "#969696" },
    },
    invert: {
      value: { base: "#fff", _dark: "#141414" },
    },
  },
  base: {
    white: { value: { base: "#fff", _dark: "#fff" } },
    black: { value: { base: "#141414", _dark: "#141414" } },
    gray: { value: { base: "#969696", _dark: "#969696" } },
  },
  actions: {
    postive: {
      value: { base: "#0aa480" },
    },
    negative: {
      value: { base: "#d82222" },
    },
  },
  input: {
    default: {
      bg: { value: { base: "", _dark: "#23272F" } },
      border: { value: { base: "", _dark: "#363b45" } },
      text: { value: { base: "", _dark: "#fff" } },
    },
    hover: {
      bg: { value: { base: "", _dark: "#23272F" } },
      border: { value: { base: "", _dark: "#57C4DC" } },
      text: { value: { base: "", _dark: "#fff" } },
    },
    focus: {
      bg: { value: { base: "", _dark: "#23272F" } },
      border: { value: { base: "", _dark: "#57C4DC" } },
      text: { value: { base: "", _dark: "#fff" } },
    },
    active: {
      bg: { value: { base: "", _dark: "#23272F" } },
      border: { value: { base: "", _dark: "#57C4DC" } },
      text: { value: { base: "", _dark: "#fff" } },
    },
    disabled: {
      bg: { value: { base: "", _dark: "rgba(178, 178, 178, 0.4)" } },
      border: { value: { base: "", _dark: "#363b45" } },
      text: { value: { base: "", _dark: "#141414" } },
    },
  },
  button: {
    default: {
      bg: { value: { base: "", _dark: "#1B1D22" } },
      border: { value: { base: "", _dark: "#363b45" } },
      text: { value: { base: "", _dark: "#fff" } },
    },
    hover: {
      bg: { value: { base: "", _dark: "#1B1D22" } },
      border: { value: { base: "", _dark: "#57C4DC" } },
      text: { value: { base: "", _dark: "#fff" } },
    },
    focus: {
      bg: { value: { base: "", _dark: "#1B1D22" } },
      border: { value: { base: "", _dark: "#57C4DC" } },
      text: { value: { base: "", _dark: "#57C4DC" } },
    },
    active: {
      bg: { value: { base: "", _dark: "#1B1D22" } },
      border: { value: { base: "", _dark: "#57C4DC" } },
      text: { value: { base: "", _dark: "#57C4DC" } },
    },
    disabled: {
      bg: { value: { base: "", _dark: "rgba(178, 178, 178, 0.4)" } },
      border: { value: { base: "", _dark: "#363b45" } },
      text: { value: { base: "", _dark: "#141414" } },
    },
    primaryAction: {
      default: {
        bg: { value: { base: "", _dark: "#57C4DC" } },
        border: { value: { base: "", _dark: "#57C4DC" } },
        text: { value: { base: "", _dark: "#141414" } },
      },
      hover: {
        bg: { value: { base: "", _dark: "#23272F" } },
        border: { value: { base: "", _dark: "#57C4DC" } },
        text: { value: { base: "", _dark: "#fff" } },
      },
      focus: {
        bg: { value: { base: "", _dark: "#23272F" } },
        border: { value: { base: "", _dark: "#57C4DC" } },
        text: { value: { base: "", _dark: "#57C4DC" } },
      },
      active: {
        bg: { value: { base: "", _dark: "#23272F" } },
        border: { value: { base: "", _dark: "#57C4DC" } },
        text: { value: { base: "", _dark: "#57C4DC" } },
      },
      disabled: {
        bg: { value: { base: "", _dark: "rgba(178, 178, 178, 0.4)" } },
        border: { value: { base: "", _dark: "#363b45" } },
        text: { value: { base: "", _dark: "#fff" } },
      },
    },
  },
};
