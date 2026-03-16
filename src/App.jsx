import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ScrollTestPage from './pages/ScrollTestPage'
import BetaPage from './pages/BetaPage'
import IosPage from './pages/IosPage'
import AndroidPage from './pages/AndroidPage'
import AndroidSignupPage from './pages/AndroidSignupPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/beta" element={<BetaPage />} />
      <Route path="/ios" element={<IosPage />} />
      <Route path="/android" element={<AndroidPage />} />
      <Route path="/android/signup" element={<AndroidSignupPage />} />
      <Route path="/scroll-test" element={<ScrollTestPage />} />
    </Routes>
  )
}
