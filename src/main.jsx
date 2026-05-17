import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Unfall from './pages/Unfall.jsx'
import Leistung from './pages/Leistung.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/unfall" element={<Unfall />} />
        <Route path="/leistungen/:slug" element={<Leistung />} />
        <Route path="/leistungen/:slug/" element={<Leistung />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
