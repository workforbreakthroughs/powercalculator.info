import React from 'react';
import { Calculator, CalculationResult } from '../types';
import { Printer, Download, Zap, X } from 'lucide-react';

interface PrintReportModalProps {
  calculator: Calculator;
  result: CalculationResult;
  inputsState: Record<string, any>;
  currencySymbol: string;
  electricityRate: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  calculator,
  result,
  inputsState,
  currencySymbol,
  electricityRate,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-stone-200 relative my-8">
        {/* Modal Controls (Hidden in Print) */}
        <div className="no-print flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-stone-900 text-lg">Engineering & Calculation Summary Report</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-600 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print Document Content */}
        <div id="printable-area" className="space-y-6 text-stone-900">
          {/* Document Header */}
          <div className="flex items-center justify-between border-b-2 border-stone-900 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center font-bold text-amber-300">
                <Zap className="w-5 h-5 fill-amber-300 text-stone-800" />
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight text-stone-900">PowerCalculator.info</div>
                <div className="text-xs text-stone-500 font-medium">Verified Electrical & Solar Power Report</div>
              </div>
            </div>
            <div className="text-right text-xs text-stone-500">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Rate: {currencySymbol}{electricityRate}/kWh</div>
            </div>
          </div>

          {/* Calculator Title */}
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Report Subject</span>
            <h1 className="text-2xl font-black text-stone-900 mt-0.5">{calculator.title}</h1>
            <p className="text-xs text-stone-600 mt-1">{calculator.shortDescription}</p>
          </div>

          {/* Key Calculated Output Banner */}
          <div className="bg-stone-100 border-2 border-stone-300 rounded-xl p-5 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-700">{result.primaryLabel}</div>
            <div className="text-3xl font-black text-stone-900 my-1">
              {result.primaryValue} <span className="text-base font-bold text-amber-700">{result.primaryUnit}</span>
            </div>
            {result.recommendationNote && (
              <p className="text-xs font-medium text-stone-800 mt-2 bg-stone-200/80 py-1 px-3 rounded-lg inline-block">
                {result.recommendationNote}
              </p>
            )}
          </div>

          {/* Input Parameters Table */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 border-b border-stone-200 pb-1 mb-2">User Input Parameters</h3>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700">
                  <th className="p-2 border border-stone-200">Parameter</th>
                  <th className="p-2 border border-stone-200">Value Configured</th>
                </tr>
              </thead>
              <tbody>
                {calculator.inputs.map((inp) => (
                  <tr key={inp.id} className="border-b border-slate-200">
                    <td className="p-2 font-medium text-slate-700">{inp.label}</td>
                    <td className="p-2 font-bold text-slate-900">
                      {inputsState[inp.id]} {inp.unit || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Secondary Metrics */}
          {result.secondaryMetrics && result.secondaryMetrics.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2">Calculated Engineering Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                {result.secondaryMetrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-[11px] text-slate-500 font-medium">{m.label}</div>
                    <div className="text-sm font-bold text-slate-900">
                      {m.value} {m.unit || ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step by Step Math */}
          {result.breakdownSteps && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2">Step-by-Step Mathematical Derivation</h3>
              <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                {result.breakdownSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Formula Reference */}
          <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
            <div>Formula Used: <code className="font-mono text-slate-800">{calculator.formula.split('\n')[0]}</code></div>
            <div>Generated via powercalculator.info</div>
          </div>
        </div>
      </div>
    </div>
  );
};
