import Browser from 'webextension-polyfill'

import {
  requestUserActions,
  requestUserInfo,
} from './api/translateExtension.api'
import { TMessages, TMessagesData } from './types/messages.type'
import { providersMap } from './providers'
import { TUserAction } from './types/userActions.type'
import { TOnProviderMessage } from './types/providers.type'

const portMessageHandlersMap: Record<
  TMessages,
  (
    port: Browser.Runtime.Port,
    data: TMessagesData[TMessages.USER_ACTION_CLICKED],
  ) => Promise<void>
> = {
  [TMessages.USER_ACTION_CLICKED]: async (port, data) => {
    try {
      const { actionId, input, isNeedToUpdate } = data
      const { actions: userActions } = await Browser.storage.sync.get([
        'actions',
      ])
      const clickedAction: TUserAction = userActions.find(
        ({ id }) => id === actionId,
      )

      const providerHandler = providersMap[clickedAction.provider]

      if (!providerHandler) {
        throw Error('Unknown provider')
      }

      const onMessage: TOnProviderMessage = (message) => {
        let status = ''
        if (message.status === 'started') {
          status = 'STARTED'
        }
        if (message.status === 'done') {
          status = 'DONE'
        }
        if (message.status === 'data-stream') {
          status = 'DATA_STREAM'
        }
        port.postMessage({ status, text: message?.data?.text })
      }

      await providerHandler(onMessage, {
        clickedAction,
        input,
        isNeedToUpdate,
      })
    } catch (error) {
      port.postMessage({
        status: 'DONE',
        error: error.message,
      })
    }
  },
}

const initialData = {}

Browser.runtime.onInstalled.addListener(async () => {
  try {
    const userActions = await requestUserActions()
    const userInfo = await requestUserInfo()

    await Browser.storage.sync.set({
      ...userActions,
      ...userInfo,
      ...initialData,
    })
  } catch (_) {}
})

// Browser.runtime.onMessage.addListener(async ({ type, data }) =>

// export async function getChatGPTAccessToken(): Promise<string> {
//   const resp = await fetch('https://chat.openai.com/api/auth/session')
//   if (resp.status === 403) {
//     throw new Error('CLOUDFLARE')
//   }
//   const data = await resp.json().catch(() => ({}))
//   if (!data.accessToken) {
//     throw new Error('UNAUTHORIZED')
//   }

//   return data.accessToken
// }

Browser.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(
    async ({
      type,
      data,
    }: {
      type: TMessages
      data: TMessagesData[TMessages]
    }) => {
      const portMessageHandler = portMessageHandlersMap[type]

      if (!portMessageHandler) {
        port.postMessage({
          status: 'DONE',
          error: 'Unknown message',
        })
        return
      }

      await portMessageHandler(port, data)
    },
  )
})
