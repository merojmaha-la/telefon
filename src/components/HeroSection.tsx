import React from 'react';
import { ArrowDown, Layers } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface HeroSectionProps {
  totalPhones: number;
  totalCategories: number;
  onExploreCatalog: () => void;
  onOpenCategories: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalPhones,
  totalCategories,
  onExploreCatalog,
  onOpenCategories,
}) => {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold tracking-wider text-[#2563EB]">
                Инженерный справочник мобильных устройств
              </p>
              <h1
                className="font-display font-bold tracking-tight text-slate-900 text-balance leading-[1.12]"
                style={{ fontSize: 'clamp(2.1rem, 3.6vw, 3.35rem)' }}
              >
                Все виды телефонов и их полные характеристики
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                От титановых флагманов и трёхсекционных складных планшетов до неубиваемых
                бронефонов с тепловизором, E-Ink читалок, кнопочных звонилок и спутниковых
                терминалов Iridium.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <span>Смотреть каталог</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenCategories}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <Layers className="w-4 h-4" />
                <span>Разбор 10 классов</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <SmartImage
                src="/src/assets/images/hero_phones_lineup_1795089567280.jpg"
                alt="Линейка разных классов телефонов: флагман, складной, защищённый и кнопочный"
                aspectClassName="aspect-[16/9] lg:h-full"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column summary strip below hero split */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-slate-900">
              {totalCategories}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Классов устройств — от кнопочных до спутниковых
            </div>
          </div>
          <div>
            <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-slate-900">
              {totalPhones}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Детально разобранных актуальных моделей
            </div>
          </div>
          <div>
            <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-slate-900">
              8 разделов
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Подробных ТТХ для каждой модели (более 45 параметров)
            </div>
          </div>
          <div>
            <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-slate-900">
              До 4 шт.
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Прямое табличное сравнение с выделением отличий
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
