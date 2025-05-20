import ProgressBar from "./components/ProgressBar";
import { Box, Flex, Grid, styled } from "../../../styled-system/jsx";
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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOptionsContext } from "./OptionsContext";
import { css } from "../../../styled-system/css";
import { useWindowWidth } from "../../customHooks/useWindowWidth";

export interface LocalStoregeQuestionObjInterface {
  startTime: number | null;
  endTime: number | null;
  questionObj: QuestionInterface;
}

const QuestionAnswerElement = styled("div", {
  base: {
    minH: "76px",
    bg: "surface.s0",
    p: "0.75rem 1.5rem",
    borderRadius: "md",
    border: "2px solid token(colors.border)",

    _hover: {
      borderStyle: "dashed",
      borderColor: "primaryClr",
      cursor: "pointer",
    },
  },
});

export default function QuizScreen() {
  const windowWidth = useWindowWidth();

  const [showAnswerMode, setShowAnswerMode] = useState<boolean>(false);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState<
    boolean | null
  >(null);
  const [isLastQuestionSkipped, setIsLastQuestionSkipped] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [questionAnswers, setQuestionAnswers] = useState<string[]>([]);
  const [fakeQuestionIndex, setFakeQuestionIndex] = useState<string>("");

  const inputAnswerRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const {
    questionFileObject,
    incrementCorrectAnswers,
    setQuestionFileObject,
    questionIndex,
    setQuestionIndex,
    randomizeQuestions,
    setQuestionsInOriginalOrder,
  } = useQuizDataContext();

  const { gameOptions, getLanguage } = useOptionsContext();

  // Effect to focus input answer
  useEffect(() => {
    if (
      inputAnswerRef.current &&
      gameOptions.mode === "inputAnswer" &&
      !showAnswerMode
    ) {
      console.log("Fokusiranje inputa za novo pitanje");
      inputAnswerRef.current.focus();
    }
  }, [questionIndex, gameOptions.mode, showAnswerMode]);

  // Effect to navigate to end screen when quiz is over
  useEffect(() => {
    if (questionFileObject && questionFileObject.question_object) {
      const currentNumberOfQuestions =
        questionFileObject.question_object.length;
      if (
        currentNumberOfQuestions > 0 &&
        questionIndex >= currentNumberOfQuestions
      ) {
        localStorage.removeItem("leruni_started_quiz");
        navigate("/end-screen");
      }
    }
  }, [questionIndex, questionFileObject, navigate]);

  // Effect to set and shuffle answers for the current question
  useEffect(() => {
    if (
      questionFileObject &&
      questionFileObject.question_object &&
      questionIndex < questionFileObject.question_object.length &&
      questionFileObject.question_object[questionIndex]
    ) {
      const currentQuestionData =
        questionFileObject.question_object[questionIndex];
      const lang = getLanguage();
      if (currentQuestionData.lang[lang]?.type?.multipleChoiceAnswer) {
        setQuestionAnswers(
          [
            ...(currentQuestionData.lang[lang].type.multipleChoiceAnswer
              .falseAnswers || []),
            currentQuestionData.lang[lang].type.multipleChoiceAnswer
              .correctAnswer || "",
          ].sort(() => Math.random() - 0.5)
        );
      } else {
        // Invalid path or missing data for multiple choice answers, clear or set default
        setQuestionAnswers([]);
      }
    } else {
      // Not ready to set answers (e.g., out of bounds, no data), clear them.
      setQuestionAnswers([]);
    }
  }, [questionFileObject, questionIndex, getLanguage]);

  // Effect to handle question order (random or original)
  useEffect(() => {
    if (gameOptions.questionOrder === "random") {
      randomizeQuestions();
    } else {
      setQuestionsInOriginalOrder();
    }
  }, [
    gameOptions.questionOrder,
    randomizeQuestions,
    setQuestionsInOriginalOrder,
  ]);

  // Effect to set quiz start time (if not already set)
  useEffect(() => {
    setQuestionFileObject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        startTime: prev.startTime || Date.now(),
        endTime: null,
      };
    });
  }, [setQuestionFileObject]);

  // Effect to save quiz name to localStorage
  useEffect(() => {
    if (questionFileObject?.fileName) {
      localStorage.setItem(
        "leruni_started_quiz",
        JSON.stringify(questionFileObject.fileName)
      );
    }
  }, [questionFileObject?.fileName]);

  // --- Derived variables (after hooks, before conditional returns) ---
  const questions = questionFileObject?.question_object;
  const numberOfQuestions = questions ? questions.length : 0;

  // Guard 1: Handle cases where essential data isn't loaded yet.
  if (!questionFileObject || !questions) {
    return <Box>Error: Quiz data not available.</Box>;
  }

  // Guard 2: Handle a loaded quiz that has no questions.
  if (numberOfQuestions === 0 && questionFileObject.fileName) {
    return <Box>Error: This quiz has no questions.</Box>;
  }

  // Guard 3: Critical check. If questionIndex is out of bounds (quiz is finished),
  if (numberOfQuestions > 0 && questionIndex >= numberOfQuestions) {
    return null;
  }

  // --- Render logic (if no early return) ---
  // At this point, questionFileObject, questions, and questionIndex are valid for rendering.
  const currentQuestion = questions[questionIndex];
  const pregressBarFill =
    numberOfQuestions > 0
      ? Math.floor((questionIndex / numberOfQuestions) * 100)
      : 0;

  return (
    <Flex
      maxH={"100dvh"}
      direction={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      gap={["0.5rem", "0.5rem", "1rem", "2xl"]}
      p={["0", "0.5rem", "1rem"]}
      minW={"360px"}
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
        <Flex gap={"1rem"}>
          <Input
            value={fakeQuestionIndex}
            onChange={(e) => {
              const newIndex = Number(e.target.value);
              console.log(newIndex, questionFileObject.question_object.length);
              if (!newIndex) return setFakeQuestionIndex("");
              if (newIndex < 0) return;
              if (newIndex > questionFileObject.question_object.length) return;

              setFakeQuestionIndex(newIndex + "");
              return setQuestionIndex(newIndex - 1);
            }}
            styles={{ width: "90px", textAlign: "center" }}
          />
          <ProgressBar fill={pregressBarFill} />
        </Flex>
        <Flex
          direction={"column"}
          gap={["1rem", "1rem", "3xl"]}
          p={["1rem", "1rem", "1.5rem"]}
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
              {currentQuestion.lang[getLanguage()].type.singleAnswer.question}
            </Box>
            {showAnswerMode ? (
              <Box gridColumnStart={2} fontSize={"md"}>
                {
                  currentQuestion.lang[getLanguage()].type.singleAnswer
                    .correctAnswer
                }
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
              <Box />
            )}
            <Flex direction={"column"} w={"100%"} gap={"1.5rem"}>
              {gameOptions.mode === "multipleChoiceAnswer" &&
              !showAnswerMode ? (
                <Grid
                  gridTemplateColumns={
                    windowWidth > 900 ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
                  }
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"1rem"}
                  w={"100%"}
                  overflow={"auto"}
                  maxH={windowWidth < 600 ? "200px" : ""}
                  py={"0.25rem"}
                  paddingRight={"0.5rem"}
                >
                  {questionAnswers.map((el: string, idx: number) => (
                    <QuestionAnswerElement
                      key={`${el}-${idx}`}
                      className={css({
                        borderColor:
                          el === selectedAnswer ? "primaryClr" : "border",
                      })}
                      onClick={() => {
                        setSelectedAnswer(el);
                      }}
                    >
                      {el}
                    </QuestionAnswerElement>
                  ))}
                </Grid>
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
                      setInputValue("");
                      setCurrentCorrectAnswer(null);
                    }}
                  />
                ) : (
                  <>
                    {gameOptions.mode !== "multipleChoiceAnswer" ? (
                      <Input
                        ref={inputAnswerRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setInputValue(e.target.value)
                        }
                      />
                    ) : (
                      ""
                    )}
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
                    if (showAnswerMode) {
                      if (currentCorrectAnswer) {
                        incrementCorrectAnswers();
                      }
                      setQuestionFileObject((prev) => ({
                        ...prev!,
                        endTime: Date.now(),
                      }));
                      setQuestionIndex((prev) => prev + 1);

                      setCurrentCorrectAnswer(null);
                      setShowAnswerMode(false);
                      setIsLastQuestionSkipped(false);
                      setInputValue("");
                      setSelectedAnswer("");
                    } else {
                      let isCorrect = false;
                      if (gameOptions.mode === "inputAnswer") {
                        isCorrect =
                          currentQuestion.lang[getLanguage()].type.singleAnswer
                            .correctAnswer === inputValue;
                      } else if (gameOptions.mode === "multipleChoiceAnswer") {
                        isCorrect =
                          currentQuestion.lang[getLanguage()].type
                            .multipleChoiceAnswer.correctAnswer ===
                          selectedAnswer;
                      }
                      setCurrentCorrectAnswer(isCorrect);
                      setShowAnswerMode(true);
                    }
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
