import React, { useState } from 'react';
import { Search, Bell, ChevronDown, X, FolderOpen, Users, Network, FileText, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cases } from '../../data/mockData';
import { StatusBadge } from '../shared/Badges';

interface TopbarProps {
  currentCase: string;
  setCurrentCase: (id: string) => void;
  onToggleSidebar?: () => void;
}

const notifications = [
  { id: 1, type: 'alert', text: 'New cross-case relationship detected between CASE-1024 and CASE-1067', time: '12 min ago', unread: true },
  { id: 2, type: 'evidence', text: 'Evidence EVD-009 processed successfully — 5 entities extracted', time: '38 min ago', unread: true },
  { id: 3, type: 'network', text: 'Network expanded by 14 entities in Operation Crimson Ledger', time: '1h ago', unread: true },
  { id: 4, type: 'pattern', text: 'Investigation indicator ALT-008 requires review', time: '2h ago', unread: false },
  { id: 5, type: 'system', text: 'CDR batch processing completed — 284 records analysed', time: '3h ago', unread: false },
];

const globalSearchResults = {
  persons: [
    { id: 'ENT-P001', name: 'Ahmed Rahman', type: 'Person', case: 'CASE-1024' },
    { id: 'ENT-P007', name: 'Harish Nanda', type: 'Person', case: 'CASE-1024' },
  ],
  cases: [
    { id: 'CASE-1024', name: 'Operation Crimson Ledger', status: 'Active' },
    { id: 'CASE-1031', name: 'Operation Silk Route', status: 'Active' },
  ],
  evidence: [
    { id: 'EVD-001', name: 'FIR - Ahmedabad Police Station', type: 'FIR' },
  ],
};

export const Topbar: React.FC<TopbarProps> = ({ currentCase, setCurrentCase, onToggleSidebar }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const unreadCount = 3;
  const currentCaseData = cases.find(c => c.id === currentCase);

  return (
    <header className="h-16 bg-white border-b border-slate-100/90 flex items-center justify-between px-6 sticky top-0 z-30 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      {/* Left: Brand Logo & Title matching uploaded reference */}
      <div className="flex items-center gap-3 w-64 flex-shrink-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 -ml-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Faceted Network Geometric Logo */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="#2563eb" strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
            <path d="M20 4L20 36M6 12L34 28M6 28L34 12" stroke="#60a5fa" strokeWidth="1.6" strokeOpacity="0.85"/>
            <circle cx="20" cy="4" r="2.5" fill="#2563eb"/>
            <circle cx="34" cy="12" r="2.5" fill="#2563eb"/>
            <circle cx="34" cy="28" r="2.5" fill="#2563eb"/>
            <circle cx="20" cy="36" r="2.5" fill="#2563eb"/>
            <circle cx="6" cy="28" r="2.5" fill="#2563eb"/>
            <circle cx="6" cy="12" r="2.5" fill="#2563eb"/>
            <circle cx="20" cy="20" r="3.2" fill="#1d4ed8"/>
          </svg>
        </div>

        <div>
          <div className="font-extrabold text-slate-900 text-[15px] leading-tight tracking-tight">Netra Intelligence</div>
          <div className="text-[9.5px] font-bold text-slate-400 tracking-wider uppercase leading-tight mt-0.5">AI Criminal Network Analysis</div>
        </div>
      </div>

      {/* Center: Clean Rounded Pill Global Search Bar */}
      <div className="flex-1 max-w-xl mx-4 relative hidden sm:block">
        <div
          className="flex items-center gap-2.5 bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/80 rounded-full px-4 py-2 cursor-text transition-all duration-150"
          onClick={() => setSearchOpen(true)}
        >
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <span className="text-[13px] text-slate-400 select-none">Search entities, cases, evidence...</span>
          <kbd className="ml-auto text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-400 shadow-2xs">
            Ctrl + K
          </kbd>
        </div>

        {/* Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <>
              <div className="fixed inset-0 bg-black/25 backdrop-blur-2xs z-40" onClick={() => setSearchOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0 right-0 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden"
                style={{ minWidth: 480 }}
              >
                <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-slate-100">
                  <Search size={16} className="text-blue-600" />
                  <input
                    autoFocus
                    className="flex-1 outline-none text-[14px] text-slate-800 placeholder:text-slate-400"
                    placeholder="Search entities, cases, evidence, locations..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
                    <X size={15} />
                  </button>
                </div>
                <div className="p-3 max-h-96 overflow-y-auto space-y-3">
                  <div>
                    <div className="flex items-center gap-2 px-2 mb-1.5">
                      <Users size={12} className="text-blue-500" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Persons</span>
                    </div>
                    {globalSearchResults.persons.map(p => (
                      <div key={p.id} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-colors" onClick={() => setSearchOpen(false)}>
                        <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[11px] font-bold">
                          {p.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-slate-800">{p.name}</div>
                          <div className="text-[11px] text-slate-400">{p.id} · {p.case}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 px-2 mb-1.5">
                      <FolderOpen size={12} className="text-purple-500" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cases</span>
                    </div>
                    {globalSearchResults.cases.map(c => (
                      <div key={c.id} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-50/60 cursor-pointer transition-colors" onClick={() => setSearchOpen(false)}>
                        <div className="w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                          <FolderOpen size={12} />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-slate-800">{c.name}</div>
                          <div className="text-[11px] text-slate-400">{c.id} · {c.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Right Side: Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Icon with Red Badge */}
        <div className="relative">
          <button
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 top-12 bg-white border border-slate-200/90 rounded-2xl shadow-xl z-40 w-96 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <span className="font-bold text-slate-800 text-[13.5px]">Intelligence Notifications</span>
                    <span className="text-[11px] text-blue-600 font-semibold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                    {notifications.map(n => (
                      <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-blue-50/30' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
                        <div>
                          <div className="text-[12.5px] text-slate-700 leading-snug">{n.text}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Pill matching reference design */}
        <div
          className="flex items-center gap-2.5 pl-2 cursor-pointer group"
          onClick={() => setUserDropdownOpen(!userDropdownOpen)}
        >
          {/* Avatar: Solid dark navy circle with white PM */}
          <div className="w-9 h-9 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-[12px] shadow-sm flex-shrink-0">
            PM
          </div>

          <div className="hidden md:block text-left">
            <div className="text-[12.5px] font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              Sujit. Priya Menon
            </div>
            <div className="text-[10.5px] text-slate-400 leading-tight">
              Investigation Analyst
            </div>
          </div>

          <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};
