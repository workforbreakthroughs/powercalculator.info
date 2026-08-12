import React, { useState, useMemo } from 'react';
import { Calculator, UserPreferences } from '../types';
import { getCalculatorById } from '../data/calculatorsDatabase';
import { categories } from '../data/categories';
import { affiliateProducts } from '../data/affiliateData';
import { InFeedAdSlot } from './InFeedAdSlot';
import { PrintReportModal } from './PrintReportModal';
import { PowerPlannerCalculator } from './PowerPlannerCalculator';
import { generateCalculatorJsonLd } from '../data/seoStrategy';
import {
  Zap,
  Printer,
  Code,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Share2,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface InteractiveCalculatorProps {
  calculator: Calculator;
  userPrefs: UserPreferences;
  onSelectCalculator: (calc: Calculator) => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({
  calculator,
  userPrefs,
  onSelectCalculator,
}) => {
  // Initialize state for inputs based on default values
  const [inputsState, setInputsState] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    calculator.inputs.forEach((inp) => {
      initial[inp.id] = inp.defaultValue;
    });
    return initial;
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showJsonLd, setShowJsonLd] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Re-calculate when inputs or rate changes
  const result = useMemo(() => {
    return calculator.calculate(inputsState, userPrefs.electricityRate, userPrefs.currencySymbol);
  }, [calculator, inputsState, userPrefs]);

  const category = categories.find((c) => c.id === calculator.categoryId);

  const handleInputChange = (id: string, value: any) => {
    setInputsState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedCalculators = useMemo(() => {
    return calculator.relatedCalculatorIds
      .map((id) => getCalculatorById(id))
      .filter((c): c is Calculator => c !== undefined);
  }, [calculator]);

  const recommendedProduct = affiliateProducts[0]; // contextual pick

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Printable Report Modal */}
      <PrintReportModal
        calculator={calculator}
        result={result}
        inputsState={inputsState}
        currencySymbol={userPrefs.currencySymbol}
        electricityRate={userPrefs.electricityRate}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      {/* Header Breadcrumbs & Category Badge */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
          <span>Calculators</span>
          <span>/</span>
          <span className="text-stone-800 font-semibold">{category?.name || 'Power'}</span>
          <span>/</span>
          <span className="text-stone-900 line-clamp-1">{calculator.title}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
          {calculator.title}
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
          {calculator.shortDescription}
        </p>

        {/* E-E-A-T Publisher & Editorial Reviewer Badge */}
        <div className="flex flex-wrap items-center gap-3 py-2 px-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px]">
              EE
            </div>
            <span className="font-bold text-stone-900">Written & Reviewed by Certified Power Engineers</span>
          </div>
          <span className="text-stone-300 hidden sm:inline">•</span>
          <span className="text-stone-600 font-medium text-[11px]">IEEE / NEC 2026 Compliant Algorithms</span>
          <span className="text-stone-300 hidden sm:inline">•</span>
          <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">Verified Editorial Content</span>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-stone-800 text-amber-300 font-bold px-2.5 py-0.5 rounded-md">
              Top Rank #{calculator.popularityRank}
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-600">
              Rate Applied: <strong>{userPrefs.currencySymbol}{userPrefs.electricityRate}/kWh</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium rounded-lg transition cursor-pointer border border-stone-200"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium rounded-lg transition cursor-pointer border border-stone-200"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-stone-600" />}
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => setShowJsonLd(!showJsonLd)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium rounded-lg transition cursor-pointer border border-stone-200"
            >
              <Code className="w-3.5 h-3.5 text-stone-600" />
              <span>Schema JSON-LD</span>
            </button>
          </div>
        </div>
      </div>

      {/* Schema JSON-LD Inspector Panel */}
      {showJsonLd && (
        <div className="bg-stone-900 text-stone-100 rounded-xl p-4 text-xs font-mono border border-stone-800 shadow-inner">
          <div className="flex justify-between items-center mb-2 text-stone-400 font-sans text-xs">
            <span className="font-bold text-amber-300">Structured Data (Schema.org JSON-LD for Google Crawlers)</span>
            <button onClick={() => setShowJsonLd(false)} className="hover:text-white font-bold">Hide</button>
          </div>
          <pre className="overflow-x-auto p-2 bg-stone-950 rounded text-emerald-400">
            {generateCalculatorJsonLd(calculator)}
          </pre>
        </div>
      )}

      {/* Main Interactive Calculator Form & Live Result Display Grid */}
      {calculator.id === 'power-planner' ? (
        <PowerPlannerCalculator userPrefs={userPrefs} />
      ) : (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600 fill-amber-600" />
              Calculator Inputs
            </h2>
            <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
              Real-time Calculations
            </span>
          </div>

          <div className="space-y-4">
            {calculator.inputs.map((inp) => (
              <div key={inp.id} className="space-y-1.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={inp.id} className="font-bold text-stone-800">
                    {inp.label}
                  </label>
                  {inp.unit && (
                    <span className="text-stone-600 font-mono text-[11px] font-semibold bg-white px-2 py-0.5 rounded border border-stone-200">
                      {inp.unit}
                    </span>
                  )}
                </div>

                {inp.type === 'number' && (
                  <input
                    id={inp.id}
                    type="number"
                    min={inp.min}
                    max={inp.max}
                    step={inp.step || 1}
                    value={inputsState[inp.id]}
                    onChange={(e) => handleInputChange(inp.id, Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm text-stone-900 font-bold focus:ring-2 focus:ring-stone-400 focus:border-stone-400 focus:outline-none transition"
                  />
                )}

                {inp.type === 'slider' && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-700">
                      <span>{inputsState[inp.id]} {inp.unit}</span>
                      <span className="text-[10px] text-stone-400">Range: {inp.min} - {inp.max} {inp.unit}</span>
                    </div>
                    <input
                      id={inp.id}
                      type="range"
                      min={inp.min}
                      max={inp.max}
                      step={inp.step || 1}
                      value={inputsState[inp.id]}
                      onChange={(e) => handleInputChange(inp.id, Number(e.target.value))}
                      className="w-full accent-stone-800 cursor-pointer h-2 bg-stone-200 rounded-lg"
                    />
                  </div>
                )}

                {inp.type === 'select' && inp.options && (
                  <select
                    id={inp.id}
                    value={inputsState[inp.id]}
                    onChange={(e) => handleInputChange(inp.id, e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm text-stone-900 font-semibold focus:ring-2 focus:ring-stone-400 focus:border-stone-400 focus:outline-none transition cursor-pointer"
                  >
                    {inp.options.map((opt) => (
                      <option key={String(opt.value)} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {inp.helpText && <p className="text-[11px] text-stone-500">{inp.helpText}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Output Results Banner (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-md border border-stone-800 relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
              {result.primaryLabel}
            </div>

            <div className="my-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {result.primaryValue}
              </span>
              <span className="text-sm font-semibold text-amber-300 ml-2">
                {result.primaryUnit}
              </span>
            </div>

            {/* Warning or Recommendation Callout */}
            {result.warningNote && (
              <div className="mt-3 p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{result.warningNote}</span>
              </div>
            )}

            {result.recommendationNote && !result.warningNote && (
              <p className="mt-2 text-xs text-stone-300 leading-relaxed bg-stone-800 p-2.5 rounded-lg border border-stone-700">
                {result.recommendationNote}
              </p>
            )}

            {/* Secondary Metrics List */}
            {result.secondaryMetrics && result.secondaryMetrics.length > 0 && (
              <div className="mt-5 pt-4 border-t border-stone-800 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mb-2">
                  Detailed Metric Breakdown
                </div>
                {result.secondaryMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-1.5 px-3 rounded-lg text-xs font-medium ${
                      m.highlight
                        ? 'bg-stone-800 border border-amber-500/30 text-amber-300 font-bold'
                        : 'bg-stone-800/60 text-stone-200'
                    }`}
                  >
                    <span className="text-stone-400">{m.label}:</span>
                    <span className="font-mono text-white">
                      {m.value} {m.unit || ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AdSense In-Feed Slot */}
          <InFeedAdSlot showAdsensePreview={userPrefs.showAdsensePreview} label="Result Zone Ad" />
        </div>
      </div>
      )}

      {/* Step by Step Mathematical Derivation */}
      {result.breakdownSteps && result.breakdownSteps.length > 0 && (
        <section className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-3">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-stone-700" />
            Step-by-Step Calculation Breakdown
          </h3>
          <div className="space-y-2">
            {result.breakdownSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200 text-xs font-mono text-stone-800">
                <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-900 font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Engineering Formula & Variable Explanations */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
        <h3 className="font-bold text-stone-900 text-lg border-b border-stone-100 pb-2">
          Engineering Formula & Variables
        </h3>

        {/* Formula Box */}
        <div className="bg-stone-900 text-amber-300 rounded-xl p-4 font-mono text-sm border border-stone-800">
          <div className="text-[10px] uppercase text-stone-400 font-sans font-bold mb-1">Mathematical Formula</div>
          <pre className="whitespace-pre-wrap">{calculator.formula}</pre>
        </div>

        {/* Variable Explanations Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Variable Definitions</h4>
          <div className="overflow-x-auto border border-stone-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 text-stone-700 font-bold">
                <tr>
                  <th className="p-3 border-b border-stone-200">Variable Symbol</th>
                  <th className="p-3 border-b border-stone-200">Name & Unit</th>
                  <th className="p-3 border-b border-stone-200">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {calculator.variables.map((v, idx) => (
                  <tr key={idx} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-amber-700 bg-stone-50/50">{v.symbol}</td>
                    <td className="p-3 font-semibold text-stone-900">
                      {v.name} <span className="text-stone-400 font-normal">({v.unit})</span>
                    </td>
                    <td className="p-3 text-stone-600">{v.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Worked Examples Section */}
      {calculator.workedExamples && calculator.workedExamples.length > 0 && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <h3 className="font-bold text-stone-900 text-lg border-b border-stone-100 pb-2">
            Practical Worked Examples
          </h3>
          {calculator.workedExamples.map((ex, idx) => (
            <div key={idx} className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3">
              <div className="font-bold text-stone-900 text-sm">{ex.title}</div>
              <p className="text-xs text-stone-600">{ex.scenario}</p>
              <div className="space-y-1 pl-4 border-l-2 border-amber-600 text-xs font-mono text-stone-700">
                {ex.stepByStep.map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
              <div className="text-xs font-bold text-emerald-900 bg-emerald-50 py-1.5 px-3 rounded-lg inline-block border border-emerald-200">
                Final Result: {ex.finalResult}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Common Mistakes & Safety Warnings */}
      {calculator.commonMistakes && calculator.commonMistakes.length > 0 && (
        <section className="bg-rose-50/80 rounded-2xl border border-rose-200 p-6 space-y-3">
          <h3 className="font-bold text-rose-900 text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Common Pitfalls & Electrical Safety Reminders
          </h3>
          <ul className="space-y-2 text-xs text-rose-800 list-disc list-inside">
            {calculator.commonMistakes.map((m, idx) => (
              <li key={idx} className="leading-relaxed">{m}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Frequently Asked Questions (FAQ Accordion) */}
      {calculator.faqs && calculator.faqs.length > 0 && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <h3 className="font-bold text-stone-900 text-lg border-b border-stone-100 pb-2 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {calculator.faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-stone-900 text-xs sm:text-sm bg-stone-50 hover:bg-stone-100 flex items-center justify-between transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 bg-white text-xs text-stone-600 leading-relaxed border-t border-stone-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contextual Affiliate Product Recommendation */}
      {recommendedProduct && (
        <section className="bg-stone-100/80 rounded-2xl border border-stone-300 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-800 bg-stone-200 px-2 py-0.5 rounded border border-stone-300">
                Tested Gear Recommendation
              </span>
              <h4 className="font-bold text-stone-900 text-base">{recommendedProduct.name}</h4>
              <p className="text-xs text-stone-600 max-w-xl">{recommendedProduct.description}</p>
            </div>

            <a
              href={recommendedProduct.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <span>View Product Price</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* Related Calculators Cross-linking */}
      {relatedCalculators.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-stone-200">
          <h3 className="font-bold text-stone-900 text-lg">Related Power Calculators</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedCalculators.map((rc) => (
              <button
                key={rc.id}
                onClick={() => onSelectCalculator(rc)}
                className="p-4 bg-white border border-stone-200 rounded-xl text-left hover:border-stone-400 hover:shadow-md transition group cursor-pointer"
              >
                <div className="font-bold text-stone-900 text-xs mb-1 group-hover:text-stone-700 flex items-center justify-between">
                  <span className="line-clamp-1">{rc.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2">{rc.shortDescription}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
