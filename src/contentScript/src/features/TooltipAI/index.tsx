import React, { FC } from "react";
import { OnSelect } from "./components/OnSelect";
import { TViewState, useStore } from "../../store/useStore";
import { Loading } from "./steps/Loading";
import { Menu } from "./steps/Menu";
import { Result } from "./steps/Result";
import { Error } from "./steps/Error";
import { Box } from "@mui/material";
import { LargeResult } from "./steps/LargeResult";

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
  const viewState = useStore((state) => state.viewState);
  const StepComponent = viewComponents[viewState];

  return (
    <OnSelect>
      <Box sx={{ maxWidth: "333px" }} onMouseUp={(e) => e.stopPropagation()}>
        <StepComponent />
      </Box>
    </OnSelect>
  );
};
