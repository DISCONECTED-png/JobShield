import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sparkles, ShieldCheck, AlertTriangle, UploadCloud, X, FileText,
  Building, Link as LinkIcon, CheckCircle2, ShieldAlert, Cpu, Loader2, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config';

const SubmitJobReport = () => {
  const location = useLocation();
  const prefilledText = location.state?.prefilledText || '';

  const [form, setForm] = useState({
    title: '',
    company: '',
    link: '',
    description: prefilledText
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const resultRef = useRef(null);

  const scanStepsMessages = [
    "Analyzing corporate syntax & email headers...",
    "Cross-referencing domain age & trust metrics...",
    "Scanning for payment requests & urgency triggers...",
    "Calculating final AI Scam Probability Score..."
  ];

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
      setError('Authentication required. Please sign in to analyze and submit a report.');
      return;
    }

    setLoading(true);
    setScanStep(0);

    // Simulate progress steps interval for scanner feel
    const stepInterval = setInterval(() => {
      setScanStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 600);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('company', form.company);
      formData.append('link', form.link);
      formData.append('description', form.description);
      if (image) formData.append('image', image);

      const res = await fetch(`${API_BASE_URL}/api/jobs/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.msg || 'Failed to analyze report. Please check details.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      clearInterval(stepInterval);
      setError('Server unreachable. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);

  const getResultStyles = (score) => {
    if (score >= 75) return {
      card: "bg-rose-500/10 border-rose-500/30 shadow-[0_0_40px_rgba(244,63,94,0.2)]",
      text: "text-rose-400",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      icon: ShieldAlert,
      verdict: "🚫 High Risk / Fraudulent Offer"
    };
    if (score >= 50) return {
      card: "bg-amber-500/10 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)]",
      text: "text-amber-400",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      icon: AlertTriangle,
      verdict: "⚠️ Suspicious / Exercise Caution"
    };
    return {
      card: "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]",
      text: "text-emerald-400",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      icon: CheckCircle2,
      verdict: "✅ Likely Legitimate Posting"
    };
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">

      <Navbar />

      {/* Background FX */}
      <div className="absolute inset-0 bg-grid-cyber z-0 pointer-events-none opacity-40"></div>
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">

        {/* Main Card */}
        <div className="cyber-glass rounded-3xl p-8 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)] border-emerald-500/20">

          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <Cpu className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3 font-heading">
              AI Job & Offer <span className="text-gradient-emerald">Scanner</span>
            </h1>
            <p className="text-zinc-400 text-base max-w-xl mx-auto">
              Paste the job details or upload a screenshot offer letter. Our GPT engine will analyze it for red flags.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm font-medium">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Job Title *</label>
                <div className="relative">
                  <FileText className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="title"
                    placeholder="e.g. Remote Data Entry Assistant"
                    value={form.title}
                    onChange={handleChange}
                    className="cyber-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-zinc-600 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Company Name</label>
                <div className="relative">
                  <Building className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="company"
                    placeholder="e.g. Global Tech Solutions LLC"
                    value={form.company}
                    onChange={handleChange}
                    className="cyber-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-zinc-600 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Job Link */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Job URL / Listing Link (Optional)</label>
              <div className="relative">
                <LinkIcon className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  name="link"
                  placeholder="https://..."
                  value={form.link}
                  onChange={handleChange}
                  className="cyber-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-zinc-600 font-medium"
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Job Description or Email Contents</label>
              <textarea
                name="description"
                placeholder="Paste the job description, interview email, or recruiter text here..."
                rows="6"
                value={form.description}
                onChange={handleChange}
                className="cyber-input w-full p-4 rounded-xl text-white placeholder-zinc-600 font-medium resize-y"
              ></textarea>
            </div>

            {/* Drag & Drop Screenshot Upload */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">
                Upload Screenshot / Offer Letter Image (Optional OCR Analysis)
              </label>

              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-zinc-500 group-hover:text-emerald-400 mb-2 transition-colors" />
                    <p className="text-sm text-zinc-300 font-semibold group-hover:text-emerald-300">Click or drag image offer letter</p>
                    <p className="text-xs text-zinc-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              ) : (
                <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 group bg-slate-950">
                  <img src={preview} alt="preview" className="w-full h-auto max-h-48 object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={clearImage}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Remove Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-cyan py-4 rounded-xl font-bold transition-all disabled:opacity-50 mt-4 flex justify-center items-center gap-3 text-lg cursor-pointer"
            >
              {loading ? (
                <div className="flex flex-col items-center py-1">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Scanning Listing...</span>
                  </div>
                  <span className="text-xs text-cyan-200 font-mono mt-1 font-normal animate-pulse">
                    {scanStepsMessages[scanStep]}
                  </span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Analyze & Submit Job Report</span>
                </>
              )}
            </button>

          </form>

          {/* AI Result Report Card */}
          {result && (
            <div
              ref={resultRef}
              className={`mt-12 p-8 rounded-3xl border transition-all duration-500 ${getResultStyles(result.scamScore || 0).card}`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-zinc-200 mb-2 border border-white/10">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    GPT Engine Scan Complete
                  </div>
                  <h2 className="text-2xl font-bold text-white font-heading">
                    Analysis Report Result
                  </h2>
                </div>

                {/* Score Dial */}
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-bold mb-0.5">Scam Risk Score</p>
                    <p className={`text-4xl font-extrabold font-heading ${getResultStyles(result.scamScore || 0).text}`}>
                      {result.scamScore || 0}<span className="text-base text-zinc-600 font-mono">/100</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verdict Pill */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">Verdict:</span>
                <span className={`px-4 py-2 rounded-full font-bold text-xs border tracking-wide inline-flex items-center gap-2 ${getResultStyles(result.scamScore || 0).badge}`}>
                  {getResultStyles(result.scamScore || 0).verdict}
                </span>
              </div>

              {/* Red Flags List */}
              {result.scamReasons?.length > 0 && (
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" /> Identified Red Flags:
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {result.scamReasons.map((reason, idx) => (
                      <span key={idx} className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <span>{reason}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default SubmitJobReport;