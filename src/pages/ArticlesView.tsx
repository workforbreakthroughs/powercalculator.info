import React, { useState } from 'react';
import { articlesDatabase } from '../data/articlesDatabase';
import { getCalculatorById } from '../data/calculatorsDatabase';
import { Calculator } from '../types';
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, Zap } from 'lucide-react';

interface ArticlesViewProps {
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
  onSelectCalculator: (calc: Calculator) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  selectedArticleSlug,
  setSelectedArticleSlug,
  onSelectCalculator,
}) => {
  const currentArticle = articlesDatabase.find((a) => a.slug === selectedArticleSlug);

  if (currentArticle) {
    const linkedCalcs = currentArticle.linkedCalculatorIds
      .map((id) => getCalculatorById(id))
      .filter((c): c is Calculator => c !== undefined);

    return (
      <article className="max-w-3xl mx-auto py-8 px-4 space-y-6">
        <button
          onClick={() => setSelectedArticleSlug(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>

        <div className="space-y-2 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-md">
            {currentArticle.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {currentArticle.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {currentArticle.readTimeMinutes} min read</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {currentArticle.publishDate}</span>
            <span>By {currentArticle.author}</span>
          </div>
        </div>

        {/* Content Render */}
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          {currentArticle.content.map((blk, idx) => {
            if (blk.type === 'paragraph') return <p key={idx}>{blk.text}</p>;
            if (blk.type === 'heading2') return <h2 key={idx} className="text-lg font-bold text-slate-900 pt-3 border-b border-slate-100 pb-1">{blk.text}</h2>;
            if (blk.type === 'formula') return (
              <div key={idx} className="bg-slate-900 text-amber-400 rounded-xl p-4 font-mono text-xs my-3 border border-slate-800">
                <pre className="whitespace-pre-wrap">{blk.text}</pre>
              </div>
            );
            if (blk.type === 'callout') return (
              <div key={idx} className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs text-amber-900 font-medium my-3">
                {blk.text}
              </div>
            );
            if (blk.type === 'list' && blk.items) return (
              <ol key={idx} className="list-decimal list-inside space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {blk.items.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            );
            return null;
          })}
        </div>

        {/* Embedded Linked Calculators */}
        {linkedCalcs.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md mt-8 space-y-3">
            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 fill-amber-400" /> Embedded Calculators Mentioned in this Guide
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              {linkedCalcs.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => onSelectCalculator(calc)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-left border border-slate-700 transition flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <div className="font-bold text-white text-xs line-clamp-1">{calc.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{calc.shortDescription}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    );
  }

  // Articles List View
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Educational Resource Hub</span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">Electrical & Solar Power Guides</h1>
        <p className="text-sm text-slate-600 mt-1">
          In-depth technical guides explaining electricity costs, kW vs kWh, solar panel array sizing, wire gauge voltage drop, and power factor correction.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {articlesDatabase.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticleSlug(art.slug)}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-amber-400 transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">{art.category}</span>
                <span className="text-slate-400 font-medium">{art.readTimeMinutes} min read</span>
              </div>
              <h2 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                {art.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{art.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
