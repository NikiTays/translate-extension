import Browser from 'webextension-polyfill'

import {
  TSyncMessageHandlerFunction,
  TSyncMessages,
  TSyncMessagesData,
} from '../../types/messages.type'

export const removeUserAction: TSyncMessageHandlerFunction = async ({
  actionId,
}: TSyncMessagesData[TSyncMessages.REMOVE_USER_ACTIONS]) => {
  try {
    const { actions } = await Browser.storage.sync.get(['actions'])

    const filteredActions = actions.filter(({ id }) => actionId !== id)

    await Browser.storage.sync.set({ actions: filteredActions })

    return { actions: filteredActions }
  } catch (error) {}
}
