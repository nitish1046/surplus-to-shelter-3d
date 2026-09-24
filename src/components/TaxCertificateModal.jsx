import React from 'react';
import { Award, Printer, ShieldCheck, X } from 'lucide-react';
import { playChime } from '../data/mockData';

export default function TaxCertificateModal({ isOpen, onClose, donor }) {
  if (!isOpen || !donor) return null;

  const certNumber = `CSR-80G-${donor.id.toUpperCase()}-${new Date().getFullYear()}`;
  const valuation = donor.estimatedValueInr || donor.quantityKg * 280;

  const handlePrint = () => {
    playChime('success');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-amber-500/50 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 print:hidden">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Award className="w-4 h-4" /> Official CSR & Tax Benefit Receipt
          </span>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Official Certificate Body */}
        <div className="my-4 p-8 bg-slate-950 border-2 border-amber-500/40 rounded-xl relative overflow-hidden text-slate-200">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="text-8xl font-black uppercase text-amber-400 transform -rotate-12">
              VERIFIED 80G
            </span>
          </div>

          <div className="text-center pb-6 border-b border-slate-800 space-y-1">
            <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
              Government of Rajasthan • Urban Food Rescue Network
            </div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">
              Certificate of Food Rescue & CSR Donation
            </h1>
            <div className="text-xs font-mono text-slate-400">
              Under Income Tax Act Section 80G / CSR Food Security Mandate
            </div>
          </div>

          <div className="my-6 space-y-4 text-xs font-sans">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-mono">Certificate Identifier:</span>
              <span className="font-mono font-bold text-amber-300">{certNumber}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-mono">Donor Corporate Entity:</span>
              <span className="font-bold text-white text-sm">{donor.name}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-mono">Entity GSTIN:</span>
              <span className="font-mono text-slate-300">{donor.gstin || '08AAACD1234E1Z1'}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-mono">Rescued Commodity:</span>
              <span className="text-slate-200 font-medium">{donor.foodItem} ({donor.quantityKg} kg)</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-mono">Nutritional Equivalent:</span>
              <span className="font-mono font-bold text-emerald-400">
                {donor.mealsEquivalent || Math.round(donor.quantityKg * 2.5)} Balanced Meals
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 font-mono">Assessed Fair Valuation:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                ₹{valuation.toLocaleString()} INR
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-mono">HACCP Cold-Chain Inspection:</span>
              <span className="font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> PASSED ({donor.holdingTempC || 62}°C verified)
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-end justify-between text-[11px] font-mono">
            <div>
              <div className="w-16 h-16 rounded-xl border border-dashed border-amber-500/40 flex items-center justify-center p-1 bg-amber-950/20 text-center">
                <span className="text-[8px] text-amber-400 font-bold uppercase">
                  MUNICIPAL DIGITAL SEAL
                </span>
              </div>
              <div className="text-slate-500 text-[9px] mt-1">Ref: {certNumber}</div>
            </div>

            <div className="text-right">
              <div className="font-bold text-white">Chief Logistics Officer</div>
              <div className="text-slate-400 text-[10px]">Urban Food Rescue Directorate</div>
              <div className="text-[9px] text-emerald-400 mt-1">Digitally Signed & Timestamped</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between print:hidden">
          <span className="text-[11px] text-slate-400 font-mono">
            Directly admissible for corporate tax and ESG filing.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
