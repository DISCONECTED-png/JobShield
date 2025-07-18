import React, { useEffect, useState } from 'react';

const RadarFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/radar?limit=20');
          const data = await res.json();
          console.log('Fetched jobs:', data); // 👈 log data
          setJobs(data);
        } catch (err) {
          console.error('Error fetching radar data:', err);
        } finally {
          setLoading(false);
        }
      };
      

    fetchJobs();
  }, []);

  if (loading) return <div className="radar-loading">🔍 Loading recent job scans...</div>;

  return (
    <div className="radar-feed">
      <h2 className="radar-title">📡 Scam Radar — Live Feed</h2>
      <div className="radar-cards">
        {jobs.map((job, i) => (
          <div className="radar-card" key={i}>
            <div className="radar-header">
              <h3>{job.title}</h3>
              <span className={`score-badge ${job.score >= 70 ? 'high' : job.score >= 40 ? 'medium' : 'low'}`}>
                {job.score}/100
              </span>
            </div>
            <p className="company-name">{job.company}</p>
            <p className="radar-tags">
              {job.tags?.map((tag, i) => (
                <span className="tag" key={i}>#{tag}</span>
              ))}
            </p>
            <p className="radar-source">📥 {job.source} — {new Date(job.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadarFeed;
