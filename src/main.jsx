import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistor, store } from './redux/store.js'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/'

import theme from './theme.js'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer autoClose={3000} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>
)
