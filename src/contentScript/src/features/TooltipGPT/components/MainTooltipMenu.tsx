import {
  Autocomplete,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CustomListItemButton } from "./CustomListItemButton";
import { CustomListItemIcon } from "./CustomListItemIcon";
import { ChatGPTIcon } from "../../../icons/ChatGPTIcon";
import { CustomListItemText } from "./CustomListItemText";
import TranslateIcon from "@mui/icons-material/Translate";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { FC } from "react";
import { getSelectionText } from "../../../utils/getSelectionText";

interface IOwnProps {
  sendMessageThatActionClicked: any;
}

export const MainTooltipMenu: FC<IOwnProps> = (props) => {
  const { sendMessageThatActionClicked } = props;

  return (
    <Stack onMouseUp={(e) => e.stopPropagation()} spacing="8px">
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
                actionId: 2,
                isNeedToUpdate: false,
              })();
            }}
          >
            <CustomListItemIcon>
              <ChatGPTIcon />
            </CustomListItemIcon>
            <CustomListItemText primary="Send ChatGPT" />
          </CustomListItemButton>
        </ListItem>
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
              <TranslateIcon />
            </CustomListItemIcon>
            <CustomListItemText primary="Translate" />
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
