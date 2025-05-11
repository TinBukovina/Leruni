import { cva } from "../../styled-system/css";

export const inputCva = cva({
  base: {
    w: "100%",
    border: "2px solid transparent",
    borderRadius: "999",
    p: "0.75rem 1.5rem",
  },
  variants: {
    type: {
      default: {
        outline: "none",
      },
    },
    state: {
      default: {
        bg: "input.default.bg",
        borderColor: "input.default.border",
        color: "input.default.text",
        fill: "input.default.text",
      },
      hover: {
        bg: "input.default.bg",
        borderColor: "input.hover.border",
        color: "input.hover.text",
        fill: "input.hover.text",
        borderStyle: "dashed",
      },
      active: {
        bg: "input.active.bg",
        borderColor: "input.active.border",
        color: "input.active.text",
        fill: "input.active.text",
      },
      focus: {
        bg: "input.focus.bg",
        borderColor: "input.focus.border",
        color: "input.focus.text",
        fill: "input.focus.text",
      },
      disabled: {
        bg: "input.disabled.bg",
        borderColor: "input.disabled.border",
        color: "input.disabled.text",
        fill: "input.disabled.text",

        opacity: 0.9,
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    type: "default",
    state: "default",
  },
});
