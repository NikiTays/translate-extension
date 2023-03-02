import React, { FC } from "react";
import { OnSelect } from "./components/OnSelect";
import { Loading } from "./steps/Loading";
import { Menu } from "./steps/Menu";
import { Result } from "./steps/Result";
import { Error } from "./steps/Error";
import { Box } from "@mui/material";
import { LargeResult } from "./steps/LargeResult";
import { useAIProviderContext } from "./AIProvider/AIProvider.context";
import { TViewState } from "../../types/state.type";

type TViewComponents = Record<TViewState, FC>;

const viewComponents: TViewComponents = {
  [TViewState.MENU]: Menu,
  [TViewState.DATA_STREAM]: Result,
  [TViewState.RESULT]: Result,
  [TViewState.LOADING]: Loading,
  [TViewState.ERROR]: Error,
  [TViewState.LARGE_RESULT]: LargeResult,
};
export const TooltipAI = () => {
  const { viewState } = useAIProviderContext();
  const StepComponent = viewComponents[viewState];

  return (
    <OnSelect>
      <Box onMouseUp={(e) => e.stopPropagation()}>
        <StepComponent />
      </Box>
    </OnSelect>
  );
};
