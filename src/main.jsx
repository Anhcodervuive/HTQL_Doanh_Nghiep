import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles/index.jsx'
import theme from './theme.js'
import { persistor, store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GlobalStyles>
  </ThemeProvider>
)
