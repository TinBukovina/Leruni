import { Box, Flex } from "../../../../styled-system/jsx";

interface ProgressBarProps {
  fill: number;
}

export default function ProgressBar({ fill }: ProgressBarProps) {
  const clampedFill = Math.max(0, Math.min(100, fill));

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      gap={"1rem"}
      w={"100%"}
    >
      <Box
        w={"100%"}
        h={"1rem"}
        borderRadius={"999"}
        border={"2px solid token(colors.border)"}
        bg={"surface.s1"}
        overflow={"hidden"}
      >
        <Box
          style={{ width: `${clampedFill}%` }}
          h={"100%"}
          bg={"primaryClr"}
          borderRadius={"999"}
          transition={"width 0.5s ease"}
        ></Box>
      </Box>
      <Box>{fill}%</Box>
    </Flex>
  );
}
