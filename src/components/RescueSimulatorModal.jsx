import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, CheckCircle2, Truck, AlertTriangle, 
  Sparkles, Navigation, ArrowRight, X, Clock, MapPin, Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { computeMatchScores, calculateImpactMetrics, playChime } from '../data/mockData';

export default function RescueSimulatorModal({
  isOpen,
  onClose,
  donors,
  shelters,
  onStartSimulation,
  simulationState
}) {
  if (!isOpen) return null;

  const [selectedDonorId, setSelectedDonorId] = useState(donors[0]?.id || 'donor-1');
  const [matchRankings, setMatchRankings] = useState([]);

  const currentDonor = donors.find(d => d.id === selectedDonorId) || donors[0];

  useEffect(() => {
    if (currentDonor && shelters.length > 0) {
      const results = computeMatchScores(currentDonor, shelters);
      setMatchRankings(results);
    }
  }, [selectedDonorId, currentDonor, shelters]);

  const bestMatch = matchRankings[0];

  const handleTriggerRescue = () => {
    if (!currentDonor || !bestMatch) return;
    playChime('rescue_start');
    onStartSimulation(currentDonor, bestMatch);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto saas-card-glow rounded-2xl border border-emerald-500/40 p-6 shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">Live Food Rescue & Routing Simulator</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                  AmiHacks Problem 1 Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate real-time perishable food rescue, multi-parameter matching algorithm, and vehicle dispatch.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Donor Selector & Simulation Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
          <div className="md:col-span-2 saas-card p-4 rounded-xl border border-slate-700/60">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              1. Select Active Surplus Donor (Restaurant / Hotel)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {donors.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDonorId(d.id)}
                  className={`p-2.5 rounded-lg text-left transition border ${
                    selectedDonorId === d.id
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-white shadow-lg shadow-emerald-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-xs truncate">{d.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{d.locationName}</div>
                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono">
                    <span className="text-amber-400 font-bold">{d.quantityKg} kg ({d.mealsEquivalent} meals)</span>
                    <span className="text-red-400 font-medium">⏱ {d.safeHoursRemaining}h safe</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="saas-card p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                2. Live Dispatch Trigger
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Run the multi-factor heuristic to compute optimal recipient shelter and command the rescue van.
              </p>
            </div>

            <button
              onClick={handleTriggerRescue}
              disabled={simulationState.isRunning}
              className={`w-full mt-3 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                simulationState.isRunning
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40 cursor-not-allowed animate-pulse'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold shadow-emerald-500/20'
              }`}
            >
              {simulationState.isRunning ? (
                <>
                  <Truck className="w-4 h-4 animate-bounce" />
                  Mission In Progress ({Math.round(simulationState.progress * 100)}%)
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Dispatch Rescue Mission
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Simulation Progress HUD */}
        {simulationState.isRunning && (
          <div className="saas-card-glow p-4 rounded-xl border border-emerald-500/50 mb-5 animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                  Active Mission: {simulationState.step}
                </span>
              </div>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                {Math.round(simulationState.progress * 100)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/50"
                style={{ width: `${Math.round(simulationState.progress * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                Pickup: {currentDonor.name}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
              <span className="flex items-center gap-1">
                <Navigation className="w-3 h-3 text-cyan-400" />
                Destination: {bestMatch?.shelterName} ({bestMatch?.distanceKm} km)
              </span>
            </div>
          </div>
        )}

        {/* Algorithm Score Breakdown Table */}
        <div className="saas-card rounded-xl border border-slate-700/60 overflow-hidden flex-1">
          <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 font-mono">
                Transparent Heuristic Match Rankings
              </h3>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Formula: <strong>40% Distance + 30% Shelter Need + 20% Capacity + 10% Expiry Urgency</strong>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Shelter / Recipient Hub</th>
                  <th className="py-2.5 px-3">Dist (Km)</th>
                  <th className="py-2.5 px-3">Dist (40%)</th>
                  <th className="py-2.5 px-3">Need (30%)</th>
                  <th className="py-2.5 px-3">Capacity (20%)</th>
                  <th className="py-2.5 px-3">Urgency (10%)</th>
                  <th className="py-2.5 px-3 font-bold text-emerald-400">Total Match Score</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {matchRankings.map((rank, index) => {
                  const isTop = index === 0;
                  return (
                    <tr 
                      key={rank.shelterId}
                      className={`transition ${isTop ? 'bg-emerald-500/10 font-medium' : 'hover:bg-slate-800/40 text-slate-300'}`}
                    >
                      <td className="py-3 px-3 font-mono">
                        {isTop ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                            #1 BEST
                          </span>
                        ) : (
                          <span className="text-slate-500">#{index + 1}</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-100">{rank.shelterName}</div>
                        <div className="text-[10px] text-slate-400">{rank.locationName}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-300">{rank.distanceKm} km</td>
                      <td className="py-3 px-3 font-mono">
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400" style={{ width: `${rank.distanceScore}%` }} />
                          </div>
                          <span>{rank.distanceScore}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          rank.shelterNeedScore >= 90 ? 'bg-red-500/20 text-red-300' :
                          rank.shelterNeedScore >= 65 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {rank.shelterNeedScore}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-400" style={{ width: `${rank.capacityScore}%` }} />
                          </div>
                          <span>{rank.capacityScore}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-amber-400">
                        {rank.urgencyScore || 85}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold">
                        <span className={`text-sm ${isTop ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {rank.totalScore} / 100
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {isTop ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px] font-mono">Standby</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {bestMatch && (
            <div className="p-3 bg-slate-950/70 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-emerald-400 uppercase text-[10px] font-mono">Algorithm Rationale:</span>
              <span>
                Selected <strong>{bestMatch.shelterName}</strong> because it provides the highest net absorption rate ({bestMatch.mealsNeeded} meals required) within an optimal {bestMatch.distanceKm} km transit radius, minimizing cold-chain degradation.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>Rescue Metric: <strong className="text-emerald-400">{currentDonor.quantityKg} kg</strong> ({currentDonor.mealsEquivalent} meals)</span>
            <span>Est. CO2e Saved: <strong className="text-emerald-400">+{(currentDonor.quantityKg * 2.5).toFixed(1)} kg</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close & Watch Map View
          </button>
        </div>
      </div>
    </div>
  );
}
