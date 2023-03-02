import React from "react";
import { ContentCut } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";

export const menuData = [
  {
    link: "/",
    name: "General",
    icon: <SettingsIcon fontSize="small" />,
  },
  {
    link: "/my-actions",
    name: "My Actions",
    icon: <ListIcon fontSize="small" />,
  },
  {
    link: "/providers",
    name: "Providers",
    icon: <FilterDramaIcon fontSize="small" />,
  },
];
