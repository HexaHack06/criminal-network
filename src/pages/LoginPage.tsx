import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Shield, Eye, EyeOff, ArrowRight, Lock, User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('priya.menon@siu.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  // Animated network nodes for the background
  const nodes = [
    { x: 20, y: 30 }, { x: 40, y: 60 }, { x: 65, y: 25 }, { x: 75, y: 70 },
    { x: 50, y: 45 }, { x: 15, y: 70 }, { x: 85, y: 45 }, { x: 30, y: 85 },
  ];
  const edges = [
    [0,4],[1,4],[2,4],[3,4],[3,6],[5,1],[7,1],[6,3],[0,1],[2,6]
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-[55%] bg-slate-900 relative overflow-hidden">
        {/* SVG Network Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map(([a,b], i) => (
            <motion.line
              key={i}
              x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
              x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
              stroke="#3b82f6" strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={`${n.x}%`} cy={`${n.y}%`} r="1.2"
              fill="#60a5fa"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-900/60 to-violet-950/80" />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
              <Network size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-lg leading-tight">Netra Intelligence</div>
              <div className="text-blue-300 text-xs">AI-Powered Criminal Network Analysis Platform</div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                Intelligent <br />
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Criminal Network
                </span><br />
                Analysis
              </h1>
              <p className="text-slate-400 text-[15px] leading-relaxed max-w-md mb-10">
                Uncover hidden connections, detect patterns, and drive evidence-based investigation through advanced AI-powered network analysis and knowledge graph technology.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Network size={14} />, text: 'Automated entity & relationship extraction from heterogeneous data sources' },
                  { icon: <Shield size={14} />, text: 'Explainable AI with full evidence traceability for every insight' },
                  { icon: <CheckCircle size={14} />, text: 'Cross-case intelligence and community detection across investigations' },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                  >
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                      {f.icon}
                    </div>
                    <span className="text-slate-400 text-[13px] leading-snug">{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="text-slate-600 text-[11px]">
            Netra Intelligence Platform v2.4.1 · SIH26189 Prototype Demo
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Network size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-base">Netra Intelligence</div>
            </div>
          </div>

          {/* Demo label */}
          <div className="mb-6 inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-700 text-[11px] font-semibold">Demo Environment · SIH26189</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Sign In</h2>
          <p className="text-slate-500 text-[13.5px] mb-8">Access the investigation platform with your credentials.</p>

          <div className="space-y-4">
            {/* User ID */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-600 mb-1.5">Investigator ID / Email</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-lg text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                />
                <span className="text-[13px] text-slate-600">Remember me</span>
              </label>
              <button className="text-[12.5px] text-blue-600 hover:underline font-medium">Forgot password?</button>
            </div>

            {/* Sign In Button */}
            <motion.button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg text-[14px] flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </motion.button>
          </div>

          <div className="mt-8 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-[11.5px] text-slate-500 font-medium mb-1">Demo credentials</div>
            <div className="text-[11px] text-slate-400">Email: priya.menon@siu.gov.in</div>
            <div className="text-[11px] text-slate-400">Password: any value</div>
          </div>

          <div className="mt-6 text-[11px] text-slate-400 text-center">
            This is a prototype demonstration system.<br />
            All data is synthetic and for demonstration purposes only.
          </div>
        </motion.div>
      </div>
    </div>
  );
};
