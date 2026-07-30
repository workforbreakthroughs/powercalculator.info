import React from 'react';

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Legal Agreements</span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">Terms of Service</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: July 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">1. Acceptance of Terms</h2>
        <p>By accessing powercalculator.info, you agree to be bound by these Terms of Service and all applicable electrical safety laws and regulations.</p>

        <h2 className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">2. Educational & Engineering Disclaimer</h2>
        <p>The calculators and guides provided on powercalculator.info are intended strictly for educational, informational, and preliminary planning purposes. They do not substitute for professional electrical engineering blueprints or on-site inspections by a licensed electrical contractor.</p>

        <h2 className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">3. Limitation of Liability</h2>
        <p>In no event shall powercalculator.info or its owners be liable for any damages arising out of the use or inability to use the calculation tools provided on this website.</p>
      </div>
    </div>
  );
};
