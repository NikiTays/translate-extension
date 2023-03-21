import React, {
  useCallback,
  useState,
  useMemo,
  FC,
  ReactNode,
  useEffect,
} from 'react'
import Browser from 'webextension-polyfill'
import { TErrors } from '../../../../../background/types/error.type'
import {
  TPortMessages,
  TSyncMessages,
  TSyncMessagesReturnData,
} from '../../../../../background/types/messages.type'

import ActionUIProviderContext from './ActionProvider.context'
import { sendMessage } from '../../../../../utils/sendMessage'
import { TUserAction } from '../../../../../background/types/userActions.type'
import { TViewState } from '../../../../../contentScript/src/types/state.type'

const ActionUIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [result, setResult] = useState('')
  const [error, setError] = useState<TErrors>()
  const [status, setStatus] = useState<string>('')
  const [currentPort, setCurrentPort] = useState<Browser.Runtime.Port>()
  const [actions, setActions] = useState<TUserAction[]>()

  useEffect(() => {
    sendMessage(
      TSyncMessages.GET_USER_ACTIONS,
    ).then(
      ({ actions }: TSyncMessagesReturnData[TSyncMessages.GET_USER_ACTIONS]) =>
        setActions(actions),
    )
  }, [])

  const sendMessageThatActionClicked = useCallback(
    async ({
      text,
      actionId,
      isNeedToUpdate,
    }: {
      text: string
      actionId: number
      isNeedToUpdate: boolean
    }) => {
      setIsLoading(true)
      const port = Browser.runtime.connect()
      setCurrentPort(port)

      const listener = (msg: any) => {
        setStatus(msg.status)
        if (msg?.text) {
          setResult(msg?.text)
        }
        if (msg.status === 'STARTED') {
          setIsLoading(true)
        }
        if (msg.status === 'DATA_STREAM') {
        }
        if (msg.status === 'DONE') {
          setIsLoading(false)
          port.disconnect()
        }
        if (msg.error) {
          setIsLoading(false)
          setError(msg.error)
          port.disconnect()
        }
      }

      port.onMessage.addListener(listener)
      port.postMessage({
        type: TPortMessages.USER_ACTION_CLICKED,
        data: {
          input: text,
          actionId,
          isNeedToUpdate,
        },
      })
    },
    [],
  )

  const clearState = useCallback(() => {
    setError(null)
    setResult('')
    setIsLoading(false)
    currentPort?.disconnect()
    setCurrentPort(null)
  }, [currentPort])

  const actionUIProviderApi = useMemo(
    () => ({
      isLoading,
      status,
      actions,
      result,
      error,
      sendMessageThatActionClicked,
      clearState,
    }),
    [actions, result, error, isLoading, status, sendMessageThatActionClicked],
  )

  return (
    <ActionUIProviderContext.Provider value={actionUIProviderApi}>
      {children}
    </ActionUIProviderContext.Provider>
  )
}

export default ActionUIProvider
