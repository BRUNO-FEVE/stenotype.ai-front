import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Prompt from './pages/prompt'

export default function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='prompt' element={<Prompt />} />
    </Routes>
  )
}
