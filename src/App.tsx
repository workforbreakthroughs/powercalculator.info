import React, { useState, useMemo, useEffect } from 'react';
import { UserPreferences, Calculator, TargetAudience } from './types';
import { allCalculators, getCalculatorsByCategory } from './data/calculatorsDatabase';
import { categories } from './data/categories';
import { articlesDatabase } from './data/articlesDatabase';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeaderAdBanner } from './components/HeaderAdBanner';
import { CalculatorCard } from './components/CalculatorCard';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { QuickApplianceShortcuts } from './components/QuickApplianceShortcuts';
import { SearchAndFilter } from './components/SearchAndFilter';
import { RateSettingsModal } from './components/RateSettingsModal';
import { AdsenseGuideModal } from './components/AdsenseGuideModal';
import { SitemapView } from './components/SitemapView';

import { AboutView } from './pages/AboutView';
import { PrivacyView } from './pages/PrivacyView';
import { TermsView } from './pages/TermsView';
import { ContactView } from './pages/ContactView';
import { SeoAuditView } from './pages/SeoAuditView';
import { ArticlesView } from './pages/ArticlesView';
import { AffiliateHubView } from './pages/AffiliateHubView';

import { Zap, Sparkles, ArrowRight, ShieldCheck, Layers, BookOpen, Search, Star } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeCalculator, setActiveCalculator] = useState<Calculator | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Auto scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<TargetAudience | 'All'>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'alphabetical' | 'category'>('popular');

  // Modal Controls
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isAdsenseModalOpen, setIsAdsenseModalOpen] = useState(false);

  // User Preferences
  const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    currencySymbol: '$',
    currencyCode: 'USD',
    electricityRate: 0.16,
    unitSystem: 'imperial',
    showAdsensePreview: false,
  });

  const handleToggleAdsensePreview = () => {
    setUserPrefs((prev) => ({
      ...prev,
      showAdsensePreview: !prev.showAdsensePreview,
    }));
  };

  const handleSelectCalculator = (calc: Calculator) => {
    setActiveCalculator(calc);
    setCurrentView('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectApplianceShortcut = (wattage: number, hours: number, name: string) => {
    const applianceCalc = allCalculators.find((c) => c.id === 'appliance-electricity-cost') || allCalculators[0];
    const calcCopy: Calculator = {
      ...applianceCalc,
      inputs: applianceCalc.inputs.map((inp) => {
        if (inp.id === 'wattage') return { ...inp, defaultValue: wattage };
        if (inp.id === 'hoursPerDay') return { ...inp, defaultValue: hours };
        return inp;
      }),
    };
    setActiveCalculator(calcCopy);
    setCurrentView('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Calculators Computation
  const filteredCalculators = useMemo(() => {
    return allCalculators.filter((calc) => {
      // Category filter
      if (selectedCategory && calc.categoryId !== selectedCategory) return false;

      // Target Audience filter
      if (selectedAudience !== 'All' && !calc.targetAudience.includes(selectedAudience)) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = calc.title.toLowerCase().includes(q);
        const matchesDesc = calc.shortDescription.toLowerCase().includes(q);
        const matchesTags = calc.tags.some((t) => t.toLowerCase().includes(q));
        const matchesKeywords = calc.searchKeywords.some((k) => k.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesTags || matchesKeywords;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return a.popularityRank - b.popularityRank;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'category') return a.categoryId.localeCompare(b.categoryId);
      return 0;
    });
  }, [selectedCategory, selectedAudience, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userPrefs={userPrefs}
        onOpenRateModal={() => setIsRateModalOpen(true)}
        onOpenAdsenseModal={() => setIsAdsenseModalOpen(true)}
        onToggleAdsensePreview={handleToggleAdsensePreview}
      />

      {/* Header AdSense Leaderboard Banner */}
      <HeaderAdBanner showAdsensePreview={userPrefs.showAdsensePreview} />

      {/* Main Page Router View Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute -top-12 -right-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-3xl space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>100+ Free Electrical, Solar & Power Calculators</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                  Fast, Precise & Verified <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                    Power & Electrical Calculations
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Calculate appliance electricity bills, size rooftop solar arrays, compute battery runtime, determine AWG wire gauge voltage drop, and select pure sine inverters. Built on NEC standards.
                </p>

                {/* Hero Search Input */}
                <div className="pt-2">
                  <div className="relative max-w-xl">
                    <input
                      type="text"
                      placeholder="Search calculator by keyword (e.g., 1500w heater cost, wire size, solar array)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setCurrentView('directory');
                        }
                      }}
                      className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl py-3.5 pl-11 pr-24 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
                    />
                    <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <button
                      onClick={() => setCurrentView('directory')}
                      className="absolute right-2 top-2 bottom-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Search</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" /> Real-time Instant Results
                  </span>
                  <span>•</span>
                  <span>NEC Code Compliant Formulas</span>
                  <span>•</span>
                  <span>Custom Utility Rates ({userPrefs.currencySymbol}{userPrefs.electricityRate}/kWh)</span>
                </div>
              </div>
            </section>

            {/* Appliance Cost Shortcuts Bar */}
            <QuickApplianceShortcuts onSelectAppliance={handleSelectApplianceShortcut} />

            {/* Popular Calculators Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Most Popular Power Calculators
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">High-search electrical and solar calculation tools</p>
                </div>

                <button
                  onClick={() => setCurrentView('directory')}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>View All 100+ Calculators</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {allCalculators.slice(0, 6).map((calc) => (
                  <CalculatorCard key={calc.id} calculator={calc} onSelect={handleSelectCalculator} />
                ))}
              </div>
            </section>

            {/* Category Browser Grid */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-600" />
                  Explore Calculation Categories
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Organized logically across 12 electrical domains</p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentView('directory');
                    }}
                    className="p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-amber-400 hover:shadow-md transition space-y-2 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cat.badgeColor}`}>
                        {cat.calculatorCount} Calculators
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Educational Guides */}
            <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    Featured Educational Guides & Articles
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Top-ranking explanations for electrical concepts</p>
                </div>

                <button
                  onClick={() => setCurrentView('articles')}
                  className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>All Guides</span> <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {articlesDatabase.slice(0, 3).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setSelectedArticleSlug(art.slug);
                      setCurrentView('articles');
                    }}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-400 hover:shadow-xs transition space-y-2 cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {art.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-amber-600 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{art.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SINGLE CALCULATOR DETAIL VIEW */}
        {currentView === 'calculator' && activeCalculator && (
          <InteractiveCalculator
            calculator={activeCalculator}
            userPrefs={userPrefs}
            onSelectCalculator={handleSelectCalculator}
          />
        )}

        {/* VIEW 3: FULL DIRECTORY / SEARCH VIEW */}
        {currentView === 'directory' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Calculator Library</span>
              <h1 className="text-3xl font-black text-slate-900 mt-1">
                All Electrical & Solar Calculators ({allCalculators.length}+)
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Filter and search our complete collection of power, electrical engineering, solar array, and battery calculations.
              </p>
            </div>

            <SearchAndFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedAudience={selectedAudience}
              setSelectedAudience={setSelectedAudience}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResults={filteredCalculators.length}
            />

            {filteredCalculators.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <p className="text-slate-500 text-sm">No calculators matched your specific query.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedAudience('All');
                  }}
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCalculators.map((calc) => (
                  <CalculatorCard key={calc.id} calculator={calc} onSelect={handleSelectCalculator} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: CATEGORIES PAGE */}
        {currentView === 'categories' && (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Category Index</span>
              <h1 className="text-3xl font-black text-slate-900 mt-1">Electrical & Power Categories</h1>
              <p className="text-sm text-slate-600 mt-1">
                Browse our calculators grouped by functional engineering domain.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((cat) => {
                const categoryCalcs = getCalculatorsByCategory(cat.id);
                return (
                  <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cat.badgeColor}`}>
                          {cat.calculatorCount} Tools
                        </span>
                        <h2 className="font-extrabold text-slate-900 text-lg mt-1">{cat.name}</h2>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Available Tools:</div>
                      <div className="space-y-1">
                        {categoryCalcs.slice(0, 4).map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCalculator(c)}
                            className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-amber-50 text-xs font-bold text-slate-800 hover:text-amber-700 transition flex items-center justify-between cursor-pointer"
                          >
                            <span className="line-clamp-1">{c.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* OTHER PAGE VIEWS */}
        {currentView === 'articles' && (
          <ArticlesView
            selectedArticleSlug={selectedArticleSlug}
            setSelectedArticleSlug={setSelectedArticleSlug}
            onSelectCalculator={handleSelectCalculator}
          />
        )}
        {currentView === 'affiliates' && <AffiliateHubView />}
        {currentView === 'sitemap' && (
          <SitemapView
            onSelectCalculator={handleSelectCalculator}
            onSelectArticle={(slug) => {
              setSelectedArticleSlug(slug);
              setCurrentView('articles');
            }}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'about' && <AboutView />}
        {currentView === 'privacy' && <PrivacyView />}
        {currentView === 'terms' && <TermsView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'seo-audit' && <SeoAuditView />}
      </main>

      {/* Global Modals */}
      <RateSettingsModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        userPrefs={userPrefs}
        onSavePrefs={setUserPrefs}
      />

      <AdsenseGuideModal
        isOpen={isAdsenseModalOpen}
        onClose={() => setIsAdsenseModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        setSelectedCategory={setSelectedCategory}
        onOpenAdsenseModal={() => setIsAdsenseModalOpen(true)}
      />
    </div>
  );
}
