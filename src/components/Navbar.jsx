import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp, themes } from "../AppContext";

function Navbar() {
  const navigate = useNavigate();
  const { t, theme, language, setLanguage, themeName, setThemeName } = useApp();
  const isLoggedIn = !!localStorage.getItem("user");
  const [showThemes, setShowThemes] = useState(false);

  if (!isLoggedIn) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const languages = [
    { code: "english", label: "English" },
    { code: "hindi",   label: "हिन्दी" },
    { code: "telugu",  label: "తెలుగు" },
    { code: "tamil",   label: "தமிழ்" },
  ];

  return (
    <nav className="navbar" style={{ borderBottom: `2px solid ${theme.primary}` }}>
      <h2 style={{ color: theme.primary }}>{t.appName}</h2>

      <div className="nav-links">
        <NavLink to="/jobs" className={({ isActive }) => isActive ? "active" : ""} style={{ "--active-color": theme.primary }}>
          {t.browseJobs}
        </NavLink>
        <NavLink to="/post" className={({ isActive }) => isActive ? "active" : ""}>
          {t.postJob}
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
          {t.about}
        </NavLink>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "0.4rem 0.6rem",
            borderRadius: "6px",
            border: `1px solid ${theme.primary}`,
            color: theme.primary,
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            background: "white",
          }}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>

        {/* Theme Picker */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowThemes(!showThemes)}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              border: `1px solid ${theme.primary}`,
              background: theme.primary,
              color: "white",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            🎨 {t.theme}
          </button>

          {showThemes && (
            <div style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "0.75rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              display: "flex",
              gap: "0.5rem",
              zIndex: 1000,
            }}>
              {Object.entries(themes).map(([key, val]) => (
                <button
                  key={key}
                  title={val.name}
                  onClick={() => { setThemeName(key); setShowThemes(false); }}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: val.primary,
                    border: themeName === key ? "3px solid #1e293b" : "3px solid transparent",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            background: theme.primary,
            color: "white",
            fontWeight: 600,
            fontSize: "0.9rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          {t.logout}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;