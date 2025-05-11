import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainMenu from "./features/quizzing/MainMenu";
import { QuizDataProvider } from "./features/quizzing/QuizDataContext";
import QuizScreen from "./features/quizzing/QuizScreen";
import AppLayout from "./pages/AppLayout";
import { useToast } from "./features/toasts/ToastContext";
import Toast from "./features/toasts/Toast";
import EndScreen from "./features/quizzing/EndScreen";
import { Flex } from "../styled-system/jsx";
import PopupWindow from "./features/popupWindow/PopupWindow";
import { usePopupWindowContext } from "./features/popupWindow/PopupWindowContext";

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
      {
        path: "/end-screen",
        element: <EndScreen />,
      },
    ],
  },
]);

function App() {
  const { toasts, handleToastComplete } = useToast();
  const { popupWindowData } = usePopupWindowContext();
  document.documentElement.classList.add("dark");

  return (
    <QuizDataProvider>
      <>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            id={toast.id}
            onComplete={handleToastComplete}
            isActive={toast.isActive}
            duration={toast.duration}
          >
            {toast.message}
          </Toast>
        ))}
        {popupWindowData.length > 0 ? (
          <Flex
            bg={"rgba(0,0,0,0.5)"}
            position={"absolute"}
            top={"0"}
            right={"0"}
            bottom={"0"}
            left={"0"}
            zIndex={"1000"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {popupWindowData.map((el) => (
              <PopupWindow
                mainText={el.mainText}
                subText={el.subText}
                onClickYes={el.onClickYes}
                onClickNo={el.onClickNo}
              />
            ))}
          </Flex>
        ) : (
          ""
        )}
        <RouterProvider router={router} />
      </>
    </QuizDataProvider>
  );
}

export default App;
