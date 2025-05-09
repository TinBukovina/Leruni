import { Flex } from "../styled-system/jsx";
import MainMenu from "./features/quizzing/MainMenu";
import { QuizDataProvider } from "./features/quizzing/QuizDataContext";

const router = createBrowserRouter;

function App() {
  document.documentElement.classList.add("dark");

  return (
    <QuizDataProvider>
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
        <MainMenu />
      </Flex>
    </QuizDataProvider>
  );
}

export default App;
