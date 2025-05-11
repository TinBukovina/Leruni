import ProgressBar from "./components/ProgressBar";
import { Box, Flex, Grid } from "../../../styled-system/jsx";
import {
  checkmarkSvgInfo,
  closeSvgInfo,
  replaySvgInfo,
  rightArrowSvgInfo,
  skipSvgPath,
} from "../../utils/svgPaths";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { QuestionInterface, useQuizDataContext } from "./QuizDataContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface LocalStoregeQuestionObjInterface {
  startTime: number | null;
  endTime: number | null;
  questionObj: QuestionInterface;
}

export default function QuizScreen() {
  const [showAnswerMode, setShowAnswerMode] = useState<boolean>(false);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState<
    boolean | null
  >(null);
  const [isLastQuestionSkipped, setIsLastQuestionSkipped] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();

  const {
    questionFileObject,
    incrementCorrectAnswers,
    setQuestionFileObject,
    questionIndex,
    setQuestionIndex,
  } = useQuizDataContext();

  console.log(questionFileObject);
  const numberOfQuestions = (questionFileObject?.question_object || []).length;

  useEffect(() => {
    console.log(questionFileObject);
    if (!questionFileObject || !questionFileObject?.question_object) return;

    if (questionIndex >= (questionFileObject?.question_object?.length || 0)) {
      navigate("/end-screen");
    }
  }, [questionIndex, questionFileObject, navigate]);

  useEffect(() => {
    setQuestionFileObject((prev) => ({
      ...prev!,
      startTime: Date.now(),
      endTime: null,
    }));
  }, [setQuestionFileObject]);

  useEffect(() => {
    localStorage.setItem(
      "leruni_started_quiz",
      JSON.stringify(questionFileObject?.fileName)
    );
  }, [questionFileObject]);

  if (!numberOfQuestions || !questionFileObject) {
    return "Error";
  }

  const pregressBarFill = Math.floor((questionIndex / numberOfQuestions) * 100);

  return (
    <Flex
      direction={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      gap={"2xl"}
      p={["0", "0.5rem", "1rem"]}
      minW={"400px"}
      w={"80vw"}
      maxW={"900px"}
    >
      <Box
        fontSize={"h2"}
        fontWeight={"bold"}
        fontStyle={"italic"}
        _hover={{
          cursor: "pointer",
          transform: "rotate(5deg)",
          transition: "transform 0.2s linear",
        }}
        onClick={() => {
          navigate("/main-menu");
        }}
      >
        Leruni
      </Box>
      <Flex direction={"column"} w={"100%"} gap={"xl"}>
        <ProgressBar fill={pregressBarFill} />
        <Flex
          direction={"column"}
          gap={"3xl"}
          p={"1.5rem"}
          bg={"surface.s1"}
          border={"2px solid token(colors.border)"}
          borderStyle={currentCorrectAnswer != null ? "dashed" : "solid"}
          borderColor={
            currentCorrectAnswer !== null
              ? currentCorrectAnswer
                ? "actions.postive"
                : "actions.negative"
              : "border"
          }
          borderRadius={"md"}
        >
          <Grid
            gridTemplateColumns={"auto 1fr"}
            gap={".5rem"}
            rowGap={"xl"}
            borderRadius={"md"}
            p={"1.5rem 1rem"}
            fontSize={"h5"}
            border={"2px dashed transparent"}
            borderColor={showAnswerMode ? "primaryClr" : ""}
          >
            <Box>{questionIndex + 1}.</Box>
            <Box>
              {questionFileObject?.question_object[questionIndex]?.question ||
                ""}
            </Box>
            {showAnswerMode ? (
              <Box gridColumnStart={2} fontSize={"md"}>
                {questionFileObject?.question_object[questionIndex]?.answer ||
                  ""}
              </Box>
            ) : (
              ""
            )}
          </Grid>

          <Flex
            gap={"lg"}
            justifyContent={"space-between"}
            h={"fit-content"}
            w={"100%"}
          >
            {showAnswerMode && !isLastQuestionSkipped ? (
              <Flex gap={"1rem"}>
                <Button
                  svgFunction={closeSvgInfo}
                  handleOnClick={() => {
                    setCurrentCorrectAnswer(false);
                  }}
                />
                <Button
                  svgFunction={checkmarkSvgInfo}
                  handleOnClick={() => {
                    setCurrentCorrectAnswer(true);
                  }}
                />
              </Flex>
            ) : (
              ""
            )}
            <Flex justifyContent={"right"} gap={"lg"} w={"100%"}>
              {showAnswerMode ? (
                <Button
                  svgFunction={replaySvgInfo}
                  handleOnClick={() => {
                    setShowAnswerMode(false);
                    setIsLastQuestionSkipped(false);
                  }}
                />
              ) : (
                <>
                  <Input
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputValue(e.target.value)
                    }
                  />
                  <Button
                    svgFunction={skipSvgPath}
                    handleOnClick={() => {
                      setIsLastQuestionSkipped(true);
                      setShowAnswerMode(true);
                      setCurrentCorrectAnswer(null);
                    }}
                  />
                </>
              )}

              <Button
                svgFunction={rightArrowSvgInfo}
                handleOnClick={() => {
                  setInputValue("");

                  if (showAnswerMode) {
                    if (currentCorrectAnswer) {
                      console.log("pop");
                      incrementCorrectAnswers();
                    }

                    setQuestionIndex((prev) => prev + 1);
                    setCurrentCorrectAnswer(null);
                    setShowAnswerMode(false);
                    setIsLastQuestionSkipped(false);

                    setQuestionFileObject((prev) => ({
                      ...prev!,
                      endTime: Date.now(),
                    }));

                    localStorage.removeItem("leruni_started_quiz");
                  } else {
                    if (
                      questionFileObject.question_object[questionIndex]
                        .answer === inputValue
                    ) {
                      setCurrentCorrectAnswer(true);
                    } else {
                      setCurrentCorrectAnswer(false);
                    }

                    setShowAnswerMode(true);
                  }
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
