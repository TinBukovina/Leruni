import { Outlet } from "react-router-dom";
import { Flex } from "../../styled-system/jsx";

export default function AppLayout() {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      h={"100dvh"}
      maxH={"100dvh"}
      pb={"4xl"}
      bg={"surface.s0"}
      overflow={"hidden"}
    >
      <Outlet />
    </Flex>
  );
}
