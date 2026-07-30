import React, { useState } from 'react';
import { allCalculators } from '../data/calculatorsDatabase';
import { generateCalculatorJsonLd } from '../data/seoStrategy';
import { Search, Code, CheckCircle, Cpu, FileJson, Sparkles } from 'lucide-react';

export const SeoAuditView: React.FC = () => {
  const [selectedCalcId, setSelectedCalcId] = useState(allCalculators[0].id);
  const selectedCalc = allCalculators.find((c) => c.id === selectedCalcId) || allCalculators[0];

  const coreWebVitals = [
    { metric: 'Largest Contentful Paint (LCP)', score: '0.8s', status: 'GOOD', target: '< 2.5s' },
    { metric: 'First Input Delay (FID) / INP', score: '12ms', status: 'GOOD', target: '< 100ms' },
    { metric: 'Cumulative Layout Shift (CLS)', score: '0.00', status: 'GOOD', target: '< 0.1' },
    { metric: 'Time to First Byte (TTFB)', score: '120ms', status: 'GOOD', target: '< 800ms' }
  ];

  const keywordsStrategy = [
    { keyword: 'appliance electricity cost calculator', intent: 'High Commercial', audience: 'Homeowners' },
    { keyword: 'wire size voltage drop calculator awg', intent: 'Transactional / Tool', audience: 'Electricians & Solar Installers' },
    { keyword: 'solar panel array sizing calculator', intent: 'High Commercial', audience: 'Solar DIYers & Homeowners' },
    { keyword: 'battery ah to wh calculator lifepo4', intent: 'Informational', audience: 'RV & Solar Storage' },
    { keyword: 'ohms law power triangle calculator', intent: 'Educational', audience: 'Students & Engineers' }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Technical Webmaster Console
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">
          SEO, Schema & Core Web Vitals Audit
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Real-time structured JSON-LD schema generator, Core Web Vitals performance simulator, and keyword target matrix for powercalculator.info.
        </p>
      </div>

      {/* Core Web Vitals Simulator Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-500" /> Core Web Vitals & Speed Metrics
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreWebVitals.map((cw, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="text-[11px] text-slate-500 font-semibold">{cw.metric}</div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-2xl font-black text-slate-900 font-mono">{cw.score}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">
                  {cw.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Google Threshold: {cw.target}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema.org JSON-LD Generator Tool */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-white text-base">Schema.org JSON-LD Generator</h2>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs text-slate-400 font-semibold shrink-0">Select Calculator:</label>
            <select
              value={selectedCalcId}
              onChange={(e) => setSelectedCalcId(e.target.value)}
              className="bg-slate-800 text-white border border-slate-700 text-xs rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer w-full"
            >
              {allCalculators.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-slate-300">
          Google Rich Results uses TechArticle and SoftwareApplication schema to show rich snippets in search engine result pages (SERPs).
        </p>

        <pre className="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
          {generateCalculatorJsonLd(selectedCalc)}
        </pre>
      </div>

      {/* Keyword Strategy Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-600" /> High-Volume Target Keyword Matrix
        </h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold">
              <tr>
                <th className="p-3 border-b border-slate-200">Target Keyword</th>
                <th className="p-3 border-b border-slate-200">Search Intent</th>
                <th className="p-3 border-b border-slate-200">Primary Audience</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {keywordsStrategy.map((kw, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{kw.keyword}</td>
                  <td className="p-3 font-semibold text-amber-700">{kw.intent}</td>
                  <td className="p-3 text-slate-600">{kw.audience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
