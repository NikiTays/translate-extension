import Browser from 'webextension-polyfill'

import { TSyncMessageHandlerFunction } from '../../types/messages.type'

export const openOptionsPage: TSyncMessageHandlerFunction = async () => {
  Browser.runtime.openOptionsPage()
}
