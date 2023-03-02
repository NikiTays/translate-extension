import { TErrors } from '../../../../../background/types/error.type'
import { TUserAction } from '../../../../../background/types/userActions.type'
import { TViewState } from '../../../types/state.type'

export type TAIProviderApi = {
  viewState: TViewState
  actions: TUserAction[]
  status: string
  result: string
  error: TErrors
  clearState: () => void
  setViewState: (TViewState) => void
  sendMessageThatActionClicked: ({
    text,
    actionId,
    isNeedToUpdate,
  }: {
    text: string
    actionId: number
    isNeedToUpdate: boolean
  }) => () => Promise<void>
} | null
