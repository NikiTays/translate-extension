import React, { FC, useCallback } from "react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { sendMessage } from "../../../../utils/sendMessage";
import { TSyncMessages } from "../../../../background/types/messages.type";
import SettingsIcon from "@mui/icons-material/Settings";

interface IOwnProps {
  children: JSX.Element;
}

export const Menu: FC<IOwnProps> = (props) => {
  const { children } = props;

  const openSettings = useCallback(() => {
    sendMessage(TSyncMessages.OPEN_OPTIONS_PAGE);
  }, []);

  return (
    <Box
      width="444px"
      maxWidth="444px"
      minWidth="444px"
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.12);",
        borderRadius: "8px",
        margin: "4px",
        padding: "4px",
      }}
    >
      <Stack direction="column">
        <Box padding="8px">
          <Stack direction="row" alignItems="center">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Tooltip-AI
            </Typography>
            <IconButton onClick={openSettings}>
              <SettingsIcon />
            </IconButton>
          </Stack>
        </Box>
        <Divider />
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};
