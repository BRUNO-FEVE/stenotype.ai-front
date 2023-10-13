import { Routes, Route } from 'react-router-dom'
import Prompt from './pages/mobile/prompt-mobile'
import VideoConversorMobile from './pages/mobile/video-conversor-mobile'
import useWindowResize from './hooks/useWindowResize'
import TranscriptionMobile from './pages/mobile/transcription-mobile'
import ControlStation from './pages/control-station'
import Documentation from './pages/documentation'
import Home from './pages/home'

export default function AppRouter() {
  const { width } = useWindowResize()

  return width ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route
        path="conversor"
        element={width > 1000 ? <ControlStation /> : <VideoConversorMobile />}
      />
      <Route path="transcription" element={<TranscriptionMobile />} />
      <Route path="prompt" element={<Prompt />} />
    </Routes>
  ) : null
}
