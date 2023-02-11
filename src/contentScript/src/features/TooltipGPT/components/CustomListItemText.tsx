import React from "react";
import { ListItemText, ListItemTextProps } from "@mui/material";

export const CustomListItemText: React.FC<ListItemTextProps> = (props) => {
  return (
    <ListItemText
      {...props}
      primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
    />
  );
};
