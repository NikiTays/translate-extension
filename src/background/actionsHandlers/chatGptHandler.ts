import { fetchSyncChatGpt } from '../api/chatGpt.api'
import { TUserActionTypes } from '../types/userActions.type'

export const chatGptHandler = async (
  { type, options }: any,
  { input }: any,
): Promise<string> => {
  let question = ''

  if (type === TUserActionTypes.INPUT) {
    question = input
  }

  if (type === TUserActionTypes.REQUEST_ANSWER) {
    const prompt = options?.prompt

    question = prompt.replace('{{input}}', input)
  }

  if (type === TUserActionTypes.TRANSLATE) {
    const { translateTo } = options

    question = `translate "${input}" to ${translateTo} language`
  }

  const { choices } = await fetchSyncChatGpt(question)

  const result = choices[0]?.text.replace(/(\r\n|\n|\r)/gm, '')

  return result
}
