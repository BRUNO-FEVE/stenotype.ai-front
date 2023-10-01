import React from 'react'
import ReactDOM from 'react-dom/client'
// import { App } from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './router.tsx'
import ThemeProvider from './context/theme-context.tsx'
import VideoProvider from './context/video-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <VideoProvider>
          <AppRouter />
        </VideoProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
)
