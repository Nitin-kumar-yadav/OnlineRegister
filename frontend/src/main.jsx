import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { FontSizeProvider } from './context/FontSizeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <FontSizeProvider>
          <App />
        </FontSizeProvider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
)
