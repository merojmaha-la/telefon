import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PHONE_CATEGORIES } from '../data/categories';
import { PhoneCategoryId } from '../types/phone';
import { SmartImage } from './SmartImage';

interface CategoryAtlasProps {
  onSelectCategory: (categoryId: PhoneCategoryId) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryAtlas: React.FC<CategoryAtlasProps> = ({
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="max-w-3xl space-y-2.5">
        <p className="text-xs font-semibold tracking-wider text-[#2563EB]">
          Классификация мобильных устройств
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
          Все 10 видов современных телефонов: особенности, задачи и компромиссы
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Каждый форм-фактор решает конкретную инженерную задачу. Выберите любой класс,
          чтобы перейти к моделям с полными техническими таблицами.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PHONE_CATEGORIES.map((cat, idx) => (
          <article
            key={cat.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col sm:flex-row items-stretch"
          >
            <div className="sm:w-44 md:w-48 shrink-0 bg-slate-100">
              <SmartImage
                src={cat.image}
                alt={cat.name}
                aspectClassName="aspect-[4/3] sm:h-full"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-mono-tabular">
                    {String(idx + 1).padStart(2, '0')}. {cat.tagline}
                  </span>
                  <span className="font-mono-tabular shrink-0 text-slate-700 font-medium">
                    {categoryCounts[cat.id] ?? 0} мод.
                  </span>
                </div>

                <h2 className="font-display text-lg font-bold text-slate-900">
                  {cat.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Типичное железо: </span>
                    <span className="text-slate-600">{cat.typicalSpecs}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Кому подходит: </span>
                    <span className="text-slate-600">{cat.idealFor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Компромиссы: </span>
                    <span className="text-slate-600">{cat.tradeOffs}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Показать модели класса «{cat.shortName}»</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
