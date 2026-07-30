import React from 'react';
import { TargetAudience } from '../types';
import { categories } from '../data/categories';
import { Search, Filter, Users } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  selectedAudience: TargetAudience | 'All';
  setSelectedAudience: (aud: TargetAudience | 'All') => void;
  sortBy: 'popular' | 'alphabetical' | 'category';
  setSortBy: (sort: 'popular' | 'alphabetical' | 'category') => void;
  totalResults: number;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedAudience,
  setSelectedAudience,
  sortBy,
  setSortBy,
  totalResults,
}) => {
  const audiences: (TargetAudience | 'All')[] = [
    'All',
    'Homeowner',
    'Electrician',
    'Solar Installer',
    'DIY Enthusiast',
    'Student',
    'Small Business',
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs mb-8 space-y-4">
      {/* Top Search Input & Sort Selector */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:flex-1">
          <input
            type="text"
            placeholder="Search by keyword, appliance, formula, or standard (e.g. NEC, AWG, BTU, kWh)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:bg-white transition"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs text-stone-500 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-stone-300 font-medium cursor-pointer"
          >
            <option value="popular">Popularity Rank</option>
            <option value="alphabetical">Title (A - Z)</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Target Audience Pills */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold mb-2">
          <Users className="w-3.5 h-3.5 text-stone-600" />
          <span>Filter by Target Audience:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {audiences.map((aud) => (
            <button
              key={aud}
              onClick={() => setSelectedAudience(aud)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedAudience === aud
                  ? 'bg-stone-800 text-white font-bold shadow-2xs'
                  : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
              }`}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Horizontal Scroll Pills */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold mb-2">
          <Filter className="w-3.5 h-3.5 text-stone-600" />
          <span>Category Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              selectedCategory === null
                ? 'bg-stone-800 text-white font-bold'
                : 'bg-stone-100 text-stone-700 border border-stone-200 hover:bg-stone-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-800 text-white font-bold shadow-2xs'
                  : 'bg-stone-100 text-stone-700 border border-stone-200 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span>Showing <strong className="text-stone-900 font-bold">{totalResults}</strong> power calculators</span>
        {(searchQuery || selectedCategory || selectedAudience !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setSelectedAudience('All');
            }}
            className="text-stone-800 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
