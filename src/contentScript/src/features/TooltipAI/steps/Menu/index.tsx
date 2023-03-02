import {
  Autocomplete,
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
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
import { useAIProviderContext } from "../../AIProvider/AIProvider.context";
import { ContentCut } from "@mui/icons-material";

export const Menu: FC = () => {
  const { sendMessageThatActionClicked } = useAIProviderContext();

  const sendAction = (number: number) => {
    sendMessageThatActionClicked({
      text: getSelectionText(),
      actionId: number,
      isNeedToUpdate: false,
    })();
  };

  return (
    <Stack>
      <Box sx={{ padding: "8px 8px 0 8px" }}>
        <Autocomplete
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
              sx={{
                width: "100%",
              }}
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
      </Box>
      <MenuList dense>
        <MenuItem onClick={() => sendAction(1)}>
          <ListItemIcon>
            <ChatGPTIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Translate with ChatGPT
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => sendAction(4)}>
          <ListItemIcon>
            <TranslateIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Translate with Google
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <MoreHorizIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Others...
          </Typography>
        </MenuItem>
      </MenuList>
    </Stack>
  );
};
