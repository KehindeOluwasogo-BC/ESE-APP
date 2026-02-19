import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Booking from "./components/Booking";
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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ESE Booking App</h1>
        <nav className="app-nav">
          <button className="btn btn__danger" onClick={logout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="app-main">
        <Booking />
      </main>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Dashboard /> : <AuthPage />} 
      />
      <Route 
        path="/reset-password" 
        element={<ResetPassword />} 
      />
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
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
