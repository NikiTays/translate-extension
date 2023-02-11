import { TActionRequest } from './actionRequest.type'
import { TUserAction } from './userActions.type'

export type TBrowserStorage = {
  name: string
  actions: TUserAction[]
  actionRequests: TActionRequest[]
}
