import Browser from 'webextension-polyfill'

import { TSyncMessageHandlerFunction } from '../../types/messages.type'

export const addUserAction: TSyncMessageHandlerFunction = async (data) => {
  try {
    const { actions } = await Browser.storage.sync.get(['actions'])

    return actions
  } catch (error) {}
}
