import { TProviders } from './providers.type'

type TOptions = Record<
  string,
  {
    optionValue: string | boolean
  }
>

export enum TUserActionTypes {
  REQUEST_PROMPT_ANSWER = 'REQUEST_PROMPT_ANSWER',
  TRANSLATE = 'TRANSLATE',
}

export type TUserAction = {
  id: number
  type: TUserActionTypes
  name: string
  description: string
  provider: TProviders
  options: TOptions
}

export type TUserActionDataHandler = (
  text: string,
  options: TUserAction['options'],
) => string
