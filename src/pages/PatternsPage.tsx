import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Eye, Info, X, Bot, Filter, Search, RefreshCw } from 'lucide-react';
import { SeverityBadge } from '../components/shared/Badges';
import { alerts } from '../data/mockData';

interface ExplainPanelProps {
  alert: typeof alerts[0];
  onClose: () => void;
}

const ExplainPanel: React.FC<ExplainPanelProps> = ({ alert, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 40 }}
    className="fixed right-0 top-14 bottom-0 w-[420px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col overflow-y-auto"
  >
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <Bot size={15} className="text-blue-600" />
        <span className="font-bold text-slate-900 text-[14px]">Why was this flagged?</span>
      </div>
      <button onClick={onClose}><X size={16} className="text-slate-400 hover:text-slate-700" /></button>
    </div>
    <div className="p-5 space-y-5">
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="text-[11px] text-amber-700 font-bold mb-1">AI-generated analytical insight</div>
        <div className="text-[12px] text-amber-600">This is an analytical signal requiring investigator review. Not a determination of guilt or involvement in any offence.</div>
      </div>
      <div>
        <div className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide mb-2">Indicator Type</div>
        <div className="flex items-center gap-2">
          <SeverityBadge severity={alert.severity} />
          <span className="font-semibold text-slate-900">{alert.type}</span>
        </div>
      </div>
      <div>
        <div className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide mb-2">Detection Reason</div>
        <p className="text-[13px] text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">{alert.reason}</p>
      </div>
      <div>
        <div className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide mb-2">Detection Source</div>
        <div className="flex items-center gap-2 text-[13px] text-slate-700">
          <Bot size={14} className="text-blue-500" /> {alert.source}
        </div>
      </div>
      <div>
        <div className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide mb-2">Entities Involved</div>
        <div className="flex flex-wrap gap-1.5">
          {alert.entities.map(ent => (
            <span key={ent} className="text-[12px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">{ent}</span>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide mb-2">Supporting Evidence Records</div>
        <div className="space-y-1.5">
          {['CDR Analysis Reports', 'Transaction Records (SBI)', 'Field Surveillance Report', 'RTO Vehicle Records'].map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-[12.5px] text-slate-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />{d}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide mb-2">Analytical Confidence Signal</div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-100 rounded-full h-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: '68%' }} />
          </div>
          <span className="text-[12.5px] font-bold text-slate-700">68%</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1">Signal score — does not indicate probability of any offence</div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 py-2.5 text-[13px] font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800" onClick={onClose}>Mark as Reviewed</button>
        <button className="flex-1 py-2.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50" onClick={onClose}>Dismiss</button>
      </div>
    </div>
  </motion.div>
);

const SEVERITY_LEVELS = ['All', 'Critical', 'High', 'Medium', 'Low'];
const INDICATOR_TYPES = ['All', 'Rapid Transaction Chain', 'Shared Phone Association', 'Repeated Location Overlap', 'Cross-Case Relationship', 'Unusual Communication Pattern', 'Network Expansion', 'Financial Structuring Pattern', 'Vehicle Association'];

export const PatternsPage: React.FC = () => {
  const [explainAlert, setExplainAlert] = useState<typeof alerts[0] | null>(null);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [reviewFilter, setReviewFilter] = useState('All');

  const filtered = alerts.filter(a => {
    const matchSev = severityFilter === 'All' || a.severity === severityFilter;
    const matchType = typeFilter === 'All' || a.type === typeFilter;
    const matchReview = reviewFilter === 'All' || (reviewFilter === 'Pending' && !a.reviewed) || (reviewFilter === 'Reviewed' && a.reviewed);
    return matchSev && matchType && matchReview;
  });

  const criticalCount = alerts.filter(a => a.severity === 'Critical').length;
  const pendingCount = alerts.filter(a => !a.reviewed).length;

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Patterns & Investigation Indicators</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">AI-detected analytical signals requiring investigator review.</p>
        </div>
        <button className="flex items-center gap-2 text-[12.5px] font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
          <RefreshCw size={13} />Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Indicators', value: alerts.length, color: 'text-slate-900', bg: 'bg-white' },
          { label: 'Critical', value: criticalCount, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
          { label: 'Pending Review', value: pendingCount, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Reviewed', value: alerts.length - pendingCount, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border border-slate-200 rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[12.5px] text-slate-500 font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <Info size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-blue-700">
          <strong>All indicators are AI-generated analytical signals.</strong> They represent patterns requiring investigator review and do not constitute evidence of criminal activity or determinations of guilt.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-slate-400" />
          <span className="text-[12.5px] font-medium text-slate-500">Severity:</span>
          <div className="flex gap-1">
            {SEVERITY_LEVELS.map(s => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors ${severityFilter === s ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-medium text-slate-500">Review Status:</span>
          <select
            className="border border-slate-200 rounded-lg px-2.5 py-1 text-[12.5px] bg-slate-50"
            value={reviewFilter}
            onChange={e => setReviewFilter(e.target.value)}
          >
            <option>All</option>
            <option value="Pending">Pending Review</option>
            <option value="Reviewed">Reviewed</option>
          </select>
        </div>
        <div className="ml-auto text-[12px] text-slate-400">{filtered.length} indicators</div>
      </div>

      {/* Indicator Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white border rounded-xl p-5 shadow-sm ${!alert.reviewed ? 'border-amber-200' : 'border-slate-200'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1">
                    <AlertTriangle size={14} className={alert.severity === 'Critical' ? 'text-red-500' : alert.severity === 'High' ? 'text-orange-500' : 'text-amber-500'} />
                    <span className="font-bold text-slate-900 text-[14.5px]">{alert.type}</span>
                    <SeverityBadge severity={alert.severity} />
                    {!alert.reviewed && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">Pending Review</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-slate-400">
                    <span>Detected: {alert.date}</span>
                    <span>·</span>
                    <span>Case: <span className="font-semibold text-blue-600">{alert.caseId}</span></span>
                    <span>·</span>
                    <span>Source: {alert.source}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ml-3 ${alert.reviewed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {alert.reviewed ? '✓ Reviewed' : '⚠ Pending'}
                </span>
              </div>

              <p className="text-[13px] text-slate-600 mb-3 leading-relaxed">{alert.reason}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {alert.entities.map(ent => (
                  <span key={ent} className="text-[12px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">{ent}</span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-1.5 text-[12.5px] font-semibold text-blue-700 border border-blue-300 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
                  onClick={() => setExplainAlert(alert)}
                >
                  <Info size={13} />Why was this flagged?
                </button>
                <button className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                  <Eye size={13} />View on Graph
                </button>
                {!alert.reviewed && (
                  <button className="ml-auto flex items-center gap-1.5 text-[12.5px] font-semibold text-white bg-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-800">
                    Mark Reviewed
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
            <AlertTriangle size={40} className="mx-auto mb-3 text-slate-300" />
            <div className="text-[14px] font-medium text-slate-400">No indicators match the current filters</div>
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
