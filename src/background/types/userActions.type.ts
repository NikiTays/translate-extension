import { TProviders } from './providers.type'

type TOptions = Record<string, string | number>

export enum TUserActionTypes {
  INPUT = 'INPUT',
  REQUEST_ANSWER = 'REQUEST_ANSWER',
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
