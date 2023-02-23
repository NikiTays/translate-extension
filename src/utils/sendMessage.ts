import Browser from 'webextension-polyfill'
import {
  TSyncMessages,
  TSyncMessagesData,
  TSyncMessagesReturnData,
} from '../background/types/messages.type'

export const sendMessage = async (
  messageType: TSyncMessages,
  data?: TSyncMessagesData[TSyncMessages],
): Promise<TSyncMessagesReturnData[TSyncMessages]> => {
  return await Browser.runtime.sendMessage({ type: messageType, data })
}
