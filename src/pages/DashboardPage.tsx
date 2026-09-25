import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen, Users, Network, AlertTriangle, FileText,
  ChevronRight, ArrowUpRight, ArrowDownRight, Activity, Shield, ChevronDown, Check
} from 'lucide-react';
import { KPICard } from '../components/shared/KPICard';
import { cases, alerts, activityChartData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-3 text-[12px] min-w-[150px]">
        <p className="font-bold text-slate-800 mb-1.5 pb-1 border-b border-slate-100">{label}</p>
        <div className="space-y-1">
          {payload.map((p: any) => (
            <div key={p.name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                <span className="text-slate-500 capitalize">{p.name}</span>
              </div>
              <span className="font-bold text-slate-900">{p.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState('Operation Crimson Ledger');
  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);

  // 5 KPI cards matching the uploaded reference image exactly
  const kpis = [
    {
      label: 'Active Cases',
      value: '24',
      icon: <FolderOpen size={18} className="text-blue-600" />,
      iconBg: 'bg-blue-50',
      accentColor: '#2563eb', // Blue
      trend: 8,
      subtitle: '5 critical priority',
      onClick: () => navigate('/cases')
    },
    {
      label: 'Entities Analysed',
      value: '12,486',
      icon: <Users size={18} className="text-purple-600" />,
      iconBg: 'bg-purple-50',
      accentColor: '#9333ea', // Purple
      trend: 14,
      subtitle: '3,421 this month',
      onClick: () => navigate('/entities')
    },
    {
      label: 'Network Relationships',
      value: '31,742',
      icon: <Network size={18} className="text-emerald-600" />,
      iconBg: 'bg-emerald-50',
      accentColor: '#10b981', // Emerald
      trend: 22,
      subtitle: '1,847 new this week',
      onClick: () => navigate('/network')
    },
    {
      label: 'Investigation Indicators',
      value: '186',
      icon: <AlertTriangle size={18} className="text-amber-600" />,
      iconBg: 'bg-amber-50',
      accentColor: '#f59e0b', // Amber
      trend: -5,
      subtitle: '28 unresolved',
      onClick: () => navigate('/patterns')
    },
    {
      label: 'Evidence Records',
      value: '8,421',
      icon: <FileText size={18} className="text-cyan-600" />,
      iconBg: 'bg-cyan-50',
      accentColor: '#06b6d4', // Cyan
      trend: 11,
      subtitle: '412 pending review',
      onClick: () => navigate('/evidence')
    },
  ];

  // Specific 4 investigation indicators matching the uploaded reference image
  const indicators = [
    {
      severity: 'Critical',
      title: 'Rapid Transaction Cluster',
      meta: 'CASE-1024 · 2026-09-12',
      path: '/patterns'
    },
    {
      severity: 'High',
      title: 'Shared Phone Association',
      meta: 'CASE-1024 · 2026-09-15',
      path: '/patterns'
    },
    {
      severity: 'High',
      title: 'Repeated Location Overlap',
      meta: 'CASE-1017 · 2026-09-16',
      path: '/patterns'
    },
    {
      severity: 'Critical',
      title: 'Cross-Case Relationship',
      meta: 'CASE-1008 · 2026-09-18',
      path: '/cross-case'
    }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Hero Banner Header matching uploaded reference design */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Subtle Decorative Network Mesh Graph Illustration in Top Right */}
        <div className="absolute right-0 top-0 bottom-0 w-[420px] pointer-events-none opacity-45 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 420 160" fill="none">
            <line x1="200" y1="35" x2="250" y2="85" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3"/>
            <line x1="250" y1="85" x2="310" y2="45" stroke="#93c5fd" strokeWidth="1.2"/>
            <line x1="250" y1="85" x2="295" y2="115" stroke="#93c5fd" strokeWidth="1.2"/>
            <line x1="310" y1="45" x2="365" y2="75" stroke="#818cf8" strokeWidth="1.2"/>
            <line x1="295" y1="115" x2="355" y2="125" stroke="#93c5fd" strokeWidth="1.2"/>
            <line x1="365" y1="75" x2="400" y2="35" stroke="#93c5fd" strokeWidth="1.2"/>
            <line x1="310" y1="45" x2="355" y2="125" stroke="#bfdbfe" strokeWidth="0.8"/>
            <circle cx="200" cy="35" r="3.5" fill="#60a5fa" fillOpacity="0.8"/>
            <circle cx="250" cy="85" r="5" fill="#3b82f6"/>
            <circle cx="310" cy="45" r="4" fill="#6366f1"/>
            <circle cx="295" cy="115" r="3.5" fill="#3b82f6"/>
            <circle cx="365" cy="75" r="4.5" fill="#4f46e5"/>
            <circle cx="355" cy="125" r="3.5" fill="#60a5fa"/>
            <circle cx="400" cy="35" r="3" fill="#93c5fd"/>
          </svg>
        </div>

        {/* Title & Subtitle */}
        <div className="relative z-10">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
            INVESTIGATION DASHBOARD
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Investigation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Overview</span>
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-1 font-medium">
            Monitor cases, network activity and intelligence indicators.
          </p>
        </div>

        {/* Right side: Dropdown & Last Updated Status */}
        <div className="flex flex-col md:items-end gap-2 relative z-10">
          <div className="relative">
            <button
              onClick={() => setCaseDropdownOpen(!caseDropdownOpen)}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl px-4 py-2 text-[13px] font-medium text-slate-800 flex items-center gap-2.5 shadow-xs transition-colors cursor-pointer"
            >
              <Shield size={14} className="text-slate-500" />
              <span>{selectedCase}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            <AnimatePresence>
              {caseDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setCaseDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute right-0 top-11 bg-white border border-slate-200 rounded-xl shadow-xl z-30 w-64 overflow-hidden py-1"
                  >
                    {cases.map(c => (
                      <button
                        key={c.id}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-[12.5px] text-left hover:bg-slate-50 transition-colors ${
                          selectedCase === c.name ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                        }`}
                        onClick={() => {
                          setSelectedCase(c.name);
                          setCaseDropdownOpen(false);
                        }}
                      >
                        <span className="truncate">{c.name}</span>
                        {selectedCase === c.name && <Check size={14} className="text-blue-600" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400 font-medium">
            <span>Last updated</span>
            <span className="font-semibold text-slate-600">Just now</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 ml-0.5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 5 KPI Cards Row matching uploaded design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
          >
            <KPICard {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Middle Section: Chart & Investigation Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Network Intelligence Activity AreaChart */}
        <div className="lg:col-span-2 bg-white border border-slate-100/90 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Activity size={17} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-[15px]">Network Intelligence Activity</h2>
                <p className="text-[12px] text-slate-400 mt-0.5">Events, entities and transactions detected — September 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[11.5px] font-bold self-start sm:self-auto">
              <ArrowUpRight size={13} strokeWidth={2.5} />
              <span>18% this week</span>
            </div>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={{ stroke: '#f1f5f9' }}
                  tickLine={false}
                />
                <YAxis
                  ticks={[0, 15, 30, 45, 60]}
                  domain={[0, 65]}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="events"
                  name="Events"
                  stroke="#9333ea"
                  strokeWidth={2.2}
                  fill="url(#purpleGrad)"
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#9333ea' }}
                />
                <Area
                  type="monotone"
                  dataKey="entities"
                  name="Entities"
                  stroke="#2563eb"
                  strokeWidth={2.2}
                  fill="url(#blueGrad)"
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#2563eb' }}
                />
                <Area
                  type="monotone"
                  dataKey="transactions"
                  name="Transactions"
                  stroke="#0d9488"
                  strokeWidth={2.2}
                  fill="url(#tealGrad)"
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#0d9488' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Clean Bottom Legend matching reference design */}
          <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100/80 text-[12px] font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
              <span>Entities</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9333ea]" />
              <span>Events</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
              <span>Transactions</span>
            </div>
          </div>
        </div>

        {/* Right: Investigation Indicators matching reference image */}
        <div className="bg-white border border-slate-100/90 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle size={15} />
                </div>
                <h2 className="font-bold text-slate-900 text-[15px]">Investigation Indicators</h2>
              </div>
              <button
                onClick={() => navigate('/patterns')}
                className="text-[12px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                View all →
              </button>
            </div>

            {/* List of 4 Indicator Cards matching reference design */}
            <div className="space-y-3">
              {indicators.map((item, index) => {
                const isCritical = item.severity === 'Critical';

                return (
                  <div
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50/70 transition-all duration-150 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                          isCritical
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}
                      >
                        {item.severity}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {item.meta}
                        </div>
                      </div>
                    </div>

                    <ChevronRight size={15} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
