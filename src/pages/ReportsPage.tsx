import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, FileText, Bot, Network, Users, Clock, AlertTriangle, CheckCircle, Printer } from 'lucide-react';
import { cases } from '../data/mockData';

const REPORT_TYPES = [
  { id: 'case-summary', name: 'Case Summary Report', icon: <FileText size={20} />, description: 'Comprehensive summary of case entities, relationships and key findings', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'network', name: 'Network Analysis Report', icon: <Network size={20} />, description: 'Graph metrics, community detection and centrality analysis', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'entity', name: 'Entity Report', icon: <Users size={20} />, description: 'Detailed profiles of all entities in the investigation', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { id: 'evidence', name: 'Evidence Report', icon: <FileText size={20} />, description: 'Complete evidence catalogue with extraction results', color: 'bg-green-50 border-green-200 text-green-700' },
  { id: 'timeline', name: 'Timeline Report', icon: <Clock size={20} />, description: 'Chronological event reconstruction with context', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'cross-case', name: 'Cross-Case Report', icon: <AlertTriangle size={20} />, description: 'Cross-case entity overlaps and connection analysis', color: 'bg-red-50 border-red-200 text-red-700' },
];

export const ReportsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState('CASE-1024');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!selectedType) return;
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  };

  const caseData = cases.find(c => c.id === selectedCase) || cases[0];
  const reportType = REPORT_TYPES.find(r => r.id === selectedType);

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Investigation Reports</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">Generate structured investigation reports for review and documentation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config panel */}
        <div className="space-y-5">
          {/* Select Case */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900 text-[14px] mb-3">Select Case</h2>
            <select
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCase}
              onChange={e => setSelectedCase(e.target.value)}
            >
              {cases.map(c => <option key={c.id} value={c.id}>{c.id} — {c.name}</option>)}
            </select>
          </div>

          {/* Report Type */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900 text-[14px] mb-3">Report Type</h2>
            <div className="space-y-2">
              {REPORT_TYPES.map(r => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedType(r.id); setGenerated(false); }}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${selectedType === r.id ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-300' : 'border-slate-200 hover:border-blue-200'}`}
                >
                  <div className={`p-2 rounded-lg ${r.color}`}>{r.icon}</div>
                  <div>
                    <div className="font-semibold text-slate-800 text-[13px]">{r.name}</div>
                    <div className="text-[11.5px] text-slate-400 mt-0.5 leading-snug">{r.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedType || generating}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-[14px] py-3 rounded-xl transition-colors"
          >
            {generating ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating…</>
            ) : (
              <><BarChart3 size={16} />Generate Report</>
            )}
          </button>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          {!selectedType && !generated && (
            <div className="h-full min-h-[400px] bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
              <div className="text-center">
                <BarChart3 size={48} className="text-slate-200 mx-auto mb-3" />
                <div className="text-[14px] font-medium text-slate-400">Select a report type to preview</div>
              </div>
            </div>
          )}

          {selectedType && !generated && !generating && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className={`inline-flex items-center gap-2 p-3 rounded-xl mb-3 ${reportType?.color}`}>
                  {reportType?.icon}
                </div>
                <div className="text-[15px] font-semibold text-slate-800 mb-1">{reportType?.name}</div>
                <div className="text-[13px] text-slate-400 mb-4 max-w-sm">{reportType?.description}</div>
                <div className="text-[12.5px] text-slate-500">Click "Generate Report" to create the report preview</div>
              </div>
            </div>
          )}

          {generating && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin mx-auto mb-4" />
                <div className="text-[14px] font-semibold text-slate-700 mb-2">Generating Report…</div>
                <div className="text-[12.5px] text-slate-400">Aggregating case data and analytical findings…</div>
              </div>
            </div>
          )}

          {generated && reportType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Report Header */}
              <div className="bg-slate-900 text-white px-8 py-6">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Netra Intelligence Platform</div>
                <h2 className="text-xl font-bold mb-1">{reportType.name}</h2>
                <div className="text-[13px] text-slate-300">{caseData.id} — {caseData.name}</div>
                <div className="flex items-center gap-4 mt-3 text-[12px] text-slate-400">
                  <span>Generated: {new Date().toLocaleString('en-IN')}</span>
                  <span>·</span>
                  <span>Investigator: Supt. Priya Menon</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* AI Disclaimer */}
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <Bot size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-[12px] text-amber-700">
                    <strong>AI-generated report — Requires investigator review before use.</strong> This report is an analytical summary generated from structured case data and AI-identified patterns. All findings must be verified by the responsible investigator.
                  </div>
                </div>

                {/* Case Overview */}
                <div>
                  <h3 className="font-bold text-slate-900 text-[14px] mb-3 pb-2 border-b border-slate-200">1. Case Overview</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Case ID', value: caseData.id },
                      { label: 'Status', value: caseData.status },
                      { label: 'Priority', value: caseData.priority },
                      { label: 'Assigned To', value: caseData.assignedTo },
                      { label: 'Created', value: caseData.created },
                      { label: 'Last Updated', value: caseData.lastUpdated },
                    ].map(f => (
                      <div key={f.label} className="bg-slate-50 rounded-lg p-3">
                        <div className="text-[11px] text-slate-400 font-medium mb-0.5">{f.label}</div>
                        <div className="text-[13px] font-semibold text-slate-800">{f.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Network Statistics */}
                <div>
                  <h3 className="font-bold text-slate-900 text-[14px] mb-3 pb-2 border-b border-slate-200">2. Network Statistics</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Entities', value: caseData.entities },
                      { label: 'Relationships', value: caseData.relationships },
                      { label: 'Indicators', value: caseData.indicators },
                      { label: 'Evidence Records', value: caseData.evidence },
                      { label: 'Persons', value: caseData.people },
                      { label: 'Transactions', value: caseData.transactions },
                    ].map(f => (
                      <div key={f.label} className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xl font-bold text-slate-900">{f.value}</div>
                        <div className="text-[11.5px] text-slate-400 mt-0.5">{f.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analytical Findings */}
                <div>
                  <h3 className="font-bold text-slate-900 text-[14px] mb-3 pb-2 border-b border-slate-200">3. Analytical Findings</h3>
                  <div className="space-y-2">
                    {[
                      { text: 'Rapid transaction chain detected: 4 sequential transfers (₹3,63,000) within 48 hours.', icon: '⚠️' },
                      { text: 'Cross-case network overlap detected with CASE-1031 via shared entity and financial channels.', icon: '🔗' },
                      { text: 'Harish Nanda shows highest network centrality (degree: 15, betweenness: 0.42).', icon: '📊' },
                      { text: 'Three distinct network communities identified in the investigation graph.', icon: '🕸️' },
                      { text: 'Unusual communication spike detected: 340% above baseline for 72-hour period.', icon: '📡' },
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-[13px] text-slate-600 p-2 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0">{f.icon}</span>{f.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export */}
                <div className="flex gap-3 pt-2">
                  <button className="flex items-center gap-2 text-[13px] font-semibold text-white bg-blue-700 px-4 py-2.5 rounded-xl hover:bg-blue-800">
                    <Download size={14} />Export PDF
                  </button>
                  <button className="flex items-center gap-2 text-[13px] font-medium text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50">
                    <Printer size={14} />Print
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
