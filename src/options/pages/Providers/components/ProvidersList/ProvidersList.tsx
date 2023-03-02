import React, { useCallback, useState } from "react";
import { TSyncMessages } from "../../../../../background/types/messages.type";
import { sendMessage } from "../../../../../utils/sendMessage";
import { Button, Grid, Stack, TextField } from "@mui/material";

const ProvidersList: React.FC<{}> = () => {
  const [token, setToken] = useState("");

  const onSaveClick = useCallback(async () => {
    await sendMessage(TSyncMessages.UPDATE_PROVIDER_SETTINGS, { token });
  }, [token]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <TextField
          sx={{ width: "100%" }}
          value={token}
          onChange={({ target: { value } }) => setToken(value)}
          label="Your ChatGPT key"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          sx={{ width: "100%", height: "56px" }}
          variant="contained"
          onClick={onSaveClick}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProvidersList;
