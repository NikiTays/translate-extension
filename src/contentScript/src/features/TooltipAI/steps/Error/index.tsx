import React from "react";
import { errorMessageComponentsMap } from "./errors";
import { TErrors } from "../../../../../../background/types/error.type";
import { useAIProviderContext } from "../../AIProvider/AIProvider.context";
import { DefaultSpace } from "../../components/DefaultSpace";
import { Typography } from "@mui/material";

export const Error = () => {
  const { error } = useAIProviderContext();
  const ErrorMessageComponent =
    errorMessageComponentsMap[TErrors[error]] ||
    errorMessageComponentsMap[TErrors.UNKNOWN];

  return (
    <DefaultSpace>
      <Typography variant="body2">
        <ErrorMessageComponent />
      </Typography>
    </DefaultSpace>
  );
};
