import React, { useState } from 'react';
import { 
  BarChart3, Leaf, Droplets, Globe2, Download, 
  ShieldCheck, FileSpreadsheet, CheckCircle2, Award, Printer 
} from 'lucide-react';
import { AUDIT_TRAIL, calculateImpactMetrics, exportAuditCsv, playChime } from '../data/mockData';

export default function ESGComplianceWorkspace({ totalRescuedKg }) {
  const [auditList] = useState(AUDIT_TRAIL);
  const metrics = calculateImpactMetrics(totalRescuedKg);

  const handleExportCsv = () => {
    playChime('success');
    exportAuditCsv(auditList);
  };

  const handlePrintAudit = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Municipal ESG & Regulatory Compliance Audit Suite
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            GHG Protocol Scope 3 emissions abatement auditing, landfill methane mitigation, and UN SDG 12.3 progress accounting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export Audit (CSV)
          </button>

          <button
            onClick={handlePrintAudit}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* Top 4 ESG Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="saas-card p-4 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>GHG CO₂e Abated</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            {metrics.co2eAvoidedKg.toLocaleString()} kg
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">EPA WARM factor: 2.5 kg/kg</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Landfill Methane Saved</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
            {metrics.methaneAvoidedKg} kg CH₄
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Anaerobic decay stopped</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-950/20 to-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Virtual Water Footprint</span>
            <Droplets className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black font-mono text-teal-300 mt-1">
            {(metrics.waterLitersSaved / 1000).toFixed(1)}k Litres
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Embedded irrigation water</div>
        </div>

        <div className="saas-card p-4 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 to-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>CSR Value Unlocked</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-300 mt-1">
            ₹{metrics.totalTaxBenefitInr.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">Section 80G tax benefit</div>
        </div>
      </div>

      {/* UN Sustainable Development Goals (SDG) Alignment */}
      <div className="saas-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
          UN Sustainable Development Goals (SDG) Alignment Tracker
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-amber-400 font-mono">SDG 2: Zero Hunger</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">84% of Monthly Target</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-[84%]" />
            </div>
            <p className="text-[11px] text-slate-400">
              {metrics.meals.toLocaleString()} of 5,000 monthly target nutritious meals delivered to vulnerable urban communities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-emerald-400 font-mono">SDG 12.3: Halve Food Waste</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">92% Diversion Rate</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
            </div>
            <p className="text-[11px] text-slate-400">
              92.4% of declared edible surplus successfully rescued before expiration window closure.
            </p>
          </div>
        </div>
      </div>

      {/* Official Audit Trail Table */}
      <div className="saas-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Immutable Chain-of-Custody Audit Ledger
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">ISO 14064 & HACCP Verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Audit ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Donor & Food Description</th>
                <th className="py-3 px-4">Shelter / Recipient Hub</th>
                <th className="py-3 px-4">Weight / Portions</th>
                <th className="py-3 px-4">CO₂e Abatement</th>
                <th className="py-3 px-4">HACCP & OTP Verification</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {auditList.map((record) => (
                <tr key={record.id} className="hover:bg-slate-800/30 transition text-slate-300">
                  <td className="py-3 px-4 font-bold text-cyan-400">{record.id}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{record.timestamp}</td>
                  <td className="py-3 px-4 font-sans">
                    <div className="font-bold text-white text-xs">{record.donorName}</div>
                    <div className="text-[10px] text-slate-400">{record.foodItem}</div>
                  </td>
                  <td className="py-3 px-4 font-sans text-white font-medium">
                    {record.shelterName}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    {record.quantityKg} kg ({record.mealsRescued} meals)
                  </td>
                  <td className="py-3 px-4 font-mono text-teal-300">
                    +{record.co2eAvoidedKg} kg
                  </td>
                  <td className="py-3 px-4 text-[10px] font-sans">
                    <div className="text-emerald-400 font-bold">{record.haccpStatus}</div>
                    <div className="text-slate-400">{record.handoverVerifiedBy}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      {record.status}
                    </span>
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
