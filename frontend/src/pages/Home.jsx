import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shieldImage from '../assets/shield.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { UserContext } from '../UserContext';
import UserModal from '../components/UserModal';

const Home = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-quint' });
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleCheckClick = () => {
    if (user) {
      navigate('/report');
    } else {
      setShowLoginNotice(true);
      setTimeout(() => {
        setShowLoginNotice(false);
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Premium CSS Effects & Text Animations */}
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
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .text-glow {
          text-shadow: 0 0 40px rgba(96, 165, 250, 0.4);
        }
        
        /* New Smooth Text Gradient Animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>

      {/* Floating Login Toast */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${showLoginNotice ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="premium-glass px-6 py-3 rounded-full flex items-center gap-3 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="font-medium text-sm text-zinc-200">Authentication required. Redirecting...</span>
        </div>
      </div>

      {/* GOD TIER NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5 h-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 w-full h-full flex items-center">
          
          <div className="flex-1 flex justify-start">
            <div className="text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all">
                <span className="text-white text-sm">🛡️</span> 
              </div>
              <span className="text-white">JobShield</span>
            </div>
          </div>
          
          <div className="flex-1 hidden md:flex justify-center items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#radar" className="hover:text-white transition-colors duration-200">Radar</a>
          </div>

          <div className="flex-1 flex justify-end items-center">
            {user ? (
              <div className="relative group">
                <div className="cursor-pointer rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" onClick={toggleModal}>
                  <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Avatar" className="w-9 h-9 rounded-full bg-black p-1" />
                </div>
                {showModal && (
                  <div className="absolute right-0 mt-4 w-56 z-50">
                    <UserModal user={user} onClose={toggleModal} />
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full premium-glass text-blue-400 text-xs font-semibold mb-8 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Platform Live for 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-6 text-glow">
            Verify. <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700">Detect.</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-text inline-block">
              Protect Your Career.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Stop guessing. Use AI-powered scanning and community intelligence to instantly verify internships before you hand over your data.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleCheckClick} className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full font-semibold text-base transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Scan a Job Now
            </button>
            <a href="#features" className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-base text-white premium-glass transition-all hover:bg-white/10">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Stats Divider */}
      <section className="border-y border-white/5 bg-zinc-950/50 backdrop-blur-sm relative z-10" id="problem">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-around items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { stat: "60,000+", label: "Scams Blocked" },
            { stat: "99.8%", label: "Detection Accuracy" },
            { stat: "24/7", label: "Community Radar" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center w-full py-4 md:py-0" data-aos="fade-up" data-aos-delay={idx * 100}>
              <h3 className="text-4xl font-bold text-white tracking-tight mb-1">{item.stat}</h3>
              <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-32 max-w-7xl mx-auto px-6 relative z-10" id="features">
        <div className="mb-16 md:text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Intelligence at your fingertips.</h2>
          <p className="text-zinc-400 text-lg">We combine large language models with crowdsourced verification to give you a definitive trust score for any job listing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 premium-glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden group" data-aos="fade-up">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Deep Analysis</h3>
              <p className="text-zinc-400 max-w-md leading-relaxed">
                Paste any job description or upload an offer letter. Our GPT engine instantly cross-references standard corporate phrasing, identifies urgency triggers, and flags missing essential data.
              </p>
            </div>
          </div>

          <div className="premium-glass p-8 rounded-[2rem] relative overflow-hidden group" data-aos="fade-up" data-aos-delay="100">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Crowdsourced Trust</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Upvote or flag reports. A community-driven trust score means scammers can't hide behind fake websites.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 premium-glass p-8 rounded-[2rem] relative overflow-hidden flex flex-col sm:flex-row items-center justify-between" data-aos="fade-up">
             <div>
                <h3 className="text-2xl font-bold text-white mb-2">Secure & Seamless</h3>
                <p className="text-zinc-400">One-click Google authentication. No passwords to forget. Fast, easy, and safe.</p>
             </div>
             <div className="mt-4 sm:mt-0 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                <span className="text-3xl">🔐</span>
             </div>
          </div>
        </div>
      </section>

      {/* NEW: THE RADAR FEED TEASER */}
      <section className="py-20 relative z-10" id="radar">
        <div className="max-w-5xl mx-auto px-6">
          <div className="premium-glass p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden group border-indigo-500/20" data-aos="zoom-in">
            {/* Radar Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Pulsing Radar Dot */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6 border border-red-500/20">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Live Scam Radar</h2>
              <p className="text-zinc-400 mb-10 max-w-2xl text-lg">
                Stay one step ahead. Access our real-time feed of the latest corporate impersonators and fake job listings flagged by our AI and community.
              </p>
              
              <Link to="/radar" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/10 hover:border-white/30 hover:scale-105">
                Access Live Radar <span className="text-indigo-400">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist CTA */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-8 relative" data-aos="zoom-in">
             <div className="absolute inset-0 bg-blue-500 rounded-full blur-[30px] opacity-50"></div>
             <img src={shieldImage} alt="Shield" className="relative w-full h-full drop-shadow-2xl" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">
            Ready to secure your future?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of students and professionals verifying their opportunities on JobShield.
          </p>
          <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Explore the Dashboard <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-white/10 bg-black py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white text-lg">🛡️</span>
            <span className="text-white font-bold tracking-tight">JobShield</span>
          </div>
          <p className="text-zinc-600 text-sm font-medium">© 2026 JobShield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
