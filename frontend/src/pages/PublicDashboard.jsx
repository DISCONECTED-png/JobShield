import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PublicDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("https://jobshield-backend.onrender.com/api/jobs/public");
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
      const res = await fetch(`https://jobshield-backend.onrender.com/api/jobs/${id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vote: voteValue }),
      });

      const result = await res.json();
      console.log(result);
      fetchJobs(); // Refreshes the vote counts
    } catch (err) {
      console.error("Vote failed", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Dynamic Score Logic (Higher score = Higher Scam Probability)
  const getScoreStyle = (score) => {
    if (score > 75) return "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
    if (score > 50) return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 pb-24">
      
      {/* Premium CSS Effects */}
      <style>{`
        .bg-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        }
        .premium-glass {
          background: rgba(15, 15, 15, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* Background Orbs & Grid */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-10 relative z-10">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link to="/" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors font-medium w-max">
            <span>←</span> Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              Public Scam <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Reports</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Crowdsourced intelligence. Review user-submitted reports, check AI trust scores, and vote to protect the community.
            </p>
          </div>
          <div className="text-zinc-500 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
            Total Reports: {jobs.length}
          </div>
        </div>

        {/* Dynamic Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-zinc-400 font-medium animate-pulse">Loading community reports...</p>
          </div>
        ) : jobs.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center premium-glass rounded-[2rem] max-w-2xl mx-auto">
            <span className="text-5xl mb-4 block opacity-50">📭</span>
            <h3 className="text-2xl font-bold text-white mb-2">No reports yet.</h3>
            <p className="text-zinc-400">The community board is currently clean. Stay vigilant!</p>
          </div>
        ) : (
          /* Reports Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job, index) => {
              const totalVotes = (job.upvotes || 0) + (job.downvotes || 0);
              const upvotePercent = totalVotes === 0 ? 0 : ((job.upvotes || 0) / totalVotes) * 100;
              const downvotePercent = totalVotes === 0 ? 0 : ((job.downvotes || 0) / totalVotes) * 100;

              return (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  // Stagger the animation slightly for each card
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="premium-glass p-8 rounded-[2rem] flex flex-col h-full group hover:border-blue-500/30 transition-colors"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h2 className="text-2xl font-bold text-white leading-tight group-hover:text-blue-100 transition-colors">
                      {job.title}
                    </h2>
                    <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border tracking-wide ${getScoreStyle(job.scamScore)}`}>
                      Score: {job.scamScore}/100
                    </span>
                  </div>

                  {/* Company */}
                  <p className="text-blue-300/80 font-medium text-sm mb-4 flex items-center gap-2">
                    <span className="text-blue-500/50">🏢</span> {job.company}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {job.description?.length > 180 
                      ? `${job.description.slice(0, 180)}...` 
                      : job.description}
                  </p>

                  {/* Scam Reasons (Rendered as Badges) */}
                  {job.scamReasons?.length > 0 && (
                    <div className="mb-8">
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Detected Red Flags:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.scamReasons.map((reason, i) => (
                          <span key={i} className="bg-red-500/10 border border-red-500/20 text-red-300 px-2.5 py-1 rounded-md text-xs font-medium">
                            ⚠️ {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Push remaining content to bottom */}
                  <div className="mt-auto pt-6 border-t border-white/5">
                    
                    {/* Visual Vote Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                        <span>Community Trust</span>
                        <span>{totalVotes} Votes</span>
                      </div>
                      
                      {totalVotes === 0 ? (
                        <div className="w-full h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden relative">
                          <div className="absolute inset-0 bg-zinc-800/50"></div>
                        </div>
                      ) : (
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden flex">
                          <div className="h-full bg-emerald-500" style={{ width: `${upvotePercent}%` }}></div>
                          <div className="h-full bg-red-500" style={{ width: `${downvotePercent}%` }}></div>
                        </div>
                      )}
                    </div>

                    {/* Voting Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400 text-zinc-300 font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        onClick={() => vote(job._id, 1)}
                      >
                        <span className="text-lg">👍</span> 
                        <span>{job.upvotes || 0}</span>
                      </motion.button>
                      
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 text-zinc-300 font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        onClick={() => vote(job._id, -1)}
                      >
                        <span className="text-lg">👎</span> 
                        <span>{job.downvotes || 0}</span>
                      </motion.button>
                    </div>
                    
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicDashboard;
