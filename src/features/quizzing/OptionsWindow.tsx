import { Box, Flex } from "../../../styled-system/jsx";
import ToggleBtn from "./components/ToggleBtn";

export default function OptionsWindow() {
  return (
    <Flex
      flexDirection={"column"}
      gap={"lg"}
      mx={"auto"}
      p={"2xl"}
      w={"360px"}
      height={"386px"}
      maxW={"400px"}
      bg={"surface.s1"}
      borderRadius={"md"}
    >
      <Flex direction={"column"} textAlign={"center"} gap={"1rem"}>
        <Box>Language </Box>
        <Flex justifyContent={"center"} gap={"1rem"}>
          <Box>English</Box>
          <ToggleBtn />
          <Box>Croatian</Box>
        </Flex>
        <Box>Quiz mode: </Box>
      </Flex>
    </Flex>
  );
}
