import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

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

  const BASE_URL = 'https://jobshield-backend.onrender.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when typing
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
        setError(data.msg || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      setError('Server unreachable. Something went wrong.');
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
    <div className="min-h-screen bg-black text-zinc-50 font-sans flex items-center justify-center relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 py-12 px-6">
      
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
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Back to Home Link */}
      <Link to="/" className="absolute top-8 left-8 text-zinc-400 hover:text-white flex items-center gap-2 transition-colors z-20 font-medium">
        <span>←</span> Back
      </Link>

      {/* Auth Card */}
      <div className="premium-glass rounded-[2rem] p-8 md:p-12 w-full max-w-md relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Logo Teaser */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <span className="text-white text-xl">🛡️</span> 
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            {isRegister ? 'Create an account' : 'Welcome back'}
          </h2>
          <p className="text-zinc-400 text-sm">
            {isRegister ? 'Join the community and stay protected.' : 'Enter your details to access your dashboard.'}
          </p>
        </div>

        {/* Custom Error Message (Replaces standard alerts) */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <span className="text-red-400 mt-0.5">⚠️</span>
            <p className="text-sm text-red-200 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-premium w-full px-5 py-3.5 rounded-xl text-white placeholder-zinc-600"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-premium w-full px-5 py-3.5 rounded-xl text-white placeholder-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-premium w-full px-5 py-3.5 rounded-xl text-white placeholder-zinc-600"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              isRegister ? 'Sign Up' : 'Sign In'
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
          <span className="text-zinc-500 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
        </div>

        <button 
          onClick={handleGoogle} 
          disabled={isLoading}
          type="button"
          className="w-full flex items-center justify-center gap-3 input-premium py-3.5 rounded-xl text-white font-medium hover:bg-white/5 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
            alt="Google"
            className="w-5 h-5 group-hover:scale-110 transition-transform"
          />
          <span>Continue with Google</span>
        </button>

        <div className="mt-8 text-center">
          <p className="text-zinc-400 text-sm">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button 
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setFormData({ name: '', email: '', password: '' });
              }} 
              className="text-white font-semibold hover:text-blue-400 transition-colors underline decoration-white/30 hover:decoration-blue-400/50 underline-offset-4"
            >
              {isRegister ? 'Sign in instead' : 'Create one now'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;
