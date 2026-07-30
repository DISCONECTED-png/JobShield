import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldAlert, AlertTriangle, ThumbsUp, ThumbsDown, Search, Filter,
  Building, ChevronDown, ChevronUp, Sparkles, CheckCircle2, ArrowLeft, RefreshCw
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config";

const PublicDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all"); // all, high, medium, safe
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [voteToast, setVoteToast] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/public`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id, voteValue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setVoteToast("Please sign in to vote on community reports.");
      setTimeout(() => setVoteToast(""), 3000);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vote: voteValue }),
      });

      const result = await res.json();
      if (res.ok) {
        setVoteToast("Vote recorded successfully!");
        fetchJobs();
      } else {
        setVoteToast(result.msg || "Vote failed.");
      }
      setTimeout(() => setVoteToast(""), 3000);
    } catch (err) {
      console.error("Vote failed", err);
      setVoteToast("Server unreachable.");
      setTimeout(() => setVoteToast(""), 3000);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filtering & Sorting Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (riskFilter === "high") return (job.scamScore || 0) >= 75;
    if (riskFilter === "medium") return (job.scamScore || 0) >= 40 && (job.scamScore || 0) < 75;
    if (riskFilter === "safe") return (job.scamScore || 0) < 40;
    return true;
  });

  const getScoreBadge = (score) => {
    if (score >= 75) {
      return {
        style: "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
        label: "High Risk",
        icon: ShieldAlert
      };
    }
    if (score >= 40) {
      return {
        style: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
        label: "Suspicious",
        icon: AlertTriangle
      };
    }
    return {
      style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
      label: "Likely Safe",
      icon: CheckCircle2
    };
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">

      <Navbar />

      {/* Background FX */}
      <div className="absolute inset-0 bg-grid-cyber z-0 pointer-events-none opacity-40"></div>
      <div className="absolute top-20 right-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Toast Notification */}
      {voteToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="cyber-glass px-6 py-3 rounded-full border border-amber-500/40 text-amber-300 text-sm font-semibold shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            {voteToast}
          </div>
        </div>
      )}

      <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">

        {/* Header Title */}
        <div className="mb-10 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Community Database
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-heading">
              Public Scam <span className="text-gradient-amber">Database</span>
            </h1>
            <p className="text-zinc-400 text-base max-w-2xl">
              Crowdsourced intelligence. Review user reports, verify AI trust scores, and vote to protect fellow students.
            </p>
          </div>

          <button
            onClick={fetchJobs}
            className="btn-glass px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-300 flex items-center gap-2 hover:border-amber-500/40 self-start md:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Refresh Feed ({jobs.length} Total)</span>
          </button>
        </div>

        {/* Search & Risk Filter Bar */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, company name, or red flags..."
              className="cyber-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm placeholder-zinc-500 font-medium focus:border-amber-500/50 focus:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            />
          </div>

          {/* Risk Pill Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-semibold">
            {[
              { key: "all", label: "All" },
              { key: "high", label: "High Risk (>75)" },
              { key: "medium", label: "Suspicious" },
              { key: "safe", label: "Safe" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setRiskFilter(tab.key)}
                className={`flex-1 py-2.5 rounded-xl transition-all font-mono cursor-pointer ${riskFilter === tab.key
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : "text-zinc-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="text-zinc-400 font-mono text-sm animate-pulse">Querying JobShield Database...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center cyber-glass rounded-3xl max-w-xl mx-auto border-dashed border-white/10">
            <ShieldAlert className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">No matching reports found</h3>
            <p className="text-zinc-400 text-sm">
              {searchTerm ? "Try searching for a different company or job title." : "The community board has no reports under this filter."}
            </p>
          </div>
        ) : (
          /* Grid of Reports */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job, index) => {
              const totalVotes = (job.upvotes || 0) + (job.downvotes || 0);
              const upvotePercent = totalVotes === 0 ? 0 : Math.round(((job.upvotes || 0) / totalVotes) * 100);
              const downvotePercent = totalVotes === 0 ? 0 : Math.round(((job.downvotes || 0) / totalVotes) * 100);
              const badge = getScoreBadge(job.scamScore || 0);
              const BadgeIcon = badge.icon;
              const isExpanded = expandedJobId === job._id;

              return (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  className="cyber-glass cyber-glass-hover p-7 rounded-3xl flex flex-col justify-between relative border-white/10 group"
                >
                  <div>
                    {/* Header: Title & Scam Score Badge */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h2 className="text-xl font-bold text-white leading-tight group-hover:text-amber-300 transition-colors font-heading">
                        {job.title}
                      </h2>

                      <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${badge.style}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>Score: {job.scamScore}/100</span>
                      </div>
                    </div>

                    {/* Company */}
                    <p className="text-amber-400/90 font-semibold text-sm mb-4 flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-500" />
                      <span>{job.company || "Company Unspecified"}</span>
                    </p>

                    {/* Description preview / full */}
                    <div className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {isExpanded ? (
                        <p className="whitespace-pre-line">{job.description}</p>
                      ) : (
                        <p>
                          {job.description?.length > 180
                            ? `${job.description.slice(0, 180)}...`
                            : job.description}
                        </p>
                      )}

                      {job.description?.length > 180 && (
                        <button
                          onClick={() => setExpandedJobId(isExpanded ? null : job._id)}
                          className="mt-2 text-amber-400 hover:underline text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>Show Less <ChevronUp className="w-3 h-3" /></>
                          ) : (
                            <>Read Full Report <ChevronDown className="w-3 h-3" /></>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Red Flags Badging */}
                    {job.scamReasons?.length > 0 && (
                      <div className="mb-6">
                        <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2.5">
                          Detected Red Flags:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.scamReasons.map((reason, i) => (
                            <span key={i} className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
                              <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                              <span>{reason}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Vote Bar & Buttons */}
                  <div className="pt-5 border-t border-white/10 mt-4">

                    {/* Community Trust Meter */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1.5">
                        <span>Community Trust Ratio</span>
                        <span>{totalVotes} Votes ({upvotePercent}% Legitimate)</span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex border border-white/5">
                        {totalVotes === 0 ? (
                          <div className="w-full h-full bg-zinc-800"></div>
                        ) : (
                          <>
                            <div className="h-full bg-emerald-500" style={{ width: `${upvotePercent}%` }}></div>
                            <div className="h-full bg-rose-500" style={{ width: `${downvotePercent}%` }}></div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => vote(job._id, 1)}
                        className="flex-1 bg-slate-900/80 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-300 text-zinc-300 font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                      >
                        <ThumbsUp className="w-4 h-4 text-emerald-400" />
                        <span>Upvote ({job.upvotes || 0})</span>
                      </button>

                      <button
                        onClick={() => vote(job._id, -1)}
                        className="flex-1 bg-slate-900/80 border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-300 text-zinc-300 font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                      >
                        <ThumbsDown className="w-4 h-4 text-rose-400" />
                        <span>Flag Fake ({job.downvotes || 0})</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default PublicDashboard;