import React, { useCallback, useEffect, useState } from 'react'
import Browser from 'webextension-polyfill'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslate } from './src/hooks/useTranslate'
import { useSelection } from './src/hooks/useSelection'
import { TMessages, TMessagesData } from '../background/types/messages.type'
import { sendMessage } from './src/ruslanHooksAndUtils'

// Just an example of using data from subscribe
const App: React.FC<{}> = () => {
  const [result, setResult] = useState('')
  const { selection } = useSelection()

  const sendMessageThatActionClicked = useCallback(
    ({
      text,
      actionId,
      isNeedToUpdate,
    }: {
      text: string
      actionId: number
      isNeedToUpdate: boolean
    }) => async () => {
      const createdOnUserAt = Date.now()

      const data: TMessagesData[TMessages.USER_ACTION_CLICKED] = {
        input: text,
        actionId,
        isNeedToUpdate,
        createdOnUserAt,
      }

      const { result } = await sendMessage(TMessages.USER_ACTION_CLICKED, data)

      setResult(result)
    },
    [],
  )

  if (selection?.text) {
    return (
      <div
        style={{
          transition: 'all .2s linear',
          display: 'block',
          position: 'absolute',
          top: selection.position.top + window.scrollY - 40,
          left: selection.position.left,
          width: selection.position.width,
          height: selection.position.height,
        }}
      >
        <button
          onClick={sendMessageThatActionClicked({
            text: selection.text,
            actionId: 1,
            isNeedToUpdate: false,
          })}
        >
          result : {result}
        </button>
      </div>
    )
  }

  return null
}

export default App
