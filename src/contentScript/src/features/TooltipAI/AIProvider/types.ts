import { TErrors } from '../../../../../background/types/error.type'
import { TViewState } from '../../../store/useStore'

export type TAIProviderApi = {
  viewState: TViewState
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
