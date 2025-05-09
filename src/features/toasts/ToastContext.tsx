// ToastContext.tsx
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToastStatus } from "./Toast";

interface ToastContextType {
  toasts: ToastInterface[];
  addNewToast: (message: string, type: ToastStatus, duration?: number) => void;
  handleToastComplete: (id: number) => void;
  startDisplayingToasts: () => void;
  displayToastsSignal: boolean;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addNewToast: () => {},
  handleToastComplete: () => {},
  startDisplayingToasts: () => {},
  displayToastsSignal: false,
});

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastInterface {
  id: number;
  message: string;
  type: ToastStatus;
  isActive?: boolean;
  duration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);
  const [displayToastsSignal] = useState<boolean>(false);
  const [activeToastId, setActiveToastId] = useState<number | null>(null);

  const TOAST_DURATION = 5;
  const BUFFER_TIME = 1000;

  const toastIdCounterRef = useRef<number>(0);
  const messageHistoryRef = useRef(new Map<string, number>());

  const addNewToast = useCallback(
    (message: string, type: ToastStatus, duration: number = TOAST_DURATION) => {
      const now = Date.now();

      const lastShown = messageHistoryRef.current.get(message);
      if (lastShown && now - lastShown < duration * 1000 + BUFFER_TIME) {
        /*  console.log(
        `[ADD TOAST BLOCKED] Message shown recently: "${message}", ${(now - lastShown) / 1000}s ago`
      ); */
        return;
      }

      messageHistoryRef.current.set(message, now);

      setToasts((prevToasts) => {
        if (prevToasts.some((toast) => toast.message === message)) {
          return prevToasts;
        }

        const newToastId = toastIdCounterRef.current++;

        return [
          ...prevToasts,
          {
            id: newToastId,
            message,
            type,
            isActive: prevToasts.length === 0,
            duration,
          },
        ];
      });

      setTimeout(
        () => {
          const cleanupTime = Date.now();
          for (const [msg, timestamp] of messageHistoryRef.current.entries()) {
            if (cleanupTime - timestamp > duration + BUFFER_TIME) {
              messageHistoryRef.current.delete(msg);
              //console.log(`[CLEANUP] Removed old message: "${msg}"`);
            }
          }
        },
        duration * 100 + BUFFER_TIME + 50
      );
    },
    []
  );

  // 2.
  const handleToastComplete = useCallback((id: number) => {
    setToasts((prevToasts) => {
      const updatedToasts = prevToasts.filter((toast) => toast.id !== id);

      if (updatedToasts.length > 0) {
        return updatedToasts.map((toast, index) => ({
          ...toast,
          isActive: index === 0,
        }));
      }

      setActiveToastId(null);
      return updatedToasts;
    });
  }, []);

  const startDisplayingToasts = useCallback(() => {
    /* setDisplayToastsSignal(true);

    setToasts((prevToasts) => {
      if (prevToasts.length > 0) {
        setActiveToastId(prevToasts[0].id);
        return prevToasts.map((toast, index) => ({
          ...toast,
          isActive: index === 0,
        }));
      }
      return prevToasts;
    }); */
  }, []);

  useEffect(() => {
    /* if (activeToastId === null && toasts.length > 0 && displayToastsSignal) {
      setActiveToastId(toasts[0].id);
      setToasts((prevToasts) =>
        prevToasts.map((toast, index) => ({
          ...toast,
          isActive: index === 0,
        }))
      );
    } */
  }, [activeToastId, toasts, displayToastsSignal]);

  const contextValue: ToastContextType = {
    toasts,
    addNewToast,
    handleToastComplete,
    startDisplayingToasts,
    displayToastsSignal,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "There was an error while running useToast, ToastContext.tsx"
    );
  }

  return context;
};
