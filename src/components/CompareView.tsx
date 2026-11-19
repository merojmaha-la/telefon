import React, { useState } from 'react';
import { X, Plus, Check, Trash2, ArrowUpRight } from 'lucide-react';
import { PhoneDevice } from '../types/phone';
import { PHONE_CATEGORIES } from '../data/categories';
import { SmartImage } from './SmartImage';

interface CompareViewProps {
  allPhones: PhoneDevice[];
  comparedIds: string[];
  onToggleCompare: (phoneId: string) => void;
  onSetCompareIds: (ids: string[]) => void;
  onSelectPhone: (phone: PhoneDevice) => void;
}

interface CompareRowDef {
  label: string;
  section: string;
  getValue: (p: PhoneDevice) => string;
  numericValue?: (p: PhoneDevice) => number;
  higherIsBetter?: boolean;
  lowerIsBetter?: boolean;
}

export const CompareView: React.FC<CompareViewProps> = ({
  allPhones,
  comparedIds,
  onToggleCompare,
  onSetCompareIds,
  onSelectPhone,
}) => {
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  const selectedPhones = comparedIds
    .map((id) => allPhones.find((p) => p.id === id))
    .filter((p): p is PhoneDevice => Boolean(p));

  const availableToAdd = allPhones.filter((p) => !comparedIds.includes(p.id));

  const presets: { label: string; ids: string[] }[] = [
    {
      label: 'Флагманы 2025',
      ids: ['iphone-16-pro-max', 'samsung-galaxy-s25-ultra', 'oneplus-13'],
    },
    {
      label: 'Камерофоны',
      ids: ['xiaomi-15-ultra', 'vivo-x200-pro', 'sony-xperia-1-vi'],
    },
    {
      label: 'Необычные форматы',
      ids: ['huawei-mate-xt-ultimate', 'hisense-a9-eink', 'iridium-extreme-9575'],
    },
    {
      label: 'Компакты',
      ids: ['samsung-galaxy-s25', 'iphone-16', 'xiaomi-15', 'asus-zenfone-10'],
    },
  ];

  const rows: CompareRowDef[] = [
    {
      section: 'Общее и корпус',
      label: 'Класс устройства',
      getValue: (p) =>
        PHONE_CATEGORIES.find((c) => c.id === p.category)?.shortName ?? p.category,
    },
    {
      section: 'Общее и корпус',
      label: 'Ориентировочная цена',
      getValue: (p) => `${p.priceRubApprox} ($${p.priceUsd})`,
      numericValue: (p) => p.priceUsd,
      lowerIsBetter: true,
    },
    {
      section: 'Общее и корпус',
      label: 'Габариты (мм)',
      getValue: (p) => p.specs.body.dimensions,
    },
    {
      section: 'Общее и корпус',
      label: 'Вес (г)',
      getValue: (p) => `${p.specs.body.weightGrams} г`,
      numericValue: (p) => p.specs.body.weightGrams,
      lowerIsBetter: true,
    },
    {
      section: 'Общее и корпус',
      label: 'Защита от воды и ударов',
      getValue: (p) => p.specs.body.protection,
    },
    {
      section: 'Дисплей',
      label: 'Диагональ и тип',
      getValue: (p) => `${p.specs.display.sizeInches}" · ${p.specs.display.type}`,
    },
    {
      section: 'Дисплей',
      label: 'Разрешение и плотность',
      getValue: (p) => `${p.specs.display.resolution} (${p.specs.display.ppi} PPI)`,
      numericValue: (p) => p.specs.display.ppi,
      higherIsBetter: true,
    },
    {
      section: 'Дисплей',
      label: 'Частота обновления',
      getValue: (p) => `${p.specs.display.refreshRateHz} Гц`,
      numericValue: (p) => p.specs.display.refreshRateHz,
      higherIsBetter: true,
    },
    {
      section: 'Дисплей',
      label: 'Пиковая яркость',
      getValue: (p) => `${p.specs.display.peakBrightnessNits} нит`,
      numericValue: (p) => p.specs.display.peakBrightnessNits,
      higherIsBetter: true,
    },
    {
      section: 'Дисплей',
      label: 'ШИМ (мерцание)',
      getValue: (p) => p.specs.display.pwmHz,
    },
    {
      section: 'Производительность',
      label: 'Процессор (SoC)',
      getValue: (p) => `${p.specs.hardware.chipset} (${p.specs.hardware.processNm})`,
    },
    {
      section: 'Производительность',
      label: 'Макс. ОЗУ',
      getValue: (p) => p.specs.hardware.ramOptions,
      numericValue: (p) => p.specs.hardware.ramGbMax,
      higherIsBetter: true,
    },
    {
      section: 'Производительность',
      label: 'Накопитель и тип',
      getValue: (p) => `${p.specs.hardware.storageOptions} (${p.specs.hardware.storageType})`,
    },
    {
      section: 'Производительность',
      label: 'Слот microSD',
      getValue: (p) => p.specs.hardware.cardSlot,
    },
    {
      section: 'Камеры',
      label: 'Основная камера',
      getValue: (p) => p.specs.camera.main,
    },
    {
      section: 'Камеры',
      label: 'Телеобъектив / Зум',
      getValue: (p) => `${p.specs.camera.telephoto} (${p.specs.camera.opticalZoom})`,
    },
    {
      section: 'Камеры',
      label: 'Видеосъёмка',
      getValue: (p) => p.specs.camera.videoRecording,
    },
    {
      section: 'Камеры',
      label: 'Фронтальная камера',
      getValue: (p) => p.specs.camera.frontCamera,
    },
    {
      section: 'Автономность',
      label: 'Ёмкость батареи',
      getValue: (p) => `${p.specs.battery.capacityMah.toLocaleString('ru-RU')} мА·ч`,
      numericValue: (p) => p.specs.battery.capacityMah,
      higherIsBetter: true,
    },
    {
      section: 'Автономность',
      label: 'Проводная зарядка',
      getValue: (p) => p.specs.battery.wiredCharging,
      numericValue: (p) => p.specs.battery.wiredWatts,
      higherIsBetter: true,
    },
    {
      section: 'Автономность',
      label: 'Беспроводная зарядка',
      getValue: (p) => p.specs.battery.wirelessCharging,
    },
    {
      section: 'Связь и интерфейсы',
      label: '5G / Спутник',
      getValue: (p) =>
        `${p.specs.connectivity.has5G ? '5G есть' : 'Без 5G'} · Спутник: ${p.specs.connectivity.satelliteSupport}`,
    },
    {
      section: 'Связь и интерфейсы',
      label: 'Wi-Fi / Bluetooth',
      getValue: (p) => `${p.specs.connectivity.wifi} · BT ${p.specs.connectivity.bluetooth}`,
    },
    {
      section: 'Связь и интерфейсы',
      label: 'NFC / eSIM / 3.5 мм',
      getValue: (p) =>
        `NFC: ${p.specs.connectivity.nfc ? 'Да' : 'Нет'} · eSIM: ${p.specs.connectivity.esim ? 'Да' : 'Нет'} · 3.5 мм: ${p.specs.connectivity.audioJack35mm ? 'Да' : 'Нет'}`,
    },
    {
      section: 'Связь и интерфейсы',
      label: 'Порт USB',
      getValue: (p) => p.specs.connectivity.usb,
    },
    {
      section: 'Система и биометрия',
      label: 'Операционная система',
      getValue: (p) => `${p.specs.software.osOutOfBox} (${p.specs.software.uiSkin})`,
    },
    {
      section: 'Система и биометрия',
      label: 'Срок обновлений',
      getValue: (p) => p.specs.software.updatePolicy,
    },
    {
      section: 'Система и биометрия',
      label: 'Биометрия',
      getValue: (p) => `Отпечаток: ${p.specs.audioSensors.fingerprint} · Лицо: ${p.specs.audioSensors.faceUnlock}`,
    },
  ];

  const filteredRows = onlyDifferences
    ? rows.filter((row) => {
        if (selectedPhones.length < 2) return true;
        const values = new Set(selectedPhones.map((p) => row.getValue(p)));
        return values.size > 1;
      })
    : rows;

  return (
    <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-[#2563EB]">
            Табличное сравнение
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Сравнение характеристик устройств (до 4 моделей)
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onSetCompareIds(preset.ids)}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 hover:border-slate-400 text-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {selectedPhones.length < 4 && (
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) onToggleCompare(e.target.value);
                }}
                aria-label="Добавить модель в сравнение"
                className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2563EB] cursor-pointer max-w-[260px]"
              >
                <option value="">Добавить телефон к сравнению...</option>
                {availableToAdd.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.brand} {p.model} ({p.priceRubApprox})
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedPhones.length >= 2 && (
            <button
              type="button"
              onClick={() => setOnlyDifferences((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                onlyDifferences
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Только отличия</span>
            </button>
          )}
        </div>

        {selectedPhones.length > 0 && (
          <button
            type="button"
            onClick={() => onSetCompareIds([])}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Очистить список</span>
          </button>
        )}
      </div>

      {selectedPhones.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Список сравнения пуст
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Выберите до 4 любых моделей в выпадающем списке выше или нажмите готовый набор
            сравнения (например, «Флагманы 2025» или «Необычные форматы»).
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => onSetCompareIds(preset.ids)}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Сравнить: {preset.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
          <table className="w-full min-w-[760px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="w-52 p-4 align-bottom text-xs font-semibold text-slate-500">
                  Параметр
                </th>
                {selectedPhones.map((phone) => (
                  <th key={phone.id} className="p-4 align-top min-w-[200px]">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectPhone(phone)}
                          className="text-left font-display text-sm font-bold text-slate-900 hover:text-[#2563EB] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>
                            {phone.brand} {phone.model}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleCompare(phone.id)}
                          aria-label={`Убрать ${phone.model} из сравнения`}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="w-full max-w-[160px] rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <SmartImage
                          src={phone.image}
                          alt={phone.model}
                          aspectClassName="aspect-[4/3]"
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredRows.map((row) => {
                // Determine best numeric value when comparing >= 2 phones
                let bestVal: number | null = null;
                if (row.numericValue && selectedPhones.length >= 2) {
                  const vals = selectedPhones.map((p) => row.numericValue!(p));
                  const allSame = vals.every((v) => v === vals[0]);
                  if (!allSame) {
                    if (row.higherIsBetter) bestVal = Math.max(...vals);
                    if (row.lowerIsBetter) bestVal = Math.min(...vals);
                  }
                }

                return (
                  <tr
                    key={`${row.section}-${row.label}`}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="p-4 font-medium text-slate-500 align-top">
                      <div className="text-[11px] text-slate-400 mb-0.5">
                        {row.section}
                      </div>
                      <div className="text-slate-700">{row.label}</div>
                    </td>

                    {selectedPhones.map((phone) => {
                      const valStr = row.getValue(phone);
                      const numVal = row.numericValue
                        ? row.numericValue(phone)
                        : null;
                      const isBest =
                        bestVal !== null && numVal !== null && numVal === bestVal;

                      return (
                        <td
                          key={phone.id}
                          className={`p-4 align-top tabular-nums leading-relaxed ${
                            isBest
                              ? 'bg-emerald-50/50 text-slate-900 font-semibold'
                              : 'text-slate-800'
                          }`}
                        >
                          <div>{valStr}</div>
                          {isBest && (
                            <div className="mt-1 text-[11px] font-semibold text-emerald-700">
                              ✓ Лучший показатель
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
