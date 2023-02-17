import { TOnProviderMessage } from '../../../types/providers.type'

const googleToken =
  'ya29.c.b0Aaekm1L4WIo4Vr6gLKOq0ogE9YJJbthGryB6o2bMUelZhAW0rcQTUiUtGT5Mp6BEqQfkH984okE7LuuFFpgQn9JPhM16zTWupuReMds5Ww8p_oWo0C9eaYVzykrmH18vQ0X53nTDwN5QLQBSwRYwQbmUf3ae-ls96hDnJr3MrulcD823Dwm949g7N1iU7OdP0YIxCqPg1s-hxMQfoyBuVRb0N6fUTr8H232CSR0jlJxUibuk8wrUVoR0Za6xkymQggoiu-wwa4mW69pJy28dZ2ega0Zbqwe-FZxdnU-SwkO0o-Ft9so1_6OaddidUoXnfFZlf7VIadtWZ313S7qyxu-UoBFnQba45UYkSYd9xYcR5xts2Y_1dVRotZ_S2cgkejz4eRefWu-bM0_1-nIi71wwIrse7Qk8_BqQpfnqv-nBR840f8nR2XvwFU4XOka-WFt2ii8yWMFh4d2Qe8MQX7XkhbYc8WJvROXque0-4iRjhu8Vv2-e43g-fnj1OBnWWa4n29ho3_kwYgU2S07JxJBIf0igf_YbXaWrQ9Vjlf4xXkUYueur9wdma1QIQhi54yXn_7Z913R6ylmMFy_gdspQfvjR8I_a3jtgOjvQ9RrbvB4a6iod_5bYyfhBROQbzZ4jvwJI16oS0X-tiFg-VeMiSX72z6sMzomt2Fjlcm9eVzJgc4vXdkJFh7XX_5wriu0Wj92I92QojZFYlRi9y5ggnpnwI68oW82sk9OFfVpJy0a1-4OwXswOO9fI71nxRexkqIn7bJarxBaY9uYg7kBF7sMQuVR3wZ3a--sckSXaYdxgBqfbjOQ9iybjvhh0Vlkw-wyo_YffklaOcb6Q_YX7Jgo7387xO6psfu7UaiRqd6hh1vbVx6drW3uMS12Onigby6jSZFOYU1uemZkmrzpfxk_jw60Qg8n6-MU9IwprIRSI_xcU92WOpci19Fc6nv06UcoJrUyBSUiem4Iy8qspBB1h8avkvSsWbRjOsuOflIO_i6_4tqg'

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
