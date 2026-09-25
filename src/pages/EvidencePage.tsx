import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { evidence } from '../data/mockData';
import { Search, FileText, Eye, Filter, Upload, X, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TYPE_COLORS: Record<string, string> = {
  FIR: 'bg-rose-50 text-rose-700 border-rose-200',
  CDR: 'bg-blue-50 text-blue-700 border-blue-200',
  Transaction: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Vehicle Record': 'bg-orange-50 text-orange-700 border-orange-200',
  Surveillance: 'bg-purple-50 text-purple-700 border-purple-200',
  'Social Media': 'bg-pink-50 text-pink-700 border-pink-200',
  'Intelligence Report': 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

const TYPE_ACCENTS: Record<string, string> = {
  FIR: '#ef4444',
  CDR: '#2563eb',
  Transaction: '#10b981',
  'Vehicle Record': '#f97316',
  Surveillance: '#9333ea',
  'Social Media': '#ec4899',
  'Intelligence Report': '#6366f1',
};

interface EvidenceViewerProps {
  ev: typeof evidence[0];
  onClose: () => void;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ ev, onClose }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-100"
    >
      <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText size={18} />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-[14px]">{ev.id}</div>
            <div className="text-[12px] text-slate-400">{ev.type} · {ev.source}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"><X size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Preview */}
          <div className="col-span-2 p-6">
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 mb-4 min-h-[190px] flex items-center justify-center">
              <div className="text-center">
                <FileText size={38} className="text-slate-300 mx-auto mb-2" />
                <div className="text-[13px] font-bold text-slate-700">{ev.type} Official Record</div>
                <div className="text-[11.5px] text-slate-400 mt-0.5">Originating Source: {ev.source}</div>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-[14px] mb-1.5">Investigative Summary</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed font-normal">{ev.summary}</p>
          </div>
          {/* Metadata */}
          <div className="p-6 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-[13px] mb-3">Chain of Custody</h3>
            <div className="space-y-3 text-[12.5px]">
              <div><div className="text-slate-400 font-semibold mb-0.5">Evidence ID</div><div className="text-slate-800 font-mono font-bold">{ev.id}</div></div>
              <div><div className="text-slate-400 font-semibold mb-0.5">Type</div><span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${TYPE_COLORS[ev.type]}`}>{ev.type}</span></div>
              <div><div className="text-slate-400 font-semibold mb-0.5">Case Dossier</div><div className="text-blue-600 font-bold">{ev.caseId}</div></div>
              <div><div className="text-slate-400 font-semibold mb-0.5">Date Ingested</div><div className="text-slate-700">{ev.date}</div></div>
              <div><div className="text-slate-400 font-semibold mb-0.5">Processing Status</div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${ev.status === 'Processed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700'}`}>
                  {ev.status}
                </span>
              </div>
              <div><div className="text-slate-400 font-semibold mb-0.5">Extracted Entities</div><div className="text-slate-800 font-extrabold text-[15px]">{ev.extractedEntities}</div></div>
              <div><div className="text-slate-400 font-semibold mb-0.5">Network Connections</div><div className="text-slate-800 font-extrabold text-[15px]">{ev.relationships}</div></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

export const EvidencePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEvidence, setSelectedEvidence] = useState<typeof evidence[0] | null>(null);

  const TYPES = ['All', 'FIR', 'CDR', 'Transaction', 'Vehicle Record', 'Surveillance', 'Social Media', 'Intelligence Report'];

  const filtered = evidence.filter(ev => {
    const matchSearch = ev.id.toLowerCase().includes(search.toLowerCase()) ||
      ev.summary.toLowerCase().includes(search.toLowerCase()) ||
      ev.source.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || ev.type === typeFilter;
    const matchStatus = statusFilter === 'All' || ev.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
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
            EVIDENCE VAULT
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Evidence <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Center</span>
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-1 font-medium">
            {evidence.length} forensic records · {evidence.filter(e => e.status === 'Processed').length} processed through automated entity extraction.
          </p>
        </div>

        <div className="relative z-10">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer">
            <Upload size={15} />
            <span>Upload Evidence</span>
          </button>
        </div>
      </div>

      {/* Type Cards with Colored Left Accents matching pattern */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {TYPES.slice(1).map(t => {
          const cnt = evidence.filter(e => e.type === t).length;
          return (
            <button
              key={t}
              onClick={() => setTypeFilter(typeFilter === t ? 'All' : t)}
              className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                typeFilter === t
                  ? 'bg-blue-50/70 border-2 border-blue-500 shadow-sm'
                  : 'bg-white border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md'
              }`}
              style={{ borderLeft: `3.5px solid ${TYPE_ACCENTS[t] || '#2563eb'}` }}
            >
              <div className="text-[20px] font-extrabold text-slate-900 tracking-tight leading-none">{cnt}</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-1 truncate">{t}</div>
            </button>
          );
        })}
      </div>

      {/* Filters Bar matching design pattern */}
      <div className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-9 pr-4 py-2 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/60"
            placeholder="Search evidence files, summaries, FIR tags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {TYPES.slice(0, 5).map(t => (
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
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] text-slate-500 font-medium">Status:</span>
          <select
            className="border border-slate-200/80 rounded-xl px-3 py-1 text-[12.5px] text-slate-700 bg-slate-50/60 focus:outline-none"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Processed</option>
            <option>Under Review</option>
            <option>Pending</option>
          </select>
        </div>
        <div className="text-[12px] text-slate-400 ml-auto font-medium">{filtered.length} records shown</div>
      </div>

      {/* Table matching clean enterprise style */}
      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Case</th>
                <th>Source</th>
                <th>Date</th>
                <th>Summary</th>
                <th>Entities</th>
                <th>Relations</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(ev => (
                <tr key={ev.id} className="cursor-pointer group hover:bg-blue-50/30 transition-colors" onClick={() => setSelectedEvidence(ev)}>
                  <td className="font-mono text-[12px] font-bold text-blue-600">{ev.id}</td>
                  <td><span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${TYPE_COLORS[ev.type]}`}>{ev.type}</span></td>
                  <td className="text-blue-600 font-bold text-[12.5px]">{ev.caseId}</td>
                  <td className="text-slate-600 text-[12.5px] font-medium">{ev.source}</td>
                  <td className="text-slate-500 text-[12px]">{ev.date}</td>
                  <td className="text-slate-600 text-[12.5px] max-w-xs truncate">{ev.summary}</td>
                  <td><span className="font-extrabold text-slate-800 text-[13px]">{ev.extractedEntities}</span></td>
                  <td><span className="font-extrabold text-slate-800 text-[13px]">{ev.relationships}</span></td>
                  <td>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${ev.status === 'Processed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700'}`}>
                      {ev.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="flex items-center gap-1 text-[12px] text-blue-600 hover:text-blue-700 font-bold px-2 py-1 rounded-lg hover:bg-blue-50 cursor-pointer"
                      onClick={e => { e.stopPropagation(); setSelectedEvidence(ev); }}
                    >
                      <Eye size={13} /><span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEvidence && <EvidenceViewer ev={selectedEvidence} onClose={() => setSelectedEvidence(null)} />}
    </div>
  );
};
