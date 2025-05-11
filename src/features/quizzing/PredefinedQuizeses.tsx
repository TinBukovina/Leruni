import { Flex, styled } from "../../../styled-system/jsx";
import Button from "../../components/Button";
import { javascriptSvgInfo } from "../../utils/svgPaths";
import { useQuizDataContext } from "./QuizDataContext";

const IconButtonStyle = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "0.75rem",

    bg: "surface.s0",
    borderRadius: "999",
    border: "2px solid token(colors.border)",

    color: "base.black",
    fontSize: "md",
    fontWeight: "bold",
    fill: "base.black",
    cursor: "pointer",

    _hover: {
      bg: "primary.s0",
      border: "2px dashed",
      borderColor: "primaryClr",
    },

    _active: {
      border: "2px solid",
      borderColor: "primaryClr",
      color: "primaryClr",
      fill: "primaryClr",
      transform: "scale(0.98)",
    },
  },
});

export default function PredefinedQuizeses() {
  const { setQuestionFileObject } = useQuizDataContext();

  const handleReactQuestionFetch = () => {
    fetch("/quizes/react.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was a error fetching react quiz questions.");
        }

        return response.json();
      })
      .then((data) => {
        setQuestionFileObject({
          fileName: "react.json",
          question_object: data,
        });
      });
  };

  const handleJavaScriptQuestionFetch = () => {
    fetch("/quizes/javascript.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was a error fetching react quiz questions.");
        }

        return response.json();
      })
      .then((data) => {
        setQuestionFileObject({
          fileName: "javascript.json",
          question_object: data,
        });
      });
  };

  return (
    <Flex
      position={"absolute"}
      left={"calc(-32px - 4rem)"}
      direction={"column"}
      gap={"1rem"}
      bg={"surface.s1"}
      p={"0.5rem"}
      w={"fit-content"}
      height={"386px"}
      borderRadius={"md"}
      zIndex={"1"}
    >
      <IconButtonStyle onClick={handleReactQuestionFetch}>
        <img src={"/svgs/react_logo.svg"} />
      </IconButtonStyle>

      <Button
        svgFunction={javascriptSvgInfo}
        handleOnClick={handleJavaScriptQuestionFetch}
      />
    </Flex>
  );
}
