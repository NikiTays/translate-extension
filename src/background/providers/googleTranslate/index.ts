import { TProviderHandler } from '../../types/providers.type'
import { getGoogleTranslate } from './api/getGoogleTranslate'

export const googleTranslateProvider: TProviderHandler = async (
  onMessage,
  { clickedAction, input },
) => {
  const { translateFrom, translateTo } = clickedAction.options

  await getGoogleTranslate({
    translateFrom: translateFrom.optionValue as string,
    translateTo: translateTo.optionValue as string,
    input,
    onMessage,
  })
}
