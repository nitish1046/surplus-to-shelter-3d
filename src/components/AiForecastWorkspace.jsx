import React, { useState } from 'react';
import { 
  TrendingUp, Sparkles, Brain, AlertCircle, Thermometer, 
  Clock, ShieldAlert, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { HOURLY_PREDICTIVE_DATA } from '../data/mockData';

export default function AiForecastWorkspace() {
  const [ambientTemp, setAmbientTemp] = useState(32);
  const [foodType, setFoodType] = useState('Cooked Thali (Curry & Rice)');

  const baseSafeHours = foodType.includes('Cooked') ? 4.0 : foodType.includes('Bakery') ? 8.0 : 6.0;
  const tempFactor = Math.pow(1.8, (ambientTemp - 25) / 10);
  const adjustedSafeHours = +(baseSafeHours / tempFactor).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            AI Predictive Perishability & Urban Demand Forecaster
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gemini-assisted Arrhenius microbial spoilage modeling, ambient temperature compensation, and peak banquet volume forecasting.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
          <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
          PREDICTIVE AI V3.4 ACTIVE
        </span>
      </div>

      {/* Interactive Arrhenius Temperature & Decay Simulator */}
      <div className="saas-card p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-red-400" />
            Ambient Thermal Compensation Simulator (Arrhenius Decay)
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Microbial Doubling Time Model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Ambient Environmental Temperature:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="15"
                  max="45"
                  step="1"
                  value={ambientTemp}
                  onChange={(e) => setAmbientTemp(Number(e.target.value))}
                  className="w-full accent-red-400 cursor-pointer"
                />
                <span className="font-mono font-bold text-red-400 text-sm w-16 text-right">
                  {ambientTemp}°C
                </span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>15°C (Winter)</span>
                <span>25°C (Standard)</span>
                <span>45°C (Summer Peak)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Food Matrix Category:
              </label>
              <select
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-400 font-sans"
              >
                <option value="Cooked Thali (Curry & Rice)">Cooked High-Moisture Thali (Gravy & Rice)</option>
                <option value="Bakery & Bread">Bakery & Dry Pastries (Low Moisture)</option>
                <option value="Dairy & Raw Produce">Dairy & Cut Produce (Medium Moisture)</option>
              </select>
            </div>
          </div>

          {/* Model Output Card */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">Dynamic Safe Rescue Window:</div>
              <div className="text-3xl font-black font-mono text-purple-300 mt-1">
                {adjustedSafeHours} Hours
              </div>
              <p className="text-xs text-slate-300 mt-2 font-sans">
                At {ambientTemp}°C ambient heat, microbial proliferation accelerates by{' '}
                <strong className="text-amber-400 font-mono">{(tempFactor).toFixed(2)}x</strong>. Fleet must prioritize pickup within{' '}
                <strong className="text-purple-300 font-mono">{adjustedSafeHours}h</strong>.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
              Heuristic Formula: SafeTime = BaseTime / 1.8^((Temp - 25)/10)
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Urban Surplus Prediction Curve */}
      <div className="saas-card p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Metropolitan Surplus Curve & Proactive Dispatch Forecast
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Jaipur Zone 1-4 Forecast</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {HOURLY_PREDICTIVE_DATA.map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between text-center">
              <span className="text-[10px] font-mono text-slate-400">{item.hour}</span>
              <div className="my-2">
                <span className="text-xs font-mono text-slate-500 block">Predicted:</span>
                <span className={`text-base font-black font-mono ${
                  item.predictedTonightKg > 200 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {item.predictedTonightKg} kg
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-500">
                Rescued: {item.actualRescuedKg}kg
              </span>
            </div>
          ))}
        </div>

        {/* AI Actionable Alert */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/40 text-xs text-slate-300 flex items-start gap-3">
          <Brain className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="font-sans">
            <div className="font-bold text-white mb-0.5">Gemini Logistics Recommendation:</div>
            Predictive model forecasts a <strong>380 kg surplus spike between 23:00 PM and 00:30 AM</strong> due to 14 scheduled wedding banquets across Statue Circle and Vaishali Nagar. <strong>Recommendation:</strong> Pre-stage Rescue Van 01 and Van 02 at C-Scheme depot by 22:30 PM to eliminate transit latency.
          </div>
        </div>
      </div>
    </div>
  );
}
