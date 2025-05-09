// ButtonStyles.ts
import { cva } from "../../styled-system/css";

export const buttonCva = cva({
  base: {
    height: "fit-content",
    fontSize: "md",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "999",
  },
  variants: {
    type: {
      default: {
        p: "0.75rem 1.5rem",
        bg: "surface.s0",
        border: "2px solid token(colors.border)",
        color: "base.black",
        fill: "base.black",
      },
      primaryAction: {
        p: "0.75rem 1.5rem",
        bg: "primaryClr",
        border: "2px solid token(colors.primaryClr)",
        color: "base.black",
        fill: "base.black",
      },
    },
    state: {
      default: {},
      hover: {
        bg: "primary.s0",
        border: "2px dashed",
        borderColor: "primaryClr",
      },
      active: {
        border: "2px solid",
        borderColor: "primaryClr",
        color: "primaryClr",
        fill: "primaryClr",
        transform: "scale(0.98)",
      },
    },
  },
  defaultVariants: {
    type: "default",
    state: "default",
  },
});
