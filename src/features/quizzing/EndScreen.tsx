import { useEffect, useRef } from "react";
import { Box, Flex } from "../../../styled-system/jsx";
import { useNavigate } from "react-router-dom";
import IconTemplate from "../../components/IconTemplate";
import { medalSvgInfo, SvgReturnType } from "../../utils/svgPaths";
import Button from "../../components/Button";
import { useQuizDataContext } from "./QuizDataContext";
import { millisecondsToFormattedTime } from "../../utils/helpersFunction";

export default function EndScreen() {
  const navigate = useNavigate();

  const { correctAnswers, questionFileObject, resetQuizData } =
    useQuizDataContext();

  const medalSvgInfoRef = useRef<SvgReturnType>(medalSvgInfo());

  const numberOfQuestions = questionFileObject?.question_object.length || 0;

  console.log(correctAnswers, numberOfQuestions);

  useEffect(() => {
    localStorage.removeItem("leruni_started_quiz");
  }, []);

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
      <Flex
        direction={"column"}
        justifyContent={"start"}
        alignItems={"center"}
        gap={"lg"}
        p={"1rem"}
        w={"fit-content"}
        minW={"320px"}
        bg={"surface.s1"}
        borderRadius={"md"}
      >
        <Box fill={"primaryClr"} w={"80px"} h={"80px"}>
          <IconTemplate
            path={medalSvgInfoRef.current.path}
            viewBox={medalSvgInfoRef.current.viewBox}
          />
        </Box>

        <Box fontSize={"h5"} fontWeight={"bold"}>
          Congratulations!
        </Box>

        <Flex direction={"column"} gap={"md"} textAlign={"center"}>
          <Box>Time</Box>
          <Box color={"text.secondary"}>
            {millisecondsToFormattedTime(
              (questionFileObject?.endTime || 0) -
                (questionFileObject?.startTime || 0)
            )}
          </Box>

          <Box>Mastery</Box>
          <Box color={"text.secondary"}>
            {Math.floor((correctAnswers / numberOfQuestions) * 100)}%
          </Box>
        </Flex>

        <Flex direction={"column"} gap={"md"} w={"100%"}>
          <Button
            style={{ width: "100%" }}
            handleOnClick={() => {
              resetQuizData();
              navigate("/play");
            }}
          >
            Repeat
          </Button>
          <Button
            style={{ width: "100%" }}
            handleOnClick={() => {
              resetQuizData();
              navigate("/main-menu");
            }}
          >
            Home
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
