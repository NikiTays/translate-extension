import React from 'react'
import { Routes, Route } from 'react-router-dom'

import General from './pages/General/General'
import MyActions from './pages/MyActions/MyActions'
import Providers from './pages/Providers/Providers'

const App: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<General />} />
      <Route path="/my-actions" element={<MyActions />} />
      <Route path="/providers" element={<Providers />} />
    </Routes>
  )
}

export default App
