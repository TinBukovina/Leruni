import React, { ReactNode, useContext, useState } from "react";

export interface PopupWindowInterface {
  mainText: string;
  subText?: string;
  onClickYes: () => void;
  onClickNo: () => void;
}

interface PopupWindowContextInterface {
  popupWindowData: PopupWindowInterface[];
  addNewPopupWindow: (popupWindowData: PopupWindowInterface) => void;
  removeLastPopupWindow: () => void;
  displayLoadingWindow: boolean;
  setDisplayLoadingWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupWindowContext =
  React.createContext<PopupWindowContextInterface | null>(null);

interface PopupWindowProviderProps {
  children: ReactNode;
}

export function PopupWindowProvider({ children }: PopupWindowProviderProps) {
  const [popupWindowData, setPopupWindowData] = useState<
    PopupWindowInterface[]
  >([]);
  const [displayLoadingWindow, setDisplayLoadingWindow] =
    useState<boolean>(false);

  const addNewPopupWindow = (popupWindowData: PopupWindowInterface) => {
    setPopupWindowData((prev) => [...prev, popupWindowData]);
  };

  const removeLastPopupWindow = () => {
    setPopupWindowData((prev) => prev.slice(0, -1));
  };

  const value = {
    popupWindowData,
    addNewPopupWindow,
    removeLastPopupWindow,
    displayLoadingWindow,
    setDisplayLoadingWindow,
  };

  return (
    <PopupWindowContext.Provider value={value}>
      {children}
    </PopupWindowContext.Provider>
  );
}

export const usePopupWindowContext = (): PopupWindowContextInterface => {
  const context = useContext(PopupWindowContext);

  if (!context) {
    throw new Error("There was a Error within popup window context.");
  }

  return context;
};
