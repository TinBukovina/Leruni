import { useState } from "react";
import { Container, Flex } from "../../../styled-system/jsx";
import Button from "../../components/Button";
import { appsSvgPath, settingSvgInfo } from "../../utils/svgPaths";

import JsonFileUploader from "../fileUploader/JsonFileUploader";
import PredefinedQuizeses from "./PredefinedQuizeses";
import { useQuizDataContext } from "./QuizDataContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toasts/ToastContext";
import { usePopupWindowContext } from "../popupWindow/PopupWindowContext";
import OptionsWindow from "./OptionsWindow";

export default function MainMenu() {
  const navigation = useNavigate();
  const [isPredefinedQuizesDisplayed, setIsPredefinedQuizesDisplayed] =
    useState<boolean>(false);
  const [isOptionsDisplayed, setIsOptionDisplayed] = useState<boolean>(false);

  const { questionFileObject, resetQuizData } = useQuizDataContext();
  const { addNewToast } = useToast();
  const { addNewPopupWindow } = usePopupWindowContext();

  return (
    <Flex flexDirection={"column"} gap={"lg"} w={"800px"}>
      <Container fontSize={"h1"} fontWeight={"bold"}>
        Leruni
      </Container>

      <Flex
        position={"relative"}
        direction={"column"}
        gap={"1rem"}
        w={"fit-content"}
        mx={"auto"}
      >
        {!isOptionsDisplayed ? <JsonFileUploader /> : <OptionsWindow />}

        {isPredefinedQuizesDisplayed ? <PredefinedQuizeses /> : ""}

        <Flex w={"100%"} gap={"1rem"}>
          <Button
            svgFunction={appsSvgPath}
            handleOnClick={() => {
              setIsPredefinedQuizesDisplayed((prev) => !prev);
            }}
          />
          <Button
            type={questionFileObject?.fileName ? "primaryAction" : "default"}
            style={{
              width: "100%",
            }}
            handleOnClick={() => {
              if (!questionFileObject) {
                addNewToast(
                  "You need to input a file or select one.",
                  "negative"
                );

                return;
              }

              const pausedQuizNameString = localStorage.getItem(
                "leruni_started_quiz"
              );

              if (pausedQuizNameString && pausedQuizNameString != "undefined") {
                const pausedQuizName = JSON.parse(pausedQuizNameString || "");

                if (pausedQuizName === questionFileObject.fileName) {
                  addNewPopupWindow({
                    mainText:
                      "Do you want to continue where you last time quit?",
                    subText: `Last quiz: ${(questionFileObject.fileName || "").split(".")[0]}`,
                    onClickYes: () => {
                      navigation("/play");
                    },
                    onClickNo: () => {
                      localStorage.removeItem("leruni_started_quiz");
                      resetQuizData();
                      navigation("/play");
                    },
                  });

                  return;
                } else {
                  resetQuizData();
                }
              }

              navigation("/play");
            }}
          >
            Start
          </Button>
          <Button
            svgFunction={settingSvgInfo}
            handleOnClick={() => {
              setIsPredefinedQuizesDisplayed(false);
              setIsOptionDisplayed((prev) => !prev);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
