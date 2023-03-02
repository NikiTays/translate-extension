import Browser from 'webextension-polyfill'
import { TErrors } from './error.type'
import { TUserAction } from './userActions.type'

export enum TPortMessages {
  USER_ACTION_CLICKED = 'USER_ACTION_CLICKED',
}

export type TPortMessagesData = {
  [TPortMessages.USER_ACTION_CLICKED]: {
    input: string
    actionId: number
    isNeedToUpdate: boolean
  }
}

export type TPortMessageHandlerFunction = (
  port: Browser.Runtime.Port,
  data: TPortMessagesData[TPortMessages],
) => Promise<void>

export enum TSyncMessages {
  GET_USER_ACTIONS = 'GET_USER_ACTIONS',
  ADD_USER_ACTION = 'ADD_USER_ACTION',
  OPEN_OPTIONS_PAGE = 'OPEN_OPTIONS_PAGE',
  UPDATE_PROVIDER_SETTINGS = 'UPDATE_PROVIDER_SETTINGS',
}

export type TSyncMessagesData = {
  [TSyncMessages.GET_USER_ACTIONS]: null
  [TSyncMessages.ADD_USER_ACTION]: Pick<
    TUserAction,
    'description' | 'name' | 'options' | 'provider' | 'type'
  >
  [TSyncMessages.OPEN_OPTIONS_PAGE]: null
  [TSyncMessages.UPDATE_PROVIDER_SETTINGS]: { token: string }
}

export type TSyncMessagesReturnData = {
  [TSyncMessages.GET_USER_ACTIONS]: {
    actions: TUserAction[]
    error?: TErrors
  }
  [TSyncMessages.ADD_USER_ACTION]: {
    actions: TUserAction[]
    error?: TErrors
  }
  [TSyncMessages.OPEN_OPTIONS_PAGE]: void
  [TSyncMessages.UPDATE_PROVIDER_SETTINGS]: void
}

export type TSyncMessageHandlerFunction = (
  data: TSyncMessagesData[TSyncMessages],
) => Promise<TSyncMessagesReturnData[TSyncMessages]>
