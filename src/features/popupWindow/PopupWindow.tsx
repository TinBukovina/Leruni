import { Box, Flex } from "../../../styled-system/jsx";
import Button from "../../components/Button";
import { usePopupWindowContext } from "./PopupWindowContext";

interface WindowProps {
  mainText: string;
  subText?: string;
  onClickYes: () => void;
  onClickNo: () => void;
}

export default function PopupWindow({
  mainText,
  subText,
  onClickYes,
  onClickNo,
}: WindowProps) {
  const { removeLastPopupWindow } = usePopupWindowContext();
  return (
    <Flex
      direction={"column"}
      gap={"1.5rem"}
      p={"1.5rem 2rem"}
      maxW={"380px"}
      bg={"surface.s1"}
      border={"2px solid token(colors.border)"}
      borderRadius={"md"}
      textAlign={"center"}
    >
      <Box fontSize={"h6"} color={"text.normal"}>
        {mainText}
      </Box>
      {subText ? <Box color={"text.secondary"}>{subText}</Box> : ""}
      <Flex justifyContent={"center"} gap={"1rem"}>
        <Button
          handleOnClick={() => {
            onClickYes();
            removeLastPopupWindow();
          }}
        >
          Yes
        </Button>
        <Button
          handleOnClick={() => {
            onClickNo();
            removeLastPopupWindow();
          }}
        >
          No
        </Button>
      </Flex>
    </Flex>
  );
}
