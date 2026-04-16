import React, { useState } from "react";
import { useApp } from "../AppContext";

function JobList({ jobs = [] }) {
  const { t, theme } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const categories = ["All", "Development", "Design", "Writing"];

  const filtered = jobs.filter((job) => {
    const matchSearch = job?.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || job?.category === category;
    return matchSearch && matchCat;
  });

  const getRelated = (job) =>
    jobs.filter((j) => j.category === job.category && j._id !== job._id).slice(0, 3);

  const formatBudget = (b = "") => {
    if (b.includes("₹")) return b;
    if (b.includes("$")) return b.replace("$", "₹");
    return `₹${b}`;
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ jobId: selectedJob._id, name, email, message }),
      });
      if (res.ok) {
        alert(t.appliedSuccess);
        setSelectedJob(null);
        setName(""); setEmail(""); setMessage("");
      } else {
        alert(t.applyFailed);
      }
    } catch {
      alert(t.applyFailed);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title" style={{ color: theme.primary }}>{t.availableJobs}</h1>
      <p className="page-subtitle">{t.browseApply}</p>

      <input
        type="text"
        className="search-input"
        placeholder={t.searchJobs}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ borderColor: "#e2e8f0" }}
        onFocus={(e) => e.target.style.borderColor = theme.primary}
        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
      />

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
            style={category === cat
              ? { background: theme.primary, color: "white", borderColor: theme.primary }
              : {}
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>{t.noJobs}</p>
      ) : (
        <div className="jobs-grid">
          {filtered.map((job) => (
            <div key={job._id} className="job-card">
              <span className={`job-category cat-${job.category}`}>{job.category}</span>
              <h3 className="job-title">{job.title}</h3>
              <p className="job-budget" style={{ color: theme.primary }}>
                {t.budget}: {formatBudget(job.budget)}
              </p>
              <p className="job-desc">
                {t.lookingFor} {job.category.toLowerCase()} {t.professional}
              </p>
              <button
                style={{
                  marginTop: "auto", width: "100%", padding: "0.75rem",
                  background: theme.primary, color: "white", border: "none",
                  borderRadius: "8px", fontWeight: 600, cursor: "pointer",
                  fontSize: "0.95rem",
                }}
                onClick={() => setSelectedJob(job)}
              >
                {t.applyNow}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Apply Modal */}
      {selectedJob && (
        <div className="modal-backdrop" onClick={() => setSelectedJob(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-main">
              <span className={`job-category cat-${selectedJob.category}`} style={{ marginBottom: "0.5rem", display: "inline-block" }}>
                {selectedJob.category}
              </span>
              <h2 className="modal-job-title">{selectedJob.title}</h2>
              <p className="modal-budget" style={{ color: theme.primary }}>
                {t.budget}: {formatBudget(selectedJob.budget)}
              </p>

              <form onSubmit={handleApply}>
                <div className="form-group">
                  <label className="form-label">{t.yourName}</label>
                  <input type="text" className="form-input" placeholder={t.enterName}
                    value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.email}</label>
                  <input type="email" className="form-input" placeholder={t.enterEmail}
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.whyHire}</label>
                  <textarea className="form-input" placeholder={t.writeMessage}
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="modal-actions">
                  <button type="submit" style={{
                    padding: "0.75rem 1.5rem", background: theme.primary, color: "white",
                    border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer",
                  }}>
                    {t.sendApplication}
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setSelectedJob(null)}>
                    {t.cancel}
                  </button>
                </div>
              </form>
            </div>

            <div className="modal-side">
              <p className="related-label">{t.similarJobs}</p>
              {getRelated(selectedJob).length > 0 ? (
                getRelated(selectedJob).map((r) => (
                  <div key={r._id} className="related-card" onClick={() => setSelectedJob(r)}
                    style={{ borderColor: "#e2e8f0" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.primary}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                  >
                    <h4>{r.title}</h4>
                    <p style={{ color: theme.primary }}>{formatBudget(r.budget)}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{t.noSimilar}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobList;