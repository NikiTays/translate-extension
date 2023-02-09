export const fetchSyncChatGpt = async (
  prompt: string,
): Promise<{ choices: [{ text: string }] }> => {
  const resp = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  })

  if (!resp.ok) {
    // TODO: implement proper error handling
    // const error = await resp.json().catch(() => ({}))
    throw new Error('responce not ok')
  }

  return await resp.json()
}
