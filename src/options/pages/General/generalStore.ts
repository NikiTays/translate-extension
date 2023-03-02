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
  generalSettings: TUserAction[]
  getGeneralSettings: () => void
}

export const useGeneralStore = create<TMyActionsStore>((set) => ({
  isLoading: true,
  generalSettings: [],
  getGeneralSettings: async () => {
    // const { actions } = (await sendMessage(
    //   TSyncMessages.GET_USER_ACTIONS,
    // )) as TSyncMessagesReturnData[TSyncMessages.GET_USER_ACTIONS]
    // set({ actions, isLoading: false })
  },
}))
