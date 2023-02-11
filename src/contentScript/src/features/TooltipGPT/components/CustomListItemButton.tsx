import React from "react";
import { ListItemButton, ListItemButtonProps } from "@mui/material";

export const CustomListItemButton: React.FC<ListItemButtonProps> = (props) => {
  return (
    <ListItemButton
      {...props}
      sx={{
        py: "1px",
        px: "4px",
        "&:hover": {
          borderRadius: "4px",
        },
      }}
    />
  );
};
