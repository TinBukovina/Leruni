import React from "react";

interface IconTemplateProps {
  width?: string;
  height?: string;
  fill?: string;
  viewBox?: string;
  path: string;
  svgContent?: React.ReactNode;
}

const IconTemplate: React.FC<IconTemplateProps> = ({
  width = "100%",
  height = "100%",
  fill = "inherit",
  viewBox = "0 0 24 24",
  path,
  svgContent,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      style={{
        maxWidth: "32px",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {path ? <path d={path} fill="inherit" /> : svgContent}
    </svg>
  );
};

export default IconTemplate;
