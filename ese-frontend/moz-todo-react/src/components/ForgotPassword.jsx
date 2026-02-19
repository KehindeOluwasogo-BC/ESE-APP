import { useState } from "react";

function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    fetch(`${apiURL}/api/auth/password-reset/request/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.email?.[0] || data.error || "Failed to send reset email");
          });
        }
        return response.json();
      })
      .then((data) => {
        setSuccess(data.message || "Password reset email sent! Please check your inbox.");
        setEmail("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Forgot Password</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="input input__lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="your.email@example.com"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn__primary btn__lg"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="auth-switch">
          Remember your password?{" "}
          <button 
            type="button" 
            className="link-button"
            onClick={onBackToLogin}
          >
            Back to Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
