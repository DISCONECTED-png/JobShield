import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, ShieldAlert, Clock, Building, Tag, ArrowRight, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config';

const RadarFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState("all");

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/radar?limit=20`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching radar data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const getScoreBadge = (score) => {
    if (score >= 70) {
      return {
        style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
        label: 'Low Risk'
      };
    }
    if (score >= 40) {
      return {
        style: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
        label: 'Suspicious'
      };
    }
    return {
      style: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]',
      label: 'High Scam Risk'
    };
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">

      <Navbar />

      {/* Background FX */}
      <div className="absolute inset-0 bg-grid-cyber z-0 pointer-events-none opacity-40"></div>
      <div className="absolute top-24 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">

        {/* Header Section */}
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-rose-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Real-time Web Monitoring
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 font-heading flex items-center gap-3">
              <Radio className="w-9 h-9 text-indigo-400 animate-pulse" />
              Live Scam <span className="text-gradient-violet">Radar Feed</span>
            </h1>
            <p className="text-zinc-400 text-base max-w-2xl">
              Continuous automated scanning of corporate domain changes, newly reported listings, and suspicious recruitment emails.
            </p>
          </div>

          <button
            onClick={fetchJobs}
            className="btn-glass px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-300 flex items-center gap-2 hover:border-indigo-500/40 cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Showing Latest {jobs.length} Scans</span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-zinc-400 font-mono text-sm animate-pulse">Scanning live radar feeds...</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <div className="col-span-full py-24 text-center cyber-glass rounded-3xl border border-white/10">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2 font-heading">Radar Clean!</h3>
                <p className="text-zinc-400 text-sm">No suspicious job postings detected in recent radar sweeps.</p>
              </div>
            ) : (
              jobs.map((job, i) => {
                const badge = getScoreBadge(job.score || 0);

                return (
                  <div
                    key={i}
                    className="cyber-glass cyber-glass-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group border-white/10"
                  >
                    <div>
                      {/* Card Header (Title & Risk Score Pill) */}
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors font-heading">
                          {job.title}
                        </h3>

                        <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${badge.style}`}>
                          {job.score}/100
                        </span>
                      </div>

                      {/* Company Name */}
                      <p className="text-indigo-400 font-semibold text-xs mb-4 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{job.company || 'Unknown Entity'}</span>
                      </p>

                      {/* Tags List */}
                      {job.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {job.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-900/80 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-md text-[11px] font-mono uppercase tracking-wider flex items-center gap-1"
                            >
                              <Tag className="w-2.5 h-2.5 text-indigo-400" />
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{job.source || 'Scam Feed'}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>
                          {job.timestamp ? new Date(job.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default RadarFeed;