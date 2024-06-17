import { useEffect } from "react";

interface UseKeyDownParams {
  key: string;
  handler: (event: KeyboardEvent) => void;
  element: HTMLElement | null;
}

export const useKeydown = ({key, handler, element }: UseKeyDownParams) => {
  useEffect(() => {
    if (!element) {
      // potentially a ref's current is null
      return;
    }

    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    }

    element.addEventListener('keydown', keydownHandler);

    return () => {
      element.removeEventListener('keydown', keydownHandler);
    }
  }, [key, handler, element]);
}
