import React, { ReactNode, useContext, useState } from "react";

export interface QuestionInterface {
  fileName: string;
  question_object: {
    id: string;
    topic: string;
    question: string;
    answer: string;
    subQuestions: string[];
    has_been_drawn: boolean;
  };
}

interface QuizDataContextContextInterface {
  questionFileObject: QuestionInterface | null;
  setQuestionFileObject: React.Dispatch<
    React.SetStateAction<QuestionInterface | null>
  >;
}

const QuizDataContext =
  React.createContext<QuizDataContextContextInterface | null>(null);

interface QuizDataProviderProps {
  children: ReactNode;
}

export function QuizDataProvider({ children }: QuizDataProviderProps) {
  const [questionFileObject, setQuestionFileObject] =
    useState<QuestionInterface | null>(null);

  const value = {
    questionFileObject,
    setQuestionFileObject,
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
