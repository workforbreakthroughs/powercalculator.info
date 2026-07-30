import React from 'react';
import { affiliateProducts } from '../data/affiliateData';
import { Star, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const AffiliateHubView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Hardware & Tool Recommendations
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">
          Tested Electrical & Solar Hardware Picks
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Hand-selected solar panels, LiFePO4 batteries, pure sine wave inverters, and smart panel monitors verified for performance, safety, and longevity.
        </p>
      </div>

      {/* Affiliate Disclosure Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Affiliate Disclosure:</strong> When you purchase hardware through links on powercalculator.info, we may earn an affiliate commission at no extra cost to you. This supports our free calculator engineering tools.
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {affiliateProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded">
                  {prod.badge || prod.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{prod.rating} ({prod.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-extrabold text-slate-900 text-lg leading-snug">{prod.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{prod.description}</p>

              {/* Feature Pills */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Key Hardware Highlights:</span>
                <div className="flex flex-wrap gap-1.5">
                  {prod.keyFeatures.map((feat, i) => (
                    <span key={i} className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200">
                      • {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Estimated Price</span>
                <span className="text-sm font-extrabold text-slate-900">{prod.priceEstimate}</span>
              </div>

              <a
                href={prod.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Check Retailer Price</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
