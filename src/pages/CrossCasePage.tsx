import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Users, Phone, Car, MapPin, Building2, Eye, ArrowRight, Network } from 'lucide-react';
import { crossCaseConnections, cases } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export const CrossCasePage: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<typeof crossCaseConnections[0] | null>(null);

  const getCase = (id: string) => cases.find(c => c.id === id);
  const strengthColors: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Cross-Case Intelligence</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">Detected relationships and shared entities across active investigations.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <GitBranch size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-[13px] text-blue-700">
          <strong>{crossCaseConnections.length} cross-case connections detected.</strong> AI analysis identified shared entities, phones, vehicles, and locations across multiple active investigations. All connections require investigator review.
        </p>
      </div>

      {/* Connection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {crossCaseConnections.map((conn, i) => {
          const case1 = getCase(conn.case1);
          const case2 = getCase(conn.case2);
          const isSelected = selected === conn;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white border rounded-xl shadow-sm cursor-pointer transition-all ${isSelected ? 'border-blue-400 ring-2 ring-blue-200' : 'border-slate-200 hover:border-blue-300'}`}
              onClick={() => setSelected(isSelected ? null : conn)}
            >
              <div className="p-5">
                {/* Cases header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="font-mono text-[12px] text-blue-600 font-bold">{conn.case1}</div>
                    <div className="text-[12.5px] font-semibold text-slate-800 truncate mt-0.5">{case1?.name}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-4 bg-slate-300" />
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <GitBranch size={14} className="text-blue-600" />
                    </div>
                    <div className="w-px h-4 bg-slate-300" />
                  </div>
                  <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="font-mono text-[12px] text-blue-600 font-bold">{conn.case2}</div>
                    <div className="text-[12.5px] font-semibold text-slate-800 truncate mt-0.5">{case2?.name}</div>
                  </div>
                </div>

                {/* Shared items */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {conn.sharedEntities.length > 0 && (
                    <div className="flex items-center gap-2 text-[12px]">
                      <Users size={12} className="text-blue-500" />
                      <span className="text-slate-600">{conn.sharedEntities.length} shared entity</span>
                    </div>
                  )}
                  {conn.sharedPhones.length > 0 && (
                    <div className="flex items-center gap-2 text-[12px]">
                      <Phone size={12} className="text-green-500" />
                      <span className="text-slate-600">{conn.sharedPhones.length} shared phone</span>
                    </div>
                  )}
                  {conn.sharedVehicles.length > 0 && (
                    <div className="flex items-center gap-2 text-[12px]">
                      <Car size={12} className="text-orange-500" />
                      <span className="text-slate-600">{conn.sharedVehicles.length} shared vehicle</span>
                    </div>
                  )}
                  {conn.sharedLocations.length > 0 && (
                    <div className="flex items-center gap-2 text-[12px]">
                      <MapPin size={12} className="text-purple-500" />
                      <span className="text-slate-600">{conn.sharedLocations.length} shared location</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${strengthColors[conn.strength]}`}>
                    {conn.strength} Connection Strength
                  </span>
                  <span className="text-[12px] text-slate-400">Detected: {conn.detectedDate}</span>
                </div>
              </div>

              {/* Expanded detail */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-slate-100 p-5 bg-slate-50"
                >
                  <div className="space-y-3">
                    {conn.sharedEntities.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Shared Entities</div>
                        <div className="flex flex-wrap gap-1.5">
                          {conn.sharedEntities.map(e => (
                            <span key={e} className="text-[12px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">{e}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {conn.sharedPhones.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Shared Phones</div>
                        <div className="flex flex-wrap gap-1.5">
                          {conn.sharedPhones.map(p => <span key={p} className="text-[12px] bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-lg font-medium">{p}</span>)}
                        </div>
                      </div>
                    )}
                    {conn.sharedLocations.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Shared Locations</div>
                        <div className="flex flex-wrap gap-1.5">
                          {conn.sharedLocations.map(l => <span key={l} className="text-[12px] bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-lg font-medium">{l}</span>)}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button
                        className="flex items-center gap-1.5 text-[12.5px] font-semibold text-white bg-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-800"
                        onClick={(e) => { e.stopPropagation(); navigate('/network'); }}
                      >
                        <Network size={13} />View Combined Network
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-white"
                        onClick={(e) => { e.stopPropagation(); navigate(`/cases/${conn.case1}`); }}
                      >
                        Open {conn.case1} <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
