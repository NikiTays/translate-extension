import { TMessages, TMessagesData } from './messages.type'
import { TUserAction } from './userActions.type'

export enum TProviders {
  CHAT_GPT = 'CHAT_GPT',
}

export type TProviderOptions = Pick<
  TMessagesData[TMessages.USER_ACTION_CLICKED],
  'input' | 'isNeedToUpdate'
> & { clickedAction: TUserAction }

export type TProviderHandler = (
  onMessage: TOnProviderMessage,
  options: TProviderOptions,
) => Promise<void>

export type TProviderMessage = {
  status: string
  data: string
  error: string
}

export type TOnProviderMessage = (message: TProviderMessage) => void
