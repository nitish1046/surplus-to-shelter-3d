import React, { useState } from 'react';
import { 
  Truck, Zap, BatteryCharging, Thermometer, Route, 
  MapPin, Clock, CheckCircle2, AlertTriangle, ArrowRight, Play 
} from 'lucide-react';
import { ENTERPRISE_FLEET, playChime } from '../data/mockData';

export default function LogisticsWorkspace({
  onTriggerRescueMission,
  simulationState
}) {
  const [fleet] = useState(ENTERPRISE_FLEET);

  const handleDispatchCluster = () => {
    playChime('rescue_start');
    if (onTriggerRescueMission) {
      onTriggerRescueMission();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-400" />
            Fleet Logistics & Dynamic VRPTW Routing Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Vehicle Routing Problem with Time Windows (VRPTW) solver, live refrigerated telemetry, and multi-depot fleet management.
          </p>
        </div>

        <button
          onClick={handleDispatchCluster}
          disabled={simulationState?.isRunning}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition ${
            simulationState?.isRunning
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20'
          }`}
        >
          <Zap className="w-4 h-4 fill-current" />
          {simulationState?.isRunning ? 'Cluster Route In Transit...' : 'Dispatch Optimized Route'}
        </button>
      </div>

      {/* Fleet Vehicles Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fleet.map((van) => (
          <div key={van.id} className="saas-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">{van.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    van.status.includes('IDLE') 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {van.status}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  Plate: {van.plate} • {van.type}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-mono">Payload:</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {van.currentLoadKg} / {van.maxCapacityKg} kg
                </div>
              </div>
            </div>

            {/* Telemetry metrics bar */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> Battery
                </div>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{van.batteryPercent}%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Chiller Temp
                </div>
                <div className="font-bold text-cyan-300 text-sm mt-0.5">{van.refrigerationTempC}°C</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
                  <Route className="w-3.5 h-3.5 text-purple-400" /> Completed
                </div>
                <div className="font-bold text-purple-300 text-sm mt-0.5">{van.completedMissionsToday} trips</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-sans">
              <span>Driver: <strong>{van.driverName}</strong> ({van.driverPhone})</span>
              <span className="font-mono">Total Dist: {van.odometerKm} km</span>
            </div>
          </div>
        ))}
      </div>

      {/* VRP Algorithmic Optimizer Engine Box */}
      <div className="saas-card p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
              Vehicle Routing Solver: Clarke-Wright Savings Heuristic
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
            TIME WINDOW CONSTRAINED (VRPTW)
          </span>
        </div>

        {/* Comparison Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30">
            <div className="text-xs font-bold text-red-400 uppercase font-mono mb-1">
              Unoptimized Independent Runs
            </div>
            <p className="text-xs text-slate-300 mb-3">
              3 distinct vehicles dispatched independently to individual restaurants.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded bg-slate-950/60">
                <span className="text-[10px] text-slate-500 block">Distance</span>
                <span className="text-sm font-bold text-red-400">28.4 km</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60">
                <span className="text-[10px] text-slate-500 block">Duration</span>
                <span className="text-sm font-bold text-red-400">68 mins</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60">
                <span className="text-[10px] text-slate-500 block">Emissions</span>
                <span className="text-sm font-bold text-red-400">7.2 kg CO₂</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 relative">
            <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded uppercase">
              50.3% Optimized
            </div>
            <div className="text-xs font-bold text-emerald-400 uppercase font-mono mb-1">
              Smart Consolidated Cluster
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Single EV van collects along an optimized TSP arc before food decays.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded bg-slate-950/60 border border-emerald-500/20">
                <span className="text-[10px] text-slate-400 block">Distance</span>
                <span className="text-sm font-bold text-emerald-400">14.1 km</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-emerald-500/20">
                <span className="text-[10px] text-slate-400 block">Duration</span>
                <span className="text-sm font-bold text-emerald-400">34 mins</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-emerald-500/20">
                <span className="text-[10px] text-slate-400 block">Emissions</span>
                <span className="text-sm font-bold text-emerald-400">3.5 kg CO₂</span>
              </div>
            </div>
          </div>
        </div>

        {/* Turn-by-Turn Waypoint Sequence */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Optimized Cluster Waypoint Sequence
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">
                  0
                </span>
                <div>
                  <div className="font-bold text-white">Central Logistics Depot (Mansarovar Base)</div>
                  <div className="text-[10px] text-slate-400">Van 01 Departure • Payload 0kg</div>
                </div>
              </div>
              <span className="text-slate-400">14:00 PM (Depart)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <div>
                  <div className="font-bold text-amber-300">Pickup: The Grand Rajputana Palace Hotel</div>
                  <div className="text-[10px] text-slate-400">Load 62kg Cooked Thali • Safe Expiry: 16:30 PM</div>
                </div>
              </div>
              <span className="text-amber-400 font-bold">14:15 PM (+15m)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <div>
                  <div className="font-bold text-amber-300">Pickup: Spice Courtyard Dining</div>
                  <div className="text-[10px] text-slate-400">Load 38kg Dum Biryani • Safe Expiry: 16:45 PM</div>
                </div>
              </div>
              <span className="text-amber-400 font-bold">14:26 PM (+11m)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <div>
                  <div className="font-bold text-cyan-300">Drop-off: Robin Hood Army City Hub</div>
                  <div className="text-[10px] text-slate-400">Deliver 62kg (155 Portions) • Handover Verified</div>
                </div>
              </div>
              <span className="text-cyan-400 font-bold">14:38 PM (+12m)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <div>
                  <div className="font-bold text-cyan-300">Drop-off: Annapurna Community Night Kitchen</div>
                  <div className="text-[10px] text-slate-400">Deliver 38kg (95 Portions) • Handover Verified</div>
                </div>
              </div>
              <span className="text-cyan-400 font-bold">14:48 PM (+10m)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
