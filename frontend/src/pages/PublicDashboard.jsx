import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


const PublicDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs/public");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id, voteValue) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/jobs/${id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vote: voteValue }),
      });

      const result = await res.json();
      console.log(result);
      fetchJobs(); // this refreshes the vote counts
    } catch (err) {
      console.error("Vote failed", err);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading)
    return (
      <div className="dashboard-loading">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📢 Public Scam Reports</h1>

      {jobs.length === 0 ? (
        <p className="no-reports">No reports yet.</p>
      ) : (
        <div className="report-list">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="report-card"
            >
              <div className="report-header">
                <h2>{job.title}</h2>
                <span
                  className={`badge ${job.scamScore > 75
                      ? "danger"
                      : job.scamScore > 50
                        ? "warning"
                        : "safe"
                    }`}
                >
                  Scam Score: {job.scamScore}
                </span>
              </div>

              <p className="company">Company: {job.company}</p>
              <p className="description">
                {job.description?.slice(0, 180)}...
              </p>

              {job.scamReasons?.length > 0 && (
                <ul className="reasons">
                  {job.scamReasons.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              )}
              <div className="vote-bar-container">
                {job.upvotes + job.downvotes === 0 ? (
                  <div className="vote-bar neutral">No votes yet</div>
                ) : (
                  <div className="vote-bar">
                    <div
                      className="up-segment"
                      style={{ width: `${(job.upvotes / (job.upvotes + job.downvotes)) * 100}%` }}
                    ></div>
                    <div
                      className="down-segment"
                      style={{ width: `${(job.downvotes / (job.upvotes + job.downvotes)) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="vote-buttons">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="vote-btn up"
                  onClick={() => vote(job._id, 1)}
                >
                  👍 {job.upvotes || 0}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="vote-btn down"
                  onClick={() => vote(job._id, -1)}
                >
                  👎 {job.downvotes || 0}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicDashboard;
