import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, User, Phone, Car, MapPin, Building2, CreditCard,
  Network, Clock, FileText, AlertTriangle, Bot, Eye, ExternalLink,
  GitBranch, Shield, Info, X
} from 'lucide-react';
import { persons, phones, vehicles, organizations, transactions, alerts, timelineEvents, cases } from '../data/mockData';
import { SeverityBadge, StatusBadge } from '../components/shared/Badges';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const activityByMonth = [
  { month: 'Jun', calls: 12, txns: 3 },
  { month: 'Jul', calls: 18, txns: 5 },
  { month: 'Aug', calls: 22, txns: 8 },
  { month: 'Sep', calls: 31, txns: 11 },
];

interface ExplainPanelProps {
  alert: typeof alerts[0];
  onClose: () => void;
}

const ExplainPanel: React.FC<ExplainPanelProps> = ({ alert, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 40 }}
    className="fixed right-0 top-14 bottom-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col overflow-y-auto"
  >
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <Bot size={15} className="text-blue-600" />
        <span className="font-bold text-slate-900 text-[14px]">Why was this flagged?</span>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
    </div>
    <div className="p-5 space-y-4">
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="text-[11px] text-amber-700 font-bold mb-1">AI-generated insight — Investigator review required</div>
        <div className="text-[12px] text-amber-600">This indicator is an analytical signal, not a determination of guilt or criminality.</div>
      </div>
      <div>
        <div className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mb-2">Detection Reason</div>
        <p className="text-[13px] text-slate-700 leading-relaxed">{alert.reason}</p>
      </div>
      <div>
        <div className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mb-2">Source</div>
        <div className="text-[13px] text-slate-700">{alert.source}</div>
      </div>
      <div>
        <div className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mb-2">Entities Involved</div>
        <div className="flex flex-wrap gap-1.5">
          {alert.entities.map(ent => (
            <span key={ent} className="text-[12px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">{ent}</span>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mb-2">Supporting Data</div>
        <div className="space-y-1.5">
          {['CDR analysis: 47 calls in 30 days', 'Shared phone number PH-007', 'Transaction records EVD-003', 'Location overlap: LOC-001'].map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-[12.5px] text-slate-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />{d}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mb-2">Confidence Signal</div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-100 rounded-full h-2">
            <div className="h-2 rounded-full bg-blue-500" style={{ width: '72%' }} />
          </div>
          <span className="text-[12.5px] font-bold text-slate-700">72%</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1">Model confidence score — does not indicate probability of any offence</div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 py-2 text-[12.5px] font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800">Mark Reviewed</button>
        <button className="flex-1 py-2 text-[12.5px] font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Dismiss</button>
      </div>
    </div>
  </motion.div>
);

export const EntityProfilePage: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>();
  const navigate = useNavigate();
  const [explainAlert, setExplainAlert] = useState<typeof alerts[0] | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');

  const person = persons.find(p => p.id === entityId) || persons[0];
  const personPhones = phones.filter(ph => person.phones.includes(ph.id));
  const personVehicles = vehicles.filter(v => person.vehicles.includes(v.id));
  const personOrgs = organizations.filter(o => person.organizations.includes(o.id));
  const personCases = cases.filter(c => person.cases.includes(c.id));
  const personAlerts = alerts.filter(a => a.entities.includes(person.name));
  const personTimeline = timelineEvents.filter(t => t.entities.includes(person.name)).slice(0, 6);
  const personTransactions = transactions.filter(t =>
    t.sender.includes(person.name.split(' ')[0]) || t.receiver.includes(person.name.split(' ')[0])
  ).slice(0, 5);

  const TABS = ['Overview', 'Connections', 'Timeline', 'Transactions', 'Evidence', 'Indicators'];

  return (
    <div className="min-h-full bg-slate-50">
      {/* Entity Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-5">
        <button onClick={() => navigate('/entities')} className="flex items-center gap-2 text-[12.5px] text-slate-500 hover:text-slate-800 mb-4">
          <ArrowLeft size={14} /> Back to Entities
        </button>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
            {person.name.split(' ').map(n => n[0]).join('').slice(0,2)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-slate-900">{person.name}</h1>
              <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold rounded-md uppercase">Subject</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${person.status === 'Active' ? 'bg-green-100 text-green-700' : person.status === 'Inactive' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'}`}>
                {person.status}
              </span>
            </div>
            <div className="text-[13px] text-slate-500 mb-2">{person.id} · {person.occupation}</div>
            <div className="flex flex-wrap gap-3 text-[12.5px] text-slate-500">
              <span>Age: <strong className="text-slate-700">{person.age}</strong></span>
              <span>·</span>
              <span>Address: <strong className="text-slate-700">{person.address}</strong></span>
              <span>·</span>
              <span>Last seen: <strong className="text-slate-700">{person.lastSeen}</strong></span>
            </div>
            {person.aliases.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[12px] text-slate-400">Known aliases:</span>
                {person.aliases.map(a => (
                  <span key={a} className="text-[11.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">{a}</span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800" onClick={() => navigate('/network')}>
              <Network size={13} />View on Graph
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex gap-6 mt-4">
          {[
            { label: 'Connections', value: person.connections },
            { label: 'Cases', value: person.cases.length },
            { label: 'Indicators', value: person.indicators, color: 'text-amber-600' },
            { label: 'Phone Numbers', value: personPhones.length },
            { label: 'Vehicles', value: personVehicles.length },
            { label: 'Organizations', value: personOrgs.length },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className={`text-xl font-bold ${s.color || 'text-slate-900'}`}>{s.value}</div>
              <div className="text-[11px] text-slate-400">{s.label}</div>
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
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        {/* OVERVIEW */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Info cards */}
            <div className="space-y-4">
              {/* Phones */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Phone size={14} className="text-green-600" />
                  <h3 className="font-semibold text-slate-900 text-[13.5px]">Phone Numbers ({personPhones.length})</h3>
                </div>
                {personPhones.map(ph => (
                  <div key={ph.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="font-mono text-[12.5px] text-slate-800">{ph.number}</div>
                      <div className="text-[11px] text-slate-400">{ph.operator} · {ph.id}</div>
                    </div>
                    <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${ph.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{ph.status}</span>
                  </div>
                ))}
              </div>

              {/* Vehicles */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Car size={14} className="text-orange-600" />
                  <h3 className="font-semibold text-slate-900 text-[13.5px]">Vehicles ({personVehicles.length})</h3>
                </div>
                {personVehicles.length === 0 && <div className="text-[12px] text-slate-400">No vehicles registered</div>}
                {personVehicles.map(v => (
                  <div key={v.id} className="py-2 border-b border-slate-100 last:border-0">
                    <div className="font-mono text-[12.5px] font-bold text-slate-800">{v.plate}</div>
                    <div className="text-[11px] text-slate-400">{v.year} {v.color} {v.make} {v.model}</div>
                  </div>
                ))}
              </div>

              {/* Organizations */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={14} className="text-indigo-600" />
                  <h3 className="font-semibold text-slate-900 text-[13.5px]">Organizations ({personOrgs.length})</h3>
                </div>
                {personOrgs.map(o => (
                  <div key={o.id} className="py-2 border-b border-slate-100 last:border-0">
                    <div className="font-semibold text-[12.5px] text-slate-800">{o.name}</div>
                    <div className="text-[11px] text-slate-400">{o.type} · {o.id}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity + AI Summary */}
            <div className="lg:col-span-2 space-y-4">
              {/* AI Summary */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Bot size={14} className="text-blue-600" />
                  <h3 className="font-semibold text-slate-900 text-[14px]">AI Investigation Summary</h3>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                  <span className="text-[11px] text-amber-700 font-semibold">AI-generated summary — Investigator review required</span>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  <strong>{person.name}</strong> (Subject {person.id}) is a {person.age}-year-old {person.occupation} associated with{' '}
                  <strong>{person.cases.length} active investigations</strong>. Network analysis indicates{' '}
                  <strong>{person.connections} direct connections</strong> across the knowledge graph, with elevated connectivity 
                  metrics suggesting a bridging role within the identified network communities. 
                  {person.indicators > 0 && ` ${person.indicators} investigation indicator(s) have been flagged for review.`}{' '}
                  Cross-case relationships detected with entities in {person.cases.join(' and ')}.
                </p>
              </div>

              {/* Activity Chart */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 text-[14px] mb-4">Activity Overview</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={activityByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="calls" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Calls" />
                    <Bar dataKey="txns" fill="#22c55e" radius={[3, 3, 0, 0]} name="Transactions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Cases */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 text-[14px] mb-3 flex items-center gap-2">
                  <GitBranch size={14} className="text-purple-600" />Related Cases ({personCases.length})
                </h3>
                <div className="space-y-2">
                  {personCases.map(c => (
                    <div key={c.id} className="flex items-center gap-3 p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`/cases/${c.id}`)}>
                      <div className="font-mono text-[12px] text-blue-600 font-bold">{c.id}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-[13px] text-slate-800">{c.name}</div>
                      </div>
                      <StatusBadge status={c.status} size="sm" />
                      <ExternalLink size={12} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicators */}
              {personAlerts.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900 text-[14px] mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-amber-500" />Investigation Indicators
                  </h3>
                  <div className="space-y-3">
                    {personAlerts.map(a => (
                      <div key={a.id} className="p-3 border border-amber-200 bg-amber-50 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-800 text-[13px]">{a.type}</span>
                          <SeverityBadge severity={a.severity} size="sm" />
                        </div>
                        <p className="text-[12px] text-slate-600 mb-2 line-clamp-2">{a.reason}</p>
                        <button
                          className="flex items-center gap-1.5 text-[12px] text-blue-600 font-semibold hover:underline"
                          onClick={() => setExplainAlert(a)}
                        >
                          <Info size={12} />Why was this flagged?
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'Timeline' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-3xl">
            <h3 className="font-semibold text-slate-900 text-[14px] mb-6 flex items-center gap-2">
              <Clock size={14} className="text-blue-600" />Activity Timeline — {person.name}
            </h3>
            {personTimeline.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <Clock size={32} className="mx-auto mb-2 opacity-30" />No timeline events found for this entity.
              </div>
            )}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
              <div className="space-y-5 pl-10">
                {personTimeline.map(ev => {
                  const colors: Record<string, string> = {
                    FIR: 'bg-red-500', Call: 'bg-blue-500', Location: 'bg-purple-500',
                    Transaction: 'bg-green-500', Vehicle: 'bg-orange-500', 'Case Event': 'bg-indigo-500', Meeting: 'bg-pink-500'
                  };
                  return (
                    <div key={ev.id} className="relative">
                      <div className={`absolute -left-10 w-4 h-4 ${colors[ev.type] || 'bg-slate-400'} rounded-full border-2 border-white shadow`} />
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-md ${colors[ev.type]}`}>{ev.type}</span>
                          <span className="text-[12px] font-semibold text-slate-600">{ev.date} · {ev.time}</span>
                          {ev.amount && <span className="ml-auto text-[12px] font-bold text-green-700">₹{ev.amount.toLocaleString()}</span>}
                        </div>
                        <div className="text-[13px] text-slate-700">{ev.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === 'Transactions' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-[14px]">Financial Activity — {person.name}</h3>
            </div>
            {personTransactions.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <CreditCard size={32} className="mx-auto mb-2 opacity-30" />No transactions found for this entity.
              </div>
            ) : (
              <table className="w-full data-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th><th>Sender</th><th>Receiver</th><th>Amount</th>
                    <th>Date</th><th>Method</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {personTransactions.map(t => (
                    <tr key={t.id}>
                      <td className="font-mono text-[12px] text-slate-500">{t.id}</td>
                      <td className="text-[13px] font-medium text-slate-800">{t.sender}</td>
                      <td className="text-[13px] font-medium text-slate-800">{t.receiver}</td>
                      <td className="font-bold text-slate-900">₹{t.amount.toLocaleString()}</td>
                      <td className="text-slate-500 text-[12.5px]">{t.date}</td>
                      <td className="text-slate-500 text-[12.5px]">{t.method}</td>
                      <td>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${t.flagged ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {t.flagged ? 'Flagged' : 'Normal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* INDICATORS TAB */}
        {activeTab === 'Indicators' && (
          <div className="space-y-4 max-w-3xl">
            {personAlerts.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 shadow-sm">
                <Shield size={40} className="mx-auto mb-3 opacity-30" />
                <div className="text-[14px] font-medium">No investigation indicators for this entity</div>
              </div>
            )}
            {personAlerts.map(a => (
              <div key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <SeverityBadge severity={a.severity} />
                      <span className="font-semibold text-slate-900 text-[14px]">{a.type}</span>
                    </div>
                    <div className="text-[12px] text-slate-400">Detected: {a.date} · {a.source}</div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${a.reviewed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {a.reviewed ? 'Reviewed' : 'Pending Review'}
                  </span>
                </div>
                <p className="text-[13px] text-slate-600 mb-3">{a.reason}</p>
                <button
                  className="flex items-center gap-1.5 text-[12.5px] text-blue-600 font-semibold hover:underline"
                  onClick={() => setExplainAlert(a)}
                >
                  <Info size={13} />Why was this flagged?
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CONNECTIONS + EVIDENCE tabs - simplified */}
        {activeTab === 'Connections' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 text-[14px] mb-4">Network Connections</h3>
            <div className="text-[13px] text-slate-500 mb-4">
              Showing direct connections for {person.name} across all cases.
            </div>
            <button className="flex items-center gap-2 text-[13px] font-semibold text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800" onClick={() => navigate('/network')}>
              <Network size={14} />Open Network Graph
            </button>
          </div>
        )}
        {activeTab === 'Evidence' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 text-[14px] mb-4 flex items-center gap-2">
              <FileText size={14} className="text-blue-600" />Associated Evidence
            </h3>
            <button className="flex items-center gap-2 text-[13px] font-semibold text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800" onClick={() => navigate('/evidence')}>
              <FileText size={14} />View Evidence Center
            </button>
          </div>
        )}
      </div>

      {/* Explain Panel */}
      <AnimatePresence>
        {explainAlert && <ExplainPanel alert={explainAlert} onClose={() => setExplainAlert(null)} />}
      </AnimatePresence>
    </div>
  );
};
