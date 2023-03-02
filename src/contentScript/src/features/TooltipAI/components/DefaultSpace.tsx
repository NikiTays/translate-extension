import React, { FC } from "react";
import { Box } from "@mui/material";

interface IOwnProps {
  children: JSX.Element;
}

export const DefaultSpace: FC<IOwnProps> = (props) => {
  const { children } = props;
  return <Box sx={{ padding: "7px", maxWidth: "399px" }}>{children}</Box>;
};
