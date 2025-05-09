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
  handleOnClick?: () => void;
  svgFunction?: () => SvgReturnType;
}

export default function Button({
  children,
  style = !children ? { padding: "0.75rem" } : {},
  type = "default",
  handleOnClick,
  svgFunction = () => {
    return { path: "", viewBox: "" };
  },
}: ButtonProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [state, setState] = useState<"default" | "hover" | "active">("default");

  const svgInfo = useMemo(() => svgFunction(), [svgFunction]);

  useEffect(() => {
    if (isActive) {
      setState("active");
    } else if (isHover) {
      setState("hover");
    } else {
      setState("default");
    }
  }, [isHover, isActive]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  return (
    <button
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={buttonCva({ type, state })}
      style={style}
    >
      {svgInfo.path != "" ? (
        <span
          className={css({
            paddingTop: "0.1rem",
            width: "3rem",
            height: "3rem",
          })}
        >
          <IconTemplate
            width={!children ? "100%" : "1rem"}
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
