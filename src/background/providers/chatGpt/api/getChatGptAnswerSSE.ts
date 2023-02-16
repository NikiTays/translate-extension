import { v4 as uuidv4 } from 'uuid'

import { createParser } from '../../../../lib/eventsource-parser/parse'
import { streamAsyncIterable } from '../../../utils/streamAsyncIterable'

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJydWNzdmVsMTU3NUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZ2VvaXBfY291bnRyeSI6IlVTIn0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci1EckpPM0hMSVpHOW5QZlozNmY4RTZsb3QifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEwNDEyNjQ1MDgwOTkyMDAyNzA3IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NjE2NDk1OSwiZXhwIjoxNjc3Mzc0NTU5LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.yfrR_bekpu420nffMowhn5jvCHp43k7zIMOWIUjerFNLvLhzJKJRxNKflZo5mBJ7hZ7_-zx_Cc18oyKrC90oMnQcEzC0DLOc6w3rT81szTyerE3zm1o5h3BLdV4xocApygN1GY6EvmJ-3PtD0d_8nivUB0G6tneLe7JZsHXove6_fmsYfy1f7TgZwrf967x-EvdNvQbi5bHEEp5VdzP_2i6oVdNLi-DYh071f5jp7aBjZ1_UURE_dX8RpvfEdwWrC4qKEJKyVLH08GsDgKnV-6vRCXKlfa-PqmnD1_5d2SUtKIsEs61PmmjwI7xf723eDEiQrBR7m16hUCCmIcRI8Q'

export const getChatGptAnswerSSE = async ({ onMessage, prompt }) => {
  onMessage({ type: 'started' })

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
    console.log('===== error ', resp.status)
  }

  const parser = createParser((event) => {
    if (event.type === 'event') {
      console.log('===== event ', event)

      const message = event.data

      if (message === '[DONE]') {
        onMessage({ type: 'done' })

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
          type: 'answer',
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
