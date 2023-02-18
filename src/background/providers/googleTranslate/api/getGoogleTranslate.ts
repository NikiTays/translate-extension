import { TOnProviderMessage } from '../../../types/providers.type'

const googleToken = ''

export const getGoogleTranslate: (options: {
  onMessage: TOnProviderMessage
  translateFrom: string
  translateTo: string
  input: string
}) => Promise<void> = async ({
  onMessage,
  translateFrom,
  translateTo,
  input,
}) => {
  try {
    onMessage({ status: 'started' })

    const response = await fetch(
      'https://translation.googleapis.com/language/translate/v2',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${googleToken || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: input,
          source: translateFrom,
          target: translateTo,
          format: 'text',
        }),
      },
    )
    if (!response.ok) {
      throw new Error('Google did not respond.')
    }
    const { data } = await response.json()
    onMessage({
      status: 'done',
      data: { text: data?.translations[0]?.translatedText },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
