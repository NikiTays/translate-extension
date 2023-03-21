import React, { useCallback, useState } from 'react'
import {
  Avatar,
  Card,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useActionUIProviderContext } from './ActionUIProvider/ActionProvider.context'

export const ActionUI = () => {
  const [textFormValue, setTextFormValue] = useState('')
  const {
    sendMessageThatActionClicked,
    actions,
    result,
    isLoading,
  } = useActionUIProviderContext()

  const sendAction = useCallback(
    (actionId: number, text: string) => () => {
      sendMessageThatActionClicked({
        text,
        actionId,
        isNeedToUpdate: false,
      })
    },
    [],
  )

  if (!actions) {
    return null
  }

  return (
    <Stack height="444px">
      <Stack
        margin="0 4px"
        paddingTop="8px"
        paddingBottom="8px"
        flexWrap="wrap"
        direction="row"
        sx={{ flexGrow: 1, overflowY: 'scroll' }}
        gap="8px"
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          result && (
            <Card
              sx={{
                border: '1px solid rgba(255, 255, 255, 0.12);',
                margin: '0',
                padding: '8px',
              }}
            >
              <Chip
                size="small"
                avatar={<Avatar alt="Natacha" />}
                label="Avatar"
                variant="outlined"
                sx={{ marginBottom: '4px' }}
              />
              <Typography>{result}</Typography>
            </Card>
          )
        )}
      </Stack>
      <Divider />
      <Stack gap="8px" margin="8px 4px 4px 4px">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          value={textFormValue}
          onChange={({ target: { value } }) => setTextFormValue(value)}
        />
        <Stack
          direction="row"
          flexWrap="wrap"
          gap="4px"
          maxHeight="80px"
          overflow="scroll"
        >
          {actions.map((action) => (
            <Chip
              onClick={sendAction(action.id, textFormValue)}
              key={`${action.name}-${action.id}`}
              label={action.name}
              size="small"
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
