import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { DefaultSpace } from "../../components/DefaultSpace";

export const Loading = () => {
  return (
    <DefaultSpace>
      <Typography
        variant="body2"
        sx={{
          width: "333px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton sx={{ width: "100%" }} animation="wave" />
        <Skeleton sx={{ width: "100%" }} animation="wave" />
        <Skeleton sx={{ width: "100%" }} animation="wave" />
      </Typography>
    </DefaultSpace>
  );
};
