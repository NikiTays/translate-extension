import { TProviderHandler } from '../../types/providers.type'
import { getGoogleTranslate } from './api/getGoogleTranslate'

export const googleTranslateProvider: TProviderHandler = async (
  onMessage,
  { clickedAction, input },
) => {
  const { translateFrom, translateTo } = clickedAction.options as {
    translateFrom: string
    translateTo: string
  }

  await getGoogleTranslate({
    translateFrom,
    translateTo,
    input,
    onMessage,
  })
}
