import { chatGptHandler } from './chatGptHandler'

export const actionsHandlers: Record<
  string,
  (action: string, data: string) => Promise<string>
> = {
  'chat-gpt': chatGptHandler,
}
