import React from "react";
import { ListItemIcon, ListItemIconProps } from "@mui/material";

export const CustomListItemIcon: React.FC<ListItemIconProps> = (props) => {
  return (
    <ListItemIcon
      {...props}
      sx={{
        minWidth: "35px",
      }}
    />
  );
};
