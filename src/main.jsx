import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles/index.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalStyles>
    <App />
  </GlobalStyles>
)
