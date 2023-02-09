import Browser from 'webextension-polyfill'

import { TMessages } from '../../background/types/messages.type'

export const sendMessage = (
  messageType: TMessages,
  data?: Record<string, string>,
) => {
  Browser.runtime.sendMessage({ type: messageType, data })
}
