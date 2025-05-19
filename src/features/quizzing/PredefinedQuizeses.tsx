import { css } from "../../../styled-system/css";
import { Flex, styled } from "../../../styled-system/jsx";
import { useWindowWidth } from "../../customHooks/useWindowWidth";
import { usePopupWindowContext } from "../popupWindow/PopupWindowContext";
import { useQuizDataContext } from "./QuizDataContext";

const IconButtonStyle = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "0.75rem",
    height: "fit-content",
    minW: "54px",
    minH: "54px",

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
  const windowWidth = useWindowWidth();

  const { setQuestionFileObject, questionFileObject } = useQuizDataContext();
  const { setDisplayLoadingWindow } = usePopupWindowContext();

  const handleQuestionFetch = (questionUrl: string, fileName: string) => {
    setDisplayLoadingWindow(true);
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
      })
      .finally(() => {
        setDisplayLoadingWindow(false);
      });
  };

  return (
    <Flex
      position={windowWidth > 600 ? "absolute" : ""}
      left={"calc(-32px - 4rem)"}
      direction={windowWidth > 600 ? "column" : "row"}
      justifyContent={windowWidth > 600 ? "start" : "center"}
      gap={"1rem"}
      bg={"surface.s1"}
      p={"0.5rem"}
      w={windowWidth > 600 ? "fit-content" : "100%"}
      maxW={"360px"}
      height={windowWidth > 600 ? "386px" : "fit-content"}
      borderRadius={"md"}
      overflow={"auto"}
      zIndex={"1"}
      className={css({
        // WebKit stilovi
        "&::-webkit-scrollbar": {
          height: "4px", // Pokušajte ponovno s ovim
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "primaryClr", // Koristite Panda token ako je moguće, npr. token(colors.primaryClr)
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-button": {
          display: "none",
        },
      })}
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
          paddingTop: "14px",
          border:
            questionFileObject?.fileName === "HTML/CSS"
              ? "2px solid #57C4DC"
              : "",
        }}
        onClick={() => handleQuestionFetch("/quizes/html_css.json", "HTML/CSS")}
      >
        <img width={"21px"} height={"20px"} src={"/svgs/css_logo.svg"} />
      </IconButtonStyle>
    </Flex>
  );
}
