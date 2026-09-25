import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Clock, AlertTriangle, X, ZoomIn, ZoomOut, RotateCcw, Compass, Layers, Shield, Crosshair } from 'lucide-react';
import { locations } from '../data/mockData';
import { INDIA_STATES, projectCoordinates, MAP_DIMENSIONS } from '../data/indiaVectorMap';
import L from 'leaflet';

const TYPE_COLORS: Record<string, string> = {
  Commercial: '#2563eb',
  Industrial: '#ea580c',
  Transit: '#7c3aed',
  Warehouse: '#475569',
  Port: '#0284c7',
  Residential: '#16a34a',
  Logistics: '#9333ea',
};

// Major state labels for reference map
const STATE_ABBRS: Record<string, string> = {
  'Maharashtra': 'MH',
  'Gujarat': 'GJ',
  'Delhi': 'DL',
  'Rajasthan': 'RJ',
  'Uttar Pradesh': 'UP',
  'West Bengal': 'WB',
  'Tamil Nadu': 'TN',
  'Karnataka': 'KA',
  'Kerala': 'KL',
  'Punjab': 'PB',
  'Haryana': 'HR',
  'Bihar': 'BR',
  'Madhya Pradesh': 'MP',
  'Andhra Pradesh': 'AP',
  'Telangana': 'TG',
  'Odisha': 'OD',
  'Assam': 'AS',
  'Jammu and Kashmir': 'J&K',
  'Goa': 'GA',
  'Jharkhand': 'JH',
  'Chhattisgarh': 'CG',
  'Himachal Pradesh': 'HP',
  'Uttarakhand': 'UK'
};

const CX = MAP_DIMENSIONS.width / 2; // 410
const CY = MAP_DIMENSIONS.height / 2; // 460

export const MapIntelligencePage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<typeof locations[0] | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('All');
  const [caseFilter, setCaseFilter] = useState('All');
  const [mapMode, setMapMode] = useState<'reference' | 'osm'>('reference');
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  // SVG Pan & Zoom state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Leaflet references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const allTypes = ['All', ...Array.from(new Set(locations.map(l => l.type)))];
  const allCases = ['All', 'CASE-1024', 'CASE-1031', 'CASE-1044', 'CASE-1059', 'CASE-1067'];

  const filtered = locations.filter(l => {
    const matchType = typeFilter === 'All' || l.type === typeFilter;
    const matchCase = caseFilter === 'All' || l.cases.includes(caseFilter);
    return matchType && matchCase;
  });

  // Smooth automatic zoom to location
  const handleLocationClick = (loc: typeof locations[0]) => {
    setSelectedLocation(loc);

    if (mapMode === 'osm') {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([loc.lat, loc.lng], 12, { duration: 1.5 });
      }
    } else {
      // In Reference Map mode: center and zoom in automatically to 2.4x
      const [px, py] = projectCoordinates(loc.lat, loc.lng);
      const targetZoom = 2.4;
      setZoomLevel(targetZoom);
      setPanOffset({
        x: CX - targetZoom * px,
        y: CY - targetZoom * py,
      });
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prevZoom => {
      const nextZoom = Math.min(prevZoom * 1.35, 4.0);
      setPanOffset(prev => ({
        x: CX - (CX - prev.x) * (nextZoom / prevZoom),
        y: CY - (CY - prev.y) * (nextZoom / prevZoom)
      }));
      return nextZoom;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => {
      const nextZoom = Math.max(prevZoom / 1.35, 1.0);
      if (nextZoom <= 1.0) {
        setPanOffset({ x: 0, y: 0 });
        return 1.0;
      }
      setPanOffset(prev => ({
        x: CX - (CX - prev.x) * (nextZoom / prevZoom),
        y: CY - (CY - prev.y) * (nextZoom / prevZoom)
      }));
      return nextZoom;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedLocation(null);
    if (mapMode === 'osm' && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([21.8, 78.5], 5, { duration: 1.2 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragStart({ x: e.clientX, y: e.clientY });
    setPanOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  // Initialize Leaflet Map when in 'osm' mode
  useEffect(() => {
    if (mapMode !== 'osm') {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [21.8, 78.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapMode]);

  // Update Leaflet markers when in 'osm' mode
  useEffect(() => {
    if (mapMode !== 'osm' || !mapInstanceRef.current || !markersLayerRef.current) return;

    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();

    filtered.forEach(loc => {
      const color = TYPE_COLORS[loc.type] || '#64748b';
      const isSelected = selectedLocation?.id === loc.id;
      const isHighActivity = loc.visits > 10;

      const markerHtml = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
          ${isSelected ? `<span style="position:absolute;width:38px;height:38px;border-radius:50%;background-color:${color};opacity:0.4;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>` : ''}
          <div style="width:24px;height:24px;border-radius:50%;background-color:${color};border:2.5px solid #ffffff;box-shadow:0 3px 10px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">
            <div style="width:7px;height:7px;border-radius:50%;background-color:#ffffff;"></div>
          </div>
          ${isHighActivity ? `<div style="position:absolute;top:-4px;right:-4px;width:10px;height:10px;border-radius:50%;background-color:#ef4444;border:1.5px solid #ffffff;"></div>` : ''}
          <div style="position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;background-color:#ffffff;color:#1e293b;border:1px solid #cbd5e1;padding:1px 6px;border-radius:4px;font-size:9.5px;font-weight:700;box-shadow:0 1px 3px rgba(0,0,0,0.15);pointer-events:none;">
            ${loc.name.split(' ').slice(0, 2).join(' ')}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon });

      marker.on('click', () => {
        handleLocationClick(loc);
      });

      markersLayer.addLayer(marker);
    });
  }, [filtered, selectedLocation, mapMode]);

  // Count sites per state for tooltip
  const getSitesCountForState = (stateName: string) => {
    const matched = locations.filter(l => {
      const addr = l.address.toLowerCase();
      const st = stateName.toLowerCase();
      if (st.includes('maharashtra') && addr.includes('mumbai')) return true;
      if (st.includes('delhi') && addr.includes('delhi')) return true;
      if (st.includes('gujarat') && (addr.includes('kutch') || addr.includes('mundra'))) return true;
      if (st.includes('west bengal') && (addr.includes('haldia') || addr.includes('kolkata'))) return true;
      if (st.includes('tamil nadu') && addr.includes('chennai')) return true;
      if (st.includes('kerala') && addr.includes('kochi')) return true;
      if (st.includes('punjab') && addr.includes('attari')) return true;
      return addr.includes(st);
    });
    return matched.length;
  };

  // Latitude and Longitude Graticule lines
  const latLines = [
    { lat: 36, label: '36° N' },
    { lat: 32, label: '32° N' },
    { lat: 28, label: '28° N' },
    { lat: 24, label: '24° N (Tropic of Cancer)', highlight: true },
    { lat: 20, label: '20° N' },
    { lat: 16, label: '16° N' },
    { lat: 12, label: '12° N' },
    { lat: 8, label: '8° N' }
  ];

  const lonLines = [
    { lon: 72, label: '72° E' },
    { lon: 76, label: '76° E' },
    { lon: 80, label: '80° E' },
    { lon: 84, label: '84° E' },
    { lon: 88, label: '88° E' },
    { lon: 92, label: '92° E' },
    { lon: 96, label: '96° E' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Hero Banner Header matching design pattern */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Decorative Network Mesh */}
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
            GEOGRAPHIC INTELLIGENCE
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Map <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Intelligence</span>
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-1 font-medium">
            Entity locations, event sites and geographic cluster analysis across Indian regional sectors.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/80 relative z-10 shadow-2xs">
          <button
            onClick={() => setMapMode('reference')}
            className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapMode === 'reference'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🗺️</span>
            <span>Indian Reference Map</span>
          </button>
          <button
            onClick={() => setMapMode('osm')}
            className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapMode === 'osm'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🛰️</span>
            <span>Street / GIS Map</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-medium text-slate-500">Type:</span>
          <div className="flex gap-1 flex-wrap">
            {allTypes.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors ${typeFilter === t ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-medium text-slate-500">Case:</span>
          <select className="border border-slate-200 rounded-lg px-2.5 py-1 text-[12.5px] bg-slate-50" value={caseFilter} onChange={e => setCaseFilter(e.target.value)}>
            {allCases.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {mapMode === 'reference' && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`text-[11.5px] px-2.5 py-1 rounded-md border font-medium ${showGrid ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
            >
              Graticule Grid
            </button>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`text-[11.5px] px-2.5 py-1 rounded-md border font-medium ${showLabels ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
            >
              State Labels
            </button>
          </div>
        )}

        <div className="ml-auto text-[12px] text-slate-400">{filtered.length} locations shown</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Actual Indian Map Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-blue-600" />
              <span className="font-semibold text-slate-900 text-[13.5px]">Geographic Intelligence Map</span>
              <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                {mapMode === 'reference' ? 'Survey of India Reference Grid' : 'Live GIS View'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Center: 21.8°N, 78.5°E</span>
              <span>·</span>
              <span>WGS-84 Datum</span>
            </div>
          </div>

          <div
            className="relative bg-[#0b1328] flex-1 overflow-hidden select-none"
            style={{ height: 500 }}
            onMouseDown={mapMode === 'reference' ? handleMouseDown : undefined}
            onMouseMove={mapMode === 'reference' ? handleMouseMove : undefined}
            onMouseUp={mapMode === 'reference' ? handleMouseUp : undefined}
            onMouseLeave={mapMode === 'reference' ? handleMouseUp : undefined}
          >
            {/* REFERENCE MAP (VECTOR) */}
            {mapMode === 'reference' && (
              <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                <svg
                  viewBox={`0 0 ${MAP_DIMENSIONS.width} ${MAP_DIMENSIONS.height}`}
                  className="w-full h-full"
                >
                  <defs>
                    {/* Ocean water gradient */}
                    <radialGradient id="oceanGrad" cx="50%" cy="50%" r="75%">
                      <stop offset="0%" stopColor="#0f1c3f" />
                      <stop offset="60%" stopColor="#0b1328" />
                      <stop offset="100%" stopColor="#070c1a" />
                    </radialGradient>

                    {/* State terrain gradient */}
                    <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#162032" />
                    </linearGradient>

                    {/* State hover glow filter */}
                    <filter id="hoverGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.6" />
                    </filter>
                  </defs>

                  {/* Ocean Background Canvas */}
                  <rect width={MAP_DIMENSIONS.width} height={MAP_DIMENSIONS.height} fill="url(#oceanGrad)" />

                  {/* ANIMATED MAP CONTAINER WITH AUTOMATIC ZOOM & PAN */}
                  <motion.g
                    animate={{
                      x: panOffset.x,
                      y: panOffset.y,
                      scale: zoomLevel
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 85,
                      damping: 22,
                      mass: 0.8
                    }}
                    style={{ transformOrigin: '0 0' }}
                  >
                    {/* Geographic Graticule (Latitude and Longitude Grid) */}
                    {showGrid && (
                      <g opacity="0.25">
                        {latLines.map(({ lat, label, highlight }) => {
                          const [, y] = projectCoordinates(lat, 78);
                          return (
                            <g key={lat}>
                              <line
                                x1={15}
                                y1={y}
                                x2={MAP_DIMENSIONS.width - 15}
                                y2={y}
                                stroke={highlight ? '#60a5fa' : '#475569'}
                                strokeWidth={highlight ? '1.2' : '0.7'}
                                strokeDasharray={highlight ? '4,4' : '2,4'}
                              />
                              <text
                                x={22}
                                y={y - 4}
                                fill={highlight ? '#93c5fd' : '#94a3b8'}
                                fontSize="8.5"
                                fontFamily="monospace"
                                fontWeight={highlight ? 'bold' : 'normal'}
                              >
                                {label}
                              </text>
                            </g>
                          );
                        })}

                        {lonLines.map(({ lon, label }) => {
                          const [x] = projectCoordinates(20, lon);
                          return (
                            <g key={lon}>
                              <line
                                x1={x}
                                y1={20}
                                x2={x}
                                y2={MAP_DIMENSIONS.height - 20}
                                stroke="#475569"
                                strokeWidth="0.7"
                                strokeDasharray="2,4"
                              />
                              <text
                                x={x + 3}
                                y={MAP_DIMENSIONS.height - 25}
                                fill="#94a3b8"
                                fontSize="8"
                                fontFamily="monospace"
                              >
                                {label}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    )}

                    {/* Water Body Labels (Cartographic style) */}
                    <g opacity="0.35" pointerEvents="none" fontFamily="sans-serif" fontWeight="bold" letterSpacing="4">
                      <text x="110" y="700" fill="#60a5fa" fontSize="13" transform="rotate(-15, 110, 700)">
                        ARABIAN SEA
                      </text>
                      <text x="560" y="680" fill="#60a5fa" fontSize="13" transform="rotate(10, 560, 680)">
                        BAY OF BENGAL
                      </text>
                      <text x="320" y="885" fill="#60a5fa" fontSize="12" letterSpacing="5">
                        INDIAN OCEAN
                      </text>
                      <text x="190" y="810" fill="#38bdf8" fontSize="9" letterSpacing="2">
                        LAKSHADWEEP SEA
                      </text>
                    </g>

                    {/* 35 Indian States & Territories Polygons */}
                    <g id="india-states-polygons">
                      {INDIA_STATES.map(state => {
                        const isHovered = hoveredState === state.name;
                        const activeSitesInState = getSitesCountForState(state.name);

                        return (
                          <path
                            key={state.id}
                            d={state.d}
                            fill={isHovered ? '#1e3a8a' : (activeSitesInState > 0 ? '#1b2a47' : 'url(#stateGrad)')}
                            stroke={isHovered ? '#60a5fa' : (activeSitesInState > 0 ? '#3b82f6' : '#334155')}
                            strokeWidth={isHovered ? '2' : (activeSitesInState > 0 ? '1.4' : '0.8')}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            className="transition-all duration-150 cursor-pointer"
                            onMouseEnter={() => setHoveredState(state.name)}
                            onMouseLeave={() => setHoveredState(null)}
                            filter={isHovered ? 'url(#hoverGlow)' : undefined}
                          />
                        );
                      })}
                    </g>

                    {/* State Name Abbreviation Labels */}
                    {showLabels && (
                      <g pointerEvents="none" opacity="0.6">
                        {INDIA_STATES.map(state => {
                          const abbr = STATE_ABBRS[state.name];
                          if (!abbr || !state.centroid || state.centroid[0] === 0) return null;
                          const [cx, cy] = state.centroid;

                          return (
                            <text
                              key={state.id + '-lbl'}
                              x={cx}
                              y={cy}
                              fill="#94a3b8"
                              fontSize="8.5"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontFamily="monospace"
                            >
                              {abbr}
                            </text>
                          );
                        })}
                      </g>
                    )}

                    {/* Plotted Crime / Intelligence Nodes */}
                    <g id="india-location-markers">
                      {filtered.map(loc => {
                        const [x, y] = projectCoordinates(loc.lat, loc.lng);
                        const color = TYPE_COLORS[loc.type] || '#3b82f6';
                        const isSelected = selectedLocation?.id === loc.id;
                        const isHighActivity = loc.visits > 10;
                        const isHovered = hoveredLocation?.id === loc.id;

                        return (
                          <g
                            key={loc.id}
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLocationClick(loc);
                            }}
                            onMouseEnter={() => setHoveredLocation(loc)}
                            onMouseLeave={() => setHoveredLocation(null)}
                          >
                            {/* Concentric radar wave for high activity */}
                            {isHighActivity && (
                              <circle
                                cx={x}
                                cy={y}
                                r="16"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="1.2"
                                opacity="0.4"
                                className="animate-ping"
                                style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '2.5s' }}
                              />
                            )}

                            {/* Selection targeting aura */}
                            {isSelected && (
                              <>
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="24"
                                  fill={color}
                                  fillOpacity="0.2"
                                  stroke={color}
                                  strokeWidth="1.5"
                                  strokeDasharray="4,4"
                                  className="animate-spin"
                                  style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '8s' }}
                                />
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="16"
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="1.5"
                                />
                              </>
                            )}

                            {/* Outer pin circle */}
                            <circle
                              cx={x}
                              cy={y}
                              r={isSelected ? '9' : (isHovered ? '8' : '6.5')}
                              fill={color}
                              stroke="#ffffff"
                              strokeWidth="2"
                              filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
                              className="transition-all duration-150"
                            />

                            {/* Center point */}
                            <circle
                              cx={x}
                              cy={y}
                              r="2"
                              fill="#ffffff"
                            />

                            {/* High activity alert dot */}
                            {isHighActivity && (
                              <circle
                                cx={x + 5}
                                cy={y - 5}
                                r="3.5"
                                fill="#ef4444"
                                stroke="#ffffff"
                                strokeWidth="1"
                              />
                            )}

                            {/* Location Name Tag */}
                            <g transform={`translate(${x}, ${y + 14})`}>
                              <rect
                                x={-40}
                                y={0}
                                width={80}
                                height={16}
                                rx={3}
                                fill="#0f172a"
                                fillOpacity="0.92"
                                stroke={isSelected ? color : '#334155'}
                                strokeWidth={isSelected ? '1.4' : '0.8'}
                              />
                              <text
                                x={0}
                                y={11}
                                fill="#f8fafc"
                                fontSize="8"
                                fontWeight="bold"
                                textAnchor="middle"
                              >
                                {loc.name.split(' ').slice(0, 2).join(' ')}
                              </text>
                            </g>
                          </g>
                        );
                      })}
                    </g>
                  </motion.g>
                </svg>

                {/* Tactical Overlays on Top of Reference Map */}
                {/* Active Focused Location Banner */}
                {selectedLocation && zoomLevel > 1 && (
                  <div className="absolute top-3 left-14 z-20 bg-slate-900/95 backdrop-blur-md border border-blue-500/60 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-lg">
                    <Crosshair size={14} className="text-blue-400 animate-pulse" />
                    <span className="text-[11.5px] font-semibold text-white">
                      Focused: <span className="text-blue-300">{selectedLocation.name}</span> ({zoomLevel.toFixed(1)}x Zoom)
                    </span>
                    <button
                      onClick={handleResetZoom}
                      className="ml-2 text-[10.5px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-0.5 rounded border border-slate-600 transition-colors cursor-pointer"
                    >
                      Reset View
                    </button>
                  </div>
                )}

                {/* Compass & North Arrow (Top Right) */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs border border-slate-700/80 rounded-lg p-2.5 flex items-center gap-2 text-white shadow-md pointer-events-none">
                  <div className="w-6 h-6 rounded-full border border-blue-400/40 flex items-center justify-center relative">
                    <span className="text-[10px] font-extrabold text-blue-400 absolute -top-1">N</span>
                    <div className="w-0.5 h-3 bg-red-500 rounded-full" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-300">
                    <div>INDIA REF GRID</div>
                    <div className="text-[8.5px] text-slate-400">SURVEY WGS-84</div>
                  </div>
                </div>

                {/* Scale Bar (Bottom Left) */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs border border-slate-700/80 rounded-lg px-3 py-1.5 text-white shadow-md pointer-events-none">
                  <div className="flex items-center gap-2 text-[9.5px] font-mono text-slate-300 mb-1">
                    <span>AUTO-PROJECTION</span>
                    <span className="text-blue-400">{zoomLevel.toFixed(1)}x ZOOM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-1 bg-white" />
                    <div className="w-12 h-1 bg-blue-500" />
                    <span className="text-[8.5px] font-mono text-slate-400 ml-1">500 KM</span>
                  </div>
                </div>

                {/* State Hover Card */}
                {hoveredState && !selectedLocation && (
                  <div className="absolute top-3 left-14 bg-slate-900/95 backdrop-blur-sm border border-blue-500/50 rounded-lg px-3 py-1.5 text-white shadow-lg pointer-events-none z-20">
                    <div className="text-[11px] font-bold text-blue-300">{hoveredState}</div>
                    <div className="text-[9.5px] text-slate-400">
                      {getSitesCountForState(hoveredState)} monitored operational sites
                    </div>
                  </div>
                )}

                {/* Zoom Controls */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-20">
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    title="Reset Orientation"
                    className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* LEAFLET STREET MAP */}
            {mapMode === 'osm' && (
              <div className="w-full h-full relative">
                <div ref={mapContainerRef} className="w-full h-full z-0" />
              </div>
            )}

            {/* Legend Overlay */}
            <div className="absolute bottom-3 right-3 z-10 bg-slate-900/90 backdrop-blur-xs border border-slate-700/80 rounded-lg p-2.5 shadow-md">
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">LOCATION TYPES</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-[10px] text-slate-200 font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location list / detail */}
        <div className="flex flex-col gap-4">
          {selectedLocation ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TYPE_COLORS[selectedLocation.type] }} />
                  <h3 className="font-bold text-slate-900 text-[14px]">{selectedLocation.name}</h3>
                </div>
                <button onClick={() => setSelectedLocation(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X size={15} /></button>
              </div>
              <div className="space-y-2.5 text-[12.5px]">
                <div className="flex justify-between"><span className="text-slate-400">Type</span><span className="font-semibold" style={{ color: TYPE_COLORS[selectedLocation.type] }}>{selectedLocation.type}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Visits</span><span className="font-bold text-slate-900">{selectedLocation.visits}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Coordinates</span><span className="font-mono text-slate-700 text-[11.5px]">{selectedLocation.lat}° N, {selectedLocation.lng}° E</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Last Event</span><span className="text-slate-700">{selectedLocation.lastEvent}</span></div>
                <div className="text-slate-400">Address</div>
                <div className="text-slate-700 text-[12px]">{selectedLocation.address}</div>
                <div>
                  <div className="text-slate-400 mb-1">Cases</div>
                  <div className="flex flex-wrap gap-1">{selectedLocation.cases.map(c => <span key={c} className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-semibold">{c}</span>)}</div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Associated Entities</div>
                  <div className="flex flex-wrap gap-1">{selectedLocation.entities.map(e => <span key={e} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{e}</span>)}</div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleLocationClick(selectedLocation)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold py-1.5 px-3 rounded-lg text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Crosshair size={13} />
                    <span>Re-center Zoom</span>
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-1.5 px-3 rounded-lg text-[12px] transition-colors cursor-pointer"
                  >
                    Zoom Out
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 text-[14px] mb-3 flex items-center gap-2"><MapPin size={14} className="text-blue-600" />Location List</h3>
              <div className="text-[12px] text-slate-400 mb-3">Click any location below or on the map to auto-zoom</div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filtered.map(loc => (
                  <button
                    key={loc.id}
                    className="w-full text-left flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/70 transition-colors cursor-pointer group"
                    onClick={() => handleLocationClick(loc)}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: TYPE_COLORS[loc.type] }} />
                      <div>
                        <div className="font-medium text-slate-800 group-hover:text-blue-700 text-[12.5px]">{loc.name}</div>
                        <div className="text-[11px] text-slate-400">{loc.type} · {loc.visits} visits · {loc.lat}°N, {loc.lng}°E</div>
                      </div>
                    </div>
                    <Crosshair size={13} className="text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 text-[13.5px] mb-3">Activity Summary</h3>
            <div className="space-y-2">
              {['Port', 'Commercial', 'Logistics', 'Warehouse'].map(type => {
                const count = locations.filter(l => l.type === type).length;
                const visits = locations.filter(l => l.type === type).reduce((s, l) => s + l.visits, 0);
                return (
                  <div key={type} className="flex items-center justify-between text-[12.5px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: TYPE_COLORS[type] }} />
                      <span className="text-slate-600">{type}</span>
                    </div>
                    <div className="text-slate-400">{count} sites · <span className="font-semibold text-slate-700">{visits} visits</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
