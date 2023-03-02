import React from 'react'
import { useMyActionsStore } from '../../myActionsStore'

const AddActionForm: React.FC<{}> = () => {
  const { actions } = useMyActionsStore()

  return (
    <div>
      <button>Create</button>
    </div>
  )
}

export default AddActionForm
