import { TProviderHandler, TProviders } from '../types/providers.type'
import { chatGptProvider } from './chatGpt'

export const providersMap: Record<TProviders, TProviderHandler> = {
  [TProviders.CHAT_GPT]: chatGptProvider,
}
