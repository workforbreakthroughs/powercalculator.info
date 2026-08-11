import React from 'react';
import { categories } from '../data/categories';
import { allCalculators } from '../data/calculatorsDatabase';
import { articlesDatabase } from '../data/articlesDatabase';
import { Calculator } from '../types';
import { Map, Zap, BookOpen, Layers } from 'lucide-react';

interface SitemapViewProps {
  onSelectCalculator: (calc: Calculator) => void;
  onSelectArticle: (slug: string) => void;
  setCurrentView: (view: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({
  onSelectCalculator,
  onSelectArticle,
  setCurrentView,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider mb-1">
          <Map className="w-4 h-4 text-amber-700" /> Comprehensive Index
        </div>
        <h1 className="text-3xl font-black text-stone-900">
          powercalculator.info Sitemap & Directory Index
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Complete index of all {allCalculators.length}+ free interactive electrical, solar, battery, inverter, and power calculation tools for search indexing and fast navigation.
        </p>
      </div>

      {/* Main Pages Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-600" /> Core Navigation Pages
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 text-xs font-medium text-stone-700">
          <button onClick={() => setCurrentView('home')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            Home Page
          </button>
          <button onClick={() => setCurrentView('battery-life-calculator')} className="p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg text-left text-amber-900 font-extrabold transition">
            🔋 Battery Life Calculator (Flagship)
          </button>
          <button onClick={() => setCurrentView('directory')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            All Calculators Directory (100+)
          </button>
          <button onClick={() => setCurrentView('categories')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            Category Browser
          </button>
          <button onClick={() => setCurrentView('articles')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            Educational Articles & Guides
          </button>
          <button onClick={() => setCurrentView('affiliates')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            Recommended Electrical & Solar Gear
          </button>
          <button onClick={() => setCurrentView('about')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            About powercalculator.info
          </button>
          <button onClick={() => setCurrentView('privacy')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            Privacy Policy & AdSense Disclaimers
          </button>
          <button onClick={() => setCurrentView('contact')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            Contact & Support
          </button>
          <button onClick={() => setCurrentView('seo-audit')} className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left hover:text-stone-900 font-bold transition">
            SEO & Schema Audit Console
          </button>
        </div>
      </div>

      {/* Categorized Calculators Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-stone-700" /> Calculators by Category
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const calcs = allCalculators.filter((c) => c.categoryId === cat.id);
            return (
              <div key={cat.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h3 className="font-bold text-stone-900 text-sm">{cat.name}</h3>
                  <span className="text-[11px] font-mono text-stone-400 font-bold">{calcs.length} tools</span>
                </div>
                <ul className="space-y-1.5 text-xs">
                  {calcs.map((calc) => (
                    <li key={calc.id}>
                      <button
                        onClick={() => onSelectCalculator(calc)}
                        className="text-stone-700 hover:text-amber-800 hover:underline text-left block line-clamp-1"
                      >
                        • {calc.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Articles Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" /> Educational Articles & Guides
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {articlesDatabase.map((art) => (
            <button
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 rounded-lg text-left text-xs transition"
            >
              <div className="font-bold text-slate-900 line-clamp-1">{art.title}</div>
              <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{art.summary}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
