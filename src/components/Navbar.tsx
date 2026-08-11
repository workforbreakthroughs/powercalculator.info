import React, { useState } from 'react';
import { Zap, Search, Settings, Eye, BookOpen, Layers, Info, LayoutGrid, Sparkles, BatteryCharging } from 'lucide-react';
import { UserPreferences } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userPrefs: UserPreferences;
  onOpenRateModal: () => void;
  onOpenAdsenseModal: () => void;
  onToggleAdsensePreview: () => void;
  onSelectPowerPlanner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  userPrefs,
  onOpenRateModal,
  onOpenAdsenseModal,
  onToggleAdsensePreview,
  onSelectPowerPlanner,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('directory');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 text-stone-800 shadow-xs no-print">
      {/* Top Utility Bar */}
      <div className="bg-stone-100 text-stone-600 text-xs py-1.5 px-4 border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-stone-900 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" /> powercalculator.info
            </span>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="hidden sm:inline text-stone-500">Free Electrical & Solar Engineering Tools</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Local Electricity Rate Pill */}
            <button
              onClick={onOpenRateModal}
              className="flex items-center gap-1.5 bg-white hover:bg-stone-50 text-stone-800 px-2.5 py-1 rounded-md border border-stone-200 transition text-xs font-medium cursor-pointer shadow-2xs"
              title="Click to customize electricity rate and currency"
            >
              <Settings className="w-3 h-3 text-stone-500" />
              <span>Rate: <strong className="text-stone-900">{userPrefs.currencySymbol}{userPrefs.electricityRate.toFixed(2)}/kWh</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentView('home');
            setSelectedCategory(null);
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-stone-900 transition-colors">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="font-bold text-xl tracking-tight text-stone-900 flex items-center gap-0.5">
              PowerCalculator<span className="text-stone-400">.info</span>
            </div>
            <div className="text-[11px] text-stone-500 tracking-wide font-medium">Electrical & Power Calculation Engine</div>
          </div>
        </button>

        {/* Global Instant Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search 100+ calculators (e.g. wire size, battery Ah, AC BTU)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-full py-2 pl-9 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:bg-white transition"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => {
              if (onSelectPowerPlanner) onSelectPowerPlanner();
              else setCurrentView('calculator');
            }}
            className="px-3 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold shadow-sm"
          >
            <Zap className="w-4 h-4 fill-current text-slate-950" />
            <span>Power Planner</span>
          </button>

          <button
            onClick={() => setCurrentView('battery-life-calculator')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer font-bold ${
              currentView === 'battery-life-calculator'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'bg-slate-900 text-amber-400 hover:bg-slate-800'
            }`}
          >
            <BatteryCharging className="w-4 h-4 text-amber-400" />
            <span>Battery Life</span>
          </button>

          <button
            onClick={() => { setCurrentView('directory'); setSelectedCategory(null); }}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              currentView === 'directory' ? 'bg-stone-800 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Calculators</span>
          </button>

          <button
            onClick={() => setCurrentView('categories')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              currentView === 'categories' ? 'bg-stone-800 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setCurrentView('articles')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              currentView === 'articles' ? 'bg-stone-800 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Guides & Articles</span>
          </button>

          <button
            onClick={() => setCurrentView('affiliates')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              currentView === 'affiliates' ? 'bg-stone-800 text-white font-semibold' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Gear Picks</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-stone-100 text-stone-600 hover:text-stone-900 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className="w-full h-0.5 bg-current rounded"></span>
            <span className="w-full h-0.5 bg-current rounded"></span>
            <span className="w-full h-0.5 bg-current rounded"></span>
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-t border-stone-200 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-lg py-2 pl-9 pr-4 text-sm text-stone-900"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            <button
              onClick={() => {
                if (onSelectPowerPlanner) onSelectPowerPlanner();
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-left flex items-center gap-2 col-span-2"
            >
              <Zap className="w-4 h-4 fill-current text-slate-950" />
              <span>Launch Power Planner Tool</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('battery-life-calculator');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-900 text-amber-400 font-bold text-left flex items-center gap-2 col-span-2"
            >
              <BatteryCharging className="w-4 h-4 text-amber-400" />
              <span>Battery Life Calculator</span>
            </button>

            <button
              onClick={() => { setCurrentView('directory'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 text-left font-medium flex items-center gap-2"
            >
              <LayoutGrid className="w-4 h-4 text-stone-700" />
              <span>Calculators</span>
            </button>

            <button
              onClick={() => { setCurrentView('categories'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 text-left font-medium flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-stone-700" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => { setCurrentView('articles'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 text-left font-medium flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-stone-700" />
              <span>Articles</span>
            </button>

            <button
              onClick={() => { setCurrentView('affiliates'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 text-left font-medium flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-stone-700" />
              <span>Gear Picks</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
