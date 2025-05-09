import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Flex } from "../styled-system/jsx";
import MainMenu from "./features/quizzing/MainMenu";
import { QuizDataProvider } from "./features/quizzing/QuizDataContext";
import QuizScreen from "./features/quizzing/QuizScreen";
import AppLayout from "./pages/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/main-menu",
        element: <MainMenu />,
      },
      {
        path: "/play",
        element: <QuizScreen />,
      },
    ],
  },
]);

function App() {
  document.documentElement.classList.add("dark");

  return (
    <QuizDataProvider>
      <RouterProvider router={router} />
    </QuizDataProvider>
  );
}

export default App;
