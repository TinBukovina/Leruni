import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Flex } from "../../styled-system/jsx";
import { useEffect } from "react";
import { OptionsProvider } from "../features/quizzing/OptionsContext";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/main-menu");
    }
  }, [location.pathname, navigate]);

  return (
    <OptionsProvider>
      <Flex
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        h={"100dvh"}
        maxH={"100dvh"}
        pb={"4xl"}
        bg={"surface.s0"}
        overflow={"auto"}
      >
        <Outlet />
      </Flex>
    </OptionsProvider>
  );
}
