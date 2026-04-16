import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../AppContext";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t, theme, language, setLanguage } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = isLogin
        ? "/api/users/login"
        : "/api/users/register";
      const body = isLogin ? { email, password } : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/jobs");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError(t.serverError);
    }
  };

  const languages = [
    { code: "english", label: "English" },
    { code: "hindi",   label: "हिन्दी" },
    { code: "telugu",  label: "తెలుగు" },
    { code: "tamil",   label: "தமிழ்" },
  ];

  return (
    <div className="login-page" style={{ background: theme.surface }}>
      {/* Language selector on login page too */}
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            border: `1px solid ${theme.primary}`,
            color: theme.primary,
            fontWeight: 600,
            fontSize: "0.9rem",
            background: "white",
            cursor: "pointer",
          }}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>

      <div className="login-card">
        <h2 style={{ color: theme.primary }}>{t.appName}</h2>
        <p>{t.appTagline}</p>

        <div className="toggle-tabs">
          <button
            className={`tab-btn ${isLogin ? "active" : ""}`}
            style={isLogin ? { background: theme.primary, color: "white" } : {}}
            onClick={() => { setIsLogin(true); setError(""); }}
          >
            {t.login}
          </button>
          <button
            className={`tab-btn ${!isLogin ? "active" : ""}`}
            style={!isLogin ? { background: theme.primary, color: "white" } : {}}
            onClick={() => { setIsLogin(false); setError(""); }}
          >
            {t.signup}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">{t.yourName}</label>
              <input type="text" className="form-input" placeholder={t.enterName}
                value={name} onChange={(e) => setName(e.target.value)} required
                style={{ "--focus-color": theme.primary }}
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">{t.email}</label>
            <input type="email" className="form-input" placeholder={t.enterEmail}
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{t.password}</label>
            <input type="password" className="form-input" placeholder={t.enterPassword}
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" style={{
            width: "100%", padding: "0.85rem", fontSize: "1rem", marginTop: "0.5rem",
            background: theme.primary, color: "white", border: "none",
            borderRadius: "8px", fontWeight: 700, cursor: "pointer",
          }}>
            {isLogin ? t.login : t.createAccount}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;