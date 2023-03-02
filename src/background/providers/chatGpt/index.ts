import { TProviderHandler, TProviderOptions } from '../../types/providers.type'
import { actionsDataHandlers } from './actionsDataHandlers'
import { getChatGPTAccessToken } from './api/getChatGPTAccessToken'
import { getChatGptAnswer } from './api/getChatGptAnswer'
import { getChatGptAnswerSSE } from './api/getChatGptAnswerSSE'

export const chatGptProvider: TProviderHandler = async (
  onMessage,
  { clickedAction, input },
) => {
  const { options } = clickedAction

  const prompt = actionsDataHandlers[clickedAction.type](input, options)

  await getChatGptAnswer({
    providerOptions: options.providerOptions,
    prompt,
    onMessage,
  })
}
