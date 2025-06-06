import { useEffect, useState } from "react";
import { Box, Flex, styled } from "../../../styled-system/jsx";
import ToggleBtn from "./components/ToggleBtn";
import {
  ListOfAllowedLanguagesType,
  ListOfAllowedModeType,
  ListOfAllowedQuestionOrderType,
  useOptionsContext,
} from "./OptionsContext";
import { useQuizDataContext } from "./QuizDataContext";

const OptionPropertyTitle = styled("div", {
  base: {
    mb: "0.5rem",
    fontSize: "h6",
    color: "text.normal",
  },
});

const mappedValues = {
  language: {
    true: "english" as ListOfAllowedLanguagesType,
    false: "croatian" as ListOfAllowedLanguagesType,
  },
  questionOrder: {
    true: "random" as ListOfAllowedQuestionOrderType,
    false: "default" as ListOfAllowedQuestionOrderType,
  },
  mode: {
    true: "multipleChoiceAnswer" as ListOfAllowedModeType,
    false: "inputAnswer" as ListOfAllowedModeType,
  },
};

export default function OptionsWindow() {
  const { gameOptions, setGameOptions } = useOptionsContext();
  const { resetQuizData } = useQuizDataContext();

  const [langValue, setLangValue] = useState<boolean>(
    gameOptions.language === "english"
  );
  const [quizModeValue, setQuizModeValue] = useState<boolean>(
    gameOptions.mode === "multipleChoiceAnswer"
  );
  const [questionOrderValue, setQuestionOrderValue] = useState<boolean>(
    gameOptions.questionOrder === "random"
  );

  useEffect(() => {
    setGameOptions({
      language: mappedValues.language[`${langValue}`],
      mode: mappedValues.mode[`${quizModeValue}`],
      questionOrder: mappedValues.questionOrder[`${questionOrderValue}`],
    });

    resetQuizData();
    localStorage.removeItem("leruni_started_quiz");
  }, [
    langValue,
    questionOrderValue,
    quizModeValue,
    setGameOptions,
    resetQuizData,
  ]);

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
      <Flex
        direction={"column"}
        textAlign={"left"}
        gap={"2rem"}
        color={"text.secondary"}
      >
        <Box>
          <OptionPropertyTitle>Language </OptionPropertyTitle>
          <Flex justifyContent={"left"} alignItems={"center"} gap={"1rem"}>
            <ToggleBtn
              value={langValue}
              handleOnChange={(e) => {
                setLangValue(e.target.checked);
              }}
            />
            {langValue ? <Box>English</Box> : <Box>Croatian</Box>}
          </Flex>
        </Box>
        <Box>
          <OptionPropertyTitle>Quiz mode: </OptionPropertyTitle>
          <Flex justifyContent={"left"} alignItems={"center"} gap={"1rem"}>
            <ToggleBtn
              value={quizModeValue}
              handleOnChange={(e) => setQuizModeValue(e.target.checked)}
            />
            {quizModeValue ? (
              <Box>Multiple choice answer</Box>
            ) : (
              <Box>Input anser</Box>
            )}
          </Flex>
        </Box>
        <Box>
          <OptionPropertyTitle>Question order: </OptionPropertyTitle>
          <Flex justifyContent={"left"} alignItems={"center"} gap={"1rem"}>
            <ToggleBtn
              value={questionOrderValue}
              handleOnChange={(e) => setQuestionOrderValue(e.target.checked)}
            />
            {questionOrderValue ? <Box>Random</Box> : <Box>Sequence</Box>}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
