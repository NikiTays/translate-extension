import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMyActionsStore } from '../../myActionsStore'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { TProviders } from '../../../../../background/types/providers.type'
import { TProvidersActionTypes } from '../../../../../background/constants/providers'
import {
  TUserAction,
  TUserActionTypes,
} from '../../../../../background/types/userActions.type'

const AddActionForm: React.FC<{}> = () => {
  const [selectedProvider, setSelectedProvider] = useState<TProviders>()
  const [actionType, setActionType] = useState<TUserActionTypes>()
  const { addAction } = useMyActionsStore()
  const { register, handleSubmit, reset } = useForm()

  const updateProvider = useCallback((provider) => {
    setActionType(null)
    setSelectedProvider(provider)
  }, [])

  useEffect(() => {
    reset()
  }, [actionType])

  const onSubmit = useCallback(
    async ({ name, description, ...rest }: any) => {
      const options = {}

      Object.keys(rest).forEach((restOptionKey) => {
        options[restOptionKey] = {
          optionValue: rest[restOptionKey],
        }
      })

      const actionData = {
        provider: selectedProvider,
        type: actionType,
        name: name as string,
        description: description as string,
        options,
      }

      await addAction(actionData)
    },
    [selectedProvider, actionType],
  )

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      style={{ marginTop: '20px' }}
    >
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="provider-select-label">Provider type</InputLabel>
          <Select
            labelId="provider-select-label"
            id="provider-select-label"
            value={selectedProvider}
            label="Provider"
            onChange={({ target: { value } }) =>
              updateProvider(value as TProviders)
            }
          >
            <MenuItem value={TProviders.CHAT_GPT}>Caht Gpt</MenuItem>
            <MenuItem value={TProviders.GOOGLE_TRANSLATE}>
              Google translate
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      {selectedProvider && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="action-select-label">Action Type</InputLabel>
            <Select
              labelId="action-select-label"
              id="action-select-label"
              value={actionType}
              label="ActionType"
              onChange={({ target: { value } }) =>
                setActionType(value as TUserActionTypes)
              }
            >
              {Object.keys(TProvidersActionTypes[selectedProvider]).map(
                (actionKey) => (
                  <MenuItem value={actionKey}>{actionKey}</MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Box>
      )}
      {selectedProvider && actionType && (
        <>
          {Object.entries(
            TProvidersActionTypes[selectedProvider][actionType],
          ).map(([actionField, actionFieldValue]: any[]) => {
            if (actionFieldValue.type === 'select') {
              return (
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id={`${actionField}-select-label`}>
                      {actionField}
                    </InputLabel>
                    <Select
                      labelId={`${actionField}-select-label`}
                      id={`${actionField}-select-label`}
                      {...register(actionField)}
                    >
                      {actionFieldValue.selectFrom.map((selectOption) => (
                        <MenuItem value={selectOption}>{selectOption}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )
            }
            if (actionFieldValue.type === 'input') {
              return (
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label={actionField}
                  {...register(actionField, {
                    required: actionFieldValue.isRequired,
                  })}
                />
              )
            }
          })}
        </>
      )}
      <Button
        sx={{ width: '100%', height: '56px' }}
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}

export default AddActionForm
