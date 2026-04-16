import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./AppContext";

import Login from "./components/Login";
import JobList from "./components/JobList";
import PostJob from "./components/PostJob";
import About from "./components/About";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch jobs from backend on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        // Use relative path — proxied to http://localhost:5000 via vite.config.js
        const res = await fetch("/api/jobs");
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err.message);
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Add a newly created job to the local list immediately (no refetch needed)
  const addJob = (newJob) => setJobs((prev) => [newJob, ...prev]);

  const isLoggedIn = localStorage.getItem("user");

  return (
    <AppProvider>
      <Router>
        <Navbar />

        {/* Global loading / error banner — only shows on /jobs page */}
        {loading && (
          <div style={{
            textAlign: "center", padding: "2rem",
            color: "#2563eb", fontSize: "1rem", fontWeight: 500
          }}>
            ⏳ Loading jobs from server...
          </div>
        )}
        {fetchError && !loading && (
          <div style={{
            textAlign: "center", padding: "1rem",
            background: "#fee2e2", color: "#dc2626",
            borderRadius: "8px", margin: "1rem 2rem",
            fontSize: "0.95rem",
          }}>
            ⚠️ Could not load jobs: {fetchError}. Make sure the backend is running on port 5000.
          </div>
        )}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/jobs"
            element={isLoggedIn ? <JobList jobs={jobs} /> : <Navigate to="/" />}
          />
          <Route
            path="/post"
            element={isLoggedIn ? <PostJob addJob={addJob} /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={isLoggedIn ? <About /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;