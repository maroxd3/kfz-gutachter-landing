import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Unfall from './pages/Unfall.jsx'
import Leistung from './pages/Leistung.jsx'
import LeistungenIndex from './pages/LeistungenIndex.jsx'
import Standort from './pages/Standort.jsx'
import StandorteIndex from './pages/StandorteIndex.jsx'
import Stadtteil from './pages/Stadtteil.jsx'
import Ratgeber from './pages/Ratgeber.jsx'
import RatgeberIndex from './pages/RatgeberIndex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/unfall" element={<Unfall />} />
        <Route path="/leistungen" element={<LeistungenIndex />} />
        <Route path="/leistungen/" element={<LeistungenIndex />} />
        <Route path="/leistungen/:slug" element={<Leistung />} />
        <Route path="/leistungen/:slug/" element={<Leistung />} />
        <Route path="/standorte" element={<StandorteIndex />} />
        <Route path="/standorte/" element={<StandorteIndex />} />
        <Route path="/standorte/:slug" element={<Standort />} />
        <Route path="/standorte/:slug/" element={<Standort />} />
        <Route path="/standorte/hannover/:slug" element={<Stadtteil />} />
        <Route path="/standorte/hannover/:slug/" element={<Stadtteil />} />
        <Route path="/ratgeber" element={<RatgeberIndex />} />
        <Route path="/ratgeber/" element={<RatgeberIndex />} />
        <Route path="/ratgeber/:slug" element={<Ratgeber />} />
        <Route path="/ratgeber/:slug/" element={<Ratgeber />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
