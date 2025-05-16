import { Flex, styled } from "../../../styled-system/jsx";
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
  const { setQuestionFileObject, questionFileObject } = useQuizDataContext();

  const handleQuestionFetch = (questionUrl: string, fileName: string) => {
    fetch(questionUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`There was a error fetching: ${questionUrl}.`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Bok");
        setQuestionFileObject({
          fileName,
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
      <IconButtonStyle
        style={{
          border:
            questionFileObject?.fileName === "React" ? "2px solid #57C4DC" : "",
        }}
        onClick={() => handleQuestionFetch("/quizes/react.json", "React")}
      >
        <img width={"24px"} height={"24px"} src={"/svgs/react_logo.svg"} />
      </IconButtonStyle>

      <IconButtonStyle
        style={{
          border:
            questionFileObject?.fileName === "JavaScript"
              ? "2px solid #57C4DC"
              : "",
        }}
        onClick={() =>
          handleQuestionFetch("/quizes/javascript.json", "JavaScript")
        }
      >
        <img width={"24px"} height={"24px"} src={"/svgs/javascript_logo.svg"} />
      </IconButtonStyle>

      <IconButtonStyle
        style={{
          border:
            questionFileObject?.fileName === "Git" ? "2px solid #57C4DC" : "",
        }}
        onClick={() => handleQuestionFetch("/quizes/git.json", "Git")}
      >
        <img width={"24px"} height={"24px"} src={"/svgs/github_logo.svg"} />
      </IconButtonStyle>

      <IconButtonStyle
        style={{
          border:
            questionFileObject?.fileName === "HTLM/CSS"
              ? "2px solid #57C4DC"
              : "",
        }}
        onClick={() => handleQuestionFetch("/quizes/html_css.json", "HTML/CSS")}
        style={{ paddingTop: "14px" }}
      >
        <img width={"21px"} height={"20px"} src={"/svgs/css_logo.svg"} />
      </IconButtonStyle>
    </Flex>
  );
}
