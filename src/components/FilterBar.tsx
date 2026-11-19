import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterState, PhoneCategoryId } from '../types/phone';
import { PHONE_CATEGORIES } from '../data/categories';

interface FilterBarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  resultCount: number;
  categoryCounts: Record<string, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  resultCount,
  categoryCounts,
}) => {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFeatureFilters =
    filters.search.trim() !== '' ||
    filters.category !== 'all' ||
    filters.osFamily !== 'all' ||
    filters.has5G ||
    filters.hasNfc ||
    filters.hasAudioJack ||
    filters.hasCardSlot ||
    filters.hasRuggedProtection ||
    filters.minBatteryMah > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-5">
      {/* Row 1: Search, OS, Sort */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            placeholder="Поиск по модели, бренду, процессору или фишке (например: S Pen, тепловизор, 200 МП)..."
            aria-label="Поиск телефонов"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={filters.osFamily}
            onChange={(e) => update('osFamily', e.target.value)}
            aria-label="Фильтр по операционной системе"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-[#2563EB] cursor-pointer"
          >
            <option value="all">Все платформы (ОС)</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
            <option value="RTOS / KaiOS">RTOS / Кнопочные</option>
            <option value="Satellite OS">Спутниковые ОС</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={filters.sortBy}
            onChange={(e) =>
              update('sortBy', e.target.value as FilterState['sortBy'])
            }
            aria-label="Сортировка"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-[#2563EB] cursor-pointer"
          >
            <option value="featured">Сортировка: по классам</option>
            <option value="batteryDesc">Батарея: сначала самые ёмкие</option>
            <option value="priceAsc">Цена: от доступных</option>
            <option value="priceDesc">Цена: от флагманов</option>
            <option value="weightAsc">Вес: от самых лёгких</option>
            <option value="screenDesc">Экран: от самых крупных</option>
          </select>
        </div>
      </div>

      {/* Row 2: Interactive Category Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-slate-500">
          Класс устройства
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => update('category', 'all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
              filters.category === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Все классы ({categoryCounts['all'] ?? 0})
          </button>
          {PHONE_CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => update('category', cat.id as PhoneCategoryId)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                  isSelected
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.shortName} ({categoryCounts[cat.id] ?? 0})
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Quick Hardware Feature Filters + Result count */}
      <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mr-1 whitespace-nowrap shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Параметры:</span>
          </span>

          <button
            type="button"
            onClick={() => update('has5G', !filters.has5G)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filters.has5G
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            5G
          </button>
          <button
            type="button"
            onClick={() => update('hasNfc', !filters.hasNfc)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filters.hasNfc
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            NFC
          </button>
          <button
            type="button"
            onClick={() => update('hasAudioJack', !filters.hasAudioJack)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filters.hasAudioJack
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            3.5 мм джек
          </button>
          <button
            type="button"
            onClick={() => update('hasCardSlot', !filters.hasCardSlot)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filters.hasCardSlot
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            Слот microSD
          </button>
          <button
            type="button"
            onClick={() =>
              update('hasRuggedProtection', !filters.hasRuggedProtection)
            }
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filters.hasRuggedProtection
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            Защита IP68 / IP69K
          </button>
          <button
            type="button"
            onClick={() =>
              update('minBatteryMah', filters.minBatteryMah === 5500 ? 0 : 5500)
            }
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
              filters.minBatteryMah === 5500
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            Батарея 5500+ мА·ч
          </button>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
          <span className="text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap">
            Найдено моделей: <strong className="text-slate-900">{resultCount}</strong>
          </span>
          {hasActiveFeatureFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сбросить</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
