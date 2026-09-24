import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Truck, Users, 
  Leaf, Droplets, Award, Play, Utensils, CheckCircle2, ChevronRight 
} from 'lucide-react';
import InteractiveRescueMap from './InteractiveRescueMap';
import SystemArchitectureFlow from './SystemArchitectureFlow';
import { calculateImpactMetrics } from '../data/mockData';

export default function OverviewWorkspace({
  donors,
  shelters,
  fleet,
  activeMission,
  missionProgress,
  selectedNode,
  onSelectNode,
  onOpenSimulator,
  onOpenDonorPortal,
  onOpenShelterPortal,
  onOpenDriverPortal,
  onRunQuickExample,
  totalRescuedKg
}) {
  const [calcKg, setCalcKg] = useState(120);
  const metrics = calculateImpactMetrics(totalRescuedKg);
  const interactiveMetrics = calculateImpactMetrics(calcKg);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 pb-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            AMIHACKS PROBLEM STATEMENT 1: SURPLUS-TO-SHELTER
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
            Ending Urban Food Spoilage With <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Intelligent Real-Time Routing
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Connecting commercial kitchens, wedding banquets, and supermarkets with verified shelters and community kitchens within the critical 2–4 hour perishable consumption window.
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenSimulator}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              Simulate Live Rescue
            </button>

            <button
              onClick={onOpenDonorPortal}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Utensils className="w-4 h-4 text-amber-400" />
              Post Food Surplus
            </button>

            <button
              onClick={onOpenShelterPortal}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              Shelter Intake Hub
            </button>

            <button
              onClick={onOpenDriverPortal}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-teal-300 border border-teal-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Truck className="w-4 h-4 text-teal-400" />
              Driver Terminal
            </button>
          </div>
        </div>
      </section>

      {/* Top 4 Impact Statistics Ribbon */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="saas-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Nutritional Portions</span>
            <Utensils className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-400 mt-2">
            {metrics.meals.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Balanced meals provided</div>
        </div>

        <div className="saas-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Food Diverted</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-400 mt-2">
            {metrics.totalKg.toLocaleString()} kg
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Zero landfill waste</div>
        </div>

        <div className="saas-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>GHG CO₂e Avoided</span>
            <Leaf className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black font-mono text-teal-300 mt-2">
            {metrics.co2eAvoidedKg.toLocaleString()} kg
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Landfill methane stopped</div>
        </div>

        <div className="saas-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg Rescue Latency</span>
            <Truck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-mono text-cyan-300 mt-2">
            22 mins
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Post to recipient delivery</div>
        </div>
      </section>

      {/* Interactive System Architecture & 4-Pillar Workflow */}
      <section>
        <SystemArchitectureFlow
          onOpenSimulator={onOpenSimulator}
          onOpenDonorPortal={onOpenDonorPortal}
          onOpenShelterPortal={onOpenShelterPortal}
          onOpenDriverPortal={onOpenDriverPortal}
          onRunQuickExample={onRunQuickExample}
        />
      </section>

      {/* Main Feature: Live Interactive GIS Rescue Map */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Urban Food Rescue & Corridor Map (Jaipur Metropolitan Area)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time monitoring of commercial food donors, recipient shelters, and cold-chain electric delivery fleet.
            </p>
          </div>
        </div>

        <InteractiveRescueMap
          donors={donors}
          shelters={shelters}
          fleet={fleet}
          activeMission={activeMission}
          missionProgress={missionProgress}
          selectedNode={selectedNode}
          onSelectNode={onSelectNode}
        />
      </section>

      {/* How It Works (The 4-Step Cold-Chain Protocol) */}
      <section className="saas-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight font-sans">
            How The Real-Time Rescue Engine Operates
          </h2>
          <p className="text-xs text-slate-400">
            A continuous cold-chain verification loop built specifically for time-critical food logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-mono text-sm">
              01
            </div>
            <h3 className="font-bold text-white text-sm">Surplus Broadcast</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Restaurant posts extra food with safe consumption window and HACCP temperature holding verification (&gt;60°C).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold font-mono text-sm">
              02
            </div>
            <h3 className="font-bold text-white text-sm">Heuristic Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-factor algorithm ranks candidate shelters: 35% distance + 30% capacity fit + 20% need + 15% dietary.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold font-mono text-sm">
              03
            </div>
            <h3 className="font-bold text-white text-sm">Dynamic VRP Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidated multi-pickup routing saves 50.3% vehicle fuel while keeping delivery safely ahead of decay deadline.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold font-mono text-sm">
              04
            </div>
            <h3 className="font-bold text-white text-sm">Verified Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              NGO lead verifies handover with 6-digit OTP. Donor automatically receives Section 80G CSR Tax Exemption certificate.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive ESG Impact Forecaster */}
      <section className="saas-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Corporate ESG & Carbon Footprint Abatement Forecaster
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Estimate ecological and financial return on investment for hotel banquets and corporate cafeterias.
            </p>
          </div>
          <span className="font-mono text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30">
            Batch Size: {calcKg} kg
          </span>
        </div>

        <input
          type="range"
          min="20"
          max="800"
          step="10"
          value={calcKg}
          onChange={(e) => setCalcKg(Number(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>20 kg (Cafe Daily Extra)</span>
          <span>200 kg (Wedding Banquet)</span>
          <span>800 kg (Convention Hall)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
            <div className="text-[11px] text-slate-400">Nutritional Yield</div>
            <div className="text-xl font-black text-emerald-400 mt-1">
              {interactiveMetrics.meals.toLocaleString()} Meals
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
            <div className="text-[11px] text-slate-400">CO₂e Abatement</div>
            <div className="text-xl font-black text-teal-400 mt-1">
              {interactiveMetrics.co2eAvoidedKg.toLocaleString()} kg
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
            <div className="text-[11px] text-slate-400">Virtual Water Saved</div>
            <div className="text-xl font-black text-cyan-400 mt-1">
              {interactiveMetrics.waterLitersSaved.toLocaleString()} L
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
            <div className="text-[11px] text-slate-400">Section 80G CSR Benefit</div>
            <div className="text-xl font-black text-amber-400 mt-1">
              ₹{interactiveMetrics.totalTaxBenefitInr.toLocaleString()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
