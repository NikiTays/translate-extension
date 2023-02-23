import ExpiryMap from 'expiry-map'

import { TErrors } from '../../../types/error.type'

const KEY_ACCESS_TOKEN = 'accessToken'

const cache = new ExpiryMap(10 * 1000)

export async function getChatGPTAccessToken(): Promise<string> {
  if (cache.get(KEY_ACCESS_TOKEN)) {
    return cache.get(KEY_ACCESS_TOKEN)
  }
  const resp = await fetch('https://chat.openai.com/api/auth/session')
  if (resp.status === 403) {
    throw new Error(TErrors.CLOUDFLARE)
  }
  const data = await resp.json().catch(() => ({}))
  if (!data.accessToken) {
    throw new Error(TErrors.UNAUTHORIZED)
  }
  cache.set(KEY_ACCESS_TOKEN, data.accessToken)
  return data.accessToken
}
