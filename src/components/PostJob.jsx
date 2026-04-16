import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../AppContext";

function PostJob({ addJob }) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("Development");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { t, theme } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, budget, category, description }),
      });
      const data = await res.json();
      if (res.ok) {
        addJob(data);
        navigate("/jobs");
      } else {
        alert(data.message || "Could not post job. Please try again.");
      }
    } catch {
      alert("Server error. Make sure the backend is running.");
    }
  };

  return (
    <div className="post-page">
      <div className="post-card">
        <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem", color: theme.primary }}>{t.postAJob}</h1>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>{t.fillDetails}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t.jobTitle}</label>
            <input type="text" className="form-input" placeholder={t.jobTitlePlaceholder}
              value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">{t.budgetLabel}</label>
              <input type="text" className="form-input" placeholder={t.budgetPlaceholder}
                value={budget} onChange={(e) => setBudget(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">{t.category}</label>
              <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t.jobDescription}</label>
            <textarea className="form-input" placeholder={t.jobDescPlaceholder}
              value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" style={{
              flex: 1, padding: "0.85rem", background: theme.primary,
              color: "white", border: "none", borderRadius: "8px",
              fontWeight: 700, cursor: "pointer", fontSize: "1rem",
            }}>
              {t.post}
            </button>
            <button type="button" className="btn-secondary"
              style={{ flex: 1, padding: "0.85rem" }}
              onClick={() => navigate("/jobs")}>
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
