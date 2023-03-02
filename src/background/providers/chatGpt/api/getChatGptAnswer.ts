import { TOnProviderMessage } from '../../../types/providers.type'
import { getChatGptAnswerSSE } from './getChatGptAnswerSSE'
import { getChatGptTurboModel } from './getChatGptTurboModel'

export const getChatGptAnswer: (options: {
  onMessage: TOnProviderMessage
  prompt: string
  providerOptions: Record<string, string | boolean>
}) => Promise<void> = async ({ onMessage, prompt, providerOptions }) => {
  if (providerOptions?.model === 'gpt-3.5-turbo') {
    await getChatGptTurboModel({ onMessage, prompt })
    return
  }

  await getChatGptAnswerSSE({ onMessage, prompt })
}
