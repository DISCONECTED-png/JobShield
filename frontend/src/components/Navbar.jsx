import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Radio, Search, AlertTriangle, User as UserIcon, LogIn, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../UserContext';
import UserModal from './UserModal';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleModal = () => setShowModal(!showModal);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: null,
      activeTextColor: 'text-cyan-300',
      pillStyle: 'bg-cyan-500/20 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
    },
    {
      path: '/dashboard',
      label: 'Public Scams',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
      activeTextColor: 'text-amber-300',
      pillStyle: 'bg-amber-500/20 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    },
    {
      path: '/radar',
      label: 'Live Radar',
      icon: <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />,
      activeTextColor: 'text-indigo-300',
      pillStyle: 'bg-indigo-500/20 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.25)]',
    },
    {
      path: '/report',
      label: 'AI Scanner',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      activeTextColor: 'text-emerald-300',
      pillStyle: 'bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] group-hover:scale-105 transition-all duration-300">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-heading block">JobShield</span>
            <p className="text-[11px] text-zinc-400 font-medium tracking-wide">Threat Intelligence</p>
          </div>
        </Link>

        {/* Desktop Nav Links with Animated Active Pill */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-900/60 p-1.5 rounded-full border border-white/10 text-sm font-medium relative">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2 ${
                  active ? item.activeTextColor : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavbarTabPill"
                    className={`absolute inset-0 rounded-full border ${item.pillStyle}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right Section: Status Indicator & User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleModal}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px] shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-white max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>

              {showModal && (
                <div className="absolute right-0 mt-3 w-64 z-50">
                  <UserModal user={user} onClose={toggleModal} />
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-cyan px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <button
              onClick={toggleModal}
              className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#030712]/95 border-b border-white/10 px-6 py-6 space-y-4 overflow-hidden"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-4 rounded-xl font-medium ${isActive('/') ? 'bg-cyan-500/20 text-cyan-400' : 'text-zinc-300'}`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-4 rounded-xl font-medium ${isActive('/dashboard') ? 'bg-amber-500/20 text-amber-400' : 'text-zinc-300'}`}
            >
              Public Scams
            </Link>
            <Link
              to="/radar"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-4 rounded-xl font-medium ${isActive('/radar') ? 'bg-indigo-500/20 text-indigo-400' : 'text-zinc-300'}`}
            >
              Scam Radar
            </Link>
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-4 rounded-xl font-medium ${isActive('/report') ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-300'}`}
            >
              AI Scanner
            </Link>
            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-cyan py-3 rounded-xl font-bold flex justify-center items-center gap-2 mt-4"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile User Modal Popup */}
      {showModal && (
        <div className="md:hidden fixed top-24 right-4 z-50">
          <UserModal user={user} onClose={toggleModal} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
