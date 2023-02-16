export const requestUserActions = async () => {
  try {
    const data = await Promise.resolve({
      actions: [
        {
          id: 1,
          type: 'TRANSLATE',
          name: 'translate action',
          description: 'translate action description',
          provider: 'CHAT_GPT',
          options: {
            translateTo: 'ru',
          },
        },
        {
          id: 2,
          type: 'REQUEST_PROMPT_ANSWER',
          name: 'prompt action',
          description: 'prompt action description',
          provider: 'CHAT_GPT',
          options: {
            promptTemplate: 'explain this code "{{input}}"',
          },
        },
        {
          id: 3,
          type: 'REQUEST_PROMPT_ANSWER',
          name: 'second prompt action',
          description: 'second prompt action description',
          provider: 'CHAT_GPT',
          options: {
            promptTemplate: 'what is "{{input}}"',
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
