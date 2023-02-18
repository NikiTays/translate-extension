import Zoom from '@mui/material/Zoom'
import { CustomTooltip } from './components/CustomTooltip'
import React from 'react'
import { useSelection } from '../../hooks/useSelection'
import { useChatGPT } from '../../hooks/useChatGPT'
import { MainTooltipMenu } from './components/MainTooltipMenu'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Z_INDEX_MAX_VALUE } from '../../const/cssMaxValue'
import { errorMessageComponentsMap } from './components/errors'
import { TErrors } from '../../../../background/types/error.type'

const Logic = () => {
  const {
    sendMessageThatActionClicked,
    result,
    isLoading,
    error,
  } = useChatGPT()

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

  if (error) {
    const ErrorMessageComponent =
      errorMessageComponentsMap[error] ||
      errorMessageComponentsMap[TErrors.UNKNOWN]

    return <ErrorMessageComponent />
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
