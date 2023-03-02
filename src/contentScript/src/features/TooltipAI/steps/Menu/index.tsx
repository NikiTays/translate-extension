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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { CustomListItemButton } from './components/CustomListItemButton'
import { CustomListItemIcon } from './components/CustomListItemIcon'
import { ChatGPTIcon } from '../../../../icons/ChatGPTIcon'
import { CustomListItemText } from './components/CustomListItemText'
import TranslateIcon from '@mui/icons-material/Translate'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React, { FC } from 'react'
import { getSelectionText } from '../../../../utils/getSelectionText'
import { useAIProviderContext } from '../../AIProvider/AIProvider.context'
import { ContentCut } from '@mui/icons-material'

export const Menu: FC = () => {
  const { sendMessageThatActionClicked, actions } = useAIProviderContext()
  console.log('====== ', actions)
  const sendAction = (number: number) => {
    sendMessageThatActionClicked({
      text: getSelectionText(),
      actionId: number,
      isNeedToUpdate: false,
    })()
  }

  if (!actions?.length) {
    return null
  }

  return (
    <Stack>
      <Box sx={{ padding: '7px 7px 0 7px' }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: 'The Redemption', year: 1994 }]}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Prompts..."
              size="small"
              variant="outlined"
              hiddenLabel
              sx={{
                width: '100%',
                fontSize: '14px !important',
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
        {actions.map(({ id, name }) => (
          <MenuItem key={id} onClick={() => sendAction(id)}>
            <ListItemIcon>
              <ChatGPTIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              {name}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Stack>
  )
}
