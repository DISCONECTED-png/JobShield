import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  ShieldCheck, Cpu, Users, Radio, ArrowRight, Sparkles, AlertTriangle,
  CheckCircle2, Search, Lock, Zap, FileText, Check, ShieldAlert, FileSearch
} from 'lucide-react';
import { UserContext } from '../UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useContext(UserContext);
  const [quickSearch, setQuickSearch] = useState('');
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-quint' });
  }, []);

  const handleScanClick = (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginNotice(true);
      setTimeout(() => {
        setShowLoginNotice(false);
        navigate('/login');
      }, 1500);
      return;
    }
    // Navigate to report page with quick text prefilled or direct route
    navigate('/report', { state: { prefilledText: quickSearch } });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-50 font-sans overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">

      {/* Shared Navbar */}
      <Navbar />

      {/* Background Grids & Orbs */}
      <div className="absolute inset-0 bg-grid-cyber z-0 pointer-events-none opacity-50"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Authentication Floating Toast */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${showLoginNotice ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="cyber-glass px-6 py-3 rounded-full flex items-center gap-3 border border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.25)]">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
          <span className="font-medium text-sm text-zinc-200 font-mono">Authentication required. Redirecting to login...</span>
        </div>
      </div>

      {/* Main Content Wrap */}
      <div className="flex-1">

        {/* HERO SECTION */}
        <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">

          <div data-aos="fade-up">

            {/* Live Security Badge Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full cyber-glass text-cyan-400 text-xs font-semibold mb-8 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="font-mono uppercase tracking-wider">AI Threat Intelligence 2026</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-300">Protecting Job Seekers Worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6 font-heading">
              Detect <span className="text-gradient-cyan">Fake Jobs.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 animate-gradient-text inline-block">
                Protect Your Career.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Don't get scammed by fake internships or fraudulent offer letters. Use JobShield's AI analysis engine and community intelligence to instantly verify any job listing.
            </p>

            {/* Interactive Hero Quick-Scan Box */}
            <form onSubmit={handleScanClick} className="w-full max-w-2xl mx-auto mb-10">
              <div className="cyber-glass p-2.5 rounded-2xl md:rounded-full border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col md:flex-row items-center gap-3">
                <div className="flex items-center gap-3 px-4 py-2 w-full md:w-auto flex-1">
                  <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Paste job link, company name, or email text..."
                    className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-zinc-500 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto btn-cyan px-8 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Scan Job Now</span>
                </button>
              </div>
            </form>

            {/* Secondary Link Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <Link
                to="/dashboard"
                className="btn-glass px-6 py-3 rounded-full flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Explore Community Scams</span>
              </Link>

              <Link
                to="/radar"
                className="btn-glass px-6 py-3 rounded-full flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span>Live Scam Radar</span>
              </Link>
            </div>

          </div>

        </section>

        {/* STATS DIVIDER BAR */}
        <section className="border-y border-white/10 bg-slate-950/60 backdrop-blur-md relative z-10" id="stats">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "60,000+", label: "Scams Flagged", icon: ShieldAlert, color: "text-rose-400" },
              { stat: "99.8%", label: "Detection Accuracy", icon: Cpu, color: "text-cyan-400" },
              { stat: "24/7", label: "Realtime Radar", icon: Radio, color: "text-indigo-400" },
              { stat: "100%", label: "Free & Anonymous", icon: Lock, color: "text-emerald-400" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading">{item.stat}</h3>
                  <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BENTO GRID FEATURES SECTION */}
        <section className="py-28 max-w-7xl mx-auto px-6 relative z-10" id="features">
          <div className="mb-16 text-center max-w-3xl mx-auto" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-cyan-500/20">
              <Zap className="w-3.5 h-3.5" /> Core Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
              Next-Gen Threat Prevention Engine.
            </h2>
            <p className="text-zinc-400 text-lg">
              We combine AI language models, domain analysis, and crowdsourced reports to provide a definitive trust score for any offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Bento Card 1: AI Deep Analysis */}
            <div className="md:col-span-2 cyber-glass cyber-glass-hover p-8 md:p-10 rounded-3xl relative overflow-hidden group border-cyan-500/20" data-aos="fade-up">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] group-hover:bg-cyan-500/20 transition-all duration-700 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Cpu className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-heading">GPT Deep Text Analysis</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xl text-sm md:text-base">
                  Our custom prompt pipeline cross-references job descriptions for red flag patterns—identifying urgency tactics, non-existent corporate domains, request for payment, and generic recruiter phrasing in seconds.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">Urgency Detection</span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-emerald-300">Domain Verification</span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-indigo-300">Payment Request Flag</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Crowdsourced Trust */}
            <div className="cyber-glass cyber-glass-hover p-8 rounded-3xl relative overflow-hidden group border-indigo-500/20" data-aos="fade-up" data-aos-delay="100">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading">Crowdsourced Radar</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Community members vote and add evidence to flagged postings, ensuring bad actors cannot hide behind brand-new domains.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>Upvote & Downvote Verification</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Bento Card 3: Offer Letter Screenshot OCR */}
            <div className="cyber-glass cyber-glass-hover p-8 rounded-3xl relative overflow-hidden group border-emerald-500/20" data-aos="fade-up" data-aos-delay="200">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <FileSearch className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading">Offer Letter OCR Scan</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Got a suspicious PDF or image offer letter? Upload the screenshot and our Tesseract OCR extracts the raw text for deep scam verification.
                </p>
              </div>
            </div>

            {/* Bento Card 4: Enterprise Privacy */}
            <div className="md:col-span-2 cyber-glass cyber-glass-hover p-8 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between border-slate-700/50" data-aos="fade-up" data-aos-delay="300">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-heading">100% Anonymous & Secure</h3>
                <p className="text-zinc-400 text-sm max-w-md">One-click Google authentication with zero tracking of your personal application data.</p>
              </div>
              <div className="mt-4 sm:mt-0 w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Lock className="w-8 h-8" />
              </div>
            </div>

          </div>
        </section>

        {/* COMMON SCAM RED FLAGS GUIDE */}
        <section className="py-24 bg-slate-950/40 relative z-10 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-heading">
                Know The Warning Signals
              </h2>
              <p className="text-zinc-400 text-base">
                Scammers target students with fake remote internships. Watch out for these 4 common red flags.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Upfront Laptop/Gear Fees", desc: "They send a fake check and ask you to Zelle or wire money to buy 'required office supplies' from their vendor.", icon: ShieldAlert, badge: "High Risk" },
                { title: "Telegram/WhatsApp Interviews", desc: "No video or voice interview. The entire hiring process takes place over text messages or Telegram chats.", icon: AlertTriangle, badge: "Severe" },
                { title: "Generic @gmail/@yahoo HR Email", desc: "The recruiter uses a free webmail address instead of an official company corporate domain (@company.com).", icon: FileText, badge: "Common" },
                { title: "Immediate Urgency & Cash Demand", desc: "You are hired immediately within 10 minutes of applying with zero technical evaluation.", icon: Zap, badge: "Critical" }
              ].map((flag, i) => (
                <div key={i} className="cyber-glass p-6 rounded-2xl border border-rose-500/20 relative" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <flag.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {flag.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-heading">{flag.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{flag.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* LIVE RADAR FEED TEASER */}
        <section className="py-28 relative z-10" id="radar-teaser">
          <div className="max-w-5xl mx-auto px-6">
            <div className="cyber-glass p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden group border-indigo-500/30 shadow-[0_0_80px_rgba(99,102,241,0.15)]" data-aos="zoom-in">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-6 animate-radar-pulse">
                  <Radio className="w-8 h-8" />
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white font-heading tracking-tight">
                  Realtime Scam Radar
                </h2>
                <p className="text-zinc-400 mb-10 max-w-2xl text-base md:text-lg leading-relaxed">
                  Access our continuous monitoring stream of corporate impersonators and fake listings analyzed by our AI engine.
                </p>

                <Link
                  to="/radar"
                  className="btn-cyan px-8 py-4 rounded-full font-bold text-base flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  <span>Access Live Radar Feed</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px] shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              <div className="w-full h-full bg-slate-950 rounded-3xl flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white font-heading">
              Ready to verify your next offer?
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-lg mx-auto">
              Join thousands of job seekers verifying opportunities before sharing personal information.
            </p>

            <Link
              to="/report"
              className="btn-cyan px-8 py-4 rounded-full font-bold text-base inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Scan a Job Listing Now</span>
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};

export default Home;