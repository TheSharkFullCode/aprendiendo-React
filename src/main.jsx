import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CuadernoProvider } from './context/CuadernoContext'
import App from './App'
import './index.css'

// Punto de entrada: Router + Context envuelven toda la app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CuadernoProvider>
        <App />
      </CuadernoProvider>
    </BrowserRouter>
  </StrictMode>
)
