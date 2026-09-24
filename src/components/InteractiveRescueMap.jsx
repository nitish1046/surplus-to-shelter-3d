import React, { useState } from 'react';
import { 
  MapPin, Navigation, Truck, Home, Utensils, 
  Clock, ShieldCheck, Thermometer, Sparkles, Layers 
} from 'lucide-react';

export default function InteractiveRescueMap({
  donors = [],
  shelters = [],
  fleet = [],
  activeMission = null,
  missionProgress = 0,
  selectedNode = null,
  onSelectNode = () => {}
}) {
  const [mapLayer, setMapLayer] = useState('ALL'); // 'ALL' | 'DONORS' | 'SHELTERS' | 'CORRIDORS'
  const [hoveredNode, setHoveredNode] = useState(null);

  // Map bounding coordinates (Jaipur urban zone)
  const MIN_LAT = 26.8100;
  const MAX_LAT = 26.9400;
  const MIN_LNG = 75.6000;
  const MAX_LNG = 75.8600;

  // Convert GPS (lat, lng) to SVG viewBox percentage (x: 0-1000, y: 0-600)
  const projectCoords = (lat, lng) => {
    const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 940 + 30;
    const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * 540 + 30;
    return { x, y };
  };

  // Find mission coordinates if active
  const activeDonor = activeMission ? donors.find(d => d.id === activeMission.donorId) : null;
  const activeShelter = activeMission ? shelters.find(s => s.id === activeMission.shelterId) : null;

  const startPt = activeDonor ? projectCoords(activeDonor.lat, activeDonor.lng) : null;
  const endPt = activeShelter ? projectCoords(activeShelter.lat, activeShelter.lng) : null;

  // Van position along the route
  const vanX = startPt && endPt ? startPt.x + (endPt.x - startPt.x) * missionProgress : 480;
  const vanY = startPt && endPt ? startPt.y + (endPt.y - startPt.y) * missionProgress : 320;

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-2xl overflow-hidden bg-[#0a0f1d] border border-slate-800 shadow-2xl select-none">
      {/* Map Header HUD */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="glass-panel px-3.5 py-2 rounded-xl border border-slate-700/60 shadow-xl flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-white font-bold tracking-wider">JAIPUR RESCUE GRID (LIVE GIS)</span>
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Lat: 26.9124°N</span>
            <span>Lng: 75.7873°E</span>
          </div>
        </div>

        {/* Map Filter Pills */}
        <div className="glass-panel px-2 py-1 rounded-xl border border-slate-700/60 shadow-xl flex items-center gap-1 text-xs">
          {['ALL', 'DONORS', 'SHELTERS'].map(mode => (
            <button
              key={mode}
              onClick={() => setMapLayer(mode)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition ${
                mapLayer === mode 
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Canvas */}
      <svg 
        viewBox="0 0 1000 600" 
        className="w-full h-full object-cover"
        style={{ background: 'radial-gradient(circle at 50% 50%, #0c1427 0%, #070b14 100%)' }}
      >
        <defs>
          {/* Neon Route Glow */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stylized Jaipur Highway Grid Background */}
        <g stroke="#162238" strokeWidth="1.2" opacity="0.6">
          {/* Main Road Lines (NH48, Tonk Road, Ajmer Road, JLN Marg) */}
          <line x1="80" y1="120" x2="920" y2="480" stroke="#1e2f4d" strokeWidth="2.5" />
          <line x1="220" y1="80" x2="780" y2="520" stroke="#1e2f4d" strokeWidth="2" />
          <line x1="500" y1="50" x2="500" y2="550" stroke="#1a2740" strokeWidth="3" />
          <line x1="100" y1="300" x2="900" y2="300" stroke="#1a2740" strokeWidth="2" />

          {/* Secondary Ring Roads */}
          <circle cx="500" cy="300" r="180" fill="none" stroke="#131e33" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="500" cy="300" r="320" fill="none" stroke="#0f192b" strokeWidth="1" strokeDasharray="8 8" />
        </g>

        {/* Area District Labels */}
        <g fill="#334155" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.7">
          <text x="240" y="180">VAISHALI NAGAR</text>
          <text x="520" y="190">C-SCHEME / CIVIL LINES</text>
          <text x="680" y="240">RAJA PARK</text>
          <text x="360" y="440">MANSAROVAR</text>
          <text x="660" y="480">MALVIYA NAGAR</text>
          <text x="120" y="460">MAHINDRA SEZ</text>
        </g>

        {/* Dynamic Glowing Mission Route Arc */}
        {startPt && endPt && (
          <g>
            {/* Pulsing route line */}
            <line 
              x1={startPt.x} 
              y1={startPt.y} 
              x2={endPt.x} 
              y2={endPt.y} 
              stroke="url(#routeGradient)" 
              strokeWidth="3.5"
              strokeDasharray="8 6"
              filter="url(#glow)"
              className="animate-pulse"
            />

            {/* Glowing trajectory corridor */}
            <line 
              x1={startPt.x} 
              y1={startPt.y} 
              x2={endPt.x} 
              y2={endPt.y} 
              stroke="#10b981" 
              strokeWidth="1.5"
              opacity="0.9"
            />
          </g>
        )}

        {/* Active Van Icon Moving Along Route */}
        {activeMission && (
          <g transform={`translate(${vanX}, ${vanY})`} className="transition-all duration-150">
            {/* Van radar ping */}
            <circle cx="0" cy="0" r="18" fill="#10b981" opacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="14" y="4" fill="#34d399" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
              EV VAN 01
            </text>
          </g>
        )}

        {/* Donors (Commercial Kitchens / Restaurants) */}
        {(mapLayer === 'ALL' || mapLayer === 'DONORS') && donors.map((d) => {
          const pt = projectCoords(d.lat, d.lng);
          const isSelected = selectedNode?.id === d.id;
          const isUrgent = d.safeHoursRemaining <= 2.0;

          return (
            <g 
              key={d.id} 
              transform={`translate(${pt.x}, ${pt.y})`}
              className="cursor-pointer group"
              onClick={() => onSelectNode(d)}
              onMouseEnter={() => setHoveredNode(d)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Radar pulse for urgency */}
              <circle 
                cx="0" 
                cy="0" 
                r={isUrgent ? 22 : 16} 
                fill={isUrgent ? '#ef4444' : '#f59e0b'} 
                opacity="0.25" 
                className="animate-ping" 
              />

              {/* Pin Base */}
              <circle 
                cx="0" 
                cy="0" 
                r={isSelected ? 10 : 8} 
                fill={isUrgent ? '#ef4444' : '#f59e0b'} 
                stroke="#ffffff" 
                strokeWidth="2" 
                filter="url(#glow)"
              />

              {/* Quick Pin Label */}
              <text 
                x="12" 
                y="-6" 
                fill="#ffffff" 
                fontSize="10" 
                fontFamily="Inter" 
                fontWeight="bold"
                className="drop-shadow"
              >
                {d.name.split(' ')[0]} ({d.quantityKg}kg)
              </text>
              <text 
                x="12" 
                y="6" 
                fill={isUrgent ? '#f87171' : '#fbbf24'} 
                fontSize="9" 
                fontFamily="JetBrains Mono"
              >
                ⏱ {d.safeHoursRemaining}h left
              </text>
            </g>
          );
        })}

        {/* Shelters / NGOs */}
        {(mapLayer === 'ALL' || mapLayer === 'SHELTERS') && shelters.map((s) => {
          const pt = projectCoords(s.lat, s.lng);
          const isSelected = selectedNode?.id === s.id;

          return (
            <g 
              key={s.id} 
              transform={`translate(${pt.x}, ${pt.y})`}
              className="cursor-pointer group"
              onClick={() => onSelectNode(s)}
              onMouseEnter={() => setHoveredNode(s)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Sanctuary ring */}
              <circle cx="0" cy="0" r="16" fill="#06b6d4" opacity="0.2" />

              {/* Pin Base */}
              <rect 
                x="-7" 
                y="-7" 
                width="14" 
                height="14" 
                rx="3"
                fill="#06b6d4" 
                stroke="#ffffff" 
                strokeWidth="1.8" 
                filter="url(#glow)"
              />

              {/* Label */}
              <text 
                x="12" 
                y="-4" 
                fill="#ffffff" 
                fontSize="10" 
                fontFamily="Inter" 
                fontWeight="bold"
              >
                {s.name.split(' ')[0]} Hub
              </text>
              <text 
                x="12" 
                y="8" 
                fill="#38bdf8" 
                fontSize="9" 
                fontFamily="JetBrains Mono"
              >
                Need: {s.currentNeededMeals} meals
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
          <div className="saas-card-glow p-4 rounded-xl text-xs max-w-sm border border-emerald-500/50 shadow-2xl">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] ${
                hoveredNode.quantityKg ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'
              }`}>
                {hoveredNode.tag || 'SHELTER'}
              </span>
              <span className="text-slate-400 font-mono text-[10px]">
                {hoveredNode.locationName}
              </span>
            </div>
            <div className="font-bold text-white text-sm">{hoveredNode.name}</div>
            
            <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono">
              {hoveredNode.quantityKg ? (
                <>
                  <span className="text-slate-400">Available:</span>
                  <span className="text-emerald-400 font-bold">{hoveredNode.quantityKg} kg ({hoveredNode.mealsEquivalent} meals)</span>
                </>
              ) : (
                <>
                  <span className="text-slate-400">Demand:</span>
                  <span className="text-cyan-400 font-bold">{hoveredNode.currentNeededMeals} Meals Required</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
        <div className="glass-panel px-3 py-2 rounded-xl border border-slate-700/60 shadow-xl flex items-center gap-3 text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
            <span>Donors ({donors.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyan-400 inline-block"></span>
            <span>Shelters ({shelters.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span>EV Vans (2)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
