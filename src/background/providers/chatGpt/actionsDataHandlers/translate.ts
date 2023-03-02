import { TUserActionDataHandler } from '../../../types/userActions.type'

export const translateAction: TUserActionDataHandler = (
  text,
  { translateTo },
) => `translate "${text}" to ${translateTo.optionValue}`
