import React from 'react';
import { 
  X, MapPin, Clock, Scale, Utensils, Home, 
  Phone, ShieldCheck, Zap, Navigation, ArrowRight 
} from 'lucide-react';
import { playChime } from '../data/mockData';

export default function NodeDrawer({ node, onClose, onDispatchFromNode }) {
  if (!node) return null;

  const isDonor = Boolean(node.quantityKg);

  const handleAction = () => {
    playChime('rescue_start');
    if (onDispatchFromNode) {
      onDispatchFromNode(node);
    }
  };

  return (
    <div className="absolute top-20 right-6 z-30 w-80 md:w-96 glass-panel-glow rounded-2xl border border-emerald-500/40 p-5 shadow-2xl text-slate-100 animate-in slide-in-from-right duration-300">
      <div className="flex items-start justify-between pb-3 border-b border-slate-700/60">
        <div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
            isDonor ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
          }`}>
            {isDonor ? 'Verified Food Donor' : 'Registered Shelter / NGO'}
          </span>
          <h3 className="text-base font-bold text-white mt-1 leading-snug">{node.name}</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="my-4 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{node.locationName}</span>
        </div>

        {isDonor ? (
          <>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Available Surplus:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">{node.quantityKg} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Meal Portions:</span>
                <span className="font-bold text-white font-mono">{node.mealsEquivalent} Meals</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Perishability Expiry:</span>
                <span className="font-bold text-red-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {node.safeHoursRemaining} hours safe
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Item: <strong>{node.foodItem}</strong></span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">{node.dietary}</span>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Needed Today:</span>
                <span className="font-bold text-cyan-400 font-mono text-sm">{node.currentNeededMeals} Meals</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Capacity:</span>
                <span className="font-bold text-white font-mono">{node.totalCapacityMeals} Meals</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Refrigeration:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {node.refrigerationAvailable ? 'Active' : 'No Cold-Storage'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 px-1">
              Contact: <strong>{node.contactPerson}</strong> ({node.phone})
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleAction}
        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
      >
        <Zap className="w-4 h-4 fill-current" />
        {isDonor ? 'Launch Rescue From Here' : 'Find Best Donor For This Shelter'}
      </button>
    </div>
  );
}
