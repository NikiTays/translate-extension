import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAIProviderContext } from "../../AIProvider/AIProvider.context";
import { TViewState } from "../../../../types/state.type";
import { DefaultSpace } from "../../components/DefaultSpace";

export const Result: FC = () => {
  const { result, setViewState, status } = useAIProviderContext();

  return (
    <DefaultSpace>
      <>
        <Box sx={{ width: "333px" }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              ChatGPT:
            </Typography>
            <Tooltip
              title="Large window"
              onClick={() => setViewState(TViewState.LARGE_RESULT)}
            >
              <IconButton size="small">
                <OpenInFullIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton size="small">
                <RefreshIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copy">
              <IconButton size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
          {status === "DATA_STREAM" ? (
            <LinearProgress color="inherit" sx={{ height: "1px" }} />
          ) : (
            <Divider />
          )}
        </Box>
        <Box sx={{ maxHeight: "222px", overflowY: "scroll", marginTop: "5px" }}>
          <Typography variant="body2">{result}</Typography>
        </Box>
      </>
    </DefaultSpace>
  );
};
