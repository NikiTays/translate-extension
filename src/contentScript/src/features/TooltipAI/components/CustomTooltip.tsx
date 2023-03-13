import React from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "0",
    margin: "0",
    maxWidth: "333px",
    backdropFilter: "saturate(280%) blur(20px)",
    background: "rgba(29,29,31,0.72)",
    border: "1px solid rgba(57,57,57,0.9)",
  },
}));
