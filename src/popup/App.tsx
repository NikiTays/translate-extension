import React, { useCallback } from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { TSyncMessages } from "../background/types/messages.type";
import { sendMessage } from "../utils/sendMessage";

const App: React.FC<{}> = () => {
  const openSettings = useCallback(() => {
    sendMessage(TSyncMessages.OPEN_OPTIONS_PAGE);
  }, []);

  return (
    <IconButton onClick={openSettings}>
      <SettingsIcon />
    </IconButton>
  );
};

export default App;
