import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './Pages/LandingPage/Landing.jsx'
import Registration from './Pages/RegistrationPage/Registration.jsx'
import Dashboard from './Pages/DashboardPage/Dashboard.jsx'
import { ProtectedRoute } from './Pages/ProtectedRoute.jsx'


function App() {
  // This state should actually be managed with a proper state management solution
  // like Redux or Context API in a real application
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  });

  const handleSetIsAuthenticated = (value) => {
    localStorage.setItem('isAuthenticated', value);
    setIsAuthenticated(value);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/register"
          element={
            <Registration
              setIsAuthenticated={handleSetIsAuthenticated}
            />
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App