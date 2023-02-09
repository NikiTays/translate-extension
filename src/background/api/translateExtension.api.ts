export const requestUserActions = async () => {
  try {
    const data = await Promise.resolve({
      actions: [
        {
          id: 1,
          type: 'translate',
          name: 'translate action',
          description: 'translate action description',
          provider: 'chat-gpt',
          options: {
            translateTo: 'ru',
          },
        },
        {
          id: 2,
          type: 'request-answer',
          name: 'prompt action',
          description: 'prompt action description',
          provider: 'chat-gpt',
          options: {
            prompt: 'explain this comand {{input}}',
          },
        },
        {
          id: 2,
          type: 'input',
          name: 'input action',
          description: 'input action description',
          provider: 'chat-gpt',
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
    const data = await Promise.resolve({ name: 'Test user' })

    return data
  } catch (_) {
    throw Error('cannot request user info')
  }
}
