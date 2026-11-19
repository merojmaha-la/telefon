import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';

export const GlossaryView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('Все');

  const categories = [
    'Все',
    'Дисплей',
    'Процессор и память',
    'Камера',
    'Аккумулятор',
    'Защита и связь',
  ];

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesCat =
      selectedCat === 'Все' || item.category === selectedCat;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.term.toLowerCase().includes(q) ||
      item.shortSummary.toLowerCase().includes(q) ||
      item.detailedExplanation.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="max-w-3xl space-y-2.5">
        <p className="text-xs font-semibold tracking-wider text-[#2563EB]">
          Технический словарь
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Расшифровка характеристик телефонов простым языком
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Что такое LTPO, почему важен ШИМ, зачем в смартфонах кремний-углеродные
          батареи, и чем IP69K отличается от IP68.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCat === cat
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск термина (например: ШИМ, UFS)..."
            aria-label="Поиск по словарю терминов"
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-900">
            Термины по вашему запросу не найдены
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCat('Все');
            }}
            className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
          >
            Показать все термины
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-3"
            >
              <div className="text-xs font-medium text-[#2563EB]">
                {item.category}
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                {item.term}
              </h2>
              <p className="text-sm font-semibold text-slate-800">
                {item.shortSummary}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.detailedExplanation}
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">
                  Зачем это знать при выборе:{' '}
                </span>
                {item.whyItMatters}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
