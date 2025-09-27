import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGetMeQuery } from './features/auth/authApiSlice';
import { FaSpinner } from 'react-icons/fa';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import Settings from './pages/Settings';
import NotificationsPage from './pages/NotificationsPage';
import Header from './components/Header';

function ProtectedRoute({ children }) {
  const { data: auth, isLoading } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-3xl text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!auth?.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        {/* Add more protected routes here */}
      </Routes>
    </Router>
  );
}

export default App;
