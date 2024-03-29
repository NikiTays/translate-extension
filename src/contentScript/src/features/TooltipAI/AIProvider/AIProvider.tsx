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

import AIProviderContext from './AIProvider.context'
import { TViewState } from '../../../types/state.type'
import { sendMessage } from '../../../../../utils/sendMessage'
import { TUserAction } from '../../../../../background/types/userActions.type'
import { useSelection } from '../../../hooks/useSelection'

const AIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { selection } = useSelection()
  const [viewState, setViewState] = useState(TViewState.MENU)
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
  }, [selection?.text])

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
      setViewState(TViewState.LOADING)
      const port = Browser.runtime.connect()
      setCurrentPort(port)

      const listener = (msg: any) => {
        setStatus(msg.status)
        if (msg?.text) {
          setResult(msg?.text)
        }
        if (msg.status === 'STARTED') {
          setViewState(TViewState.LOADING)
        }
        if (msg.status === 'DATA_STREAM') {
          setViewState((viewState) => {
            if (viewState !== TViewState.LARGE_RESULT) {
              return TViewState.DATA_STREAM
            }
            return viewState
          })
        }
        if (msg.status === 'DONE') {
          setViewState((viewState) => {
            if (viewState !== TViewState.LARGE_RESULT) {
              return TViewState.RESULT
            }
            return viewState
          })
          port.disconnect()
        }
        if (msg.error) {
          setViewState(TViewState.ERROR)
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
    setViewState(TViewState.MENU)
    currentPort?.disconnect()
    setCurrentPort(null)
  }, [currentPort])

  const aiProviderApi = useMemo(
    () => ({
      viewState,
      status,
      actions,
      result,
      error,
      sendMessageThatActionClicked,
      setViewState,
      clearState,
    }),
    [actions, viewState, result, error, status, sendMessageThatActionClicked],
  )

  return (
    <AIProviderContext.Provider value={aiProviderApi}>
      {children}
    </AIProviderContext.Provider>
  )
}

export default AIProvider
