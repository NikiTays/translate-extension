import { fetchSyncChatGpt } from '../api/chatGpt.api'

export const chatGptHandler = async (
  { type, options }: any,
  { input }: any,
): Promise<string> => {
  let question = ''

  if (type === 'input') {
    question = input
  }

  if (type === 'request-answer') {
    const prompt = options?.prompt

    question = prompt.replace('{{input}}', input)
  }

  if (type === 'translate') {
    const { translateTo } = options

    question = `translate "${input}" to ${translateTo} language`
  }

  const { choices } = await fetchSyncChatGpt(question)

  const result = choices[0]?.text.replace(/(\r\n|\n|\r)/gm, '')

  return result
}
