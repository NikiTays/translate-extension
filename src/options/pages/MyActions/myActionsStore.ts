import { create } from 'zustand'
import {
  TSyncMessages,
  TSyncMessagesData,
  TSyncMessagesReturnData,
} from '../../../background/types/messages.type'
import { TUserAction } from '../../../background/types/userActions.type'
import { sendMessage } from '../../../utils/sendMessage'

type TMyActionsStore = {
  isLoading: boolean
  actions: TUserAction[]
  getActions: () => void
}

export const useMyActionsStore = create<TMyActionsStore>((set) => ({
  isLoading: true,
  actions: [],
  getActions: async () => {
    const { actions } = (await sendMessage(
      TSyncMessages.GET_USER_ACTIONS,
    )) as TSyncMessagesReturnData[TSyncMessages.GET_USER_ACTIONS]

    set({ actions, isLoading: false })
  },
}))
