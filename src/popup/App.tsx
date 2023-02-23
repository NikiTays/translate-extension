import React, { useCallback } from 'react'
import { TSyncMessages } from '../background/types/messages.type'
import { sendMessage } from '../utils/sendMessage'

const App: React.FC<{}> = () => {
  const openSettings = useCallback(() => {
    sendMessage(TSyncMessages.OPEN_OPTIONS_PAGE)
  }, [])

  return <div onClick={openSettings}>go to settings</div>
}

export default App
