import { TErrors } from '../../../types/error.type'
import { TOnProviderMessage } from '../../../types/providers.type'

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
  onMessage({ status: 'started' })

  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${translateFrom}&tl=${translateTo}&hl=en-GB&dt=t&dt=bd&dj=1&source=icon&tk=487232.487232&q=${encodeURI(
      input,
    )}`,
  )
  if (!response.ok) {
    throw new Error(TErrors.GOOGLE_PROVIDER_DID_NOT_RESPOND)
  }

  const { sentences } = await response.json()

  let text = ''

  for (let i = 0; i < sentences.length; i++) {
    text += sentences[i].trans
  }

  onMessage({
    status: 'done',
    data: { text: text },
  })
}
