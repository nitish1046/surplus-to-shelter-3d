import React, { useState } from 'react';
import { Home, Users, CheckCircle, Clock, ShieldAlert, Sparkles, X } from 'lucide-react';
import { playChime } from '../data/mockData';

export default function ShelterPortalModal({ isOpen, onClose, shelters, onUpdateShelterNeed }) {
  if (!isOpen) return null;

  const [selectedShelterId, setSelectedShelterId] = useState(shelters[0]?.id || 'shelter-1');
  const activeShelter = shelters.find(s => s.id === selectedShelterId) || shelters[0];

  const [neededMeals, setNeededMeals] = useState(activeShelter?.currentNeededMeals || 60);

  const handleSaveCapacity = () => {
    playChime('success');
    onUpdateShelterNeed(activeShelter.id, Number(neededMeals));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto saas-card-glow rounded-2xl border border-cyan-500/40 p-6 shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Shelter & NGO Operations Hub</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage beneficiary meal requirements, dietary acceptance rules, and live inbound rescue shipments.
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

        {/* Shelter Select Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
          {shelters.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedShelterId(s.id);
                setNeededMeals(s.currentNeededMeals);
              }}
              className={`p-3 rounded-xl text-left border transition ${
                selectedShelterId === s.id
                  ? 'bg-cyan-500/20 border-cyan-500/60 text-white shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-xs truncate">{s.name}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{s.locationName}</div>
              <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-400 font-bold">{s.currentNeededMeals} needed</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                  s.priority === 'VERY_HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  {s.priority}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Details Card */}
        <div className="saas-card p-5 rounded-xl border border-slate-700/60 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">{activeShelter.name}</h3>
              <p className="text-xs text-slate-400">{activeShelter.locationName} • Contact: {activeShelter.contactPerson} ({activeShelter.phone})</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                activeShelter.coldStorageAvailable 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {activeShelter.coldStorageAvailable ? '❄️ Cold-Storage Active' : '⚠️ Immediate Distribution Only'}
              </span>
            </div>
          </div>

          {/* Need Slider */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Update Today's Meal Demand
                </span>
              </div>
              <span className="font-mono text-base font-bold text-cyan-400">
                {neededMeals} Meals Required
              </span>
            </div>
            <input
              type="range"
              min="10"
              max={activeShelter.totalCapacityMeals}
              step="5"
              value={neededMeals}
              onChange={(e) => setNeededMeals(e.target.value)}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Min: 10 meals</span>
              <span>Current Need: {neededMeals}</span>
              <span>Max Capacity: {activeShelter.totalCapacityMeals} meals</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Adjusting this value dynamically updates the Smart Matching Engine priority.
              </span>
              <button
                onClick={handleSaveCapacity}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition font-mono"
              >
                Sync with Matching Engine
              </button>
            </div>
          </div>

          {/* Demographics & Dietary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="font-semibold text-slate-300 mb-1">Accepted Categories</div>
              <div className="flex flex-wrap gap-1.5">
                {activeShelter.dietaryAccepted.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[10px] border border-slate-700">
                    ✓ {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="font-semibold text-slate-300 mb-1">Live Beneficiary Demographic</div>
              <p className="text-slate-400 text-[11px]">
                Currently housing {activeShelter.activeBeneficiaries} residents. Strict inspection guidelines apply upon delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
}
