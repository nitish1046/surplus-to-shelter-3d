import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Download, X, Play, 
  Pause, Sparkles, Box, ShieldCheck, Truck, Award, 
  BarChart3, Brain, Globe2, ArrowRight, CheckCircle2 
} from 'lucide-react';
import City3DCanvas from './City3DCanvas';
import confetti from 'canvas-confetti';
import { playChime } from '../data/mockData';

export default function Presentation3DDeck({
  isOpen,
  onClose,
  donors,
  shelters
}) {
  if (!isOpen) return null;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides = [
    {
      id: 1,
      tag: 'VISION & MISSION',
      title: 'SURPLUS-TO-SHELTER PRO',
      subtitle: 'Autonomous Perishable Food Rescue & Real-Time Logistics OS',
      cameraPreset: 'OVERVIEW',
      timeOfDay: 'NIGHT',
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Every day in urban hubs like Jaipur, commercial kitchens and banquets discard thousands of kilograms of edible food due to strict 2–4 hour perishable consumption windows and coordination bottlenecks.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-center font-mono">
              <div className="text-[10px] text-slate-400">Target Spoilage</div>
              <div className="text-xl font-black text-emerald-400 mt-0.5">0.0%</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-center font-mono">
              <div className="text-[10px] text-slate-400">Avg Transit Latency</div>
              <div className="text-xl font-black text-cyan-400 mt-0.5">22 mins</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-center font-mono">
              <div className="text-[10px] text-slate-400">Carbon Abatement</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">2.5 kg/kg</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      tag: 'THE PROBLEM',
      title: 'The Perishability Crisis & The 2–4 Hour Clock',
      subtitle: 'Why Traditional Donation Portals & WhatsApp Groups Fail',
      cameraPreset: 'FOCUS_DONOR',
      timeOfDay: 'NIGHT',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-xs sm:text-sm text-slate-300">
            Perishable cooked food (dal, paneer gravy, rice) degrades exponentially in Indian ambient temperatures (&gt;30°C). 
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-500/40 text-red-200">
              🚨 <strong>Ticking Clock:</strong> 2 to 4 hour consumption window before microbial proliferation.
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200">
              ⚖️ <strong>Capacity Mismatch:</strong> 60 kg banquet surplus vs 15 kg shelter capacity leaves 45 kg wasted.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300">
              ⏳ <strong>Logistics Latency:</strong> Manual phone coordination takes 60–90 mins, causing food to expire in transit.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      tag: 'SYSTEM ARCHITECTURE',
      title: 'Closed-Loop Cold-Chain Pipeline',
      subtitle: 'From Commercial Surplus to Verified Nutritional Intake',
      cameraPreset: 'OVERVIEW',
      timeOfDay: 'SUNSET',
      content: (
        <div className="space-y-3 font-sans text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30">
              <span className="text-amber-400 font-bold font-mono">1. Food Broadcast</span>
              <p className="text-[11px] text-slate-400 mt-1">HACCP holding temperature checked (&gt;60°C) + Gemini AI camera scan.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/30">
              <span className="text-purple-400 font-bold font-mono">2. Heuristic Matching</span>
              <p className="text-[11px] text-slate-400 mt-1">Multi-factor heuristic ranks candidate shelters by capacity, need, & distance.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold font-mono">3. Dynamic VRP Dispatch</span>
              <p className="text-[11px] text-slate-400 mt-1">Multi-stop consolidated routing saves 50.3% vehicle fuel and emission costs.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <span className="text-cyan-400 font-bold font-mono">4. Verified Handover</span>
              <p className="text-[11px] text-slate-400 mt-1">6-digit anti-fraud OTP verification + Section 80G CSR tax certificate issuance.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      tag: 'ALGORITHM',
      title: 'Multi-Factor Heuristic Matching Engine',
      subtitle: 'Transparent Algorithmic Weighting & Constraint Satisfaction',
      cameraPreset: 'OVERVIEW',
      timeOfDay: 'NIGHT',
      content: (
        <div className="space-y-3 font-sans">
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/50 font-mono text-xs text-purple-200">
            Score = (0.35 * Dist) + (0.30 * Capacity) + (0.20 * Need) + (0.15 * Urgency & Diet)
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-cyan-400 font-bold">Distance (35%):</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">Haversine GPS transit proximity minimizes delivery degradation.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-amber-400 font-bold">Capacity Fit (30%):</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">Assures 100% absorption of donation volume without secondary waste.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-emerald-400 font-bold">Shelter Need (20%):</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">Prioritizes emergency shelters and orphanages housing vulnerable groups.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-red-400 font-bold">Urgency (15%):</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">Escalates priority when safe consumption margin drops under 2 hours.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      tag: 'VRP ROUTING',
      title: 'Vehicle Routing Problem (VRPTW Solver)',
      subtitle: 'Clarke-Wright Savings Heuristic: 50.3% Fuel & Carbon Reduction',
      cameraPreset: 'FOLLOW_VAN',
      timeOfDay: 'NIGHT',
      content: (
        <div className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/40">
              <span className="text-red-400 font-bold block mb-1">Unoptimized Runs</span>
              <div className="text-base font-bold text-red-300">28.4 km • 68 mins</div>
              <span className="text-[10px] text-slate-400 block mt-1">7.2 kg CO₂ released</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/50">
              <span className="text-emerald-400 font-bold block mb-1">Smart Batched Cluster</span>
              <div className="text-base font-bold text-emerald-300">14.1 km • 34 mins</div>
              <span className="text-[10px] text-emerald-400 font-bold block mt-1">50.3% Fuel & Carbon Saved</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
            Consolidates nearby restaurants (Spice Courtyard + Rajputana Hall) into a unified loop before cold-chain decay deadline.
          </p>
        </div>
      )
    },
    {
      id: 6,
      tag: 'QUALITY & SAFETY',
      title: 'HACCP Safety & Anti-Diversion Digital PINs',
      subtitle: 'Preventing Food Poisoning & Black-Market Diversion',
      cameraPreset: 'FOCUS_DONOR',
      timeOfDay: 'SUNSET',
      content: (
        <div className="space-y-2 text-xs font-sans">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-mono">HACCP Temperature Enforcement:</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Hot holding (&gt;60°C) and cold refrigeration (&lt;5°C) verified to prevent the bacterial danger zone.</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-start gap-2.5">
            <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-mono">Anti-Diversion Handover OTP:</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Shelter director provides a 6-digit PIN entered by the driver on delivery to prevent diversion.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      tag: 'BUSINESS MODEL',
      title: 'Solving Hotel Participation: Section 80G CSR',
      subtitle: 'Transforming Perishable Waste into Audited Tax Deductions',
      cameraPreset: 'OVERVIEW',
      timeOfDay: 'NIGHT',
      content: (
        <div className="space-y-3 font-sans text-xs">
          <p className="text-slate-300">
            Commercial kitchens often discard food due to liability fears. RescueTrack creates economic incentives:
          </p>
          <div className="space-y-2 font-mono">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-200">
              ₹280 / kg Fair Market Valuation automatically calculated per batch.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300">
              Official Government Section 80G Certificate with Municipal Digital Seal & QR Code.
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-300">
              100% Tax Deductible CSR Expense for participating corporate hotels.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      tag: 'ESG IMPACT',
      title: 'EPA WARM Carbon & Methane Abatement',
      subtitle: 'Municipal Scope 3 Greenhouse Gas Accounting',
      cameraPreset: 'TOP_DOWN',
      timeOfDay: 'NIGHT',
      content: (
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-center">
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
            <span className="text-[10px] text-slate-400 block">Carbon Abatement</span>
            <span className="text-base font-bold text-emerald-400">2.5 kg CO₂e / kg</span>
          </div>
          <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/40">
            <span className="text-[10px] text-slate-400 block">Methane Prevented</span>
            <span className="text-base font-bold text-teal-300">0.089 kg CH₄ / kg</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/40">
            <span className="text-[10px] text-slate-400 block">Water Conserved</span>
            <span className="text-base font-bold text-cyan-300">142 L / kg</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/40">
            <span className="text-[10px] text-slate-400 block">Audit Compliance</span>
            <span className="text-base font-bold text-purple-300">ISO 14064 CSV</span>
          </div>
        </div>
      )
    },
    {
      id: 9,
      tag: 'PREDICTIVE AI',
      title: 'Gemini AI: Arrhenius Spoilage & Peak Demand',
      subtitle: 'Ambient Thermal Compensation & Proactive Fleet Pre-Staging',
      cameraPreset: 'OVERVIEW',
      timeOfDay: 'SUNSET',
      content: (
        <div className="space-y-3 font-sans text-xs">
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/40 font-mono text-purple-300">
            SafeHours = BaseHours / 1.8^((AmbientTemp - 25) / 10)
          </div>
          <p className="text-slate-300 leading-relaxed">
            • At 40°C peak summer heat, microbial proliferation accelerates by 2.4x. The AI automatically shrinks delivery windows and elevates dispatch urgency.
          </p>
          <p className="text-slate-300 leading-relaxed">
            • Predicts 380 kg wedding banquet surplus at 23:30 PM, triggering fleet pre-staging 90 minutes in advance.
          </p>
        </div>
      )
    },
    {
      id: 10,
      tag: 'THE ROADMAP',
      title: 'Scalability & Live Demo Evaluation',
      subtitle: 'From Hackathon Prototype to National Urban Food Security Grid',
      cameraPreset: 'OVERVIEW',
      timeOfDay: 'NIGHT',
      content: (
        <div className="space-y-3 font-sans text-xs">
          <div className="space-y-1.5 font-mono">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
              Phase 1: Jaipur City Core (3D Digital Twin + VRPTW Engine Ready)
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Phase 2: Zomato / Swiggy Dark-Store EV Fleet Integration
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Phase 3: State-wide Mandate across 500+ Luxury Hotels
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-center uppercase tracking-wider font-mono">
            Live Platform Active on Port 3000 — Ready For Evaluation!
          </div>
        </div>
      )
    }
  ];

  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      playChime('success');
    } else {
      // Confetti celebration on last slide
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      playChime('success');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      playChime('rescue_start');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="fixed inset-0 z-50 bg-[#070b14] flex flex-col overflow-hidden select-none">
      {/* Top Deck Header */}
      <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30">
            3D PITCH DECK
          </div>
          <span className="text-slate-400 text-xs font-mono">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Download PPTX Button */}
          <a
            href="/Surplus_to_Shelter_Pitch_Deck.pptx"
            download="Surplus_to_Shelter_Pitch_Deck.pptx"
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download .PPTX
          </a>

          {/* Close Deck */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Screen: Left = 3D Animated City Scene, Right = Slide Content */}
      <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Real-Time 3D Digital Twin reacting to slide */}
        <div className="w-full lg:w-1/2 h-64 lg:h-full relative border-r border-slate-800/80">
          <City3DCanvas
            donors={donors}
            shelters={shelters}
            cameraPreset={slide.cameraPreset}
            timeOfDay={slide.timeOfDay}
            missionProgress={currentSlide > 3 ? 0.6 : 0.1}
            isSimulating={true}
          />
          <div className="absolute bottom-4 left-4 z-10 glass-panel px-3 py-1.5 rounded-xl text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>3D Camera: {slide.cameraPreset} • {slide.timeOfDay}</span>
          </div>
        </div>

        {/* Right Side: High-Impact Slide Content */}
        <div className="w-full lg:w-1/2 flex-1 p-6 lg:p-12 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-[#070b14]">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs tracking-wider border border-emerald-500/30">
              {slide.tag}
            </div>

            <h1 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight font-sans leading-tight">
              {slide.title}
            </h1>

            <h2 className="text-sm font-semibold text-emerald-400 font-sans">
              {slide.subtitle}
            </h2>

            <div className="pt-2">
              {slide.content}
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-emerald-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition hover:scale-105"
              >
                {currentSlide === slides.length - 1 ? 'Finish & Celebrate' : 'Next Slide'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
