import React from 'react';
import { Scale } from 'lucide-react';

export type AppView = 'catalog' | 'categories' | 'compare' | 'glossary' | 'detail';

interface HeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  compareCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  compareCount,
}) => {
  const navItems: { id: AppView; label: string }[] = [
    { id: 'catalog', label: 'Каталог' },
    { id: 'categories', label: 'Классы устройств' },
    { id: 'compare', label: 'Сравнение' },
    { id: 'glossary', label: 'Словарь' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('catalog')}
          className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] cursor-pointer"
        >
          СпекФон
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive =
              activeView === item.id ||
              (item.id === 'catalog' && activeView === 'detail');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`py-1.5 border-b-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] ${
                  isActive
                    ? 'border-[#2563EB] text-slate-900 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('compare')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <Scale className="w-4 h-4 shrink-0" />
            <span className="tabular-nums">Сравнить ({compareCount})</span>
          </button>
        </div>
      </div>

      {/* Compact mobile nav bar */}
      <nav
        aria-label="Мобильная навигация"
        className="flex md:hidden items-center justify-between gap-2 px-4 py-2 border-t border-slate-100 overflow-x-auto"
      >
        {navItems.map((item) => {
          const isActive =
            activeView === item.id ||
            (item.id === 'catalog' && activeView === 'detail');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
