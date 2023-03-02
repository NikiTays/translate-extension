import React from 'react'
import { useMyActionsStore } from '../../myActionsStore'

const ActionsList: React.FC<{}> = () => {
  const { actions } = useMyActionsStore()

  return (
    <div>
      <div>
        {actions.map(({ id, name, description, type, provider, options }) => (
          <div style={{ margin: '25px' }}>
            action: {id}
            <div>name: {name}</div>
            <div>description: {description}</div>
            <div>type: {type}</div>
            <div>provider: {provider}</div>
            <div style={{ margin: '20px' }}>
              Options:{' '}
              {Object.values(options).map((value) => (
                <div style={{ margin: '10px' }}>
                  <div>value: {value.optionValue}</div>
                  <div>name: {value.optionName}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActionsList
// {
//   ['ProviderName']: {
//     ['TypeNmae']: [
//       {fieldName: 'Translate from', fieldId: 'translateFrom', isRequired: true, }
//       {fieldName: 'Translate to', fieldId: 'translateTo', isRequired: true, }
//     ]
//   }
//   ['ProviderName2']: {
//     ['TypeNmae']: [
//       {fieldName: 'Translate from', fieldId: 'translateFrom', isRequired: true, }
//       {fieldName: 'Translate to', fieldId: 'translateTo', isRequired: true, }
//     ]
//   }
// }
