import React from "react";
import { User, LogOut, ShieldCheck, Mail, Calendar, Key, X } from "lucide-react";

const UserModal = ({ user, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="cyber-glass rounded-2xl p-5 border border-cyan-500/30 shadow-[0_15px_50px_rgba(0,0,0,0.9)] w-72 relative overflow-hidden animate-[fadeIn_0.2s_ease-out]">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-[50px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <User className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              Verified User
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="text-zinc-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* User Info */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-white tracking-tight truncate font-heading">{user.name}</h2>
        <p className="text-zinc-400 text-xs font-medium truncate flex items-center gap-1.5 mt-0.5">
          <Mail className="w-3 h-3 text-zinc-500" />
          {user.email}
        </p>
      </div>

      {/* Details List */}
      <div className="space-y-2 mb-5">
        <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <Key className="w-3 h-3 text-cyan-500" /> ID
          </span>
          <span className="text-xs font-mono text-zinc-300 truncate max-w-[120px]">{user._id}</span>
        </div>
        
        {user.createdAt && (
          <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-500" /> Joined
            </span>
            <span className="text-xs text-zinc-300 font-medium font-mono">
              {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        )}
      </div>

      {/* Sign Out Button */}
      <button 
        className="w-full py-2.5 rounded-xl font-bold text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all duration-300 flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.1)]" 
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );
};

export default UserModal;