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
  getActions: () => Promise<void>
  addAction: (
    data: TSyncMessagesData[TSyncMessages.ADD_USER_ACTION],
  ) => Promise<void>
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
  addAction: async (data) => {
    const { actions } = (await sendMessage(
      TSyncMessages.ADD_USER_ACTION,
      data,
    )) as TSyncMessagesReturnData[TSyncMessages.ADD_USER_ACTION]

    set({ actions })
  },
}))
