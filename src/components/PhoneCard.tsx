import React from 'react';
import { Check, Plus, ArrowUpRight } from 'lucide-react';
import { PhoneDevice } from '../types/phone';
import { PHONE_CATEGORIES } from '../data/categories';
import { SmartImage } from './SmartImage';

interface PhoneCardProps {
  phone: PhoneDevice;
  isCompared: boolean;
  onSelect: (phone: PhoneDevice) => void;
  onToggleCompare: (phoneId: string) => void;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({
  phone,
  isCompared,
  onSelect,
  onToggleCompare,
}) => {
  const categoryInfo = PHONE_CATEGORIES.find((c) => c.id === phone.category);

  return (
    <article className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Product Image Container */}
        <button
          type="button"
          onClick={() => onSelect(phone)}
          className="w-full block overflow-hidden bg-slate-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2563EB]"
        >
          <SmartImage
            src={phone.image}
            alt={`${phone.brand} ${phone.model}`}
            aspectClassName="aspect-[4/3]"
            className="transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </button>

        <div className="p-5 space-y-4">
          {/* Zero-Pill Metadata + Title + Price */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
              <span>{categoryInfo?.shortName ?? phone.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{phone.releaseYear}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{phone.specs.software.osFamily}</span>
            </div>

            <div className="flex items-baseline justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelect(phone)}
                className="text-left font-display text-lg font-bold text-slate-900 hover:text-[#2563EB] transition-colors leading-snug cursor-pointer"
              >
                {phone.brand} {phone.model}
              </button>
              <span className="font-mono-tabular text-sm font-semibold text-slate-900 whitespace-nowrap shrink-0">
                {phone.priceRubApprox}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {phone.summary}
            </p>
          </div>

          {/* Clean Hairline Key Engineering Rows */}
          <dl className="divide-y divide-slate-100 border-t border-b border-slate-100 text-xs">
            <div className="py-2 flex items-center justify-between gap-3">
              <dt className="text-slate-500 shrink-0">Экран</dt>
              <dd className="text-slate-900 font-medium text-right truncate tabular-nums">
                {phone.specs.display.sizeInches}" · {phone.specs.display.refreshRateHz} Гц
              </dd>
            </div>
            <div className="py-2 flex items-center justify-between gap-3">
              <dt className="text-slate-500 shrink-0">Платформа</dt>
              <dd className="text-slate-900 font-medium text-right truncate">
                {phone.specs.hardware.chipset}
              </dd>
            </div>
            <div className="py-2 flex items-center justify-between gap-3">
              <dt className="text-slate-500 shrink-0">Батарея</dt>
              <dd className="text-slate-900 font-medium text-right truncate tabular-nums">
                {phone.specs.battery.capacityMah.toLocaleString('ru-RU')} мА·ч
                {phone.specs.battery.wiredWatts > 0
                  ? ` · ${phone.specs.battery.wiredWatts} Вт`
                  : ''}
              </dd>
            </div>
            <div className="py-2 flex items-center justify-between gap-3">
              <dt className="text-slate-500 shrink-0">Вес и защита</dt>
              <dd className="text-slate-900 font-medium text-right truncate tabular-nums">
                {phone.specs.body.weightGrams} г ·{' '}
                {phone.specs.body.protection.split('(')[0].trim()}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onSelect(phone)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
        >
          <span>Все характеристики</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onToggleCompare(phone.id)}
          aria-pressed={isCompared}
          className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
            isCompared
              ? 'bg-[#2563EB] text-white border-[#2563EB] hover:bg-blue-700'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
          }`}
        >
          {isCompared ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>В сравнении</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Сравнить</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
