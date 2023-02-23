import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { TViewState, useStore } from "../../../../store/useStore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { CustomTooltip } from "./components/CustomTooltip";
import RefreshIcon from "@mui/icons-material/Refresh";

export const Result: FC = () => {
  const result = useStore((state) => state.result);
  const setViewState = useStore((state) => state.setViewState);

  return (
    <Box sx={{ width: "333px" }}>
      <Box>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            ChatGPT:
          </Typography>
          <CustomTooltip
            title="Large window"
            onClick={() => setViewState(TViewState.LARGE_RESULT)}
          >
            <IconButton size="small">
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Refresh">
            <IconButton size="small">
              <RefreshIcon fontSize="medium" />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Copy">
            <IconButton size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </CustomTooltip>
        </Stack>
        <Divider />
      </Box>
      <Box sx={{ maxHeight: "222px", overflowY: "scroll" }}>
        <Typography variant="body1">{result}</Typography>
      </Box>
    </Box>
  );
};
