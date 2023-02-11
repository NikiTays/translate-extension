export enum TMessages {
  USER_ACTION_CLICKED = 'USER_ACTION_CLICKED',
  SELECTION_DONE = 'SELECTION_DONE',
}

export type TMessagesData = {
  [TMessages.USER_ACTION_CLICKED]: {
    input: string
    actionId: number
    createdOnUserAt: number
    isNeedToUpdate: boolean
  }
}
