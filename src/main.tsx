import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/skeleton.css'
import App from './App.tsx'
import { protectMedia } from './components/protectMedia'
import { LanguageProvider } from './i18n/LanguageContext'

protectMedia()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
