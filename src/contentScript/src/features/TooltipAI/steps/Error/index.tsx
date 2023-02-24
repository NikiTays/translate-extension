import React from 'react'
import { errorMessageComponentsMap } from './errors'
import { TErrors } from '../../../../../../background/types/error.type'
import { useStore } from '../../../../store/useStore'
import { useAIProviderContext } from '../../AIProvider/AIProvider.context'

export const Error = () => {
  const { error } = useAIProviderContext()
  const ErrorMessageComponent =
    errorMessageComponentsMap[TErrors[error]] ||
    errorMessageComponentsMap[TErrors.UNKNOWN]

  return <ErrorMessageComponent />
}
