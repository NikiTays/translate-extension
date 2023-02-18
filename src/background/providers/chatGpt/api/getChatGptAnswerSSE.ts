import { v4 as uuidv4 } from 'uuid'

import { createParser } from '../../../../lib/eventsource-parser/parse'
import { TOnProviderMessage } from '../../../types/providers.type'
import { streamAsyncIterable } from '../../../utils/streamAsyncIterable'

export const getChatGptAnswerSSE: (options: {
  onMessage: TOnProviderMessage
  prompt: string
  token: string
}) => Promise<void> = async ({ onMessage, prompt, token }) => {
  onMessage({ status: 'started' })

  const controller = new AbortController()

  const resp = await fetch('https://chat.openai.com/backend-api/conversation', {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      action: 'next',
      messages: [
        {
          id: uuidv4(),
          role: 'user',
          content: {
            content_type: 'text',
            parts: [prompt],
          },
        },
      ],
      model: 'text-davinci-002-render',
      parent_message_id: uuidv4(),
    }),
  })

  if (!resp.ok) {
    console.error(resp.status)
  }

  const parser = createParser((event) => {
    if (event.type === 'event') {
      const message = event.data

      if (message === '[DONE]') {
        onMessage({ status: 'done' })

        return
      }
      let data
      try {
        data = JSON.parse(message)
      } catch (err) {
        console.error(err)
        return
      }
      const text = data.message?.content?.parts?.[0]
      if (text) {
        onMessage({
          status: 'data-stream',
          data: {
            text,
            messageId: data.message.id,
            conversationId: data.conversation_id,
          },
        })
      }
    }
  })

  for await (const chunk of streamAsyncIterable(resp.body)) {
    const str = new TextDecoder().decode(chunk)

    parser.feed(str)
  }
}
