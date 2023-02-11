import { TProviders } from '../types/providers.type'
import { chatGptHandler } from './chatGptHandler'

export const actionsHandlers: Record<
  string,
  (action: string, data: string) => Promise<string>
> = {
  [TProviders.CHAT_GPT]: chatGptHandler,
}
