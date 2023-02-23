import { TUserAction } from './userActions.type'

export type TActionRequest = {
  input: string
  timesRequested: number
  //   createdOnUserAt: number
  result: string
  //   isPending: boolean
  //   isDone: boolean
  //   error: string
  //   clickedAction: Pick<TUserAction, 'id' | 'type' | 'provider'>
}
