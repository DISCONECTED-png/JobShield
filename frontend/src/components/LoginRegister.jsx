import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { ShieldCheck, Mail, Lock, User, ArrowLeft, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE_URL } from '../config';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const url = isRegister
      ? `${BASE_URL}/api/auth/register`
      : `${BASE_URL}/api/auth/login`;

    const payload = isRegister
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        setError(data.msg || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err.message);
      setError('Server unreachable. Please check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await fetch(`${BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        setError(data.msg || 'Google login failed.');
      }
    } catch (err) {
      console.error(err.message);
      setError('Google authentication was cancelled or failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">

      <Navbar />

      {/* Background Glow Orbs */}
      <div className="absolute inset-0 bg-grid-cyber z-0 pointer-events-none opacity-40"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 relative z-10">

        {/* Auth Container Card */}
        <div className="cyber-glass rounded-3xl p-8 md:p-12 w-full max-w-md relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border-cyan-500/20">

          {/* Top Decorative Scanning Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500"></div>

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white font-heading">
              {isRegister ? 'Join JobShield' : 'Welcome Back'}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {isRegister
                ? 'Create a free account to report scams & scan listings.'
                : 'Sign in to access community trust scores and radar alerts.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950/80 border border-white/10 mb-8 text-sm font-semibold">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`py-2.5 rounded-lg transition-all ${!isRegister ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'text-zinc-400 hover:text-white'
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`py-2.5 rounded-lg transition-all ${isRegister ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'text-zinc-400 hover:text-white'
                }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm font-medium animate-[fadeIn_0.3s_ease-out]">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Alex Johnson"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="cyber-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-zinc-600 font-medium"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="cyber-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-zinc-600 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="cyber-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-zinc-600 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-cyan py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 mt-4 flex justify-center items-center gap-2 text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{isRegister ? 'Create JobShield Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            disabled={isLoading}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 py-3.5 rounded-xl text-white font-medium hover:bg-white/5 transition-all disabled:opacity-50 group cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-5 h-5 group-hover:scale-110 transition-transform"
            />
            <span>Continue with Google</span>
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginRegister;