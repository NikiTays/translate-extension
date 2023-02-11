import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

import App from './App'
import { theme } from './src/style/theme'

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <App />
      </ScopedCssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
)
