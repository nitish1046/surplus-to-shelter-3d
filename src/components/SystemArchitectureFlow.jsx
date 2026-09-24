import React, { useState } from 'react';
import { 
  Building2, Home, Truck, Cpu, BarChart3, ArrowDown, 
  ArrowRight, CheckCircle2, Play, Sparkles, Navigation, ShieldCheck, Clock 
} from 'lucide-react';
import { playChime } from '../data/mockData';

export default function SystemArchitectureFlow({
  onOpenSimulator,
  onOpenDonorPortal,
  onOpenShelterPortal,
  onOpenDriverPortal,
  onSelectTab,
  onRunQuickExample
}) {
  const [activeStep, setActiveStep] = useState(null);

  const handleRunExample = () => {
    playChime('rescue_start');
    if (onRunQuickExample) {
      onRunQuickExample();
    }
  };

  return (
    <div className="saas-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            END-TO-END SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-sans">
            How The Real-Time Food Rescue Loop Works
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive multi-role workflow: From commercial surplus broadcast to algorithmic matching, driver dispatch, and impact auditing.
          </p>
        </div>

        <button
          onClick={handleRunExample}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider font-mono flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition hover:scale-105"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Test Example: ABC Restaurant ➔ NGO A
        </button>
      </div>

      {/* Interactive System Flow Grid */}
      <div className="space-y-6">
        {/* Tier 1: 3 Core Ingestion Pillars (Donor, Shelter, Driver) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. DONOR */}
          <div 
            onClick={onOpenDonorPortal}
            className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition group hover:shadow-lg hover:shadow-amber-500/10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                ROLE 1: DONOR
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
              Commercial Donor Hub
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Restaurant / banquet posts extra food: <strong>Food Name, Type, Weight (kg), Safe Clock (2-4 hrs) & Temperature (&gt;60°C)</strong>.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-amber-400">
              <span>+ Post Surplus Food</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* 2. SHELTER */}
          <div 
            onClick={onOpenShelterPortal}
            className="p-5 rounded-2xl bg-slate-900/90 border border-teal-500/30 hover:border-teal-400 cursor-pointer transition group hover:shadow-lg hover:shadow-teal-500/10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
                <Home className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                ROLE 2: SHELTER
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition">
              Shelter & NGO Network
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Shelters publish <strong>Active Capacity (kg), Daily Meal Need, Dietary Preferences & Intake Hours</strong>.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-teal-400">
              <span>+ Adjust Live Demand</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* 3. DRIVER */}
          <div 
            onClick={onOpenDriverPortal}
            className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition group hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                ROLE 3: DRIVER
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
              Fleet & Volunteer Terminal
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Drivers view <strong>Pickup Origin, Route Map, Destination & Handover OTP Verification</strong> on cold-chain EV vans.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span>+ Open Driver Terminal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

        {/* Tier 2: The Core Matching Engine Box */}
        <div 
          onClick={onOpenSimulator}
          className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-emerald-950/40 border border-purple-500/40 hover:border-purple-400 cursor-pointer transition space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-black">
                <Cpu className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                  Multi-Factor Matching Engine
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    CORE ALGORITHM
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Formula: 40% Distance + 30% Shelter Need + 20% Capacity + 10% Expiry Urgency
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/30 font-bold">
              Click to Open Live Simulator ➔
            </span>
          </div>

          {/* Formula Breakdown Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-center">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] text-slate-400">Distance Weight</div>
              <div className="text-sm font-bold text-cyan-400 mt-0.5">40% Factor</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] text-slate-400">Shelter Need</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">30% Factor</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] text-slate-400">Capacity Ratio</div>
              <div className="text-sm font-bold text-purple-400 mt-0.5">20% Factor</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] text-slate-400">Expiry Urgency</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">10% Factor</div>
            </div>
          </div>

          {/* Real Example Walkthrough Table (From User Prompt) */}
          <div className="mt-3 p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold">
                EXAMPLE: ABC Restaurant (Vaishali Nagar) • 30 kg Cooked Rice + Dal • 3h Safe Window
              </span>
              <span className="text-emerald-400">Evaluated 3 Candidate Shelters</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-[10px] text-slate-400 uppercase border-b border-slate-800">
                    <th className="py-1.5 px-2">Shelter</th>
                    <th className="py-1.5 px-2">Distance</th>
                    <th className="py-1.5 px-2">Capacity</th>
                    <th className="py-1.5 px-2">Need</th>
                    <th className="py-1.5 px-2 text-right">Computed Match Score</th>
                    <th className="py-1.5 px-2 text-right">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="bg-emerald-500/10 text-emerald-300 font-bold">
                    <td className="py-2 px-2 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px]">1</span>
                      NGO A (Akshaya Seva)
                    </td>
                    <td className="py-2 px-2 text-white">2.1 km</td>
                    <td className="py-2 px-2 text-white">40 kg</td>
                    <td className="py-2 px-2 text-red-400">High</td>
                    <td className="py-2 px-2 text-right text-emerald-400 font-black text-sm">94 / 100</td>
                    <td className="py-2 px-2 text-right text-emerald-400">🏆 Best Match</td>
                  </tr>
                  <tr className="text-slate-300">
                    <td className="py-2 px-2 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px]">2</span>
                      NGO C (Mother Teresa)
                    </td>
                    <td className="py-2 px-2">3.1 km</td>
                    <td className="py-2 px-2">50 kg</td>
                    <td className="py-2 px-2 text-slate-400">Low</td>
                    <td className="py-2 px-2 text-right font-bold">73 / 100</td>
                    <td className="py-2 px-2 text-right text-slate-400">Alternative</td>
                  </tr>
                  <tr className="text-slate-400">
                    <td className="py-2 px-2 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-[10px]">3</span>
                      NGO B (Jaipur Care)
                    </td>
                    <td className="py-2 px-2">5.2 km</td>
                    <td className="py-2 px-2">10 kg</td>
                    <td className="py-2 px-2 text-amber-400">Medium</td>
                    <td className="py-2 px-2 text-right font-bold">68 / 100</td>
                    <td className="py-2 px-2 text-right text-slate-500">Lower Fit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tier 3: 5-Stage Lifecycle Execution Pipeline */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
            Operational Lifecycle Protocol:
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-700 flex-1 min-w-[120px] text-center">
              <div className="text-[10px] text-slate-500">STAGE 1</div>
              <div className="font-bold text-amber-400 mt-0.5">POSTED</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Kitchen Broadcast</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-700 flex-1 min-w-[120px] text-center">
              <div className="text-[10px] text-slate-500">STAGE 2</div>
              <div className="font-bold text-purple-400 mt-0.5">MATCHED</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Algorithm Selection</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-700 flex-1 min-w-[120px] text-center">
              <div className="text-[10px] text-slate-500">STAGE 3</div>
              <div className="font-bold text-cyan-400 mt-0.5">PICKUP ASSIGNED</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Driver En Route</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-700 flex-1 min-w-[120px] text-center">
              <div className="text-[10px] text-slate-500">STAGE 4</div>
              <div className="font-bold text-blue-400 mt-0.5">PICKED UP</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Chiller Temp Sealed</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/50 flex-1 min-w-[120px] text-center shadow-lg shadow-emerald-500/10">
              <div className="text-[10px] text-emerald-400">STAGE 5</div>
              <div className="font-bold text-emerald-400 mt-0.5">DELIVERED</div>
              <div className="text-[9px] text-slate-400 mt-0.5">6-Digit OTP Handover</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
