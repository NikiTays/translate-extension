import React, { useCallback } from "react";
import { Box, Button, CssBaseline, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { TSyncMessages } from "../background/types/messages.type";
import { sendMessage } from "../utils/sendMessage";

const App: React.FC<{}> = () => {
  const openSettings = useCallback(() => {
    sendMessage(TSyncMessages.OPEN_OPTIONS_PAGE);
  }, []);

  return (
    <React.StrictMode>
      <CssBaseline>
        <Box sx={{ padding: "16px" }}>
          <Button
            onClick={openSettings}
            variant="contained"
            endIcon={<SettingsIcon />}
          >
            Settings
          </Button>
        </Box>
      </CssBaseline>
    </React.StrictMode>
  );
};

export default App;
