import {
  TSyncMessageHandlerFunction,
  TSyncMessages,
} from '../../types/messages.type'
import { addUserAction } from './addUserAction'
import { getUserActions } from './getUserActions'
import { openOptionsPage } from './openOptionsPage'

export const syncMessageHandlersMap: Record<
  TSyncMessages,
  TSyncMessageHandlerFunction
> = {
  [TSyncMessages.GET_USER_ACTIONS]: getUserActions,
  [TSyncMessages.ADD_USER_ACTION]: addUserAction,
  [TSyncMessages.OPEN_OPTIONS_PAGE]: openOptionsPage,
}