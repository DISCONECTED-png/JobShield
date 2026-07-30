import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Lock, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#02050e] relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">JobShield</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Autonomous AI platform detecting fake job postings, scam offer letters, and corporate impersonators to protect student careers.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400/80 font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Community Intelligence</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-heading">Platform</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home Overview</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Public Scam Reports</Link>
              </li>
              <li>
                <Link to="/radar" className="hover:text-cyan-400 transition-colors">Live Scam Radar</Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-cyan-400 transition-colors">Scan Job or Offer Letter</Link>
              </li>
            </ul>
          </div>

          {/* Scam Types Identified */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-heading">Threat Protection</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>Telegram & WhatsApp Interviews</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Check Cashing / Laptop Fees</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Impersonated Domain Names</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Upfront Registration Fees</span>
              </li>
            </ul>
          </div>

          {/* Realtime Stats Badge */}
          <div className="cyber-glass p-5 rounded-2xl border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Radar Intelligence</span>
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <p className="text-2xl font-extrabold text-white font-heading">99.8%</p>
              <p className="text-xs text-zinc-400 mt-1">Scam Detection Accuracy via GPT Engine</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
              <span>Status: Active</span>
              <span className="text-emerald-400 font-bold">● Systems Normal</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© 2026 JobShield AI Threat Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Built for Student Protection <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
