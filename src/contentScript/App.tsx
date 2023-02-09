import React, { useCallback, useEffect, useState } from 'react'
import Browser from 'webextension-polyfill'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslate } from './src/hooks/useTranslate'
import { useSelection } from './src/hooks/useSelection'
import { TMessages } from '../background/types/messages.type'
import { sendMessage } from './src/ruslanHooksAndUtils'

// Just an example of using data from subscribe
const App: React.FC<{}> = () => {
  const [result, setResult] = useState('')
  const { isTranslateLoading, getTranslateText, translateData } = useTranslate()
  const { selection } = useSelection()

  useEffect(() => {
    Browser.storage.onChanged.addListener(
      (changes: { newValue: Record<string, { result: string }> }) => {
        for (let [key, value] of Object.entries(changes)) {
          setResult(value.newValue.result)
        }
      },
    )

    return () => {
      sendMessage(TMessages.SELECTION_DONE)
    }
  }, [])

  const sendMessageThatActionClicked = useCallback(
    (text) => () => {
      sendMessage(TMessages.USER_ACTION_CLICKED, { input: text })
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
        <button onClick={sendMessageThatActionClicked(selection.text)}>
          result : {result}
        </button>
      </div>
    )
  }

  return null
}

export default App
