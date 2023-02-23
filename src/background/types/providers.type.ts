import { TPortMessages, TPortMessagesData } from './messages.type'
import { TUserAction } from './userActions.type'

export enum TProviders {
  CHAT_GPT = 'CHAT_GPT',
  GOOGLE_TRANSLATE = 'GOOGLE_TRANSLATE',
}

export type TProviderOptions = Pick<
  TPortMessagesData[TPortMessages.USER_ACTION_CLICKED],
  'input' | 'isNeedToUpdate'
> & { clickedAction: TUserAction }

export type TProviderHandler = (
  onMessage: TOnProviderMessage,
  options: TProviderOptions,
) => Promise<void>

export type TProviderMessage = {
  status: string
  data?: Record<string, any>
  error?: string
}

export type TOnProviderMessage = (message: TProviderMessage) => void
