import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RadarFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('https://jobshield-backend.onrender.com/api/radar?limit=20');
        const data = await res.json();
        console.log('Fetched jobs:', data); 
        setJobs(data);
      } catch (err) {
        console.error('Error fetching radar data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  // Dynamic Badge Color Logic (Assuming High Score = Safe, Low Score = Scam)
  const getScoreStyle = (score) => {
    if (score >= 70) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
    if (score >= 40) return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
    return 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200 pb-20">
      
      {/* Premium CSS Effects */}
      <style>{`
        .bg-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
        }
        .premium-glass {
          background: rgba(15, 15, 15, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-10 relative z-10">
        
        {/* Simple Navbar / Back Button */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors font-medium">
            <span>←</span> Back to Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full premium-glass text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border-red-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              Live Feed
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Scam Radar</h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Real-time monitoring of job descriptions analyzed by our AI and flagged by the community.
            </p>
          </div>
          
          <div className="text-zinc-500 text-sm font-medium">
            Showing latest {jobs.length} scans
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-zinc-400 font-medium animate-pulse">Scanning the web for recent reports...</p>
          </div>
        ) : (
          /* Radar Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <div className="col-span-full py-20 text-center premium-glass rounded-3xl">
                <span className="text-4xl mb-4 block">✅</span>
                <h3 className="text-xl font-bold text-white mb-2">All clear right now!</h3>
                <p className="text-zinc-400">No recent scams detected in the radar feed.</p>
              </div>
            ) : (
              jobs.map((job, i) => (
                <div 
                  key={i} 
                  className="premium-glass p-6 rounded-[1.5rem] group hover:-translate-y-1 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
                >
                  {/* Subtle hover glow effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/0 rounded-full blur-[50px] group-hover:bg-indigo-500/10 transition-all pointer-events-none"></div>

                  {/* Card Header (Title & Badge) */}
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-indigo-200 transition-colors">
                      {job.title}
                    </h3>
                    <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border tracking-wide ${getScoreStyle(job.score)}`}>
                      {job.score}/100
                    </span>
                  </div>

                  {/* Company Name */}
                  <p className="text-indigo-300/80 font-medium text-sm mb-5 flex items-center gap-2">
                    <span className="text-indigo-500/50">🏢</span> {job.company}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {job.tags?.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white/5 border border-white/10 text-zinc-400 px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer (Source & Time) */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                      <span>📥</span> 
                      {job.source}
                    </div>
                    <div className="text-zinc-600 text-xs font-mono">
                      {new Date(job.timestamp).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RadarFeed;
