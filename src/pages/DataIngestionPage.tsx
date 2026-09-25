import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Clock, AlertCircle, ArrowDown, Loader } from 'lucide-react';

const DATA_SOURCES = [
  { id: 'fir', name: 'FIR / Investigation Reports', icon: '📋', formats: ['PDF', 'TXT', 'DOCX'], description: 'First Information Reports and investigation summaries', color: 'border-red-200 bg-red-50' },
  { id: 'cdr', name: 'Call Detail Records', icon: '📞', formats: ['CSV', 'XLSX', 'JSON'], description: 'Telecom CDR data from network operators', color: 'border-blue-200 bg-blue-50' },
  { id: 'txn', name: 'Financial Transactions', icon: '💳', formats: ['CSV', 'XLSX', 'JSON'], description: 'Bank statements, RTGS/NEFT/IMPS records', color: 'border-green-200 bg-green-50' },
  { id: 'vehicle', name: 'Vehicle Records', icon: '🚗', formats: ['CSV', 'XLSX'], description: 'RTO vehicle registration and movement data', color: 'border-orange-200 bg-orange-50' },
  { id: 'surveillance', name: 'Surveillance Reports', icon: '📷', formats: ['PDF', 'TXT', 'Images'], description: 'Field intelligence and surveillance documentation', color: 'border-purple-200 bg-purple-50' },
  { id: 'social', name: 'Social Media Intelligence', icon: '🌐', formats: ['JSON', 'CSV', 'TXT'], description: 'OSINT data from public social media sources', color: 'border-pink-200 bg-pink-50' },
  { id: 'criminal', name: 'Criminal History Records', icon: '🗂️', formats: ['PDF', 'JSON'], description: 'Prior records and historical investigation data', color: 'border-indigo-200 bg-indigo-50' },
  { id: 'intelligence', name: 'Intelligence Reports', icon: '🔍', formats: ['PDF', 'TXT', 'DOCX'], description: 'Bureau intelligence and field reports', color: 'border-teal-200 bg-teal-50' },
];

const PIPELINE_STEPS = ['Upload', 'Validation', 'Extraction', 'Entity Detection', 'Relationship Detection', 'Graph Update'];

interface ProcessingCard {
  id: string;
  name: string;
  type: string;
  status: 'processing' | 'complete' | 'error';
  progress: number;
  entities: number;
  relationships: number;
  time: string;
}

const mockProcessing: ProcessingCard[] = [
  { id: 'UP-001', name: 'CDR_Airtel_Sep2026.csv', type: 'CDR', status: 'complete', progress: 100, entities: 14, relationships: 47, time: '2m 13s' },
  { id: 'UP-002', name: 'SBI_Transactions_Q3.xlsx', type: 'Transaction', status: 'complete', progress: 100, entities: 8, relationships: 22, time: '3m 41s' },
  { id: 'UP-003', name: 'Field_Report_Sep20.pdf', type: 'Surveillance', status: 'processing', progress: 64, entities: 0, relationships: 0, time: '—' },
];

export const DataIngestionPage: React.FC = () => {
  const [processing, setProcessing] = useState<ProcessingCard[]>(mockProcessing);
  const [dragging, setDragging] = useState<string | null>(null);

  const handleDrop = (sourceId: string) => {
    const source = DATA_SOURCES.find(s => s.id === sourceId);
    if (!source) return;
    const newCard: ProcessingCard = {
      id: `UP-${Date.now()}`,
      name: `${source.name.replace(/\s/g, '_')}_Upload.csv`,
      type: source.id,
      status: 'processing',
      progress: 0,
      entities: 0,
      relationships: 0,
      time: '—',
    };
    setProcessing(prev => [newCard, ...prev]);
    // Simulate progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 15 + 5;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setProcessing(prev => prev.map(c =>
          c.id === newCard.id
            ? { ...c, status: 'complete', progress: 100, entities: Math.floor(Math.random() * 12) + 3, relationships: Math.floor(Math.random() * 30) + 8, time: `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 50) + 5}s` }
            : c
        ));
      } else {
        setProcessing(prev => prev.map(c => c.id === newCard.id ? { ...c, progress: Math.floor(prog) } : c));
      }
    }, 400);
  };

  const currentStep = (progress: number) => {
    const idx = Math.floor((progress / 100) * PIPELINE_STEPS.length);
    return Math.min(idx, PIPELINE_STEPS.length - 1);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Data Sources & Ingestion</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">Upload evidence and data records for AI-powered entity extraction and relationship detection.</p>
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900 text-[14px] mb-4">AI Processing Pipeline</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {PIPELINE_STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white text-[12px] font-bold">
                  {i + 1}
                </div>
                <div className="text-[11px] font-medium text-slate-600 whitespace-nowrap">{step}</div>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <ArrowDown size={14} className="text-slate-300 rotate-[-90deg] flex-shrink-0 mt-[-14px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Source Upload Cards */}
        <div>
          <h2 className="font-semibold text-slate-900 text-[14px] mb-3">Supported Data Sources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DATA_SOURCES.map(source => (
              <motion.div
                key={source.id}
                className={`border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${dragging === source.id ? 'scale-95 border-blue-400 bg-blue-50' : source.color}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onDragOver={e => { e.preventDefault(); setDragging(source.id); }}
                onDragLeave={() => setDragging(null)}
                onDrop={() => { setDragging(null); handleDrop(source.id); }}
                onClick={() => handleDrop(source.id)}
              >
                <div className="text-2xl mb-2">{source.icon}</div>
                <div className="font-semibold text-slate-900 text-[13px] mb-1">{source.name}</div>
                <div className="text-[11.5px] text-slate-500 mb-2 leading-snug">{source.description}</div>
                <div className="flex flex-wrap gap-1">
                  {source.formats.map(f => (
                    <span key={f} className="text-[10.5px] bg-white/80 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-semibold">{f}</span>
                  ))}
                </div>
                <div className="mt-2 text-[11px] text-blue-600 font-medium">Click or drop file to upload →</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Processing Status */}
        <div>
          <h2 className="font-semibold text-slate-900 text-[14px] mb-3">Processing Status</h2>
          <div className="space-y-3">
            {processing.map(card => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-blue-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800 text-[13px] truncate max-w-[200px]">{card.name}</div>
                      <div className="text-[11px] text-slate-400">{card.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {card.status === 'complete' ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : card.status === 'processing' ? (
                      <Loader size={14} className="text-blue-500 animate-spin" />
                    ) : (
                      <AlertCircle size={14} className="text-red-500" />
                    )}
                    <span className={`text-[11px] font-semibold ${card.status === 'complete' ? 'text-green-600' : card.status === 'processing' ? 'text-blue-600' : 'text-red-600'}`}>
                      {card.status === 'complete' ? 'Complete' : card.status === 'processing' ? 'Processing…' : 'Error'}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-2">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{PIPELINE_STEPS[currentStep(card.progress)]}</span>
                    <span>{card.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      animate={{ width: `${card.progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {card.status === 'complete' && (
                  <div className="flex gap-4 text-[12px] mt-2">
                    <span className="text-slate-500">Entities: <strong className="text-slate-800">{card.entities}</strong></span>
                    <span className="text-slate-500">Relationships: <strong className="text-slate-800">{card.relationships}</strong></span>
                    <span className="text-slate-500">Time: <strong className="text-slate-800">{card.time}</strong></span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
