import React from 'react';
import { Info, HelpCircle } from 'lucide-react';

interface HeaderAdBannerProps {
  showAdsensePreview: boolean;
}

export const HeaderAdBanner: React.FC<HeaderAdBannerProps> = ({ showAdsensePreview }) => {
  if (!showAdsensePreview) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-4 no-print">
      <div className="bg-stone-100/90 border border-dashed border-stone-300 rounded-xl p-3 text-center transition-all shadow-xs">
        <div className="flex items-center justify-between text-xs text-stone-800 mb-1 px-2 font-mono">
          <span className="flex items-center gap-1 font-semibold">
            <Info className="w-3.5 h-3.5 text-stone-600" />
            AdSense Slot #1: Header Leaderboard (728x90 / Responsive Display)
          </span>
          <span className="bg-stone-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-stone-800">
            Expected CTR: 1.8% - 2.5%
          </span>
        </div>

        {/* Ad Box Simulation */}
        <div className="w-full bg-white border border-stone-200 rounded-lg min-h-[90px] flex flex-col items-center justify-center py-2 px-4 text-stone-600 text-xs shadow-2xs">
          <p className="font-semibold text-stone-800">Google AdSense Automated Banner Placement</p>
          <p className="text-[11px] text-stone-500 max-w-md mt-0.5">
            Targeted ads for Solar Panels, Home Batteries, Electric Utilities & Electrical Tools will appear here.
          </p>
        </div>

        <div className="text-[11px] text-stone-600 mt-1 flex items-center justify-center gap-1">
          <HelpCircle className="w-3 h-3" />
          <span>Complies with Google AdSense quality policy: Located above fold without pushing primary content offscreen.</span>
        </div>
      </div>
    </div>
  );
};
