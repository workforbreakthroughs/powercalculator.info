import React from 'react';
import { Calculator } from '../types';
import { categories } from '../data/categories';
import { ArrowRight, Star } from 'lucide-react';

interface CalculatorCardProps {
  calculator: Calculator;
  onSelect: (calc: Calculator) => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, onSelect }) => {
  const cat = categories.find((c) => c.id === calculator.categoryId);

  return (
    <div
      onClick={() => onSelect(calculator)}
      className="group bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs hover:shadow-md hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Popular Rank Accent */}
      {calculator.popularityRank <= 5 && (
        <div className="absolute top-0 right-0 bg-stone-800 text-amber-300 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-bl-xl flex items-center gap-1 shadow-2xs">
          <Star className="w-3 h-3 fill-amber-300" /> Top {calculator.popularityRank}
        </div>
      )}

      <div>
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${cat?.badgeColor || 'bg-stone-100 text-stone-700 border-stone-200'}`}>
            {cat?.name || 'Power Calculator'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-stone-900 text-base mb-2 group-hover:text-stone-700 transition-colors line-clamp-2 leading-snug">
          {calculator.title}
        </h3>

        {/* Short Description */}
        <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4">
          {calculator.shortDescription}
        </p>
      </div>

      {/* Footer info & CTA */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-mono text-stone-400">Formula: {calculator.formula.split('\n')[0]}</span>
        <span className="text-xs font-semibold text-stone-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Calculate <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
        </span>
      </div>
    </div>
  );
};
