import React from 'react';
import { DollarSign, ShieldAlert } from 'lucide-react';

interface InFeedAdSlotProps {
  showAdsensePreview: boolean;
  label?: string;
}

export const InFeedAdSlot: React.FC<InFeedAdSlotProps> = ({ showAdsensePreview, label = 'In-Content Result Ad' }) => {
  if (!showAdsensePreview) return null;

  return (
    <div className="my-6 p-4 bg-stone-100/80 border border-dashed border-stone-300 rounded-2xl no-print">
      <div className="flex items-center justify-between text-xs text-stone-600 mb-2 font-mono">
        <span className="flex items-center gap-1 font-semibold text-stone-800">
          <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
          AdSense Slot: {label} (300x250 Medium Rectangle or Native In-Article)
        </span>
        <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md text-[11px] font-semibold border border-emerald-200">
          High Intent Monetization Zone
        </span>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-4 text-center shadow-2xs">
        <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Sponsored Recommendation</div>
        <p className="text-xs text-stone-600">
          Contextual Ad Unit: Solar Array Kits, Heavy Duty AWG Cable Suppliers, Power Inverters, and Electrician Certifications.
        </p>
      </div>

      <div className="mt-2 text-[11px] text-stone-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-stone-400" />
          Clearly marked to comply with AdSense User Experience guidelines.
        </span>
      </div>
    </div>
  );
};
