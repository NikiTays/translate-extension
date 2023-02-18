import { TProviderHandler, TProviderOptions } from '../../types/providers.type'
import { actionsDataHandlers } from './actionsDataHandlers'
import { getChatGPTAccessToken } from './api/getChatGPTAccessToken'
import { getChatGptAnswerSSE } from './api/getChatGptAnswerSSE'

export const chatGptProvider: TProviderHandler = async (
  onMessage,
  { clickedAction, input },
) => {
  const token = await getChatGPTAccessToken()

  const prompt = actionsDataHandlers[clickedAction.type](
    input,
    clickedAction.options,
  )

  await getChatGptAnswerSSE({
    token,
    prompt,
    onMessage,
  })
}
