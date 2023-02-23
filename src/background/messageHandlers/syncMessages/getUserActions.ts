import Browser from 'webextension-polyfill'

import { TSyncMessageHandlerFunction } from '../../types/messages.type'

export const getUserActions: TSyncMessageHandlerFunction = async () => {
  try {
    const { actions } = await Browser.storage.sync.get(['actions'])

    return { actions }
  } catch (error) {}
}
