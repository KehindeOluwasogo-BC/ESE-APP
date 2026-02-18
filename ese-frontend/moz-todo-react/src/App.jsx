import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Booking from "./components/Booking";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppContent() {
  const { isAuthenticated, login, logout, register } = useAuth();
  const [authMode, setAuthMode] = useState("login");

  if (!isAuthenticated) {
    return (
      <div className="auth-page">
        {authMode === "login" ? (
          <Login 
            onLogin={login} 
            onSwitchToRegister={() => setAuthMode("register")} 
          />
        ) : (
          <Register 
            onRegister={register} 
            onSwitchToLogin={() => setAuthMode("login")} 
          />
        )}
      </div>
    );
  }

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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
