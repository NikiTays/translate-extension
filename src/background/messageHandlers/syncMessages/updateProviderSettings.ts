import Browser from 'webextension-polyfill'
import { v4 as uuidv4 } from 'uuid'

import {
  TSyncMessageHandlerFunction,
  TSyncMessages,
  TSyncMessagesData,
} from '../../types/messages.type'
import { TUserAction } from '../../types/userActions.type'

export const updateProviderSettings: TSyncMessageHandlerFunction = async ({
  token,
}: TSyncMessagesData[TSyncMessages.UPDATE_PROVIDER_SETTINGS]) => {
  try {
    const { providerSettings } = await Browser.storage.sync.get([
      'providerSettings',
    ])

    providerSettings.chatGpt.token = token

    await Browser.storage.sync.set({ providerSettings })
  } catch (error) {}
}
