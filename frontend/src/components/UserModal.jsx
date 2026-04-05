import React from "react";

const UserModal = ({ user, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] w-64 relative overflow-hidden animate-[fadeIn_0.2s_ease-out]">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -z-10 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px] shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" 
            alt="avatar" 
            className="w-full h-full rounded-full bg-black object-cover" 
          />
        </div>
        <button 
          onClick={onClose}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="mb-5">
        <h2 className="text-lg font-bold text-white tracking-tight truncate">{user.name}</h2>
        <p className="text-zinc-400 text-xs font-medium truncate">{user.email}</p>
      </div>

      <div className="space-y-2 mb-5">
        <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-bold uppercase">ID</span>
          <span className="text-xs font-mono text-zinc-300 truncate max-w-[100px]">{user._id}</span>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-bold uppercase">Joined</span>
          <span className="text-xs text-zinc-300 font-medium">
            {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      <button 
        className="w-full py-2.5 rounded-lg font-bold text-sm text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300 flex justify-center items-center gap-2" 
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserModal;
