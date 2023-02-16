export async function* streamAsyncIterable(stream) {
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()

      console.log('===== value ', value)

      if (done) {
        return
      }
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}
