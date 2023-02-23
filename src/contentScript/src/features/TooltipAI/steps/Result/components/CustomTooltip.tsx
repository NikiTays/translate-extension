import React from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    border: `1px solid ${theme.palette.text.disabled}`,
  },
}));
