import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Users, Phone, Car, MapPin, Building2, CreditCard,
  FileText, AlertTriangle, Network, Clock, BarChart3, Download,
  Bot, Eye, Share2, Edit2
} from 'lucide-react';
import { StatusBadge, PriorityBadge, SeverityBadge } from '../components/shared/Badges';
import { cases, alerts, evidence, timelineEvents, persons } from '../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const TABS = ['Overview', 'Network', 'Entities', 'Timeline', 'Evidence', 'Patterns', 'Reports'];

const caseActivityData = [
  { week: 'W1', events: 8, indicators: 2 },
  { week: 'W2', events: 14, indicators: 3 },
  { week: 'W3', events: 22, indicators: 4 },
  { week: 'W4', events: 18, indicators: 3 },
  { week: 'W5', events: 31, indicators: 6 },
  { week: 'W6', events: 25, indicators: 4 },
];

export const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const caseData = cases.find(c => c.id === caseId) || cases[0];
  const caseAlerts = alerts.filter(a => a.caseId === caseId);
  const caseEvidence = evidence.filter(e => e.caseId === caseId);
  const casePersons = persons.filter(p => p.cases.includes(caseId || 'CASE-1024')).slice(0, 6);
  const caseTimeline = timelineEvents.filter(t => t.caseId === caseId).slice(0, 8);

  const kpis = [
    { label: 'People', value: caseData.people, icon: <Users size={14} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Phones', value: caseData.phones, icon: <Phone size={14} />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Vehicles', value: caseData.vehicles, icon: <Car size={14} />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Locations', value: caseData.locations, icon: <MapPin size={14} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Organizations', value: caseData.organizations, icon: <Building2 size={14} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Transactions', value: caseData.transactions, icon: <CreditCard size={14} />, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Evidence', value: caseData.evidence, icon: <FileText size={14} />, color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  return (
    <div className="min-h-full bg-slate-50">
      {/* Case Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-5">
        <button
          onClick={() => navigate('/cases')}
          className="flex items-center gap-2 text-[12.5px] text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Cases
        </button>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[13px] text-blue-600 font-bold bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                {caseData.id}
              </span>
              <StatusBadge status={caseData.status} />
              <PriorityBadge priority={caseData.priority} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">{caseData.name}</h1>
            <p className="text-[13px] text-slate-500 max-w-2xl">{caseData.description}</p>
            <div className="flex items-center gap-4 mt-2 text-[12px] text-slate-400">
              <span>Assigned: <span className="font-semibold text-slate-600">{caseData.assignedTo}</span></span>
              <span>Created: <span className="font-semibold text-slate-600">{caseData.created}</span></span>
              <span>Updated: <span className="font-semibold text-slate-600">{caseData.lastUpdated}</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Share2 size={13} /> Share
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Edit2 size={13} /> Edit
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
              onClick={() => navigate('/network')}
            >
              <Network size={13} /> View Network
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-5">
          {kpis.map((k, i) => (
            <div key={i} className="text-center">
              <div className={`text-xl font-bold text-slate-900`}>{k.value}</div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <span className={k.color}>{k.icon}</span>
                {k.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 space-y-5 max-w-[1600px] mx-auto">

        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Activity chart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 text-[14px] mb-4">Case Activity Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={caseActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="events" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Events" />
                  <Bar dataKey="indicators" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Indicators" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* AI Summary */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Bot size={14} className="text-blue-600" />
                <h3 className="font-semibold text-slate-900 text-[14px]">AI Case Summary</h3>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                <div className="text-[11px] text-amber-700 font-semibold">AI-generated summary — Investigator review required</div>
              </div>
              <p className="text-[12.5px] text-slate-600 leading-relaxed">
                {caseData.name} involves a network of <strong>{caseData.people} individuals</strong> with{' '}
                <strong>{caseData.relationships} documented relationships</strong>. Key analytical signals include rapid 
                sequential financial transfers and repeated co-location events among central entities. 
                Cross-case overlap detected with CASE-1031. Network analysis reveals 3 distinct sub-communities 
                with a potential bridging entity showing elevated connectivity metrics.
              </p>
              <div className="mt-3 space-y-2">
                {[
                  'Rapid transaction chain detected (4 transfers, ₹3.6L)',
                  'Cross-case overlap identified with CASE-1031',
                  'Harish Nanda — highest network connectivity score',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-slate-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 text-[14px] flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-500" />
                  Investigation Indicators ({caseAlerts.length})
                </h3>
                <button className="text-[12px] text-blue-600 hover:underline" onClick={() => setActiveTab('Patterns')}>View all</button>
              </div>
              <div className="space-y-2">
                {caseAlerts.map(a => (
                  <div key={a.id} className={`p-3 rounded-lg border ${a.reviewed ? 'border-slate-100 bg-slate-50' : 'border-amber-200 bg-amber-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12.5px] font-semibold text-slate-800">{a.type}</span>
                      <SeverityBadge severity={a.severity} size="sm" />
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2">{a.reason}</div>
                    {!a.reviewed && (
                      <div className="mt-1 text-[10px] font-semibold text-amber-600 uppercase tracking-wide">Pending Review</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Entities snapshot */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 text-[14px]">Key Entities</h3>
                <button className="text-[12px] text-blue-600 hover:underline" onClick={() => setActiveTab('Entities')}>View all</button>
              </div>
              <div className="space-y-2.5">
                {casePersons.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`/entities/${p.id}`)}>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-[11px] font-bold flex-shrink-0">
                      {p.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-slate-800 truncate">{p.name}</div>
                      <div className="text-[11px] text-slate-400">{p.connections} connections · {p.indicators} indicators</div>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{ background: p.indicators > 2 ? '#ef4444' : p.indicators > 0 ? '#f59e0b' : '#94a3b8' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 text-[14px]">Evidence Records</h3>
                <button className="text-[12px] text-blue-600 hover:underline" onClick={() => setActiveTab('Evidence')}>View all</button>
              </div>
              <div className="space-y-2">
                {caseEvidence.map(ev => (
                  <div key={ev.id} className="flex items-start gap-3 p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <FileText size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[12px] font-mono text-slate-500">{ev.id}</span>
                        <span className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{ev.type}</span>
                      </div>
                      <div className="text-[12px] text-slate-600 line-clamp-1">{ev.summary}</div>
                    </div>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${ev.status === 'Processed' ? 'bg-green-100 text-green-700' : ev.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'Timeline' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 text-[14px] mb-6 flex items-center gap-2">
              <Clock size={14} className="text-blue-600" /> Case Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
              <div className="space-y-6 pl-10">
                {caseTimeline.map((ev, i) => {
                  const colors: Record<string, string> = {
                    FIR: 'bg-red-500', Call: 'bg-blue-500', Location: 'bg-purple-500',
                    Transaction: 'bg-green-500', Vehicle: 'bg-orange-500', 'Case Event': 'bg-indigo-500', Meeting: 'bg-pink-500'
                  };
                  return (
                    <div key={ev.id} className="relative">
                      <div className={`absolute -left-10 w-4 h-4 ${colors[ev.type] || 'bg-slate-400'} rounded-full border-2 border-white shadow`} />
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-md ${colors[ev.type] || 'bg-slate-400'}`}>{ev.type}</span>
                            <span className="text-[12px] font-semibold text-slate-700">{ev.date} · {ev.time}</span>
                          </div>
                          {ev.amount && (
                            <span className="text-[12px] font-bold text-green-700">₹{ev.amount.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="text-[13px] text-slate-700 mb-2">{ev.description}</div>
                        {ev.entities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {ev.entities.map(ent => (
                              <span key={ent} className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{ent}</span>
                            ))}
                          </div>
                        )}
                        {ev.location && (
                          <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-400">
                            <MapPin size={10} /> {ev.location}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* EVIDENCE TAB */}
        {activeTab === 'Evidence' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-[14px]">Evidence Records — {caseData.id}</h3>
              <button className="flex items-center gap-1.5 text-[12.5px] font-medium text-white bg-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-800">
                <FileText size={12} />Add Evidence
              </button>
            </div>
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Evidence ID</th>
                  <th>Type</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th>Entities</th>
                  <th>Relationships</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {caseEvidence.map(ev => (
                  <tr key={ev.id}>
                    <td className="font-mono text-[12px] text-slate-500">{ev.id}</td>
                    <td><span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">{ev.type}</span></td>
                    <td className="text-[12.5px] text-slate-600">{ev.source}</td>
                    <td className="text-[12.5px] text-slate-500">{ev.date}</td>
                    <td className="font-semibold text-slate-800">{ev.extractedEntities}</td>
                    <td className="font-semibold text-slate-800">{ev.relationships}</td>
                    <td>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${ev.status === 'Processed' ? 'bg-green-100 text-green-700' : ev.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                        {ev.status}
                      </span>
                    </td>
                    <td>
                      <button className="flex items-center gap-1 text-[12px] text-blue-600 font-medium hover:underline" onClick={() => navigate(`/evidence/${ev.id}`)}>
                        <Eye size={12} />View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PATTERNS TAB */}
        {activeTab === 'Patterns' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-[14px]">Investigation Indicators — {caseData.id}</h3>
              <div className="text-[12px] text-slate-400">{caseAlerts.length} indicators detected</div>
            </div>
            {caseAlerts.map(a => (
              <div key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <SeverityBadge severity={a.severity} />
                      <span className="font-semibold text-slate-900 text-[14px]">{a.type}</span>
                    </div>
                    <div className="text-[12px] text-slate-400">Detected: {a.date} · Source: {a.source}</div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${a.reviewed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {a.reviewed ? 'Reviewed' : 'Pending Review'}
                  </span>
                </div>
                <p className="text-[13px] text-slate-600 mb-3">{a.reason}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {a.entities.map(ent => (
                    <span key={ent} className="text-[12px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">{ent}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-[12.5px] text-blue-600 font-medium hover:underline">
                    <Eye size={12} />Why was this flagged?
                  </button>
                  <button className="flex items-center gap-1.5 text-[12.5px] text-slate-500 hover:text-slate-800">
                    <Network size={12} />View on Graph
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NETWORK TAB */}
        {activeTab === 'Network' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 text-[14px]">Network Analysis — {caseData.id}</h3>
              <button
                className="flex items-center gap-2 text-[13px] font-semibold text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800"
                onClick={() => navigate('/network')}
              >
                <Network size={14} />Open Full Network Workspace
              </button>
            </div>
            <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Network size={40} className="text-slate-300 mx-auto mb-3" />
                <div className="text-[14px] font-semibold text-slate-400">Network Preview</div>
                <div className="text-[12px] text-slate-400 mt-1">{caseData.entities} entities · {caseData.relationships} relationships</div>
                <button
                  className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-blue-700 border border-blue-300 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 mx-auto"
                  onClick={() => navigate('/network')}
                >
                  <Network size={14} />Open Network Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'Reports' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 text-[14px]">Generate Investigation Report</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {['Case Summary', 'Network Analysis', 'Entity Report', 'Evidence Report', 'Timeline Report', 'Cross-Case Report'].map(r => (
                <div key={r} className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                  <BarChart3 size={18} className="text-blue-500 mb-2" />
                  <div className="font-semibold text-slate-800 text-[13px]">{r}</div>
                </div>
              ))}
            </div>
            <button
              className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-[13px] hover:bg-blue-800"
              onClick={() => navigate('/reports')}
            >
              <Download size={14} />Generate & Export Report
            </button>
          </div>
        )}

        {/* ENTITIES TAB */}
        {activeTab === 'Entities' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-[14px]">Entities — {caseData.id}</h3>
            </div>
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Type</th>
                  <th>Connections</th>
                  <th>Indicators</th>
                  <th>Last Seen</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {casePersons.map(p => (
                  <tr key={p.id} className="cursor-pointer" onClick={() => navigate(`/entities/${p.id}`)}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-[11px] font-bold">
                          {p.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-[13px]">{p.name}</div>
                          <div className="text-[11px] text-slate-400">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-semibold">Person</span></td>
                    <td className="font-semibold">{p.connections}</td>
                    <td>
                      <span className={`font-bold ${p.indicators > 2 ? 'text-red-600' : p.indicators > 0 ? 'text-amber-600' : 'text-slate-500'}`}>
                        {p.indicators}
                      </span>
                    </td>
                    <td className="text-slate-500 text-[12.5px]">{p.lastSeen}</td>
                    <td>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-700' : p.status === 'Inactive' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button className="flex items-center gap-1 text-[12px] text-blue-600 font-medium hover:underline">
                        <Eye size={12} />Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
