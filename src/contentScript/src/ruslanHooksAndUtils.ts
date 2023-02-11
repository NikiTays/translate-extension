import Browser from 'webextension-polyfill'
import { TActionRequest } from '../../background/types/actionRequest.type'

import { TMessages } from '../../background/types/messages.type'

export const sendMessage = (
  messageType: TMessages,
  data?: Record<string, string | number | boolean>,
): TActionRequest => {
  return Browser.runtime.sendMessage({ type: messageType, data })
}
