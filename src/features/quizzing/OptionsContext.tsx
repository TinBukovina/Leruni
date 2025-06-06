import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ListOfAllovedLanguageAbriviations } from "./QuizDataContext";

export type ListOfAllowedLanguagesType = "croatian" | "english";
export type ListOfAllowedQuestionOrderType = "default" | "random";
export type ListOfAllowedModeType = "multipleChoiceAnswer" | "inputAnswer";

interface GameOptionsInterface {
  language: ListOfAllowedLanguagesType;
  mode: ListOfAllowedModeType;
  questionOrder: ListOfAllowedQuestionOrderType;
}

interface OptionsContextInterface {
  gameOptions: GameOptionsInterface;
  setGameOptions: React.Dispatch<React.SetStateAction<GameOptionsInterface>>;
  getLanguage: () => ListOfAllovedLanguageAbriviations;
}

const OptionsContext = React.createContext<OptionsContextInterface | null>(
  null
);

interface OptionsProviderProps {
  children: ReactNode;
}

const defaultOptions: GameOptionsInterface = {
  language: "croatian",
  mode: "inputAnswer",
  questionOrder: "default",
};

export function OptionsProvider({ children }: OptionsProviderProps) {
  const [gameOptions, setGameOptions] =
    useState<GameOptionsInterface>(defaultOptions);
  const [initialCatch, setInitialCatch] = useState<boolean>(false);

  useEffect(() => {
    if (initialCatch) {
      localStorage.setItem(
        "leruni_options_object",
        JSON.stringify({ gameOptions })
      );
    }
  }, [gameOptions, initialCatch]);

  useEffect(() => {
    setInitialCatch(true);

    try {
      if (typeof window === "undefined" || !window.localStorage) {
        throw new Error("localStorage is not available.");
      }

      const lsOptionsObjectStrnig = localStorage.getItem(
        "leruni_options_object"
      );

      if (!lsOptionsObjectStrnig) {
        throw new Error("There is no leruni_options_object in local storage.");
      }

      let lsOptionsObject;
      try {
        lsOptionsObject = JSON.parse(lsOptionsObjectStrnig);
      } catch (parseErr) {
        console.log(parseErr);
      }

      if (typeof lsOptionsObject !== "object" || lsOptionsObject === null) {
        return;
      }

      console.log(lsOptionsObject);
      setGameOptions(lsOptionsObject.gameOptions);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getLanguage = (): ListOfAllovedLanguageAbriviations => {
    if (gameOptions.language === "croatian") {
      return "hr";
    }

    return "en";
  };

  const value = {
    gameOptions,
    setGameOptions,
    getLanguage,
  };

  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
}

export const useOptionsContext = (): OptionsContextInterface => {
  const context = useContext(OptionsContext);

  if (!context) {
    throw new Error("There was a Error within options context.");
  }

  return context;
};
