import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './pages/App'
import Registration from './pages/Registration'
import Login from './pages/Login'
import { PublicRoute } from './components/ProtectedRoute'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route 
          path="/daftar" 
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
      </Routes>
    </Router>
  </React.StrictMode>,
)