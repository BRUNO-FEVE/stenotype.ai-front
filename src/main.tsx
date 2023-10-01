import React from 'react'
import ReactDOM from 'react-dom/client'
// import { App } from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './router.tsx'
import ThemeProvider from './context/theme-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
)
