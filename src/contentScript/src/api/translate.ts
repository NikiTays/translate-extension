import { API_URL } from "./index";

export const getTranslate = (text: string): Promise<string> => {
  return fetch(`${API_URL}translate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromLang: "en",
      toLang: "ru",
      text,
    }),
  }).then((res) => res.json());
};
