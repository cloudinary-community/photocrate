import { useEffect } from "react";

interface UseKeyDownParams {
  key: string;
  handler: (event: KeyboardEvent) => void;
  element?: HTMLElement;
}

export const useKeydown = ({key, handler, element }: UseKeyDownParams) => {
  useEffect(() => {
      // setting the default value here so SSR doesn't
      // complain about document being undefined.
      const elementToHandle = element ?? document.body;

      const keydownHandler = (event: KeyboardEvent) => {
        if (event.key === key) {
          handler(event);
        }
      }

    elementToHandle.addEventListener('keydown', keydownHandler);

    return () => {
      elementToHandle.removeEventListener('keydown', keydownHandler);
    }
  }, []);
}
