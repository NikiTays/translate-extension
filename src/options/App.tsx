import React from 'react'
import { Routes, Route } from 'react-router-dom'

import General from './pages/General/General'
import MyActions from './pages/MyActions/MyActions'

const App: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<General />} />
      <Route path="/my-actions" element={<MyActions />} />
    </Routes>
  )
}

export default App
