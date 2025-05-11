import { useState } from "react";
import { Container, Flex } from "../../../styled-system/jsx";
import Button from "../../components/Button";
import { settingSvgInfo } from "../../utils/svgPaths";

import JsonFileUploader from "../fileUploader/JsonFileUploader";
import PredefinedQuizeses from "./PredefinedQuizeses";
import { useQuizDataContext } from "./QuizDataContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toasts/ToastContext";
import { usePopupWindowContext } from "../popupWindow/PopupWindowContext";

export default function MainMenu() {
  const navigation = useNavigate();

  const [isPredefinedQuizesDisplayed, setIsPredefinedQuizesDisplayed] =
    useState<boolean>(false);

  const { questionFileObject, setQuestionIndex } = useQuizDataContext();
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
        <JsonFileUploader />

        {isPredefinedQuizesDisplayed ? <PredefinedQuizeses /> : ""}

        <Flex w={"100%"} gap={"1rem"}>
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
                      setQuestionIndex(0);
                      navigation("/play");
                    },
                  });

                  return;
                } else {
                  setQuestionIndex(0);
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
              setIsPredefinedQuizesDisplayed((prev) => !prev);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
