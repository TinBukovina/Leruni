import { ReactNode, useEffect, useMemo, useState } from "react";
import { css } from "../../styled-system/css";
import { SvgReturnType } from "../utils/svgPaths";
import IconTemplate from "./IconTemplate";
import { buttonCva } from "../styles/ButtonStyles";

interface StyleInterface {
  width?: string;
  padding?: string;
}

interface ButtonProps {
  children?: ReactNode;
  style?: StyleInterface;
  type?: "default" | "primaryAction";
  isDisabled?: boolean;
  handleOnClick?: () => void;
  svgFunction?: () => SvgReturnType;
}

export default function Button({
  children,
  style = !children ? { padding: "0.75rem" } : {},
  type = "default",
  isDisabled = false,
  handleOnClick,
  svgFunction = () => {
    return { path: "", viewBox: "" };
  },
}: ButtonProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [styleState, setStyleState] = useState<
    "default" | "hover" | "active" | "focus" | "disabled"
  >("default");

  const svgInfo = useMemo(() => svgFunction(), [svgFunction]);

  useEffect(() => {
    if (isDisabled) {
      setStyleState("disabled");
    } else if (isActive) {
      setStyleState("active");
    } else if (isHover) {
      setStyleState("hover");
    } else if (isFocus) {
      setStyleState("focus");
    } else {
      setStyleState("default");
    }
  }, [isHover, isActive, isFocus, isDisabled]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleFocuseOn = () => {
    setIsFocus(true);
  };

  const handleFocuseOff = () => {
    setIsFocus(false);
  };

  return (
    <button
      onClick={() => {
        setIsFocus(false);
        setIsActive(false);

        if (!handleOnClick) return;
        handleOnClick();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocuseOn}
      onBlur={handleFocuseOff}
      disabled={isDisabled}
      className={buttonCva({ type, state: styleState })}
      style={style}
    >
      {svgInfo.path != "" ? (
        <span
          className={css({
            maxW: "1.5rem",
            maxH: "1.5rem",
          })}
        >
          <IconTemplate
            width={!children ? "1.5rem" : "1rem"}
            path={svgInfo.path}
            viewBox={svgInfo.viewBox}
          />
        </span>
      ) : (
        ""
      )}
      {children}
    </button>
  );
}
