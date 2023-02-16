import { TProviderHandler, TProviderOptions } from '../../types/providers.type'
import { actionsDataHandlers } from './actionsDataHandlers'
import { getChatGptAnswerSSE } from './api/getChatGptAnswerSSE'

export const chatGptProvider: TProviderHandler = async (
  onMessage,
  { clickedAction, input },
) => {
  const prompt = actionsDataHandlers[clickedAction.type](
    input,
    clickedAction.options,
  )

  await getChatGptAnswerSSE({
    prompt,
    onMessage,
  })
}
