import { useEffect, useState } from "react";

interface SectionInfo {
  text: string;
  position: DOMRect;
}

export const useSelection = () => {
  const [selection, setSelection] = useState<SectionInfo | undefined>(
    undefined
  );

  const saveSelection = () => {
    const windowSelection = window.getSelection();
    const rangeAt = windowSelection.getRangeAt(0);

    const selectionString = windowSelection.toString();
    const boundingClientRect = rangeAt.getBoundingClientRect();

    setSelection({
      text: selectionString,
      position: boundingClientRect,
    });
  };

  useEffect(() => {
    document.addEventListener("mouseup", saveSelection);
    document.addEventListener("onselectionchange", saveSelection);

    return () => {
      document.removeEventListener("mouseup", saveSelection);
      document.removeEventListener("onselectionchange", saveSelection);
    };
  }, []);

  return { selection };
};
