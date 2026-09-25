import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Users, Phone, Car, MapPin, Building2, CreditCard, Eye, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EntityTypeBadge } from '../components/shared/Badges';
import { persons, phones, vehicles, locations, organizations, transactions } from '../data/mockData';

const TYPES = ['All', 'Person', 'Phone', 'Vehicle', 'Location', 'Organization', 'Transaction'];

type EntityType = {
  id: string;
  name: string;
  type: string;
  connections: number;
  cases: string[];
  lastSeen: string;
  status: string;
  extra?: string;
};

const buildEntities = (): EntityType[] => {
  const all: EntityType[] = [
    ...persons.map(p => ({ id: p.id, name: p.name, type: 'Person', connections: p.connections, cases: p.cases, lastSeen: p.lastSeen, status: p.status, extra: p.occupation })),
    ...phones.map(p => ({ id: p.id, name: p.number, type: 'Phone', connections: p.connections, cases: p.cases, lastSeen: p.lastActivity, status: p.status, extra: p.operator })),
    ...vehicles.map(v => ({ id: v.id, name: v.plate, type: 'Vehicle', connections: v.locations.length, cases: v.cases, lastSeen: v.lastSeen, status: 'Active', extra: `${v.make} ${v.model}` })),
    ...locations.map(l => ({ id: l.id, name: l.name, type: 'Location', connections: l.entities.length, cases: l.cases, lastSeen: l.lastEvent, status: 'Active', extra: l.type })),
    ...organizations.map(o => ({ id: o.id, name: o.name, type: 'Organization', connections: o.persons.length, cases: o.cases, lastSeen: '2026-09-20', status: o.status, extra: o.type })),
    ...transactions.map(t => ({ id: t.id, name: `${t.sender} → ${t.receiver}`, type: 'Transaction', connections: 2, cases: t.cases, lastSeen: t.date, status: t.flagged ? 'Flagged' : 'Normal', extra: `₹${t.amount.toLocaleString()}` })),
  ];
  return all;
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Person: <Users size={16} className="text-blue-600" />,
  Phone: <Phone size={16} className="text-emerald-600" />,
  Vehicle: <Car size={16} className="text-orange-600" />,
  Location: <MapPin size={16} className="text-purple-600" />,
  Organization: <Building2 size={16} className="text-indigo-600" />,
  Transaction: <CreditCard size={16} className="text-rose-600" />,
};

const TYPE_ACCENTS: Record<string, string> = {
  Person: '#2563eb',
  Phone: '#10b981',
  Vehicle: '#f97316',
  Location: '#9333ea',
  Organization: '#6366f1',
  Transaction: '#ef4444',
};

export const EntitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const allEntities = buildEntities();

  const filtered = allEntities.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || e.type === typeFilter;
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const counts = TYPES.slice(1).reduce((acc, t) => {
    acc[t] = allEntities.filter(e => e.type === t).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Hero Banner matching design pattern */}
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
            ENTITY REPOSITORY
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Entity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Directory</span>
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-1 font-medium">
            {allEntities.length} identified persons, devices, vehicles and organizations across operational cases.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 text-[12px] text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Continuous Indexing Active</span>
        </div>
      </div>

      {/* Type Cards with Colored Left Accents matching pattern */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {TYPES.slice(1).map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(typeFilter === t ? 'All' : t)}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer ${
              typeFilter === t
                ? 'bg-blue-50/70 border-2 border-blue-500 shadow-sm'
                : 'bg-white border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md'
            }`}
            style={{ borderLeft: `3.5px solid ${TYPE_ACCENTS[t]}` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-1.5 rounded-lg bg-slate-50">{TYPE_ICONS[t]}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t}</span>
            </div>
            <div className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-none">{counts[t]}</div>
            <div className="text-[11.5px] text-slate-500 font-medium mt-1">Indexed records</div>
          </button>
        ))}
      </div>

      {/* Filters Bar matching design pattern */}
      <div className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-9 pr-4 py-2 border border-slate-200/80 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/60"
            placeholder="Search by name, ID, phone number, vehicle plate..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {TYPES.map(t => (
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
            <option>Active</option>
            <option>Inactive</option>
            <option>Unknown</option>
            <option>Flagged</option>
          </select>
        </div>
        <div className="text-[12px] text-slate-400 ml-auto font-medium">{filtered.length} entities shown</div>
      </div>

      {/* Table matching clean enterprise style */}
      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Entity ID</th>
                <th>Name / Identifier</th>
                <th>Type</th>
                <th>Additional Info</th>
                <th>Connections</th>
                <th>Cases</th>
                <th>Last Seen</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr
                  key={e.id}
                  className="cursor-pointer group hover:bg-blue-50/30 transition-colors"
                  onClick={() => e.type === 'Person' ? navigate(`/entities/${e.id}`) : navigate(`/network`)}
                >
                  <td className="font-mono text-[12px] font-bold text-blue-600">{e.id}</td>
                  <td>
                    <div className="font-bold text-slate-800 text-[13.5px] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                      {TYPE_ICONS[e.type]}
                      <span>{e.name}</span>
                    </div>
                  </td>
                  <td><EntityTypeBadge type={e.type} size="sm" /></td>
                  <td className="text-slate-500 text-[12px]">{e.extra || '—'}</td>
                  <td>
                    <span className="text-[13px] font-extrabold text-slate-800">{e.connections}</span>
                    <span className="text-[11px] text-slate-400 ml-1">links</span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {e.cases.map(c => (
                        <span key={c} className="text-[10.5px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-slate-500 text-[12px]">{e.lastSeen}</td>
                  <td>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      e.status === 'Active' || e.status === 'Normal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      e.status === 'Flagged' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="flex items-center gap-1 text-[12px] text-blue-600 hover:text-blue-700 font-bold px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                      onClick={ev => {
                        ev.stopPropagation();
                        if (e.type === 'Person') navigate(`/entities/${e.id}`);
                        else navigate('/network');
                      }}
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
