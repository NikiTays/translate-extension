import Browser from 'webextension-polyfill'

import {
  TSyncMessageHandlerFunction,
  TSyncMessages,
  TSyncMessagesData,
} from '../../types/messages.type'
import { TUserAction } from '../../types/userActions.type'

const sortActionsByIds = (
  actions: TUserAction[],
  orderIds: number[],
): TUserAction[] => {
  const map = {}
  actions.forEach((obj) => (map[obj.id] = obj))
  return orderIds.map((id) => map[id])
}

export const sortUserActions: TSyncMessageHandlerFunction = async ({
  actionIds,
}: TSyncMessagesData[TSyncMessages.SORT_USER_ACTIONS]) => {
  try {
    const { actions } = await Browser.storage.sync.get(['actions'])

    const sortedActions = sortActionsByIds(actions, actionIds)

    await Browser.storage.sync.set({ actions: sortedActions })
  } catch (error) {}
}
