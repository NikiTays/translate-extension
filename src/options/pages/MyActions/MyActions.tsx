import React, { useEffect } from 'react'
import ActionsList from './components/ActionsList'
import AddActionForm from './components/AddActionForm'
import { useMyActionsStore } from './myActionsStore'

const MyActions: React.FC<{}> = () => {
  const { getActions, isLoading } = useMyActionsStore()

  useEffect(() => {
    getActions()
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <>
      <ActionsList />
      <AddActionForm />
    </>
  )
}

export default MyActions
