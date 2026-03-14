import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BetaPage from './pages/BetaPage'
import IosPage from './pages/IosPage'
import AndroidPage from './pages/AndroidPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/beta" element={<BetaPage />} />
      <Route path="/ios" element={<IosPage />} />
      <Route path="/android" element={<AndroidPage />} />
    </Routes>
  )
}
