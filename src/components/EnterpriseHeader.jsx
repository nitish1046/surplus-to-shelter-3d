import React from 'react';
import { 
  Building2, Home, Truck, BarChart3, TrendingUp, Globe2, 
  Sparkles, Box, Volume2, VolumeX, Play, Sun, Moon, Presentation 
} from 'lucide-react';

export default function EnterpriseHeader({
  activeTab,
  setActiveTab,
  onOpenSimulator,
  onOpenPresentation,
  onOpenDriverPortal,
  soundEnabled,
  setSoundEnabled,
  timeOfDay,
  setTimeOfDay,
  totalRescuedKg
}) {
  const tabs = [
    { id: 'overview', label: 'Mission Overview', icon: Globe2 },
    { id: '3d-twin', label: '3D Digital Twin', icon: Box, badge: 'Three.js' },
    { id: 'donor-hub', label: 'Commercial Donors', icon: Building2, badge: 'HACCP' },
    { id: 'shelter-hub', label: 'Shelter Operations', icon: Home, badge: 'Intake' },
    { id: 'logistics-vrp', label: 'Fleet & VRP Logistics', icon: Truck, badge: '50% Saved' },
    { id: 'esg-audit', label: 'ESG & Compliance Audit', icon: BarChart3, badge: 'ISO 14064' },
    { id: 'ai-forecast', label: 'AI Spoilage Forecast', icon: TrendingUp, badge: 'Gemini AI' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top Telemetry Strip */}
      <div className="px-4 py-1.5 bg-slate-900/60 border-b border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            RESCUETRACK OS: 99.98% OPERATIONAL SLA
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">COLD-CHAIN FLEET: 2 ACTIVE EV VANS</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-amber-400 font-semibold">CUMULATIVE FOOD RESCUED: {totalRescuedKg} KG</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden lg:inline text-cyan-400">HACCP SAFE TEMP: ENFORCED</span>
          <span className="text-slate-500 font-sans">Jaipur Municipal Dispatch</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white uppercase font-sans">
                Surplus-to-Shelter <span className="text-emerald-400 font-mono text-sm">PRO</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Real-Time Perishable Food Rescue & Logistics OS
            </p>
          </div>
        </div>

        {/* Workspace Navigation Pills */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-lg shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresentation}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition hover:scale-105"
            title="Launch 10-Slide Pitch Deck with 3D City Simulation & PPTX Download"
          >
            <Presentation className="w-4 h-4 text-cyan-200" />
            <span className="hidden sm:inline">3D Pitch Deck</span>
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">10 Slides</span>
          </button>

          <button
            onClick={onOpenDriverPortal}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-teal-500/40 text-teal-400 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
            title="Open Driver & Volunteer Terminal"
          >
            <Truck className="w-4 h-4 text-teal-400" />
            <span className="hidden md:inline">Driver HUD</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Simulate Rescue
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {activeTab === '3d-twin' && (
            <button
              onClick={() => setTimeOfDay(timeOfDay === 'NIGHT' ? 'SUNSET' : timeOfDay === 'SUNSET' ? 'DAY' : 'NIGHT')}
              title="Toggle Day / Sunset / Night Lighting"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            >
              {timeOfDay === 'NIGHT' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
