import React from "react";
import { useApp } from "../AppContext";

function About() {
  const { t, theme } = useApp();

  return (
    <div className="about-page">
      <div className="about-card">
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: theme.primary }}>{t.aboutTitle}</h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: "1.8", marginBottom: "2rem" }}>
          {t.aboutDesc}
        </p>

        <div className="about-grid">
          <div className="about-item" style={{ borderLeft: `4px solid ${theme.primary}` }}>
            <h3 style={{ marginBottom: "0.75rem", color: theme.primary }}>{t.ourGoal}</h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>{t.ourGoalDesc}</p>
          </div>
          <div className="about-item" style={{ borderLeft: `4px solid ${theme.primary}` }}>
            <h3 style={{ marginBottom: "0.75rem", color: theme.primary }}>{t.howItWorks}</h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>{t.howItWorksDesc}</p>
          </div>
          <div className="about-item" style={{ borderLeft: `4px solid ${theme.primary}` }}>
            <h3 style={{ marginBottom: "0.75rem", color: theme.primary }}>{t.safe}</h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>{t.safeDesc}</p>
          </div>
          <div className="about-item" style={{ borderLeft: `4px solid ${theme.primary}` }}>
            <h3 style={{ marginBottom: "0.75rem", color: theme.primary }}>{t.fast}</h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>{t.fastDesc}</p>
          </div>
        </div>

        <div style={{
          marginTop: "2.5rem", padding: "2rem",
          background: theme.light, borderRadius: "12px",
          border: `1px solid ${theme.primary}30`, textAlign: "center",
        }}>
          <h3 style={{ color: theme.primary, marginBottom: "0.5rem" }}>{t.readyToStart}</h3>
          <p style={{ color: theme.primary }}>{t.readyDesc}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
