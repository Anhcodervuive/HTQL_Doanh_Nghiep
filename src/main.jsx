import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'

import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles/index.jsx'
import theme from './theme.js'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </ThemeProvider>
)
