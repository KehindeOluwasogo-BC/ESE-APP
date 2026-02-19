import { useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Booking from "./components/Booking";
import Profile from "./components/Profile";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("login");

  return (
    <div className="auth-page">
      {authMode === "login" ? (
        <Login 
          onLogin={login} 
          onSwitchToRegister={() => setAuthMode("register")}
          onSwitchToForgotPassword={() => setAuthMode("forgot")}
        />
      ) : authMode === "register" ? (
        <Register 
          onRegister={register} 
          onSwitchToLogin={() => setAuthMode("login")} 
        />
      ) : (
        <ForgotPassword 
          onBackToLogin={() => setAuthMode("login")}
        />
      )}
    </div>
  );
}

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isProfilePage = location.pathname === '/profile';
  const isBookingsPage = location.pathname === '/bookings' || location.pathname === '/';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ESE Booking App</h1>
        <nav className="app-nav">
          <button 
            className={`nav-button ${isBookingsPage ? 'active' : ''}`}
            onClick={() => navigate('/bookings')}
          >
            Bookings
          </button>
          <button 
            className={`nav-button ${isProfilePage ? 'active' : ''}`}
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>
          <button className="btn btn__danger" onClick={logout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/bookings" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/bookings" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
