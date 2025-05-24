import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles/index.jsx'
import theme from './theme.js'
import { persistor, store } from './redux/store.js'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer autoClose={3000}/>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </GlobalStyles>
  </ThemeProvider>
)
