// ButtonStyles.ts
import { cva } from "../../styled-system/css";

export const buttonCva = cva({
  base: {
    p: "0.75rem 1.5rem",
    height: "fit-content",

    border: "2px solid transparent",
    borderRadius: "999",

    fontSize: "md",
    fontWeight: "bold",
    cursor: "pointer",

    outline: "none",
  },
  variants: {
    type: {
      default: {},
      primaryAction: {},
    },
    state: {
      default: {},
      hover: {},
      active: {},
      focus: {},
      disabled: {},
    },
  },
  compoundVariants: [
    {
      type: "default",
      state: "default",
      css: {
        bg: "button.default.bg",
        borderColor: "button.default.border",
        color: "button.default.text",
        fill: "button.default.text",
      },
    },
    {
      type: "default",
      state: "hover",
      css: {
        bg: "button.hover.bg",
        borderColor: "button.hover.border",
        color: "button.hover.text",
        fill: "button.hover.text",
        borderStyle: "dashed",
      },
    },
    {
      type: "default",
      state: "active",
      css: {
        bg: "button.active.bg",
        borderColor: "button.active.border",
        color: "button.active.text",
        fill: "button.active.text",
      },
    },
    {
      type: "default",
      state: "focus",
      css: {
        bg: "button.focus.bg",
        borderColor: "button.focus.border",
        color: "button.focus.text",
        fill: "button.focus.text",
      },
    },
    {
      type: "default",
      state: "disabled",
      css: {
        bg: "button.disabled.bg",
        borderColor: "button.disabled.border",
        color: "button.disabled.text",
        fill: "button.disabled.text",
      },
    },
    {
      type: "primaryAction",
      state: "default",
      css: {
        bg: "button.primaryAction.default.bg",
        borderColor: "button.primaryAction.default.border",
        color: "button.primaryAction.default.text",
        fill: "button.primaryAction.default.text",
      },
    },
    {
      type: "primaryAction",
      state: "hover",
      css: {
        bg: "button.primaryAction.hover.bg",
        borderColor: "button.primaryAction.hover.border",
        color: "button.primaryAction.hover.text",
        fill: "button.primaryAction.hover.text",
        borderStyle: "dashed",
      },
    },
    {
      type: "primaryAction",
      state: "active",
      css: {
        bg: "button.primaryAction.active.bg",
        borderColor: "button.primaryAction.active.border",
        color: "button.primaryAction.active.text",
        fill: "button.primaryAction.active.text",
      },
    },
    {
      type: "primaryAction",
      state: "focus",
      css: {
        bg: "button.primaryAction.focus.bg",
        borderColor: "button.primaryAction.focus.border",
        color: "button.primaryAction.focus.text",
        fill: "button.primaryAction.focus.text",
      },
    },
    {
      type: "primaryAction",
      state: "disabled",
      css: {
        bg: "button.primaryAction.disabled.bg",
        borderColor: "button.primaryAction.disabled.border",
        color: "button.primaryAction.disabled.text",
        fill: "button.primaryAction.disabled.text",
      },
    },
  ],
  defaultVariants: {
    type: "default",
    state: "default",
  },
});
