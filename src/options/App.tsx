import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MyActions from './pages/MyActions/MyActions'

const App: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<MyActions />} />
    </Routes>
  )
}

export default App
