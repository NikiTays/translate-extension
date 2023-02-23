import Browser from 'webextension-polyfill'

import {
  requestUserActions,
  requestUserInfo,
} from './api/translateExtension.api'
import { portMessageHandlersMap } from './messageHandlers/portMessages'
import { syncMessageHandlersMap } from './messageHandlers/syncMessages'
import { TErrors } from './types/error.type'
import {
  TPortMessages,
  TPortMessagesData,
  TSyncMessages,
  TSyncMessagesData,
} from './types/messages.type'

const initialData = {
  actionRequest: [],
}

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

Browser.runtime.onMessage.addListener(
  async ({
    type,
    data,
  }: {
    type: TSyncMessages
    data: TSyncMessagesData[TSyncMessages]
  }) => {
    const syncMessageHandler = syncMessageHandlersMap[type]

    if (!syncMessageHandler) {
      return ''
    }

    return await syncMessageHandler(data)
  },
)

Browser.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(
    async ({
      type,
      data,
    }: {
      type: TPortMessages
      data: TPortMessagesData[TPortMessages]
    }) => {
      const portMessageHandler = portMessageHandlersMap[type]

      if (!portMessageHandler) {
        port.postMessage({
          status: 'DONE',
          error: TErrors.UNKNOWN_PORT_MESSAGE,
        })
        return
      }

      await portMessageHandler(port, data)
    },
  )
})
