import React, { useState } from 'react';
import { 
  Home, Users, ShieldCheck, KeyRound, Snowflake, 
  Clock, CheckCircle, AlertCircle, ArrowRight 
} from 'lucide-react';
import { playChime } from '../data/mockData';

export default function ShelterWorkspace({
  shelters,
  onUpdateShelterNeed
}) {
  const [pinVerification, setPinVerification] = useState({});
  const [enteredPin, setEnteredPin] = useState('');
  const [activePinShelterId, setActivePinShelterId] = useState(null);

  const totalBeneficiaries = shelters.reduce((acc, s) => acc + (s.activeBeneficiaries || 0), 0);
  const totalNeededMeals = shelters.reduce((acc, s) => acc + (s.currentNeededMeals || 0), 0);
  const totalCapacity = shelters.reduce((acc, s) => acc + (s.totalCapacityMeals || 0), 0);
  const coldStorageCount = shelters.filter(s => s.coldStorageAvailable).length;

  const handleVerifyPin = (shelter) => {
    if (enteredPin.trim() === shelter.handoverPin) {
      setPinVerification(prev => ({ ...prev, [shelter.id]: 'VERIFIED' }));
      playChime('success');
      setEnteredPin('');
      setActivePinShelterId(null);
    } else {
      setPinVerification(prev => ({ ...prev, [shelter.id]: 'FAILED' }));
      playChime('urgent_alert');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Home className="w-5 h-5 text-cyan-400" />
            Shelter & NGO Beneficiary Intake Operations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time beneficiary capacity tracking, cold-storage intake compliance, and digital OTP handover verification.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Total Active Beneficiaries</div>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-1">
            {totalBeneficiaries} People
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Children, elderly & night campers</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Meals Needed Today</div>
          <div className="text-2xl font-black font-mono text-amber-400 mt-1">
            {totalNeededMeals} Meals
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Deficit across 4 community hubs</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Network Intake Capacity</div>
          <div className="text-2xl font-black font-mono text-white mt-1">
            {totalCapacity} Meals/Day
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Maximum verified distribution volume</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Cold-Storage Equipped</div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            {coldStorageCount} / {shelters.length} Hubs
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Allows overnight preservation</div>
        </div>
      </div>

      {/* Shelter Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shelters.map((shelter) => {
          const isPinVerified = pinVerification[shelter.id] === 'VERIFIED';
          const fillPercentage = Math.round((shelter.currentNeededMeals / shelter.totalCapacityMeals) * 100);

          return (
            <div 
              key={shelter.id}
              className="saas-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition shadow-xl space-y-4"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">{shelter.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                      shelter.priority === 'VERY_HIGH' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                      shelter.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {shelter.priority} NEED
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{shelter.locationName}</div>
                  <div className="text-[10px] font-mono text-slate-500">Reg: {shelter.regNumber}</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black font-mono text-cyan-400">
                    {shelter.currentNeededMeals}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Needed Meals</div>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Intake Demand Level:</span>
                  <span className="text-slate-300">{shelter.currentNeededMeals} / {shelter.totalCapacityMeals} meals ({fillPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, fillPercentage)}%` }}
                  />
                </div>
              </div>

              {/* Need Adjustment Slider */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                  <span className="text-slate-400">Adjust Today's Need:</span>
                  <span className="text-cyan-300 font-bold">{shelter.currentNeededMeals} meals</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max={shelter.totalCapacityMeals}
                  step="5"
                  value={shelter.currentNeededMeals}
                  onChange={(e) => onUpdateShelterNeed(shelter.id, Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Demographics & Dietary Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{shelter.activeBeneficiaries} Residents</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Snowflake className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{shelter.coldStorageAvailable ? 'Cold-Storage Ready' : 'Direct Service Only'}</span>
                </div>
              </div>

              {/* Handover OTP Authentication Box */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Anti-Diversion Delivery PIN:</div>
                    <div className="text-xs font-mono font-bold text-amber-300 tracking-wider">
                      {shelter.handoverPin}
                    </div>
                  </div>
                </div>

                {isPinVerified ? (
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1 border border-emerald-500/40">
                    <CheckCircle className="w-3.5 h-3.5" /> Handover Verified
                  </span>
                ) : (
                  <button
                    onClick={() => setActivePinShelterId(activePinShelterId === shelter.id ? null : shelter.id)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono transition"
                  >
                    Verify PIN
                  </button>
                )}
              </div>

              {/* Interactive PIN verification input */}
              {activePinShelterId === shelter.id && !isPinVerified && (
                <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/40 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter 6-digit PIN"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    maxLength={6}
                    className="w-full px-2.5 py-1 text-xs rounded bg-slate-950 text-white font-mono border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleVerifyPin(shelter)}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono rounded"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
