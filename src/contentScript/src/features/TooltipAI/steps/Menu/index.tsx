import {
  Autocomplete,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CustomListItemButton } from "./components/CustomListItemButton";
import { CustomListItemIcon } from "./components/CustomListItemIcon";
import { ChatGPTIcon } from "../../../../icons/ChatGPTIcon";
import { CustomListItemText } from "./components/CustomListItemText";
import TranslateIcon from "@mui/icons-material/Translate";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { FC } from "react";
import { getSelectionText } from "../../../../utils/getSelectionText";
import { useChatGPT } from "../../../../hooks/useChatGPT";

export const Menu: FC = () => {
  const { sendMessageThatActionClicked } = useChatGPT();

  return (
    <Stack spacing="8px">
      <Autocomplete
        sx={{ width: "100%" }}
        disablePortal
        id="combo-box-demo"
        options={[{ label: "The Redemption", year: 1994 }]}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Prompts..."
            size="small"
            variant="outlined"
            hiddenLabel
            sx={{ fontSize: 14, fontWeight: "medium", width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <List disablePadding>
        <ListItem sx={{ padding: "1px 0" }}>
          <CustomListItemButton
            onClick={() => {
              console.log("start");
              sendMessageThatActionClicked({
                text: getSelectionText(),
                actionId: 1,
                isNeedToUpdate: false,
              })();
            }}
          >
            <CustomListItemIcon>
              <ChatGPTIcon />
            </CustomListItemIcon>
            <CustomListItemText primary="Translate with chat gpt" />
          </CustomListItemButton>
        </ListItem>
        <ListItem sx={{ padding: "1px 0" }}>
          <CustomListItemButton
            onClick={() => {
              console.log("start");
              sendMessageThatActionClicked({
                text: getSelectionText(),
                actionId: 4,
                isNeedToUpdate: false,
              })();
            }}
          >
            <CustomListItemIcon>
              <TranslateIcon />
            </CustomListItemIcon>
            <CustomListItemText primary="Translate with google" />
          </CustomListItemButton>
        </ListItem>
        <ListItem sx={{ padding: "1px 0" }}>
          <CustomListItemButton>
            <CustomListItemIcon>
              <MoreHorizIcon />
            </CustomListItemIcon>
            <CustomListItemText primary="Others..." />
          </CustomListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
};
