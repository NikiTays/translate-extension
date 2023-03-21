import { createContext, useContext } from 'react'

import { TActionUIProviderApi } from './types'

const ActionUIProviderContext = createContext<TActionUIProviderApi | null>(null)

export const useActionUIProviderContext = (): TActionUIProviderApi => {
  return useContext(ActionUIProviderContext)
}

export default ActionUIProviderContext
