import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Filter, ChevronDown, X, Eye,
  FolderOpen, Users, Network, AlertTriangle, FileText, Calendar, Shield
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../components/shared/Badges';
import { cases, investigators } from '../data/mockData';

const STATUS_OPTIONS = ['All', 'Active', 'Under Review', 'Monitoring', 'Closed'];
const PRIORITY_OPTIONS = ['All', 'Critical', 'High', 'Medium', 'Low'];

interface CreateCaseModalProps {
  onClose: () => void;
}

const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '', id: `CASE-${Math.floor(1080 + Math.random() * 100)}`, description: '',
    priority: 'High', investigator: investigators[0].id
  });
  return (
    <div className="fixed inset-0 bg-black/35 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100"
      >
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-[15px]">Create New Case</h3>
            <p className="text-[12px] text-slate-400">Initiate a new investigation record</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Case Name *</label>
              <input
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                placeholder="Operation ..."
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Case ID</label>
              <input
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-600 font-mono bg-slate-100 cursor-not-allowed"
                value={form.id}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Description</label>
            <textarea
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none"
              placeholder="Case briefing and scope..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Priority</label>
              <select
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
              >
                {['Critical', 'High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Lead Investigator</label>
              <select
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                value={form.investigator}
                onChange={e => setForm({ ...form, investigator: e.target.value })}
              >
                {investigators.map(inv => <option key={inv.id} value={inv.id}>{inv.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-800 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Create Case
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = cases.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Hero Banner Header matching design pattern */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Decorative Network Mesh */}
        <div className="absolute right-0 top-0 bottom-0 w-[380px] pointer-events-none opacity-40 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 380 140" fill="none">
            <line x1="180" y1="30" x2="230" y2="70" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3"/>
            <line x1="230" y1="70" x2="290" y2="35" stroke="#93c5fd" strokeWidth="1.2"/>
            <line x1="230" y1="70" x2="280" y2="105" stroke="#93c5fd" strokeWidth="1.2"/>
            <line x1="290" y1="35" x2="340" y2="65" stroke="#818cf8" strokeWidth="1.2"/>
            <line x1="280" y1="105" x2="335" y2="110" stroke="#93c5fd" strokeWidth="1.2"/>
            <circle cx="180" cy="30" r="3.5" fill="#60a5fa" fillOpacity="0.8"/>
            <circle cx="230" cy="70" r="5" fill="#3b82f6"/>
            <circle cx="290" cy="35" r="4" fill="#6366f1"/>
            <circle cx="280" cy="105" r="3.5" fill="#3b82f6"/>
            <circle cx="340" cy="65" r="4.5" fill="#4f46e5"/>
            <circle cx="335" cy="110" r="3.5" fill="#60a5fa"/>
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
            INVESTIGATION DOSSIERS
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Management</span>
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-1 font-medium">
            {cases.length} total operational cases · {cases.filter(c => c.status === 'Active').length} active syndicates under active surveillance.
          </p>
        </div>

        <div className="relative z-10">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Case</span>
          </button>
        </div>
      </div>

      {/* Summary Cards with Colored Left Accents matching reference pattern */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active', count: cases.filter(c => c.status === 'Active').length, color: 'text-emerald-700', bg: 'bg-white', accent: '#10b981' },
          { label: 'Under Review', count: cases.filter(c => c.status === 'Under Review').length, color: 'text-amber-700', bg: 'bg-white', accent: '#f59e0b' },
          { label: 'Monitoring', count: cases.filter(c => c.status === 'Monitoring').length, color: 'text-blue-700', bg: 'bg-white', accent: '#2563eb' },
          { label: 'Closed', count: cases.filter(c => c.status === 'Closed').length, color: 'text-slate-600', bg: 'bg-white', accent: '#94a3b8' },
        ].map(s => (
          <div
            key={s.label}
            className={`${s.bg} border border-slate-100/90 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]`}
            style={{ borderLeft: `3.5px solid ${s.accent}` }}
          >
            <div className={`text-[26px] font-extrabold ${s.color} tracking-tight leading-none`}>{s.count}</div>
            <div className="text-[13px] text-slate-600 font-semibold mt-1.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters Bar matching reference pattern */}
      <div className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-9 pr-4 py-2 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/60"
            placeholder="Search cases, suspects, FIR numbers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-slate-400" />
          <span className="text-[12.5px] text-slate-500 font-medium">Status:</span>
          <div className="flex gap-1">
            {STATUS_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                  statusFilter === s ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] text-slate-500 font-medium">Priority:</span>
          <select
            className="border border-slate-200/80 rounded-xl px-3 py-1 text-[12.5px] text-slate-700 bg-slate-50/60 focus:outline-none"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
          >
            {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="text-[12px] text-slate-400 ml-auto font-medium">{filtered.length} of {cases.length} shown</div>
      </div>

      {/* Cases Table matching clean enterprise style */}
      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Name</th>
                <th className="hidden xl:table-cell">Description</th>
                <th>Entities</th>
                <th>Indicators</th>
                <th className="hidden md:table-cell">Created</th>
                <th>Updated</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="cursor-pointer group"
                    onClick={() => navigate(`/cases/${c.id}`)}
                  >
                    <td className="font-mono text-[12px] text-blue-600 font-bold">{c.id}</td>
                    <td>
                      <div className="font-bold text-slate-800 text-[13.5px] group-hover:text-blue-600 transition-colors">{c.name}</div>
                      <div className="text-[11px] text-slate-400">{c.assignedTo}</div>
                    </td>
                    <td className="hidden xl:table-cell text-slate-500 text-[12px] max-w-[240px]">
                      <span className="line-clamp-2">{c.description}</span>
                    </td>
                    <td>
                      <div className="text-[13px] font-bold text-slate-800">{c.entities}</div>
                      <div className="text-[11px] text-slate-400">{c.relationships} links</div>
                    </td>
                    <td>
                      <span className={`text-[13px] font-extrabold ${c.indicators > 10 ? 'text-red-600' : c.indicators > 5 ? 'text-amber-600' : 'text-slate-600'}`}>
                        {c.indicators}
                      </span>
                    </td>
                    <td className="hidden md:table-cell text-slate-500 text-[12px]">{c.created}</td>
                    <td className="text-slate-500 text-[12px]">{c.lastUpdated}</td>
                    <td><PriorityBadge priority={c.priority} size="sm" /></td>
                    <td><StatusBadge status={c.status} size="sm" /></td>
                    <td onClick={e => e.stopPropagation()}>
                      <button
                        className="flex items-center gap-1 text-[12px] text-blue-600 hover:text-blue-700 font-bold px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/cases/${c.id}`)}
                      >
                        <Eye size={13} />
                        <span>Open</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-14 text-slate-400">
                    <FolderOpen size={36} className="mx-auto mb-2 opacity-30 text-slate-400" />
                    <div className="text-[13.5px] font-medium">No cases match the selected filters.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <CreateCaseModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
};
