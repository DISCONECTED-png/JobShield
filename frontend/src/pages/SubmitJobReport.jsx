import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SubmitJobReport = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    link: '',
    description: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 1. Create a reference for the result card
  const resultRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please sign in to submit a report.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('company', form.company);
      formData.append('link', form.link);
      formData.append('description', form.description);
      if (image) formData.append('image', image);

      const res = await fetch('https://jobshield-backend.onrender.com/api/jobs/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.msg || 'Failed to analyze the report. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Server unreachable. Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Watch for the result to appear, then smoothly scroll to it
  useEffect(() => {
    if (result && resultRef.current) {
      // Small timeout ensures the DOM has fully painted the card before scrolling
      setTimeout(() => {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);

  // Dynamic Score Logic for AI Results
  const getResultStyles = (score) => {
    if (score > 75) return {
      card: "bg-red-500/10 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]",
      text: "text-red-400",
      badge: "bg-red-500/20 text-red-300 border-red-500/30",
      verdict: "🚫 Likely Scam"
    };
    if (score > 50) return {
      card: "bg-amber-500/10 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      text: "text-amber-400",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      verdict: "⚠️ Suspicious"
    };
    return {
      card: "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      text: "text-emerald-400",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      verdict: "✅ Likely Legit"
    };
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 py-12 px-6">
      
      {/* Premium CSS Effects */}
      <style>{`
        .bg-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
        .premium-glass {
          background: rgba(15, 15, 15, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .input-premium {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .input-premium:focus {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
          outline: none;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 pt-8">
        
        {/* Back Link */}
        <Link to="/" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors font-medium w-max mb-8">
          <span>←</span> Back to Dashboard
        </Link>

        {/* Main Form Card */}
        <div className="premium-glass rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              AI Job <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Scanner</span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Paste the details or upload an offer letter. Our engine will cross-reference it for red flags.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <span className="text-red-400 mt-0.5">⚠️</span>
              <p className="text-sm text-red-200 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Job Title *</label>
                <input
                  name="title"
                  placeholder="e.g. Remote Data Entry Clerk"
                  value={form.title}
                  onChange={handleChange}
                  className="input-premium w-full px-5 py-4 rounded-xl text-white placeholder-zinc-600 font-medium"
                  required
                />
              </div>

              {/* Company Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Company Name</label>
                <input
                  name="company"
                  placeholder="e.g. Global Tech Solutions"
                  value={form.company}
                  onChange={handleChange}
                  className="input-premium w-full px-5 py-4 rounded-xl text-white placeholder-zinc-600 font-medium"
                />
              </div>
            </div>

            {/* Link Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Job Link (Optional)</label>
              <input
                name="link"
                placeholder="https://..."
                value={form.link}
                onChange={handleChange}
                className="input-premium w-full px-5 py-4 rounded-xl text-white placeholder-zinc-600 font-medium"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Job Description</label>
              <textarea
                name="description"
                placeholder="Paste the full job description or email contents here..."
                rows="6"
                value={form.description}
                onChange={handleChange}
                className="input-premium w-full px-5 py-4 rounded-xl text-white placeholder-zinc-600 font-medium resize-y"
              ></textarea>
            </div>

            {/* Premium File Upload Zone */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Upload Screenshot / Offer Letter (Optional)</label>
              
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 text-zinc-500 group-hover:text-blue-400 mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="text-sm text-zinc-400 group-hover:text-blue-300 font-medium">Click to upload an image</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              ) : (
                <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-xl overflow-hidden border border-white/10 group">
                  <img src={preview} alt="preview" className="w-full h-auto object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      type="button" 
                      onClick={clearImage}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex justify-center items-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">✨</span>
                  Analyze & Submit Report
                </>
              )}
            </button>
          </form>

          {/* AI Result Card - 3. Attach the ref right here! */}
          {result && (
            <div 
              ref={resultRef} 
              className={`mt-10 p-8 rounded-2xl border transition-all duration-500 animate-[fadeIn_0.5s_ease-out] ${getResultStyles(result.scamScore).card}`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    🤖 AI Analysis Complete
                  </h2>
                  <p className="text-zinc-400 mt-1">Based on our GPT cross-referencing model.</p>
                </div>
                
                {/* Big Score Box */}
                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Trust Score</p>
                    <p className={`text-4xl font-black ${getResultStyles(result.scamScore).text}`}>
                      {result.scamScore}<span className="text-lg text-zinc-600">/100</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-zinc-400 font-medium mr-3">Verdict:</span>
                <span className={`px-4 py-1.5 rounded-full font-bold text-sm border tracking-wide inline-flex items-center gap-2 ${getResultStyles(result.scamScore).badge}`}>
                  {getResultStyles(result.scamScore).verdict}
                </span>
              </div>

              {result.scamReasons?.length > 0 && (
                <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Detected Red Flags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.scamReasons.map((reason, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/10 text-zinc-300 px-3 py-1.5 rounded-lg text-sm font-medium">
                        ⚠️ {reason}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SubmitJobReport;
