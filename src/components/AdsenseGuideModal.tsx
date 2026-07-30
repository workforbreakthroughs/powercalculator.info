import React from 'react';
import { X, DollarSign, ShieldCheck, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { adsensePlacements, adsenseComplianceChecklist } from '../data/seoStrategy';

interface AdsenseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdsenseGuideModal: React.FC<AdsenseGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-100 text-stone-800 rounded-xl border border-stone-200">
              <DollarSign className="w-6 h-6 text-stone-800" />
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-lg sm:text-xl">
                powercalculator.info Monetization & AdSense Blueprint
              </h2>
              <p className="text-xs text-stone-500">
                Product Manager, SEO Expert & AdSense Consultant Roadmap
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-sm text-stone-700">
          {/* Executive Overview */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-amber-600" /> Executive Monetization Strategy
            </h3>
            <p className="text-xs leading-relaxed text-stone-600">
              `powercalculator.info` is designed to generate sustainable, high-RPM passive revenue through Google AdSense program approval followed by targeted high-ticket affiliate marketing (Solar Kits, LiFePO4 Lithium Batteries, Pure Sine Wave Inverters, EV Chargers, and Energy Monitors).
            </p>
          </div>

          {/* AdSense Approval Readiness Checklist */}
          <div>
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Google AdSense Policy & Approval Audit
            </h3>
            <div className="space-y-2">
              {adsenseComplianceChecklist.map((chk, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border border-stone-200 bg-white shadow-2xs">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                      <span>{chk.item}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.2 rounded font-mono">{chk.status}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{chk.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High CTR Ad Placements */}
          <div>
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-amber-600" /> Optimal Ad Placement Architecture
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {adsensePlacements.map((plc, idx) => (
                <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-xs font-bold text-stone-900 mb-1">{plc.positionName}</div>
                  <div className="text-[11px] font-mono text-amber-700 font-semibold mb-1">{plc.adSize}</div>
                  <div className="text-[11px] text-stone-600 mb-1">{plc.userExperienceNote}</div>
                  <div className="text-[10px] text-emerald-800 font-semibold">Expected CTR: {plc.ctrPotential}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Rejection Causes & Prevention */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <h4 className="font-bold text-rose-900 text-xs uppercase tracking-wider mb-2">Common AdSense Rejection Pitfalls Avoided</h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-rose-800">
              <li><strong>Low Value Content:</strong> Mitigated by 100+ working formulas, step-by-step math derivations, and written guides.</li>
              <li><strong>Missing Legal Disclaimers:</strong> Included standard Privacy Policy, Terms, About, and Contact pages.</li>
              <li><strong>Poor Navigation:</strong> Filterable category directory, site search, and interactive sitemap provided.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
