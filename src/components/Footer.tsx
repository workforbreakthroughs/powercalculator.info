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
  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 pt-12 pb-8 px-4 mt-16 no-print text-xs">
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
            <ul className="space-y-2 text-stone-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentView('directory');
                    }}
                    className="hover:text-amber-400 transition text-left cursor-pointer"
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
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => setCurrentView('directory')} className="hover:text-amber-400 transition cursor-pointer">
                  All 100+ Calculators
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('articles')} className="hover:text-amber-400 transition cursor-pointer">
                  Electrical Guides & Articles
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('affiliates')} className="hover:text-amber-400 transition cursor-pointer">
                  Recommended Solar & Power Gear
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('sitemap')} className="hover:text-amber-400 transition cursor-pointer">
                  Interactive Sitemap Index
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('seo-audit')} className="hover:text-amber-400 transition cursor-pointer">
                  SEO & Schema Markup Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & AdSense Col */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Legal & Company</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1">
                  <FileText className="w-3 h-3 text-stone-500" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('privacy')} className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1">
                  <Lock className="w-3 h-3 text-stone-500" /> Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('terms')} className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1">
                  <FileText className="w-3 h-3 text-stone-500" /> Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1">
                  <Mail className="w-3 h-3 text-stone-500" /> Contact & Support
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
