import React from 'react';
import { Zap, ShieldCheck, Target, Users, BookOpen } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Company & Mission</span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">About powercalculator.info</h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          The ultimate online destination for free, instant, accurate electrical engineering, electricity bill, solar PV, battery storage, and cable sizing calculators.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-lg w-fit">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Our Core Objective</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We solve real-world energy and electrical problems rather than simply outputting raw math numbers. Every calculator provides variable explanations, step-by-step formula derivations, worked examples, and safety guidance.
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Engineering Standards</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All algorithms utilize standardized formulas from the National Electrical Code (NEC), IEEE, and standard electrical engineering textbooks to guarantee professional credibility and safety.
          </p>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-500" /> Who We Serve
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900">Homeowners & Renters</div>
            <p className="text-slate-500 mt-1">Spot high-draw appliances, calculate electric bill costs, and lower monthly power bills.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900">Electricians & Contractors</div>
            <p className="text-slate-500 mt-1">Size AWG wire gauges, verify voltage drop, breaker ratings, and conduit fill on the job site.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900">Solar & Off-Grid DIYers</div>
            <p className="text-slate-500 mt-1">Determine solar panel array wattage, battery runtime Ah/Wh, and inverter surge capacity.</p>
          </div>
        </div>
      </div>

      {/* Transparency */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 border border-slate-800 space-y-2">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" /> Editorial & Monetization Transparency
        </h3>
        <p className="text-xs leading-relaxed text-slate-300">
          powercalculator.info is 100% free to use. We support our ongoing research, formula validation, and hosting costs through non-intrusive Google AdSense advertising and affiliate partner recommendations.
        </p>
      </div>
    </div>
  );
};
