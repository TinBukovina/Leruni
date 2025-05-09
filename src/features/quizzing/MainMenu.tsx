import { useState } from "react";
import { Container, Flex } from "../../../styled-system/jsx";
import Button from "../../components/Button";
import { settingSvgInfo } from "../../utils/svgPaths";

import JsonFileUploader from "../fileUploader/JsonFileUploader";
import PredefinedQuizeses from "./PredefinedQuizeses";
import { useQuizDataContext } from "./QuizDataContext";

export default function MainMenu() {
  const { questionFileObject } = useQuizDataContext();
  const [isPredefinedQuizesDisplayed, setIsPredefinedQuizesDisplayed] =
    useState<boolean>(false);

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
              console.log(questionFileObject);
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
