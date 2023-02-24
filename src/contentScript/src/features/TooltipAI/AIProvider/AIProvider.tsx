import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  FC,
  ReactNode,
} from 'react'
import Browser from 'webextension-polyfill'
import { TErrors } from '../../../../../background/types/error.type'
import { TPortMessages } from '../../../../../background/types/messages.type'
import { TViewState } from '../../../store/useStore'

import AIProviderContext from './AIProvider.context'

const AIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [viewState, setViewState] = useState(TViewState.MENU)
  const [result, setResult] = useState('')
  const [error, setError] = useState<TErrors>()
  const [currentPort, setCurrentPort] = useState<Browser.Runtime.Port>()

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
      setViewState(TViewState.LOADING)
      const port = Browser.runtime.connect()
      setCurrentPort(port)

      const listener = (msg: any) => {
        console.log('===== msg ', msg)
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
      result,
      error,
      sendMessageThatActionClicked,
      setViewState,
      clearState,
    }),
    [viewState, result, error, sendMessageThatActionClicked],
  )

  return (
    <AIProviderContext.Provider value={aiProviderApi}>
      {children}
    </AIProviderContext.Provider>
  )
}

export default AIProvider
