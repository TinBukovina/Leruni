import React, { ReactNode, useContext, useEffect, useState } from "react";

export interface QuestionTypeInterface {
  singleAnswer: {
    question: string;
    correctAnswer: string;
    isEnumeratable: false;
    answerItems: string[];
  };
  multipleChoiceAnswer: {
    question: string;
    correctAnswer: string;
    falseAnswers: string[];
  };
}

export interface QuestionLanguagePropertyInterface {
  en: {
    topic: string;
    type: QuestionTypeInterface;
  };
  hr: {
    topic: string;
    type: QuestionTypeInterface;
  };
}

export interface QuestionInterface {
  fileName: string;
  question_object: {
    id: string;
    lang: QuestionLanguagePropertyInterface;
    has_been_drawn: boolean;
  }[];
  startTime?: number | null;
  endTime?: number | null;
}

interface QuizDataContextContextInterface {
  questionFileObject: QuestionInterface | null;
  setQuestionFileObject: React.Dispatch<
    React.SetStateAction<QuestionInterface | null>
  >;
  correctAnswers: number;
  incrementCorrectAnswers: () => void;
  resetCorrectAnswers: () => void;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  resetQuizData: () => void;
}

const QuizDataContext =
  React.createContext<QuizDataContextContextInterface | null>(null);

interface QuizDataProviderProps {
  children: ReactNode;
}

export function QuizDataProvider({ children }: QuizDataProviderProps) {
  const [questionFileObject, setQuestionFileObject] =
    useState<QuestionInterface | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [initialCatch, setInitialCatch] = useState<boolean>(false);

  useEffect(() => {
    if (initialCatch) {
      localStorage.setItem(
        "leruni_quiz_object",
        JSON.stringify({ questionIndex, questionFileObject, correctAnswers })
      );
    }
  }, [questionFileObject, questionIndex, initialCatch, correctAnswers]);

  useEffect(() => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        throw new Error("localStorage is not available.");
      }

      const lsQuestionObjString = localStorage.getItem("leruni_quiz_object");

      if (!lsQuestionObjString) {
        return;
      }

      let lsQuestionObj;
      try {
        lsQuestionObj = JSON.parse(lsQuestionObjString);
      } catch (parseErr) {
        console.log(parseErr);
      }

      if (typeof lsQuestionObj !== "object" || lsQuestionObj === null) {
        return;
      }

      setQuestionFileObject(lsQuestionObj.questionFileObject);
      setQuestionIndex(lsQuestionObj.questionIndex);
      setCorrectAnswers(lsQuestionObj.correctAnswers);
      setInitialCatch(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const incrementCorrectAnswers = () => {
    setCorrectAnswers((prev) => prev + 1);
  };

  const resetCorrectAnswers = () => {
    setCorrectAnswers(0);
  };

  const resetQuizData = () => {
    setCorrectAnswers(0);
    setQuestionIndex(0);
  };

  const value = {
    questionFileObject,
    setQuestionFileObject,
    correctAnswers,
    incrementCorrectAnswers,
    resetCorrectAnswers,
    questionIndex,
    setQuestionIndex,
    resetQuizData,
  };

  return (
    <QuizDataContext.Provider value={value}>
      {children}
    </QuizDataContext.Provider>
  );
}

export const useQuizDataContext = (): QuizDataContextContextInterface => {
  const context = useContext(QuizDataContext);

  if (!context) {
    throw new Error("There was a Error within Quiz data context.");
  }

  return context;
};
