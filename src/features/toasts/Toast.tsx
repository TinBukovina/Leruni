import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import IconTemplate from "../secondaryNavigation/IconTemplate";
import {
  checkmarkSvgInfo,
  closeSvgInfo,
  SvgReturnType,
} from "../../utils/svgPaths";

export type ToastStatus = "positive" | "negative";

interface ToastProps {
  children: ReactNode;
  type: ToastStatus;
  svgOn?: boolean;
  onComplete: (id: number) => void;
  id: number;
  isActive?: boolean;
  duration?: number;
}

export default function Toast({
  children,
  type,
  svgOn = true,
  onComplete,
  id,
  isActive = true,
  duration = 5,
}: ToastProps) {
  const [progress, setProgress] = useState<number>(100);
  const updateInterval = 50;
  const [visible, setVisible] = useState<boolean>(isActive);

  const closeSvgInfoRef = useRef<SvgReturnType>(closeSvgInfo());
  const checkmarkSvgInfoRef = useRef<SvgReturnType>(checkmarkSvgInfo());

  const completeCountdown = useCallback(() => {
    if (onComplete) {
      setTimeout(() => {
        onComplete(id);
      }, 0);
    }
  }, [onComplete, id]);

  useEffect(() => {
    if (!isActive) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const decrementPerInterval = 100 / ((duration * 1000) / updateInterval);

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - decrementPerInterval;

        if (newProgress <= 0) {
          clearInterval(timer);
          completeCountdown();
          return 0;
        }

        return newProgress;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [completeCountdown, isActive, duration]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={css({
        position: "fixed",
        top: "2rem",

        display: "inline-block",

        width: "100%",
        backgroundColor: "transparent",
        zIndex: "20",
        pointerEvents: "none",
      })}
    >
      <div
        className={css({
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          width: "fit-content",
          height: "fit-content",
          backgroundColor: type === "positive" ? "#0AA480" : "#D82222",
          borderRadius: "md",
          fontSize: "lg",
          overflow: "hidden",
          opacity: "1",
          transition: "opacity 0.3s ease-in-out",
        })}
      >
        <span
          className={css({
            display: "inline-block",
            width: "2rem",
            height: "2rem",
          })}
        >
          {type === "positive" && svgOn ? (
            <IconTemplate
              path={checkmarkSvgInfoRef.current.path}
              viewBox={checkmarkSvgInfoRef.current.viewBox}
              fill="#F4F4F4"
            />
          ) : (
            <IconTemplate
              path={closeSvgInfoRef.current.path}
              viewBox={closeSvgInfoRef.current.viewBox}
              fill="#F4F4F4"
            />
          )}
        </span>
        {children}
        <div
          className={css({
            height: "4px",
            backgroundColor: "typography.text",
            position: "absolute",
            bottom: "0",
            left: "0",
          })}
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
