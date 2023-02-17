import { TProviderHandler, TProviders } from '../types/providers.type'
import { chatGptProvider } from './chatGpt'
import { googleTranslateProvider } from './googleTranslate'

export const providersMap: Record<TProviders, TProviderHandler> = {
  [TProviders.CHAT_GPT]: chatGptProvider,
  [TProviders.GOOGLE_TRANSLATE]: googleTranslateProvider,
}
