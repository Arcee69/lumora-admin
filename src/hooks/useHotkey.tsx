import { useEffect } from "react";

/** Runs `handler` on Ctrl+key / ⌘+key (e.g. useHotkey("k", openSearch)). */
export const useHotkey = (key: string, handler: () => void) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler]);
};
