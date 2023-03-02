import Browser from 'webextension-polyfill'
import { createParser } from '../../../../lib/eventsource-parser/parse'
import { TOnProviderMessage } from '../../../types/providers.type'
import { streamAsyncIterable } from '../../../utils/streamAsyncIterable'

export const getChatGptTurboModel: (options: {
  onMessage: TOnProviderMessage
  prompt: string
}) => Promise<void> = async ({ onMessage, prompt }) => {
  onMessage({ status: 'started' })
  const { providerSettings } = await Browser.storage.sync.get([
    'providerSettings',
  ])

  const token = providerSettings?.chatGpt?.token

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    console.error(response.status)
  }

  const { choices } = await response.json()

  const answerText = choices[0]?.message?.content

  onMessage({
    status: 'done',
    data: { text: answerText },
  })
}
