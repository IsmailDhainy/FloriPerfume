import { RefObject, useEffect } from "react";

export const useOutsideClick = (
  onOutsideClick: () => void,
  ...refs: RefObject<HTMLElement | null>[]
) => {
  useEffect(() => {
    // handle click outside
    function handleClickOutside(event: MouseEvent) {
      for (const ref of refs) {
        if (ref.current && ref.current.contains(event.target as Node)) {
          return;
        }
      }
      onOutsideClick();
    }
    // bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, onOutsideClick]);
};
