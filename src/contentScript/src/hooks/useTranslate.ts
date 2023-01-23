import { useState } from "react";
import { getTranslate } from "../api/translate";

export const useTranslate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | undefined>(undefined);

  const getTranslateText = (text: string) => {
    setIsLoading(true);
    return getTranslate(text)
      .then((res) => setData(res))
      .finally(() => setIsLoading(false));
  };

  return {
    isTranslateLoading: isLoading,
    getTranslateText,
    translateData: data,
  };
};
