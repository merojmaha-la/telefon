import { useEffect, useMemo, useRef, useState } from 'react';
import { AppView, Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { PhoneCard } from './components/PhoneCard';
import { CategoryAtlas } from './components/CategoryAtlas';
import { PhoneDetailView } from './components/PhoneDetailView';
import { CompareView } from './components/CompareView';
import { GlossaryView } from './components/GlossaryView';
import { PHONES_DATA } from './data/phones';
import { PHONE_CATEGORIES } from './data/categories';
import { FilterState, PhoneCategoryId, PhoneDevice } from './types/phone';

const INITIAL_FILTERS: FilterState = {
  search: '',
  category: 'all',
  osFamily: 'all',
  has5G: false,
  hasNfc: false,
  hasAudioJack: false,
  hasCardSlot: false,
  hasRuggedProtection: false,
  minBatteryMah: 0,
  sortBy: 'featured',
};

const COMPARE_STORAGE_KEY = 'specphone_compare_ids_v1';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('catalog');
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [compareLimitNotice, setCompareLimitNotice] = useState(false);

  const [comparedIds, setComparedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, 4);
      }
    } catch {
      // Ignore storage errors
    }
    return ['iphone-16-pro-max', 'samsung-galaxy-s25-ultra'];
  });

  const catalogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(comparedIds));
    } catch {
      // Ignore storage errors
    }
  }, [comparedIds]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PHONES_DATA.length };
    for (const cat of PHONE_CATEGORIES) {
      counts[cat.id] = 0;
    }
    for (const phone of PHONES_DATA) {
      counts[phone.category] = (counts[phone.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredPhones = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    const list = PHONES_DATA.filter((phone) => {
      if (filters.category !== 'all' && phone.category !== filters.category) {
        return false;
      }
      if (
        filters.osFamily !== 'all' &&
        phone.specs.software.osFamily !== filters.osFamily
      ) {
        return false;
      }
      if (filters.has5G && !phone.specs.connectivity.has5G) return false;
      if (filters.hasNfc && !phone.specs.connectivity.nfc) return false;
      if (filters.hasAudioJack && !phone.specs.connectivity.audioJack35mm) {
        return false;
      }
      if (
        filters.hasCardSlot &&
        (phone.specs.hardware.cardSlot.toLowerCase().includes('отсутств') ||
          phone.specs.hardware.cardSlot.toLowerCase() === 'нет')
      ) {
        return false;
      }
      if (
        filters.hasRuggedProtection &&
        !phone.specs.body.protection.includes('IP68') &&
        !phone.specs.body.protection.includes('IP69K')
      ) {
        return false;
      }
      if (
        filters.minBatteryMah > 0 &&
        phone.specs.battery.capacityMah < filters.minBatteryMah
      ) {
        return false;
      }

      if (q) {
        const haystack = [
          phone.brand,
          phone.model,
          phone.summary,
          phone.specs.hardware.chipset,
          phone.specs.display.type,
          phone.specs.camera.main,
          phone.specs.camera.extraSensors,
          phone.specs.body.protection,
          ...phone.specs.software.specialFeatures,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    const sorted = [...list];
    switch (filters.sortBy) {
      case 'batteryDesc':
        sorted.sort(
          (a, b) => b.specs.battery.capacityMah - a.specs.battery.capacityMah
        );
        break;
      case 'priceAsc':
        sorted.sort((a, b) => a.priceUsd - b.priceUsd);
        break;
      case 'priceDesc':
        sorted.sort((a, b) => b.priceUsd - a.priceUsd);
        break;
      case 'weightAsc':
        sorted.sort(
          (a, b) => a.specs.body.weightGrams - b.specs.body.weightGrams
        );
        break;
      case 'screenDesc':
        sorted.sort(
          (a, b) => b.specs.display.sizeInches - a.specs.display.sizeInches
        );
        break;
      default:
        break;
    }

    return sorted;
  }, [filters]);

  const selectedPhone = useMemo(
    () => PHONES_DATA.find((p) => p.id === selectedPhoneId) ?? null,
    [selectedPhoneId]
  );

  const relatedPhones = useMemo(() => {
    if (!selectedPhone) return [];
    return PHONES_DATA.filter(
      (p) => p.category === selectedPhone.category && p.id !== selectedPhone.id
    ).slice(0, 3);
  }, [selectedPhone]);

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
    if (view !== 'detail') {
      setSelectedPhoneId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPhone = (phone: PhoneDevice) => {
    setSelectedPhoneId(phone.id);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (phoneId: string) => {
    setComparedIds((prev) => {
      if (prev.includes(phoneId)) {
        setCompareLimitNotice(false);
        return prev.filter((id) => id !== phoneId);
      }
      if (prev.length >= 4) {
        setCompareLimitNotice(true);
        window.setTimeout(() => setCompareLimitNotice(false), 3200);
        return prev;
      }
      setCompareLimitNotice(false);
      return [...prev, phoneId];
    });
  };

  const handleSelectCategoryFromAtlas = (categoryId: PhoneCategoryId) => {
    setFilters({ ...INITIAL_FILTERS, category: categoryId });
    setActiveView('catalog');
    window.setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const handleExploreCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeCategoryInfo =
    filters.category !== 'all'
      ? PHONE_CATEGORIES.find((c) => c.id === filters.category)
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0F172A]">
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        compareCount={comparedIds.length}
      />

      {compareLimitNotice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-lg shadow-lg border border-slate-700"
        >
          В сравнении уже выбрано максимум 4 модели. Уберите одну, чтобы добавить новую.
        </div>
      )}

      <main className="flex-1">
        {activeView === 'catalog' && (
          <>
            <HeroSection
              totalPhones={PHONES_DATA.length}
              totalCategories={PHONE_CATEGORIES.length}
              onExploreCatalog={handleExploreCatalog}
              onOpenCategories={() => handleNavigate('categories')}
            />

            <section
              ref={catalogRef}
              className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 scroll-mt-16"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                    {activeCategoryInfo
                      ? activeCategoryInfo.name
                      : 'Каталог всех видов телефонов'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 max-w-2xl">
                    {activeCategoryInfo
                      ? `${activeCategoryInfo.description} Типично: ${activeCategoryInfo.typicalSpecs}.`
                      : 'Нажмите на любую модель, чтобы открыть полную инженерную спецификацию по 8 разделам и масштаб габаритов.'}
                  </p>
                </div>
              </div>

              <FilterBar
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(INITIAL_FILTERS)}
                resultCount={filteredPhones.length}
                categoryCounts={categoryCounts}
              />

              {filteredPhones.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    По выбранным параметрам модели не найдены
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Попробуйте ослабить фильтры или сбросить поиск, чтобы увидеть все доступные устройства.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters(INITIAL_FILTERS)}
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      isCompared={comparedIds.includes(phone.id)}
                      onSelect={handleSelectPhone}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {activeView === 'categories' && (
          <CategoryAtlas
            onSelectCategory={handleSelectCategoryFromAtlas}
            categoryCounts={categoryCounts}
          />
        )}

        {activeView === 'compare' && (
          <CompareView
            allPhones={PHONES_DATA}
            comparedIds={comparedIds}
            onToggleCompare={handleToggleCompare}
            onSetCompareIds={setComparedIds}
            onSelectPhone={handleSelectPhone}
          />
        )}

        {activeView === 'glossary' && <GlossaryView />}

        {activeView === 'detail' && selectedPhone && (
          <PhoneDetailView
            phone={selectedPhone}
            isCompared={comparedIds.includes(selectedPhone.id)}
            onBack={() => handleNavigate('catalog')}
            onToggleCompare={handleToggleCompare}
            onOpenGlossary={() => handleNavigate('glossary')}
            onSelectRelated={handleSelectPhone}
            relatedPhones={relatedPhones}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-14">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-display font-semibold text-slate-900">СпекФон</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Справочник классов мобильных устройств и подробных технических характеристик</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => handleNavigate('catalog')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Каталог
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('categories')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Классы устройств
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('compare')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Сравнение
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('glossary')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Словарь
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
