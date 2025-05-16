import { css } from "../../../../styled-system/css";

interface ToggleBtnProps {
  value: boolean;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const switchContainerStyles = css({
  fontSize: "17px",
  position: "relative",
  display: "inline-block",
  width: "3.5em",
  height: "2em",

  "& input:focus-visible + span": {
    boxShadow: "0 0 1px token(color.primaryClr)",
  },

  "& input:checked + span": {
    _before: {
      transform: "translateX(0)",
    },
    _after: {
      transform: "translateX(-150%)",
    },
  },
});

const switchInputStyles = css({
  opacity: 0,
  width: 0,
  height: 0,
});

const sliderStyles = css({
  position: "absolute",
  cursor: "pointer",
  inset: 0,
  background: "base.white",
  borderRadius: "50px",
  overflow: "hidden",
  transition: "box-shadow 0.3s ease-in-out",

  _before: {
    position: "absolute",
    content: '""',
    height: "1.4em",
    width: "1.4em",
    right: "0.3em",
    bottom: "0.3em",
    backgroundColor: "primaryClr",
    borderRadius: "inherit",
    transform: "translateX(150%)",
    transition: "transform 0.4s cubic-bezier(0.215, 0.610, 0.355, 1)",
  },

  _after: {
    position: "absolute",
    content: '""',
    height: "1.4em",
    width: "1.4em",
    left: "0.3em",
    bottom: "0.3em",
    backgroundColor: "base.gray",
    borderRadius: "inherit",

    transform: "translateX(0)",
    transition: "transform 0.4s cubic-bezier(0.215, 0.610, 0.355, 1)",
  },
});

export default function ToggleBtn({ value, handleOnChange }: ToggleBtnProps) {
  return (
    <>
      <label className={switchContainerStyles}>
        <input
          type="checkbox"
          className={switchInputStyles}
          checked={value}
          onChange={handleOnChange}
        />
        <span className={sliderStyles}></span>
      </label>
    </>
  );
}
