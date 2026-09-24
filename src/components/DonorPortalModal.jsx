import React, { useState } from 'react';
import { 
  PlusCircle, Sparkles, Camera, Clock, Scale, Utensils, 
  MapPin, Check, AlertCircle, X, ShieldCheck, Thermometer 
} from 'lucide-react';
import { playChime } from '../data/mockData';

const AI_SAMPLE_PHOTOS = [
  {
    id: 'sample-1',
    name: 'North Indian Banquet Feast',
    photoUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80',
    foodItem: 'Dal Makhani, Shahi Paneer & Jeera Rice',
    category: 'Cooked Meals',
    detectedWeight: 36,
    safeHours: 3.0,
    dietary: 'Pure Veg',
    confidence: '97%'
  },
  {
    id: 'sample-2',
    name: 'Artisan Bakery Bread Batch',
    photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    foodItem: 'Multi-grain Loaves, Croissants & Baguettes',
    category: 'Bakery & Bread',
    detectedWeight: 22,
    safeHours: 6.0,
    dietary: 'Veg / Bakery',
    confidence: '95%'
  },
  {
    id: 'sample-3',
    name: 'Hotel Buffet Surplus',
    photoUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    foodItem: 'Mixed Veg Pulao, Dal Tadka & Chapati',
    category: 'Cooked Meals',
    detectedWeight: 45,
    safeHours: 2.5,
    dietary: 'Pure Veg',
    confidence: '98%'
  }
];

export default function DonorPortalModal({ isOpen, onClose, onAddDonor }) {
  if (!isOpen) return null;

  const [restaurantName, setRestaurantName] = useState('Jaipur Heritage Kitchen');
  const [locationName, setLocationName] = useState('Mansarovar, Madhyam Marg');
  const [foodItem, setFoodItem] = useState('Mixed Veg Sabzi & Fresh Tandoori Rotis');
  const [category, setCategory] = useState('Cooked Meals');
  const [quantityKg, setQuantityKg] = useState(30);
  const [safeHoursRemaining, setSafeHoursRemaining] = useState(3.0);
  const [holdingTempC, setHoldingTempC] = useState(62);
  const [dietary, setDietary] = useState('Pure Veg');
  const [contact, setContact] = useState('+91 98290 99887');

  const [isScanning, setIsScanning] = useState(false);
  const [aiDetected, setAiDetected] = useState(null);

  const handleRunAiVision = (sample) => {
    setIsScanning(true);
    playChime('rescue_start');

    setTimeout(() => {
      setIsScanning(false);
      setAiDetected(sample);
      setFoodItem(sample.foodItem);
      setCategory(sample.category);
      setQuantityKg(sample.detectedWeight);
      setSafeHoursRemaining(sample.safeHours);
      setDietary(sample.dietary);
      playChime('success');
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDonor = {
      id: `donor-${Date.now()}`,
      name: restaurantName,
      locationName,
      lat: 26.8700 + (Math.random() - 0.5) * 0.06,
      lng: 75.7800 + (Math.random() - 0.5) * 0.08,
      gstin: '08AAACD9988E1Z4',
      category,
      foodItem,
      quantityKg: Number(quantityKg),
      mealsEquivalent: Math.round(Number(quantityKg) * 2.5),
      safeHoursRemaining: Number(safeHoursRemaining),
      holdingTempC: Number(holdingTempC),
      dietary,
      urgency: Number(safeHoursRemaining) <= 2.0 ? 'CRITICAL' : Number(safeHoursRemaining) <= 3.5 ? 'HIGH' : 'SAFE',
      status: 'SURPLUS_AVAILABLE',
      contactPerson: 'Head Chef',
      contact,
      tag: 'RESTAURANT',
      certEligible: true,
      estimatedValueInr: Number(quantityKg) * 280
    };

    playChime('success');
    onAddDonor(newDonor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto saas-card-glow rounded-2xl border border-amber-500/40 p-6 shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Donor Portal: Broadcast Food Surplus</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Broadcast edible surplus food before it spoils. Instantly mapped in real-time for nearby NGO rescue.
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

        {/* AI Food Scanner Section */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-wider text-purple-200 font-mono">
                AI Vision Food Scanner (Gemini Multimodal)
              </span>
            </div>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40">
              Auto-Extract Details
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            Select a photo or scan surplus batch. The vision AI automatically estimates quantity, category, and safe consumption window:
          </p>

          <div className="grid grid-cols-3 gap-2">
            {AI_SAMPLE_PHOTOS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleRunAiVision(sample)}
                disabled={isScanning}
                className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-purple-400 transition text-left"
              >
                <img 
                  src={sample.photoUrl} 
                  alt={sample.name} 
                  className="w-full h-20 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-1.5 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-white leading-tight truncate">{sample.name}</span>
                  <span className="text-[9px] text-purple-300 font-mono">Scan ~{sample.detectedWeight}kg</span>
                </div>
              </button>
            ))}
          </div>

          {isScanning && (
            <div className="mt-3 p-2 rounded-lg bg-purple-900/40 border border-purple-500/50 flex items-center justify-center gap-2 text-xs text-purple-200 animate-pulse font-mono">
              <Camera className="w-4 h-4 animate-spin" />
              <span>Analyzing image with Gemini Vision Model... calculating calories & weight...</span>
            </div>
          )}

          {aiDetected && !isScanning && (
            <div className="mt-3 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-200 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AI Confidence: <strong>{aiDetected.confidence}</strong> — Form auto-filled!</span>
              </div>
              <span className="text-[10px] text-emerald-400">{aiDetected.detectedWeight}kg • {aiDetected.safeHours}h shelf-life</span>
            </div>
          )}
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Donor / Restaurant Name
              </label>
              <input
                type="text"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Pickup Address / Area
              </label>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Food Description
              </label>
              <input
                type="text"
                required
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Food Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Cooked Meals">Cooked Meals (Rice, Curry, Dal, Roti)</option>
                <option value="Bakery & Bread">Bakery & Bread (Loaves, Buns, Pastries)</option>
                <option value="Raw Produce">Raw Produce (Fruits & Vegetables)</option>
                <option value="Packaged Foods">Packaged / Canned Goods</option>
              </select>
            </div>
          </div>

          {/* Sliders: Weight & Expiry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-amber-400" /> Quantity (Weight)
                </span>
                <span className="font-mono font-bold text-amber-400">{quantityKg} kg ({Math.round(quantityKg * 2.5)} meals)</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="1"
                value={quantityKg}
                onChange={(e) => setQuantityKg(e.target.value)}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-400" /> Safe Consumption Window
                </span>
                <span className={`font-mono font-bold ${safeHoursRemaining <= 2 ? 'text-red-400' : 'text-emerald-400'}`}>
                  ⏱ {safeHoursRemaining} hours left
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="6.0"
                step="0.5"
                value={safeHoursRemaining}
                onChange={(e) => setSafeHoursRemaining(e.target.value)}
                className="w-full accent-red-400 cursor-pointer"
              />
            </div>
          </div>

          {/* HACCP Temperature & Dietary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Holding Temperature (HACCP):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={holdingTempC}
                  onChange={(e) => setHoldingTempC(e.target.value)}
                  className="w-24 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
                <span className="text-xs text-emerald-400 font-mono">
                  {holdingTempC >= 60 ? '✓ Safe Hot Holding (>60°C)' : holdingTempC <= 5 ? '✓ Safe Chilled (<5°C)' : '⚠️ Danger Zone (5-60°C)'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Emergency Dispatch Contact
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              Publish Food Surplus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
