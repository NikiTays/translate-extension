import Browser from 'webextension-polyfill'
import { providersMap } from '../../providers'

import { TPortMessageHandlerFunction } from '../../types/messages.type'
import { TOnProviderMessage } from '../../types/providers.type'
import { TUserAction } from '../../types/userActions.type'

export const userActionClicked: TPortMessageHandlerFunction = async (
  port,
  data,
) => {
  try {
    const { actionId, input, isNeedToUpdate } = data
    const {
      actions: userActions,
      actionRequests,
    } = await Browser.storage.sync.get(['actions', 'actionRequests'])
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
      const messageData = { status, text: message?.data?.text }
      port.postMessage(messageData)
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
}
