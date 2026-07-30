import React, { useState } from 'react';
import { X, DollarSign, Globe, Check } from 'lucide-react';
import { UserPreferences } from '../types';

interface RateSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPrefs: UserPreferences;
  onSavePrefs: (newPrefs: UserPreferences) => void;
}

export const RateSettingsModal: React.FC<RateSettingsModalProps> = ({
  isOpen,
  onClose,
  userPrefs,
  onSavePrefs,
}) => {
  const [rate, setRate] = useState(userPrefs.electricityRate);
  const [currencySymbol, setCurrencySymbol] = useState(userPrefs.currencySymbol);

  if (!isOpen) return null;

  const presets = [
    { label: 'US Average', rate: 0.16, symbol: '$' },
    { label: 'California, US', rate: 0.32, symbol: '$' },
    { label: 'United Kingdom', rate: 0.28, symbol: '£' },
    { label: 'European Union', rate: 0.30, symbol: '€' },
    { label: 'Australia', rate: 0.35, symbol: 'A$' },
    { label: 'Canada', rate: 0.18, symbol: 'C$' },
    { label: 'India', rate: 8.00, symbol: '₹' },
  ];

  const handleSave = () => {
    onSavePrefs({
      ...userPrefs,
      electricityRate: Number(rate) || 0.16,
      currencySymbol: currencySymbol,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-stone-100 text-stone-800 rounded-lg border border-stone-200">
              <DollarSign className="w-5 h-5 text-stone-700" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Custom Electricity Rate Settings</h3>
              <p className="text-xs text-stone-500">All cost calculations will adjust instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency & Rate Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Currency Symbol</label>
            <div className="flex gap-2">
              {['$', '€', '£', '₹', 'A$', 'C$'].map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => setCurrencySymbol(sym)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition cursor-pointer ${
                    currencySymbol === sym
                      ? 'bg-stone-800 text-white border-stone-900'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Electricity Utility Rate ({currencySymbol} / kWh)
            </label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 font-bold focus:ring-2 focus:ring-stone-400 focus:outline-none"
            />
          </div>

          {/* Regional Presets */}
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-2 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Regional Average Presets:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setRate(p.rate);
                    setCurrencySymbol(p.symbol);
                  }}
                  className="p-2 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-left text-xs transition cursor-pointer"
                >
                  <div className="font-semibold text-stone-800">{p.label}</div>
                  <div className="text-amber-700 font-mono font-bold">{p.symbol}{p.rate} / kWh</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-900 text-white flex items-center gap-1 shadow-xs"
          >
            <Check className="w-4 h-4 text-amber-300" /> Save Rate Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
