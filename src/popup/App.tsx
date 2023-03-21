import React from 'react'
import { ActionUI } from './src/features/ActionUI'
import ActionUIProvider from './src/features/ActionUI/ActionUIProvider/ActionUIProvider'
import { Menu } from './src/layout/Menu'

const App: React.FC<{}> = () => {
  return (
    <ActionUIProvider>
      <Menu>
        <ActionUI />
      </Menu>
    </ActionUIProvider>
  )
}

export default App
