import React from 'react'
import { useMyActionsStore } from '../../myActionsStore'

const ActionsList: React.FC<{}> = () => {
  const { actions } = useMyActionsStore()

  return (
    <div>
      <div>
        {actions.map(({ id, name, description, type, provider }) => (
          <div>
            action: {id}
            <div>name: {name}</div>
            <div>description: {description}</div>
            <div>type: {type}</div>
            <div>provider: {provider}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActionsList
