import { v4 as uuidv4 } from 'uuid'

export const requestUserActions = async () => {
  try {
    const data = await Promise.resolve({
      actions: [
        {
          id: uuidv4(),
          type: 'TRANSLATE',
          name: 'translate action',
          description: 'translate action description',
          provider: 'CHAT_GPT',
          options: {
            translateTo: {
              optionValue: 'ru',
              optionName: 'Translate to',
              isRequired: true,
            },
          },
        },
        {
          id: uuidv4(),
          type: 'REQUEST_PROMPT_ANSWER',
          name: 'prompt action',
          description: 'prompt action description',
          provider: 'CHAT_GPT',
          options: {
            promptTemplate: {
              optionValue: 'summarize this "{{input}}"',
              optionName: 'Prompt template',
              isRequired: true,
            },
          },
        },
        {
          id: uuidv4(),
          type: 'TRANSLATE',
          name: 'Translate with google',
          description: 'translate with google description',
          provider: 'GOOGLE_TRANSLATE',
          options: {
            translateFrom: {
              optionValue: 'en',
              optionName: 'Translate from',
              isRequired: true,
            },
            translateTo: {
              optionValue: 'ru',
              optionName: 'Translate to',
              isRequired: true,
            },
          },
        },
      ],
    })

    return data
  } catch (_) {
    console.error('cannot request user actions')
  }
}

export const requestUserInfo = async () => {
  try {
    const data = await Promise.resolve({
      name: 'Test user',
      actionRequests: [],
    })

    return data
  } catch (_) {
    console.error('cannot request user info')
  }
}
