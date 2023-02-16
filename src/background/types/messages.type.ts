export enum TMessages {
  USER_ACTION_CLICKED = 'USER_ACTION_CLICKED',
}

export type TMessagesData = {
  [TMessages.USER_ACTION_CLICKED]: {
    input: string
    actionId: number
    isNeedToUpdate: boolean
  }
}
