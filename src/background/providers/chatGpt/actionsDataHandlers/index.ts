import {
  TUserActionDataHandler,
  TUserActionTypes,
} from '../../../types/userActions.type'
import { requestPromptAction } from './requestPromptAnswer'
import { translateAction } from './translate'

export const actionsDataHandlers: Record<
  TUserActionTypes,
  TUserActionDataHandler
> = {
  [TUserActionTypes.REQUEST_PROMPT_ANSWER]: requestPromptAction,
  [TUserActionTypes.TRANSLATE]: translateAction,
}
