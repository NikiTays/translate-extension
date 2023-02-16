import Zoom from '@mui/material/Zoom'
import { CustomTooltip } from './components/CustomTooltip'
import React from 'react'
import { useSelection } from '../../hooks/useSelection'
import { MainTooltipResult } from './components/MainTooltipResult'
import { useChatGPT } from '../../hooks/useChatGPT'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import { MainTooltipMenu } from './components/MainTooltipMenu'
import { Box, CircularProgress, Typography } from '@mui/material'
import { getSelectionText } from '../../utils/getSelectionText'

const Logic = () => {
  const { sendMessageThatActionClicked, result, isLoading } = useChatGPT()

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (result) {
    return <Typography variant="body1">{result}</Typography>
  }

  return (
    <MainTooltipMenu
      sendMessageThatActionClicked={sendMessageThatActionClicked}
    />
  )
}

export const TooltipGPT = () => {
  const { selection } = useSelection()

  if (selection?.text.length > 1) {
    return (
      <CustomTooltip
        title={
          <div style={{ minWidth: '200px' }}>
            <Logic />
          </div>
        }
        TransitionComponent={Zoom}
        open
        arrow
      >
        <div
          style={{
            width: 0,
            height: selection.position.height,
            top: selection.position.top + window.scrollY,
            left:
              selection.position.left +
              selection.position.width / 2 +
              window.scrollX,
            position: 'absolute',
          }}
        />
      </CustomTooltip>
    )
  }

  return null
}
