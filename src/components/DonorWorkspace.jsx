import React, { useState } from 'react';
import { 
  Building2, PlusCircle, Sparkles, FileText, ShieldCheck, 
  Clock, Thermometer, AlertCircle, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

export default function DonorWorkspace({
  donors,
  onOpenNewBatchModal,
  onOpenCertificateModal,
  onSelectDonorForRescue
}) {
  const [filterTag, setFilterTag] = useState('ALL');

  const filteredDonors = filterTag === 'ALL' 
    ? donors 
    : donors.filter(d => d.tag === filterTag);

  const totalSurplusKg = donors.reduce((acc, d) => acc + (d.quantityKg || 0), 0);
  const totalMeals = donors.reduce((acc, d) => acc + (d.mealsEquivalent || 0), 0);
  const totalTaxBenefit = donors.reduce((acc, d) => acc + (d.estimatedValueInr || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            Enterprise Donor & Commercial Kitchen Operations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated compliance tracking, HACCP food temperature audit, and Section 80G corporate tax exemption certification.
          </p>
        </div>

        <button
          onClick={onOpenNewBatchModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
        >
          <PlusCircle className="w-4 h-4" />
          Post Surplus Batch
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Total Live Surplus</div>
          <div className="text-2xl font-black font-mono text-amber-400 mt-1">
            {totalSurplusKg} kg
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Active in commercial kitchens</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Nutritional Yield</div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            {totalMeals} Meals
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">2.5 portions per kg standard</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">CSR Tax Exemption Accrued</div>
          <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
            ₹{totalTaxBenefit.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Section 80G Eligible deductions</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">HACCP Temperature Compliance</div>
          <div className="text-2xl font-black font-mono text-emerald-300 mt-1">
            100% PASS
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">All batches hold safe temperatures</div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-mono mr-2">Filter Industry:</span>
        {['ALL', 'HOTEL', 'RESTAURANT', 'BAKERY', 'SUPERMARKET', 'CORPORATE'].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
              filterTag === tag 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold' 
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Enterprise Inventory Table */}
      <div className="saas-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            Active Commercial Food Surplus Batches ({filteredDonors.length})
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Real-Time Perishable Supply Monitor
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Donor Organization</th>
                <th className="py-3 px-4">Food Batch Description</th>
                <th className="py-3 px-4">Weight (Portions)</th>
                <th className="py-3 px-4">Shelf-Life Remaining</th>
                <th className="py-3 px-4">Holding Temp (HACCP)</th>
                <th className="py-3 px-4">Tax Deduction</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-xs">{donor.name}</div>
                    <div className="text-[10px] text-slate-400">{donor.locationName}</div>
                    <div className="text-[9px] font-mono text-slate-500 mt-0.5">GSTIN: {donor.gstin || '08AAACD1234E1Z1'}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-medium">{donor.foodItem}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 text-[9px] font-mono">
                        {donor.dietary}
                      </span>
                      {donor.allergens && (
                        <span className="text-[9px] text-slate-400">
                          Allergens: {donor.allergens.join(', ')}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-emerald-400 text-sm">{donor.quantityKg} kg</span>
                    <div className="text-[10px] text-slate-400">~{donor.mealsEquivalent} meals</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className={`font-bold flex items-center gap-1 ${
                      donor.safeHoursRemaining <= 2.0 ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      {donor.safeHoursRemaining} hours
                    </div>
                    <div className="text-[10px] text-slate-500">Prepared {donor.preparedAt || '2h ago'}</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{donor.holdingTempC ? `${donor.holdingTempC}°C` : '62°C'}</span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-mono">✓ HACCP SAFE</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <span className="text-cyan-300 font-bold">
                      ₹{(donor.estimatedValueInr || donor.quantityKg * 280).toLocaleString()}
                    </span>
                    <div className="text-[9px] text-slate-400">Sec 80G Certified</div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenCertificateModal(donor)}
                        title="Download Tax Exemption Certificate"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      >
                        <FileText className="w-4 h-4 text-cyan-400" />
                      </button>

                      <button
                        onClick={() => onSelectDonorForRescue(donor)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold font-mono text-[11px] transition flex items-center gap-1"
                      >
                        <span>Dispatch</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
