import { TErrors } from '../../../../../background/types/error.type'
import { TUserAction } from '../../../../../background/types/userActions.type'

export type TActionUIProviderApi = {
  actions: TUserAction[]
  isLoading: boolean
  status: string
  result: string
  error: TErrors
  clearState: () => void
  sendMessageThatActionClicked: ({
    text,
    actionId,
    isNeedToUpdate,
  }: {
    text: string
    actionId: number
    isNeedToUpdate: boolean
  }) => Promise<void>
} | null
