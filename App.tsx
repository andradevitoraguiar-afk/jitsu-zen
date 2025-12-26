import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Discipline from './pages/Discipline';
import Level from './pages/Level';
import Attendance from './pages/Attendance';
import Schedule from './pages/Schedule';
import Evolution from './pages/Evolution';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { state } = useApp();
  if (!state.user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppContent = () => {
  const { state } = useApp();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  
  // Discipline and Level pages have their own headers/nav logic or are deep views
  // We generally show BottomNav on main tabs
  const showBottomNav = ['/dashboard', '/schedule', '/attendance', '/evolution', '/profile'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background-light text-black flex flex-col">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/discipline/:id" element={<ProtectedRoute><Discipline /></ProtectedRoute>} />
        <Route path="/discipline/:disciplineId/level/:levelId" element={<ProtectedRoute><Level /></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/evolution" element={<ProtectedRoute><Evolution /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      {state.user && showBottomNav && <BottomNav />}
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
};

export default App;