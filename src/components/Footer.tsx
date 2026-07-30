import React from 'react';
import { Zap, ShieldCheck, FileText, Mail, Lock, HelpCircle } from 'lucide-react';
import { categories } from '../data/categories';

interface FooterProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (catId: string | null) => void;
  onOpenAdsenseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentView,
  setSelectedCategory,
  onOpenAdsenseModal,
}) => {
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentView('directory');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 pt-12 pb-12 px-4 mt-16 no-print text-xs">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-700 flex items-center justify-center text-white font-bold">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div className="font-extrabold text-lg text-white tracking-tight">
                powercalculator<span className="text-stone-400">.info</span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm text-xs">
              The internet’s authoritative resource for free electrical power, electricity cost, solar array sizing, battery capacity, wire gauge, and inverter engineering calculations. Built for homeowners, electricians, solar installers, and engineers worldwide.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Google AdSense & Webmaster Quality Verified</span>
            </div>
          </div>

          {/* Calculator Categories Col */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Popular Categories</h4>
            <ul className="space-y-1 text-stone-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources Col */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Resources & Gear</h4>
            <ul className="space-y-1 text-stone-400">
              <li>
                <button
                  onClick={() => handleNavigate('directory')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center"
                >
                  All 100+ Calculators
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('articles')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center"
                >
                  Electrical Guides & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('affiliates')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center"
                >
                  Recommended Solar & Power Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('sitemap')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center"
                >
                  Interactive Sitemap Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('seo-audit')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center"
                >
                  SEO & Schema Markup Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company Col */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Legal & Company</h4>
            <ul className="space-y-1 text-stone-400">
              <li>
                <button
                  onClick={() => handleNavigate('about')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0" /> About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('privacy')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0" /> Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('terms')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0" /> Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('contact')}
                  className="w-full text-left py-1.5 px-1 hover:text-amber-400 active:text-amber-300 transition cursor-pointer touch-manipulation text-stone-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" /> Contact & Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 text-[11px] text-stone-400 space-y-1">
          <p className="font-bold text-stone-300 uppercase tracking-wider text-[10px]">Engineering & Educational Disclaimer</p>
          <p>
            The calculations, formulas, and estimates provided by powercalculator.info are for informational and planning purposes only. Always consult a licensed electrician or certified engineer before installing high-voltage electrical wiring, subpanels, or utility grid solar connections to ensure compliance with local electrical codes (e.g. NEC, IEC).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} powercalculator.info. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-stone-500">
            <span>Crafted with mathematical precision for fast, accessible calculations.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
