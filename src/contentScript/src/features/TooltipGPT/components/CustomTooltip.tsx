import { styled } from "@mui/material";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import React from "react";
import { Z_INDEX_MAX_VALUE } from "../../../const/cssMaxValue";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "8px",
    backdropFilter: "blur(4px)",
  },
}));
