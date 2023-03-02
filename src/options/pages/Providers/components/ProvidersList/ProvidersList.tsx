import React, { useCallback, useState } from 'react'
import { TSyncMessages } from '../../../../../background/types/messages.type'
import { sendMessage } from '../../../../../utils/sendMessage'

const ProvidersList: React.FC<{}> = () => {
  const [token, setToken] = useState('')

  const onSaveClick = useCallback(async () => {
    await sendMessage(TSyncMessages.UPDATE_PROVIDER_SETTINGS, { token })
  }, [token])

  return (
    <div>
      <div>
        Your key:{' '}
        <input
          value={token}
          onChange={({ target: { value } }) => setToken(value)}
        />
      </div>
      <button onClick={onSaveClick}>Save</button>
    </div>
  )
}

export default ProvidersList
