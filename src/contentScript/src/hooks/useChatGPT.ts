import { useCallback, useState } from 'react'
import Browser from 'webextension-polyfill'
import { TMessages } from '../../../background/types/messages.type'

export const useChatGPT = () => {
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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
      setIsLoading(true)

      const port = Browser.runtime.connect()
      const listener = (msg: any) => {
        console.log('===== ', msg)
        if (msg?.text) {
          setResult(msg?.text)
        }
        if (msg.status === 'STARTED') {
          setIsLoading(true)
        }
        if (msg.status === 'DATA_STREAM') {
          setIsLoading(false)
        }
        if (msg.status === 'DONE') {
          setIsLoading(false)
          port.disconnect()
        }
        if (msg.error) {
          setError(msg.error)
          port.disconnect()
        }
      }

      port.onMessage.addListener(listener)
      port.postMessage({
        type: TMessages.USER_ACTION_CLICKED,
        data: {
          input: text,
          actionId,
          isNeedToUpdate,
        },
      })
    },
    [],
  )

  return { sendMessageThatActionClicked, result, isLoading, error }
}
