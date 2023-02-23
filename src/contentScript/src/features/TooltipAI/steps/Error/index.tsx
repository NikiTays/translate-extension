import React from "react";
import { errorMessageComponentsMap } from "./errors";
import { TErrors } from "../../../../../../background/types/error.type";
import { useStore } from "../../../../store/useStore";

export const Error = () => {
  const error = useStore((state) => state.error);
  const ErrorMessageComponent =
    errorMessageComponentsMap[TErrors[error]] ||
    errorMessageComponentsMap[TErrors.UNKNOWN];

  return <ErrorMessageComponent />;
};
