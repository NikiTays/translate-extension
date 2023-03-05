import Browser from 'webextension-polyfill'
import { v4 as uuidv4 } from 'uuid'

import {
  TSyncMessageHandlerFunction,
  TSyncMessages,
  TSyncMessagesData,
} from '../../types/messages.type'
import { TUserAction } from '../../types/userActions.type'

export const addUserAction: TSyncMessageHandlerFunction = async ({
  description,
  type,
  provider,
  options,
  name,
}: TSyncMessagesData[TSyncMessages.ADD_USER_ACTION]) => {
  try {
    const { actions } = await Browser.storage.sync.get(['actions'])

    const newAction: TUserAction = {
      id: uuidv4(),
      description,
      options,
      type,
      provider,
      name,
    }

    actions.push(newAction)

    await Browser.storage.sync.set({ actions })

    return { actions }
  } catch (error) {}
}
