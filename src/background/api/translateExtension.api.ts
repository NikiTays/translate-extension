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
          type: 'REQUEST_ANSWER',
          name: 'prompt action',
          description: 'prompt action description',
          provider: 'CHAT_GPT',
          options: {
            prompt: 'explain this code {{input}}',
          },
        },
        {
          id: 3,
          type: 'INPUT',
          name: 'input action',
          description: 'input action description',
          provider: 'CHAT_GPT',
          options: {},
        },
      ],
    })

    return data
  } catch (_) {
    throw Error('cannot request user actions')
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
    throw Error('cannot request user info')
  }
}
