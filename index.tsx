import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './pages/App'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pengajuan from './pages/Pengajuan'
import { PublicRoute, ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pengajuan"
            element={
              <ProtectedRoute>
                <Pengajuan />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
)