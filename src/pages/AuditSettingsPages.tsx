import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, Eye, Upload, FileText, CheckCircle, AlertTriangle, BarChart3, Clock } from 'lucide-react';

const logs = [
  { id: 'L001', user: 'Supt. Priya Menon', action: 'Viewed entity profile', entity: 'Ahmed Rahman (ENT-P001)', case: 'CASE-1024', time: '2026-09-25 14:38', type: 'view' },
  { id: 'L002', user: 'Supt. Priya Menon', action: 'Generated network graph', entity: 'CASE-1024', case: 'CASE-1024', time: '2026-09-25 14:25', type: 'network' },
  { id: 'L003', user: 'Insp. Rajesh Nair', action: 'Uploaded evidence file', entity: 'CDR_Airtel_Sep2026.csv', case: 'CASE-1031', time: '2026-09-25 13:58', type: 'upload' },
  { id: 'L004', user: 'SI. Kavitha Reddy', action: 'Reviewed investigation indicator', entity: 'ALT-003', case: 'CASE-1044', time: '2026-09-25 13:45', type: 'review' },
  { id: 'L005', user: 'Supt. Priya Menon', action: 'Generated Case Summary Report', entity: 'CASE-1024', case: 'CASE-1024', time: '2026-09-25 13:30', type: 'report' },
  { id: 'L006', user: 'Insp. Amitabh Sinha', action: 'Confirmed entity match', entity: 'Mohd. Bashir / Mohd Ahmed', case: 'CASE-1059', time: '2026-09-25 12:15', type: 'entity' },
  { id: 'L007', user: 'Insp. Rajesh Nair', action: 'Viewed cross-case connection', entity: 'CASE-1024 ↔ CASE-1031', case: 'CASE-1031', time: '2026-09-25 11:48', type: 'view' },
  { id: 'L008', user: 'SI. Kavitha Reddy', action: 'Queried AI assistant', entity: 'Transaction chain analysis', case: 'CASE-1044', time: '2026-09-25 11:22', type: 'ai' },
  { id: 'L009', user: 'Supt. Priya Menon', action: 'Marked indicator as reviewed', entity: 'ALT-001 (Rapid Transaction Chain)', case: 'CASE-1024', time: '2026-09-24 17:35', type: 'review' },
  { id: 'L010', user: 'Insp. Rajesh Nair', action: 'Uploaded evidence file', entity: 'Field_Report_Sep20.pdf', case: 'CASE-1031', time: '2026-09-24 16:20', type: 'upload' },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  view: <Eye size={12} className="text-blue-500" />,
  network: <Activity size={12} className="text-purple-500" />,
  upload: <Upload size={12} className="text-green-500" />,
  review: <CheckCircle size={12} className="text-amber-500" />,
  report: <BarChart3 size={12} className="text-indigo-500" />,
  entity: <User size={12} className="text-orange-500" />,
  ai: <AlertTriangle size={12} className="text-blue-600" />,
};

export const AuditPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? logs : logs.filter(l => l.user.includes(filter) || l.type === filter);

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Activity & Audit Log</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">Complete record of investigator actions for audit and accountability.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 flex-wrap">
        <span className="text-[12.5px] font-medium text-slate-500">Filter by:</span>
        {['All', 'view', 'upload', 'review', 'report', 'ai'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-md text-[12px] font-medium capitalize ${filter === f ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {f}
          </button>
        ))}
        <div className="ml-auto text-[12px] text-slate-400">{filtered.length} entries</div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Entity / Resource</th>
              <th>Case</th>
              <th>Timestamp</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => (
              <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <td className="font-mono text-[11.5px] text-slate-400">{log.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-[10px] font-bold">
                      {log.user.split(' ').map(w => w[0]).join('').slice(1, 3)}
                    </div>
                    <span className="text-[12.5px] font-medium text-slate-800">{log.user}</span>
                  </div>
                </td>
                <td className="text-[12.5px] text-slate-700">{log.action}</td>
                <td className="text-[12px] text-slate-500 max-w-[180px] truncate">{log.entity}</td>
                <td className="font-mono text-[12px] text-blue-600 font-semibold">{log.case}</td>
                <td className="text-[12px] text-slate-400">{log.time}</td>
                <td>
                  <div className="flex items-center gap-1">
                    {TYPE_ICONS[log.type]}
                    <span className="text-[11px] text-slate-500 capitalize">{log.type}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const TABS = ['Profile', 'Security', 'Notifications', 'Data', 'Language', 'Display'];

  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-[13px] text-slate-500">Manage your account, preferences and system configuration.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-slate-100 flex overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'Profile' && (
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">PM</div>
                <div>
                  <div className="font-bold text-slate-900 text-[16px]">Supt. Priya Menon</div>
                  <div className="text-slate-500 text-[13px]">Superintendent · Special Investigation Unit</div>
                  <div className="text-slate-400 text-[12px]">Level 3 Access · priya.menon@siu.gov.in</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[['Full Name', 'Supt. Priya Menon'], ['Email', 'priya.menon@siu.gov.in'], ['Rank', 'Superintendent'], ['Unit', 'Special Investigation Unit'], ['Badge ID', 'SIU-2341'], ['Access Level', 'Level 3 — Full Access']].map(([label, val]) => (
                  <div key={label}>
                    <label className="block text-[12px] font-semibold text-slate-600 mb-1">{label}</label>
                    <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] text-slate-700 bg-slate-50" defaultValue={val} />
                  </div>
                ))}
              </div>
              <button className="px-4 py-2 bg-blue-700 text-white text-[13px] font-semibold rounded-lg hover:bg-blue-800">Save Changes</button>
            </div>
          )}
          {activeTab !== 'Profile' && (
            <div className="text-center py-16 text-slate-400">
              <Clock size={40} className="mx-auto mb-3 opacity-30" />
              <div className="text-[14px] font-medium">{activeTab} settings</div>
              <div className="text-[12.5px] mt-1">Configuration panel for {activeTab.toLowerCase()} preferences</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
