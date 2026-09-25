import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter, Phone, CreditCard, MapPin, Car, FileText, AlertTriangle, Users } from 'lucide-react';
import { timelineEvents } from '../data/mockData';

const EVENT_ICONS: Record<string, React.ReactNode> = {
  Call: <Phone size={12} />,
  Transaction: <CreditCard size={12} />,
  Location: <MapPin size={12} />,
  Vehicle: <Car size={12} />,
  FIR: <FileText size={12} />,
  'Case Event': <AlertTriangle size={12} />,
  Meeting: <Users size={12} />,
};

const EVENT_COLORS: Record<string, string> = {
  Call: 'bg-blue-500',
  Transaction: 'bg-emerald-500',
  Location: 'bg-purple-500',
  Vehicle: 'bg-orange-500',
  FIR: 'bg-rose-500',
  'Case Event': 'bg-indigo-500',
  Meeting: 'bg-pink-500',
};

const EVENT_ACCENTS: Record<string, string> = {
  Call: '#2563eb',
  Transaction: '#10b981',
  Location: '#9333ea',
  Vehicle: '#f97316',
  FIR: '#ef4444',
  'Case Event': '#6366f1',
  Meeting: '#ec4899',
};

const EVENT_TYPES = ['All', 'Call', 'Transaction', 'Location', 'Vehicle', 'FIR', 'Case Event', 'Meeting'];
const CASES = ['All Cases', 'CASE-1024', 'CASE-1031', 'CASE-1044', 'CASE-1059', 'CASE-1067'];

export const TimelinePage: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [caseFilter, setCaseFilter] = useState('All Cases');
  const [dateFrom, setDateFrom] = useState('2026-03-01');
  const [dateTo, setDateTo] = useState('2026-09-30');

  const filtered = timelineEvents.filter(ev => {
    const matchType = typeFilter === 'All' || ev.type === typeFilter;
    const matchCase = caseFilter === 'All Cases' || ev.caseId === caseFilter;
    const matchDate = ev.date >= dateFrom && ev.date <= dateTo;
    return matchType && matchCase && matchDate;
  });

  // Group by date
  const byDate: Record<string, typeof timelineEvents> = {};
  [...filtered].sort((a, b) => b.date.localeCompare(a.date)).forEach(ev => {
    if (!byDate[ev.date]) byDate[ev.date] = [];
    byDate[ev.date].push(ev);
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Hero Banner Header matching design pattern */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="absolute right-0 top-0 bottom-0 w-[380px] pointer-events-none opacity-40 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 380 140" fill="none">
            <line x1="180" y1="30" x2="230" y2="70" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3"/>
            <line x1="230" y1="70" x2="290" y2="35" stroke="#93c5fd" strokeWidth="1.2"/>
            <line x1="230" y1="70" x2="280" y2="105" stroke="#93c5fd" strokeWidth="1.2"/>
            <circle cx="180" cy="30" r="3.5" fill="#60a5fa" fillOpacity="0.8"/>
            <circle cx="230" cy="70" r="5" fill="#3b82f6"/>
            <circle cx="290" cy="35" r="4" fill="#6366f1"/>
            <circle cx="280" cy="105" r="3.5" fill="#3b82f6"/>
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
            INTELLIGENCE CHRONOLOGY
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Investigation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Timeline</span>
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-1 font-medium">
            Chronological reconstruction of communications, money movements, meetings and border transits.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 text-[12px] text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Synchronized Multi-Case Sequence</span>
        </div>
      </div>

      {/* Stats with Colored Left Accents matching pattern */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {EVENT_TYPES.slice(1).map(t => {
          const cnt = timelineEvents.filter(e => e.type === t).length;
          return (
            <button
              key={t}
              onClick={() => setTypeFilter(typeFilter === t ? 'All' : t)}
              className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                typeFilter === t
                  ? 'bg-blue-50/70 border-2 border-blue-500 shadow-sm'
                  : 'bg-white border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md'
              }`}
              style={{ borderLeft: `3.5px solid ${EVENT_ACCENTS[t] || '#2563eb'}` }}
            >
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                {EVENT_ICONS[t]}
                <span className="text-[11px] font-semibold truncate">{t}</span>
              </div>
              <div className="text-[20px] font-extrabold text-slate-900 leading-none">{cnt}</div>
            </button>
          );
        })}
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-slate-400" />
          <span className="text-[12.5px] text-slate-500 font-medium">Case:</span>
          <select className="border border-slate-200/80 rounded-xl px-3 py-1 text-[12.5px] text-slate-700 bg-slate-50/60 focus:outline-none" value={caseFilter} onChange={e => setCaseFilter(e.target.value)}>
            {CASES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] text-slate-500 font-medium">From:</span>
          <input type="date" className="border border-slate-200/80 rounded-xl px-2.5 py-1 text-[12.5px] bg-slate-50/60 text-slate-700" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] text-slate-500 font-medium">To:</span>
          <input type="date" className="border border-slate-200/80 rounded-xl px-2.5 py-1 text-[12.5px] bg-slate-50/60 text-slate-700" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
        <div className="flex gap-1 flex-wrap">
          {EVENT_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                typeFilter === t ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto text-[12px] text-slate-400 font-medium">{filtered.length} events shown</div>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-7">
        {Object.entries(byDate).map(([date, events]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[12.5px] font-extrabold text-slate-800 bg-white border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs font-mono">
                {date}
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-slate-200 ml-4">
              {events.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-slate-100/90 rounded-2xl p-4.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-blue-200 hover:shadow-md transition-all relative"
                >
                  <div className={`absolute -left-[23px] top-5 w-4 h-4 rounded-full ${EVENT_COLORS[ev.type]} border-2 border-white flex items-center justify-center text-white shadow-xs`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${EVENT_COLORS[ev.type]} text-white`}>
                        {ev.type}
                      </span>
                      <span className="text-[11.5px] font-bold text-blue-600">{ev.caseId}</span>
                      {ev.location && <span className="text-[11.5px] text-slate-400">· {ev.location}</span>}
                    </div>
                    <span className="text-[11.5px] text-slate-400 font-mono">{ev.time}</span>
                  </div>

                  <p className="text-[13px] text-slate-700 leading-snug font-medium mb-3">{ev.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-400 font-medium">Entities:</span>
                      {ev.entities.map(e => (
                        <span key={e} className="text-[11px] bg-slate-100 font-medium text-slate-700 px-2 py-0.5 rounded-md">
                          {e}
                        </span>
                      ))}
                    </div>
                    {ev.amount && (
                      <span className="font-extrabold text-[13px] text-emerald-600">
                        ₹{ev.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
