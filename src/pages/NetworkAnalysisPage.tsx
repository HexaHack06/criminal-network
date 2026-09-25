import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, ZoomIn, ZoomOut, Maximize2, RefreshCw,
  RotateCcw, ChevronRight, Users, Phone, Car, MapPin,
  Building2, CreditCard, Eye, Network, X, FileText,
  GitMerge, Layers
} from 'lucide-react';
import { networkNodes, networkEdges, persons, cases } from '../data/mockData';

const NODE_COLORS: Record<string, string> = {
  person: '#3b82f6',
  phone: '#22c55e',
  vehicle: '#f97316',
  location: '#a855f7',
  organization: '#6366f1',
  transaction: '#ef4444',
  account: '#14b8a6',
};

const NODE_ICONS: Record<string, React.ReactNode> = {
  person: <Users size={10} />,
  phone: <Phone size={10} />,
  vehicle: <Car size={10} />,
  location: <MapPin size={10} />,
  organization: <Building2 size={10} />,
  transaction: <CreditCard size={10} />,
};

const EDGE_COLORS: Record<string, string> = {
  CALLS: '#3b82f6',
  KNOWS: '#64748b',
  OWNS: '#22c55e',
  VISITED: '#a855f7',
  TRANSFERRED_TO: '#ef4444',
  WORKS_FOR: '#f97316',
  ASSOCIATED_WITH: '#94a3b8',
  USES: '#14b8a6',
  INITIATED: '#ef4444',
  RECEIVED: '#22c55e',
};

interface SelectedNode {
  id: string;
  label: string;
  type: string;
  connections: number;
}

const CANVAS_W = 900;
const CANVAS_H = 600;
const SCALE_FACTOR = 0.9;

export const NetworkAnalysisPage: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [depth, setDepth] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFindPath, setShowFindPath] = useState(false);
  const [entityA, setEntityA] = useState('ENT-P001');
  const [entityB, setEntityB] = useState('ENT-P005');

  const visibleNodes = networkNodes.filter(n => {
    if (typeFilter.length > 0 && !typeFilter.includes(n.type)) return false;
    if (searchTerm && !n.label.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleEdges = networkEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));

  const handleNodeClick = (node: typeof networkNodes[0]) => {
    const connections = networkEdges.filter(e => e.source === node.id || e.target === node.id).length;
    setSelectedNode({ id: node.id, label: node.label.replace('\n', ' '), type: node.type, connections });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
  };
  const handleMouseUp = () => setIsPanning(false);

  const typeOptions = ['person', 'phone', 'vehicle', 'location', 'organization', 'transaction'];

  const toggleTypeFilter = (t: string) => {
    setTypeFilter(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  // Path finding between two nodes
  const findPath = () => {
    // Simple BFS on edges
    const graph: Record<string, string[]> = {};
    networkEdges.forEach(e => {
      if (!graph[e.source]) graph[e.source] = [];
      if (!graph[e.target]) graph[e.target] = [];
      graph[e.source].push(e.target);
      graph[e.target].push(e.source);
    });
    const queue: string[][] = [[entityA]];
    const visited = new Set([entityA]);
    while (queue.length > 0) {
      const path = queue.shift()!;
      const last = path[path.length - 1];
      if (last === entityB) return path;
      for (const neighbor of (graph[last] || [])) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
    return null;
  };

  const path = showFindPath ? findPath() : null;
  const pathSet = path ? new Set(path) : new Set<string>();

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left Control Panel */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-[14px] mb-3 flex items-center gap-2">
            <Network size={14} className="text-blue-600" />Network Analysis
          </h2>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-[12.5px] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search entity..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Case */}
          <div className="mb-3">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Case</label>
            <select className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12.5px] text-slate-700 bg-slate-50 focus:outline-none">
              <option>All Cases</option>
              {cases.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Entity Type Filter */}
          <div className="mb-3">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Entity Types</label>
            <div className="flex flex-wrap gap-1">
              {typeOptions.map(t => (
                <button
                  key={t}
                  onClick={() => toggleTypeFilter(t)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize transition-colors ${typeFilter.includes(t) ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  style={typeFilter.includes(t) ? { background: NODE_COLORS[t] } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Depth */}
          <div className="mb-3">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
              Hop Depth: {depth}
            </label>
            <input type="range" min={1} max={3} value={depth} onChange={e => setDepth(+e.target.value)}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>1 hop</span><span>2 hops</span><span>3 hops</span>
            </div>
          </div>
        </div>

        {/* Find Connection */}
        <div className="p-4 border-b border-slate-100">
          <button
            className="w-full flex items-center justify-between text-[12.5px] font-semibold text-slate-700 hover:text-blue-700"
            onClick={() => setShowFindPath(!showFindPath)}
          >
            <span className="flex items-center gap-1.5"><GitMerge size={13} />Find Connection</span>
            <ChevronRight size={13} className={`transition-transform ${showFindPath ? 'rotate-90' : ''}`} />
          </button>
          {showFindPath && (
            <div className="mt-3 space-y-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Entity A</label>
                <select
                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] bg-slate-50 focus:outline-none"
                  value={entityA}
                  onChange={e => setEntityA(e.target.value)}
                >
                  {networkNodes.filter(n => n.type === 'person').map(n => (
                    <option key={n.id} value={n.id}>{n.label.replace('\n', ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Entity B</label>
                <select
                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] bg-slate-50 focus:outline-none"
                  value={entityB}
                  onChange={e => setEntityB(e.target.value)}
                >
                  {networkNodes.filter(n => n.type === 'person').map(n => (
                    <option key={n.id} value={n.id}>{n.label.replace('\n', ' ')}</option>
                  ))}
                </select>
              </div>
              {path && (
                <div className="mt-2 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-[11px] font-bold text-blue-600 mb-1.5">Shortest path ({path.length - 1} hops):</div>
                  {path.map((nodeId, idx) => {
                    const node = networkNodes.find(n => n.id === nodeId);
                    return (
                      <div key={nodeId} className="text-[11.5px]">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ background: NODE_COLORS[node?.type || 'person'] }} />
                          <span className="font-medium text-slate-800">{node?.label.replace('\n', ' ')}</span>
                          <span className="text-slate-400 text-[10px]">({node?.type})</span>
                        </div>
                        {idx < path.length - 1 && (
                          <div className="ml-1 text-slate-400 text-[10px] pl-2 border-l border-slate-300 my-0.5">
                            {networkEdges.find(e => (e.source === nodeId && e.target === path[idx+1]) || (e.target === nodeId && e.source === path[idx+1]))?.label || '↓'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {!path && showFindPath && entityA !== entityB && (
                <div className="text-[11px] text-slate-400 text-center py-2">No direct path found in current view</div>
              )}
            </div>
          )}
        </div>

        {/* Graph Controls */}
        <div className="p-4">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Graph Controls</label>
          <div className="space-y-1.5">
            {[
              { label: 'Zoom In', icon: <ZoomIn size={12} />, onClick: () => setZoom(z => Math.min(z + 0.2, 3)) },
              { label: 'Zoom Out', icon: <ZoomOut size={12} />, onClick: () => setZoom(z => Math.max(z - 0.2, 0.3)) },
              { label: 'Reset View', icon: <RotateCcw size={12} />, onClick: () => { setZoom(1); setPan({ x: 0, y: 0 }); setTypeFilter([]); setSearchTerm(''); } },
              { label: 'Expand Selected', icon: <Maximize2 size={12} />, onClick: () => {} },
            ].map(ctrl => (
              <button
                key={ctrl.label}
                onClick={ctrl.onClick}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-colors"
              >
                {ctrl.icon}{ctrl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-slate-100">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Legend</label>
          <div className="space-y-1">
            {typeOptions.map(t => (
              <div key={t} className="flex items-center gap-2 text-[12px] text-slate-600 capitalize">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: NODE_COLORS[t] }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative bg-slate-50 overflow-hidden" style={{ cursor: isPanning ? 'grabbing' : 'grab' }}>
        {/* Toolbar */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
          <Layers size={13} className="text-slate-400" />
          <span className="text-[12.5px] text-slate-600 font-medium">{visibleNodes.length} entities · {visibleEdges.length} relationships</span>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <span className="text-[12px] text-blue-600 font-medium">Zoom: {Math.round(zoom * 100)}%</span>
        </div>

        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#93c5fd" />
            </marker>
            <marker id="arrowGray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#cbd5e1" />
            </marker>
            <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#fca5a5" />
            </marker>
          </defs>
          <g transform={`translate(${pan.x + 60}, ${pan.y + 60}) scale(${zoom})`}>
            {/* Grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
            <rect x="-200" y="-200" width="2000" height="1600" fill="url(#grid)" />

            {/* Edges */}
            {visibleEdges.map(edge => {
              const src = visibleNodes.find(n => n.id === edge.source);
              const tgt = visibleNodes.find(n => n.id === edge.target);
              if (!src || !tgt) return null;
              const isHighlighted = pathSet.has(edge.source) && pathSet.has(edge.target);
              const color = isHighlighted ? '#3b82f6' : EDGE_COLORS[edge.label] || '#94a3b8';
              const mx = (src.x + tgt.x) / 2;
              const my = (src.y + tgt.y) / 2;
              return (
                <g key={edge.id}>
                  <line
                    x1={src.x * SCALE_FACTOR} y1={src.y * SCALE_FACTOR}
                    x2={tgt.x * SCALE_FACTOR} y2={tgt.y * SCALE_FACTOR}
                    stroke={isHighlighted ? '#3b82f6' : color}
                    strokeWidth={isHighlighted ? 2.5 : Math.max(0.8, edge.weight * 0.4)}
                    strokeOpacity={isHighlighted ? 1 : 0.45}
                    strokeDasharray={isHighlighted ? undefined : (edge.label === 'CALLS' ? undefined : '4,3')}
                    markerEnd={isHighlighted ? 'url(#arrowBlue)' : 'url(#arrowGray)'}
                  />
                  {(hoveredNode === edge.source || hoveredNode === edge.target || isHighlighted) && (
                    <text x={mx * SCALE_FACTOR} y={my * SCALE_FACTOR - 4} textAnchor="middle" fontSize={8} fill={isHighlighted ? '#1d4ed8' : '#94a3b8'} fontWeight="600">
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {visibleNodes.map(node => {
              const color = NODE_COLORS[node.type] || '#64748b';
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode === node.id;
              const isInPath = pathSet.has(node.id);
              const r = node.type === 'person' ? 22 : 17;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x * SCALE_FACTOR}, ${node.y * SCALE_FACTOR})`}
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Selection ring */}
                  {(isSelected || isInPath) && (
                    <circle r={r + 6} fill="none" stroke={isInPath ? '#3b82f6' : color} strokeWidth={2} strokeOpacity={0.5} strokeDasharray="4 2" />
                  )}
                  {/* Halo */}
                  {isHovered && <circle r={r + 4} fill={color} fillOpacity={0.12} />}
                  {/* Main circle */}
                  <circle r={r} fill={color} fillOpacity={isSelected ? 1 : 0.88} stroke="white" strokeWidth={2.5} />
                  {/* Label */}
                  {node.label.split('\n').map((line, li) => (
                    <text
                      key={li}
                      y={r + 14 + li * 11}
                      textAnchor="middle"
                      fontSize={9.5}
                      fontWeight="600"
                      fill="#374151"
                    >
                      {line}
                    </text>
                  ))}
                  {/* Type indicator */}
                  <text y={4} textAnchor="middle" fontSize={10} fill="white" fontWeight="bold">
                    {node.type === 'person' ? node.label.split('\n')[0].split(' ').map(w => w[0]).join('').slice(0,2) :
                     node.type === 'phone' ? '📞' : node.type === 'vehicle' ? '🚗' :
                     node.type === 'location' ? '📍' : node.type === 'organization' ? '🏢' : '₹'}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Zoom controls overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm">
            <ZoomIn size={14} />
          </button>
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.3))} className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm">
            <ZoomOut size={14} />
          </button>
          <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Right Panel — Selected Entity */}
      {selectedNode && (
        <motion.div
          initial={{ x: 280 }}
          animate={{ x: 0 }}
          className="w-72 bg-white border-l border-slate-200 flex flex-col overflow-y-auto"
        >
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-[13.5px]">Entity Details</h3>
            <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600">
              <X size={15} />
            </button>
          </div>
          <div className="p-4">
            {/* Entity Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[13px] font-bold" style={{ background: NODE_COLORS[selectedNode.type] }}>
                {selectedNode.label.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-[14px]">{selectedNode.label}</div>
                <div className="text-[11px] capitalize text-slate-500">{selectedNode.type} · {selectedNode.id}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">Connections</span>
                <span className="font-semibold text-slate-900">{selectedNode.connections}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">Cases</span>
                <span className="font-semibold text-slate-900">
                  {persons.find(p => p.id === selectedNode.id)?.cases.length || 1}
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">Indicators</span>
                <span className="font-semibold text-amber-600">
                  {persons.find(p => p.id === selectedNode.id)?.indicators || 0}
                </span>
              </div>
            </div>

            {/* Related edges */}
            <div className="mb-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Relationships</div>
              <div className="space-y-1.5">
                {networkEdges
                  .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                  .slice(0, 6)
                  .map(edge => {
                    const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                    const other = networkNodes.find(n => n.id === otherId);
                    return (
                      <div key={edge.id} className="flex items-center gap-2 text-[12px]">
                        <div className="w-2 h-2 rounded-full" style={{ background: NODE_COLORS[other?.type || 'person'] }} />
                        <span className="text-slate-600 truncate">{other?.label.replace('\n', ' ')}</span>
                        <span className="ml-auto text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{edge.label}</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors">
                <Eye size={13} />View Full Profile
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] font-semibold text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                <Network size={13} />Find Connections
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <FileText size={13} />View Evidence
              </button>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="text-[11px] text-amber-700 font-semibold mb-1">Analytical Note</div>
              <div className="text-[11px] text-amber-600">All connections shown are analytical signals. Human review required before any investigative action.</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};


