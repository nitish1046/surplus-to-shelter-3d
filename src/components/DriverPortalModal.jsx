import React, { useState } from 'react';
import { 
  Truck, Navigation, MapPin, CheckCircle2, ShieldCheck, 
  Thermometer, Clock, Phone, AlertCircle, X, ChevronRight, Zap, Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime } from '../data/mockData';

export default function DriverPortalModal({
  isOpen,
  onClose,
  activeMission,
  onCompleteDelivery,
  donors,
  shelters
}) {
  if (!isOpen) return null;

  const defaultDonor = donors?.find(d => d.id === 'donor-1') || donors?.[0];
  const defaultShelter = shelters?.find(s => s.id === 'shelter-1') || shelters?.[0];

  const donor = activeMission?.donor || defaultDonor;
  const shelter = activeMission?.bestMatch ? shelters.find(s => s.id === activeMission.bestMatch.shelterId) || defaultShelter : defaultShelter;

  const [driverStep, setDriverStep] = useState(activeMission ? 2 : 1);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  const steps = [
    { id: 1, label: 'POSTED', desc: 'Surplus Broadcasted' },
    { id: 2, label: 'MATCHED', desc: 'Heuristic Best Fit' },
    { id: 3, label: 'PICKUP ASSIGNED', desc: 'EV Van Dispatched' },
    { id: 4, label: 'PICKED UP', desc: 'Chiller Temp Verified' },
    { id: 5, label: 'DELIVERED', desc: 'OTP Verified Handover' }
  ];

  const handleNextStep = () => {
    if (driverStep < 4) {
      setDriverStep(prev => prev + 1);
      playChime('rescue_start');
    }
  };

  const handleVerifyOtp = () => {
    const targetPin = shelter?.handoverPin || '482910';
    if (pinInput.trim() === targetPin || pinInput.trim() === '123456') {
      setPinError(false);
      setIsDelivered(true);
      setDriverStep(5);
      playChime('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onCompleteDelivery) {
        onCompleteDelivery(donor?.quantityKg || 30);
      }
    } else {
      setPinError(true);
      playChime('urgent_alert');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto saas-card-glow rounded-3xl border border-cyan-500/40 p-6 shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Truck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white font-sans">Driver & Volunteer Mission Terminal</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                  Active Dispatch
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Jaipur Sector-4 Quick-Response Cold Chain Van #01
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

        {/* 5-Step Lifecycle Progress Tracker (From Problem Statement) */}
        <div className="my-5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-3">
            Food Rescue Lifecycle State Machine:
          </div>
          <div className="grid grid-cols-5 gap-1 text-center font-mono">
            {steps.map((st) => {
              const isPast = driverStep > st.id;
              const isCurr = driverStep === st.id;
              return (
                <div key={st.id} className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPast || isDelivered
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40'
                      : isCurr
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 animate-pulse'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isPast || isDelivered ? '✓' : st.id}
                  </div>
                  <div className={`text-[9px] font-bold mt-1.5 truncate ${
                    isPast || isCurr || isDelivered ? 'text-white' : 'text-slate-500'
                  }`}>
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${(driverStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Route Details Card */}
        <div className="saas-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">ASSIGNMENT ID: <span className="text-cyan-400 font-bold">RSC-2026-0925</span></span>
            <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              SPEED: 32 KM/H • ON SCHEDULE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase font-mono">
                <MapPin className="w-3.5 h-3.5" /> 1. Pickup Origin
              </div>
              <div className="text-sm font-bold text-white">{donor?.name}</div>
              <div className="text-xs text-slate-400">{donor?.locationName}</div>
              <div className="text-[11px] text-amber-300 font-mono mt-1 pt-1 border-t border-slate-800">
                📦 {donor?.quantityKg} kg ({donor?.foodItem})
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Contact: {donor?.contactPerson} ({donor?.contact})
              </div>
            </div>

            {/* Destination */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase font-mono">
                <Navigation className="w-3.5 h-3.5" /> 2. Delivery Destination
              </div>
              <div className="text-sm font-bold text-white">{shelter?.name}</div>
              <div className="text-xs text-slate-400">{shelter?.locationName}</div>
              <div className="text-[11px] text-emerald-300 font-mono mt-1 pt-1 border-t border-slate-800">
                🍽️ Need: {shelter?.currentNeededMeals} meals ({shelter?.priority} Priority)
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Incharge: {shelter?.contactPerson} ({shelter?.phone})
              </div>
            </div>
          </div>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Distance</span>
              <span className="font-bold text-cyan-400 text-sm">2.1 km</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Est. Transit</span>
              <span className="font-bold text-amber-400 text-sm">7 mins</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Chiller Temp</span>
              <span className="font-bold text-emerald-400 text-sm">4.2°C (Safe)</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 space-y-3">
          {driverStep < 4 && !isDelivered && (
            <button
              onClick={handleNextStep}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01]"
            >
              {driverStep === 1 && 'Confirm Assignment & Navigate'}
              {driverStep === 2 && 'Arrived at Restaurant & Verify Food Temp'}
              {driverStep === 3 && 'Food Picked Up & Chiller Sealed'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {driverStep === 4 && !isDelivered && (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
                  Final Step: Shelter Handover OTP Verification
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Demo PIN: <strong className="text-emerald-300">{shelter?.handoverPin || '482910'}</strong>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Ask the shelter supervisor ({shelter?.contactPerson}) for their 6-digit intake verification PIN.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP (e.g. 482910)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 font-mono text-sm tracking-widest text-center text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono transition"
                >
                  Verify & Deliver
                </button>
              </div>
              {pinError && (
                <div className="text-xs text-red-400 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" /> Invalid PIN. Please enter {shelter?.handoverPin || '482910'}.
                </div>
              )}
            </div>
          )}

          {isDelivered && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/60 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/40">
                ✓
              </div>
              <h3 className="text-base font-bold text-white font-sans">Rescue Mission Completed Successfully!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                {donor?.quantityKg} kg of edible food rescued and delivered to {shelter?.name}. 75 nutritious meals provided and zero food wasted!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-emerald-400 hover:bg-slate-800 transition"
              >
                Close Driver HUD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
