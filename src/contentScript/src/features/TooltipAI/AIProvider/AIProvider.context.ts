import { createContext, useContext } from 'react'

import { TAIProviderApi } from './types'

const AIProviderContext = createContext<TAIProviderApi | null>(null)

export const useAIProviderContext = (): TAIProviderApi => {
  return useContext(AIProviderContext)
}

export default AIProviderContext
