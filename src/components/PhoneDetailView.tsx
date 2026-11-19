import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Plus,
  BookOpen,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';
import { PhoneDevice } from '../types/phone';
import { PHONE_CATEGORIES } from '../data/categories';
import { SmartImage } from './SmartImage';

interface PhoneDetailViewProps {
  phone: PhoneDevice;
  isCompared: boolean;
  onBack: () => void;
  onToggleCompare: (phoneId: string) => void;
  onOpenGlossary: () => void;
  onSelectRelated: (phone: PhoneDevice) => void;
  relatedPhones: PhoneDevice[];
}

interface SpecRow {
  label: string;
  value: string;
}

export const PhoneDetailView: React.FC<PhoneDetailViewProps> = ({
  phone,
  isCompared,
  onBack,
  onToggleCompare,
  onOpenGlossary,
  onSelectRelated,
  relatedPhones,
}) => {
  const [copied, setCopied] = useState(false);

  const categoryInfo = PHONE_CATEGORIES.find((c) => c.id === phone.category);

  const specSections: { id: string; title: string; rows: SpecRow[] }[] = [
    {
      id: 'body',
      title: '01. Корпус, габариты и защита',
      rows: [
        { label: 'Форм-фактор', value: phone.specs.body.formFactor },
        { label: 'Габариты (В × Ш × Т)', value: phone.specs.body.dimensions },
        ...(phone.specs.body.foldedDimensions
          ? [{ label: 'В сложенном виде', value: phone.specs.body.foldedDimensions }]
          : []),
        { label: 'Масса', value: `${phone.specs.body.weightGrams} г` },
        { label: 'Материалы корпуса', value: phone.specs.body.materials },
        { label: 'Защита (IP / MIL-STD)', value: phone.specs.body.protection },
        { label: 'SIM-карты', value: phone.specs.body.sim },
        { label: 'Цветовые исполнения', value: phone.specs.body.colors.join(', ') },
      ],
    },
    {
      id: 'display',
      title: '02. Дисплей и оптика экрана',
      rows: [
        { label: 'Тип матрицы', value: phone.specs.display.type },
        { label: 'Диагональ', value: `${phone.specs.display.sizeInches} дюймов` },
        { label: 'Разрешение', value: phone.specs.display.resolution },
        { label: 'Плотность пикселей', value: `${phone.specs.display.ppi} PPI` },
        { label: 'Частота обновления', value: `${phone.specs.display.refreshRateHz} Гц` },
        { label: 'ШИМ / Мерцание (PWM)', value: phone.specs.display.pwmHz },
        { label: 'Пиковая яркость', value: `${phone.specs.display.peakBrightnessNits} нит` },
        { label: 'Соотношение сторон', value: phone.specs.display.aspectRatio },
        { label: 'Защитное стекло', value: phone.specs.display.glass },
        ...(phone.specs.display.secondaryDisplay
          ? [{ label: 'Дополнительный экран', value: phone.specs.display.secondaryDisplay }]
          : []),
      ],
    },
    {
      id: 'hardware',
      title: '03. Платформа, процессор и память',
      rows: [
        { label: 'Чипсет (SoC)', value: phone.specs.hardware.chipset },
        { label: 'Техпроцесс', value: phone.specs.hardware.processNm },
        { label: 'Центральный процессор (CPU)', value: phone.specs.hardware.cpu },
        { label: 'Графический ускоритель (GPU)', value: phone.specs.hardware.gpu },
        { label: 'Оперативная память', value: phone.specs.hardware.ramOptions },
        { label: 'Встроенная память', value: phone.specs.hardware.storageOptions },
        { label: 'Тип накопителя', value: phone.specs.hardware.storageType },
        { label: 'Карта памяти microSD', value: phone.specs.hardware.cardSlot },
        { label: 'Система охлаждения', value: phone.specs.hardware.cooling },
        { label: 'Ориентир AnTuTu v10', value: phone.specs.hardware.benchmarkAntutu },
      ],
    },
    {
      id: 'camera',
      title: '04. Камеры и видеосъёмка',
      rows: [
        { label: 'Основной модуль', value: phone.specs.camera.main },
        { label: 'Сверхширокоугольный', value: phone.specs.camera.ultrawide },
        { label: 'Телеобъектив / Зум', value: phone.specs.camera.telephoto },
        { label: 'Кратность оптического зума', value: phone.specs.camera.opticalZoom },
        { label: 'Дополнительные сенсоры', value: phone.specs.camera.extraSensors },
        { label: 'Запись видео', value: phone.specs.camera.videoRecording },
        { label: 'Фронтальная камера', value: phone.specs.camera.frontCamera },
      ],
    },
    {
      id: 'battery',
      title: '05. Аккумулятор и зарядка',
      rows: [
        {
          label: 'Ёмкость аккумулятора',
          value: `${phone.specs.battery.capacityMah.toLocaleString('ru-RU')} мА·ч`,
        },
        { label: 'Тип и химия элемента', value: phone.specs.battery.chemistry },
        { label: 'Проводная зарядка', value: phone.specs.battery.wiredCharging },
        { label: 'Беспроводная зарядка', value: phone.specs.battery.wirelessCharging },
        { label: 'Обратная (реверсивная)', value: phone.specs.battery.reverseCharging },
        {
          label: 'Съёмная конструкция',
          value: phone.specs.battery.removable ? 'Да (быстрая замена)' : 'Нет (несъёмный)',
        },
        { label: 'Реальная автономность', value: phone.specs.battery.autonomyEstimate },
      ],
    },
    {
      id: 'connectivity',
      title: '06. Сети, связь и интерфейсы',
      rows: [
        { label: 'Сотовые стандарты', value: phone.specs.connectivity.cellular },
        { label: 'Спутниковая связь', value: phone.specs.connectivity.satelliteSupport },
        { label: 'Wi-Fi', value: phone.specs.connectivity.wifi },
        { label: 'Bluetooth и кодеки', value: phone.specs.connectivity.bluetooth },
        { label: 'NFC (бесконтактная оплата)', value: phone.specs.connectivity.nfc ? 'Есть' : 'Отсутствует' },
        { label: 'Поддержка eSIM', value: phone.specs.connectivity.esim ? 'Есть' : 'Отсутствует' },
        { label: 'Навигация (GNSS)', value: phone.specs.connectivity.navigation },
        { label: 'Разъём USB', value: phone.specs.connectivity.usb },
        {
          label: 'Аудиоразъём 3.5 мм',
          value: phone.specs.connectivity.audioJack35mm ? 'Есть' : 'Отсутствует',
        },
        {
          label: 'ИК-порт (пульт ДУ)',
          value: phone.specs.connectivity.irPort ? 'Есть' : 'Отсутствует',
        },
      ],
    },
    {
      id: 'audio',
      title: '07. Звук, биометрия и датчики',
      rows: [
        { label: 'Динамики', value: phone.specs.audioSensors.speakers },
        { label: 'ЦАП и аудиовыход', value: phone.specs.audioSensors.dacAndCodecs },
        { label: 'Сканер отпечатка пальца', value: phone.specs.audioSensors.fingerprint },
        { label: 'Распознавание лица', value: phone.specs.audioSensors.faceUnlock },
        { label: 'Датчики и элементы управления', value: phone.specs.audioSensors.sensorsList },
      ],
    },
    {
      id: 'software',
      title: '08. Операционная система и особенности',
      rows: [
        { label: 'ОС из коробки', value: phone.specs.software.osOutOfBox },
        { label: 'Оболочка', value: phone.specs.software.uiSkin },
        { label: 'Политика обновлений', value: phone.specs.software.updatePolicy },
      ],
    },
  ];

  const handleCopySpecs = async () => {
    const textLines = [
      `${phone.brand} ${phone.model} (${phone.releaseYear}) — ${phone.priceRubApprox}`,
      `Класс: ${categoryInfo?.name ?? phone.category}`,
      '',
      ...specSections.flatMap((sec) => [
        `=== ${sec.title} ===`,
        ...sec.rows.map((r) => `${r.label}: ${r.value}`),
        '',
      ]),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(textLines);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored gracefully
    }
  };

  // Proportional scale factor for physical size comparison (px per mm)
  const pxPerMm = 1.05;
  const refPhoneH = 147.6 * pxPerMm;
  const refPhoneW = 71.6 * pxPerMm;
  const currentH = Math.min(220, phone.specs.body.heightMm * pxPerMm);
  const currentW = Math.min(240, phone.specs.body.widthMm * pxPerMm);

  return (
    <article className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к каталогу</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenGlossary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Словарь терминов</span>
          </button>

          <button
            type="button"
            onClick={handleCopySpecs}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Скопировано</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Скопировать ТТХ</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onToggleCompare(phone.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isCompared
                ? 'bg-[#2563EB] text-white border-[#2563EB] hover:bg-blue-700'
                : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
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
                <span>Добавить к сравнению</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Overview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
            <SmartImage
              src={phone.image}
              alt={`${phone.brand} ${phone.model}`}
              aspectClassName="aspect-[4/3]"
            />
          </div>

          {/* Physical Dimensions Scale Visualizer */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold text-slate-900">
                Визуальный масштаб габаритов (1:1 пропорция)
              </h3>
              <span className="font-mono-tabular text-xs text-slate-500">
                Толщина: {phone.specs.body.thicknessMm} мм
              </span>
            </div>

            <div className="flex items-end justify-center gap-8 pt-2 pb-1">
              <div className="flex flex-col items-center gap-2">
                <div
                  style={{ width: `${currentW}px`, height: `${currentH}px` }}
                  className="border-2 border-[#2563EB] bg-blue-50/40 rounded-lg flex flex-col items-center justify-center p-1 text-center"
                >
                  <span className="font-mono-tabular text-[10px] font-semibold text-[#2563EB] leading-tight">
                    {phone.specs.body.heightMm}×{phone.specs.body.widthMm}
                  </span>
                  <span className="text-[10px] text-slate-600 mt-0.5 font-mono-tabular">
                    {phone.specs.body.weightGrams} г
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-800 truncate max-w-[140px]">
                  {phone.model}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  style={{ width: `${refPhoneW}px`, height: `${refPhoneH}px` }}
                  className="border border-dashed border-slate-400 bg-slate-50 rounded-lg flex flex-col items-center justify-center p-1 text-center"
                >
                  <span className="font-mono-tabular text-[10px] text-slate-600 leading-tight">
                    147.6×71.6
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 font-mono-tabular">
                    6.1" эталон
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Обычный 6.1"
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Overview Summary */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#2563EB]">
                {categoryInfo?.name ?? phone.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Выход: {phone.releaseYear}</span>
              <span aria-hidden="true">·</span>
              <span>{phone.specs.software.osOutOfBox}</span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {phone.brand} {phone.model}
              </h1>
              <div className="text-right">
                <div className="font-mono-tabular text-2xl font-bold text-slate-900">
                  {phone.priceRubApprox}
                </div>
                <div className="font-mono-tabular text-xs text-slate-500">
                  Ориентир: ${phone.priceUsd}
                </div>
              </div>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              {phone.summary}
            </p>

            {/* Key 4 Highlights Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Дисплей</div>
                <div className="mt-1 font-mono-tabular text-sm font-bold text-slate-900">
                  {phone.specs.display.sizeInches}" · {phone.specs.display.refreshRateHz} Гц
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Память</div>
                <div className="mt-1 font-mono-tabular text-sm font-bold text-slate-900 truncate">
                  {phone.specs.hardware.ramOptions.split(' ')[0]} ГБ ОЗУ
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Батарея</div>
                <div className="mt-1 font-mono-tabular text-sm font-bold text-slate-900">
                  {phone.specs.battery.capacityMah.toLocaleString('ru-RU')} мА·ч
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Вес</div>
                <div className="mt-1 font-mono-tabular text-sm font-bold text-slate-900">
                  {phone.specs.body.weightGrams} г
                </div>
              </div>
            </div>

            {/* Special Hardware Features */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <h2 className="text-xs font-semibold text-slate-500">
                Ключевые инженерные особенности модели
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {phone.specs.software.specialFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono-tabular text-xs font-semibold text-[#2563EB] mt-0.5">
                      0{i + 1}.
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section Quick Navigation */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {specSections.map((sec) => (
              <a
                key={sec.id}
                href={`#spec-${sec.id}`}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-400 rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Pros and Cons Engineering Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span>Сильные стороны</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {phone.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">+</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Компромиссы и ограничения</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {phone.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">−</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8 Detailed Engineering Specification Tables */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Подробная техническая спецификация
          </h2>
          <span className="text-xs text-slate-500">
            Все 8 разделов аппаратных и программных характеристик
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {specSections.map((section) => (
            <div
              key={section.id}
              id={`spec-${section.id}`}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden scroll-mt-24"
            >
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-display text-base font-bold text-slate-900">
                  {section.title}
                </h3>
              </div>

              <dl className="divide-y divide-slate-100">
                {section.rows.map((row) => (
                  <div
                    key={row.label}
                    className="px-6 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline hover:bg-slate-50/70 transition-colors"
                  >
                    <dt className="sm:col-span-4 text-xs sm:text-sm font-medium text-slate-500">
                      {row.label}
                    </dt>
                    <dd className="sm:col-span-8 text-sm text-slate-900 font-medium tabular-nums leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Related Devices in Same Class */}
      {relatedPhones.length > 0 && (
        <section className="pt-6 border-t border-slate-200 space-y-5">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Другие модели класса «{categoryInfo?.shortName}»
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPhones.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelectRelated(rel)}
                className="text-left bg-white border border-slate-200 hover:border-slate-400 rounded-xl p-4 flex items-center gap-4 transition-colors cursor-pointer"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <SmartImage
                    src={rel.image}
                    alt={`${rel.brand} ${rel.model}`}
                    aspectClassName="aspect-[4/3]"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-bold text-slate-900 truncate">
                    {rel.brand} {rel.model}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    {rel.specs.display.sizeInches}" · {rel.specs.battery.capacityMah} мА·ч ·{' '}
                    {rel.priceRubApprox}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
