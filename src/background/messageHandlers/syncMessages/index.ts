import {
  TSyncMessageHandlerFunction,
  TSyncMessages,
} from '../../types/messages.type'
import { addUserAction } from './addUserAction'
import { getUserActions } from './getUserActions'
import { openOptionsPage } from './openOptionsPage'
import { removeUserAction } from './removeUserAction'
import { sortUserActions } from './sortUserActions'
import { updateProviderSettings } from './updateProviderSettings'

export const syncMessageHandlersMap: Record<
  TSyncMessages,
  TSyncMessageHandlerFunction
> = {
  [TSyncMessages.GET_USER_ACTIONS]: getUserActions,
  [TSyncMessages.ADD_USER_ACTION]: addUserAction,
  [TSyncMessages.OPEN_OPTIONS_PAGE]: openOptionsPage,
  [TSyncMessages.UPDATE_PROVIDER_SETTINGS]: updateProviderSettings,
  [TSyncMessages.SORT_USER_ACTIONS]: sortUserActions,
  [TSyncMessages.REMOVE_USER_ACTIONS]: removeUserAction,
}
