import {
  TPortMessageHandlerFunction,
  TPortMessages,
} from '../../types/messages.type'
import { userActionClicked } from './userActionClicked'

export const portMessageHandlersMap: Record<
  TPortMessages,
  TPortMessageHandlerFunction
> = {
  [TPortMessages.USER_ACTION_CLICKED]: userActionClicked,
}
