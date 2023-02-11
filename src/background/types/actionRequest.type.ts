import { TUserAction } from './userActions.type'

export type TActionRequest = {
  createdOnUserAt: number
  result: string
  isPending: boolean
  isDone: boolean
  error: string
  clickedAction: Pick<TUserAction, 'id' | 'type' | 'provider'>
}
