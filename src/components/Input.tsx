import { CSSProperties, useEffect, useState } from "react";
import { inputCva } from "../styles/InputStyles";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  handleOnClick?: () => void;
  styles?: CSSProperties;
  type?: string;
}

export default function Input({
  value,
  onChange,
  isDisabled = false,
  handleOnClick,
  styles,
  type,
}: InputProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [styleState, setStyleState] = useState<
    "default" | "hover" | "active" | "focus" | "disabled"
  >("default");

  useEffect(() => {
    if (isDisabled) {
      setStyleState("disabled");
      return;
    }

    if (isActive) {
      setStyleState("active");
    } else if (isFocus) {
      setStyleState("focus");
    } else if (isHover) {
      setStyleState("hover");
    } else {
      setStyleState("default");
    }
  }, [isHover, isActive, isFocus, isDisabled]);

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

  const handleFocuseOn = () => {
    setIsFocus(true);
  };

  const handleFocuseOff = () => {
    setIsFocus(false);
  };

  return (
    <input
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocuseOn}
      onBlur={handleFocuseOff}
      disabled={isDisabled}
      className={inputCva({ type: "default", state: styleState })}
      value={value}
      onChange={onChange}
      style={styles}
      type={type}
    />
  );
}
