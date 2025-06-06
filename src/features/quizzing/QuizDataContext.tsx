import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

export type ListOfAllovedLanguageAbriviations = "hr" | "en";

export type QuestionLanguagePropertyInterface = {
  [K in ListOfAllovedLanguageAbriviations]: {
    topic: string;
    type: QuestionTypeInterface;
  };
};

export interface QuestionObject {
  id: string;
  lang: QuestionLanguagePropertyInterface;
  has_been_drawn: boolean;
}

export interface QuestionInterface {
  fileName: string;
  question_object: QuestionObject[];
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
  randomizeQuestions: () => void;
  setQuestionsInOriginalOrder: () => void;
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
  const [afterInitialCatch, setAfterInitialCatch] = useState<boolean>(false);
  const [hasBeenRandomize, setHasBeenRandomize] = useState<boolean>(false);

  useEffect(() => {
    if (initialCatch) {
      localStorage.setItem(
        "leruni_quiz_object",
        JSON.stringify({
          questionIndex,
          questionFileObject,
          correctAnswers,
          hasBeenRandomize: hasBeenRandomize || false,
        })
      );
    }
  }, [
    questionFileObject,
    questionIndex,
    initialCatch,
    correctAnswers,
    hasBeenRandomize,
  ]);

  useEffect(() => {
    setInitialCatch(true);

    try {
      if (typeof window === "undefined" || !window.localStorage) {
        throw new Error("localStorage is not available.");
      }

      const lsQuestionObjString = localStorage.getItem("leruni_quiz_object");

      if (!lsQuestionObjString) {
        throw new Error("There is no leruni_quiz_object in local storage.");
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

      console.log(lsQuestionObj);
      setHasBeenRandomize(lsQuestionObj.hasBeenRandomize);
      setQuestionFileObject(lsQuestionObj.questionFileObject);
      setQuestionIndex(lsQuestionObj.questionIndex);
      setCorrectAnswers(lsQuestionObj.correctAnswers);
      setAfterInitialCatch(true);
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

  const resetQuizData = useCallback(() => {
    setQuestionFileObject((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        startTime: Date.now(),
        endTime: null,
      };
    });
    setCorrectAnswers(0);
    setQuestionIndex(0);
    setHasBeenRandomize(false);
  }, []);

  const randomizeQuestions = useCallback(() => {
    if (afterInitialCatch) {
      if (hasBeenRandomize) return;

      questionFileObject?.question_object.sort(() => Math.random() - 0.5);
      setHasBeenRandomize(true);
    }
  }, [
    questionFileObject?.question_object,
    hasBeenRandomize,
    afterInitialCatch,
  ]);

  const setQuestionsInOriginalOrder = useCallback(() => {
    questionFileObject?.question_object.sort(
      (a, b) => Number(a.id) - Number(b.id)
    );
  }, [questionFileObject?.question_object]);

  const value = {
    questionFileObject,
    setQuestionFileObject,
    correctAnswers,
    incrementCorrectAnswers,
    resetCorrectAnswers,
    questionIndex,
    setQuestionIndex,
    resetQuizData,
    setQuestionsInOriginalOrder,
    randomizeQuestions,
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
