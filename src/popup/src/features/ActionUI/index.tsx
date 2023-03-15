import React from "react";
import {
  Avatar,
  Card,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAIProviderContext } from "../../../../contentScript/src/features/TooltipAI/AIProvider/AIProvider.context";
import { getSelectionText } from "../../../../contentScript/src/utils/getSelectionText";

// 24px

function randomWord(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const length = Math.floor(Math.random() * 10) + 1; // генерируем случайную длину от 1 до 10
  let word = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    word += letters[randomIndex];
  }
  return word;
}

export const ActionUI = () => {
  // const { sendMessageThatActionClicked, actions } = useAIProviderContext();

  // const sendAction = (number: number) => {
  //   sendMessageThatActionClicked({
  //     text: "someText",
  //     actionId: number,
  //     isNeedToUpdate: false,
  //   })();
  // };

  return (
    <Stack height="444px">
      <Stack
        margin="0 4px"
        paddingTop="8px"
        paddingBottom="8px"
        flexWrap="wrap"
        direction="row"
        sx={{ flexGrow: 1, overflowY: "scroll" }}
        gap="8px"
      >
        {[...Array(6)].map((_, index) => (
          <Card
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.12);",
              margin: "0",
              padding: "8px",
            }}
          >
            <Chip
              size="small"
              avatar={<Avatar alt="Natacha" />}
              label="Avatar"
              variant="outlined"
              sx={{ marginBottom: "4px" }}
            />
            <Typography key={index}>
              The Holocaust in Greece was the mass murder of Greek Jews during
              World War II. Prior to the war, some 72,000 to 77,000 Jews lived
              in Greece, around 50,000 of them in Salonica. In April 1941,
              Germany, Italy, and Bulgaria invaded and occupied Greece.
            </Typography>
          </Card>
        ))}
      </Stack>
      <Divider />
      <Stack gap="8px" margin="8px 4px 4px 4px">
        <TextField variant="outlined" size="small" fullWidth />
        <Stack
          direction="row"
          flexWrap="wrap"
          gap="4px"
          maxHeight="80px"
          overflow="scroll"
        >
          {[...Array(30)].map((_, index) => (
            <Chip key={index} label={randomWord()} size="small" />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
