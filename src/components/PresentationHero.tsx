import React from 'react';
import {
  BUILDING_WIDTH,
  BUILDING_HEIGHT,
  TOTAL_GROSS_AREA,
  TOTAL_COMPLEX_AREA_WITH_TERRACE_M2,
  POOL_BASIN
} from '../data/approvedSpaPlanData';

interface Props {
  onExplorePlan: () => void;
  onExplore3D: () => void;
}

export const PresentationHero: React.FC<Props> = ({ onExplorePlan, onExplore3D }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-12 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle architectural ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-900/15 via-blue-900/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Top category kicker */}
      <div className="relative z-10 pt-8 sm:pt-14 space-y-4">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-slate-400 font-mono">
          <span>Архитектурный прототип</span>
          <span className="text-slate-600">·</span>
          <span>Чертеж BK-26-003-KR</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400">Master Model 1:1</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white max-w-5xl leading-[1.08]">
          Банный термальный комплекс <br className="hidden sm:inline" />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
            премиального уровня
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl font-normal leading-relaxed pt-2">
          Гармония чистой геометрии 30.2 × 16.0 м, монолитного бассейна 100 м² и раздельных мужского и женского термальных маршрутов. 
          Единый математический мастер-план с нулевым отклонением между 2D чертежом и 3D моделью.
        </p>
      </div>

      {/* Centerpiece Architectural Elevation Silhouette & Quick Visual */}
      <div className="relative z-10 my-8 sm:my-12 p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
          {/* Architectural Drawing Wireframe Schema */}
          <div className="flex-1 flex flex-col justify-center space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono border-b border-slate-800 pb-3">
              <span>ПРОСТРАНСТВЕННАЯ КОМПОЗИЦИЯ ФАСАДА (ЮЖНАЯ СТОРОНА)</span>
              <span className="text-slate-400">30 200 × 16 000 мм</span>
            </div>

            {/* Facade Schema SVG */}
            <svg viewBox="0 0 960 220" className="w-full h-auto text-slate-300">
              {/* Roof overhang & canopy */}
              <line x1="20" y1="40" x2="940" y2="40" stroke="currentColor" strokeWidth="2.5" />
              <rect x="20" y="32" width="920" height="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              
              {/* Main building block (Left: Service block 14.2m, Right: Pool Hall 16.0m) */}
              {/* Left Service Block (0..448px) */}
              <rect x="50" y="40" width="418" height="130" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <text x="259" y="85" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="monospace">
                БАННО-СЕРВИСНЫЙ БЛОК
              </text>
              <text x="259" y="105" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">
                14.2 × 16.0 м (227.2 м²)
              </text>
              {/* Entrance portal */}
              <rect x="70" y="110" width="60" height="60" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="100" y="145" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">ВХОД</text>

              {/* Dividing Axis X = 14200 */}
              <line x1="468" y1="30" x2="468" y2="185" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="468" y="25" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                ОСЬ X = 14 200 мм
              </text>

              {/* Right Pool Hall (468..910px) */}
              <rect x="468" y="40" width="442" height="130" fill="#0c1b2f" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Panoramic Glazing Panels */}
              {[490, 560, 630, 700, 770, 840].map((gx, idx) => (
                <rect key={idx} x={gx} y="55" width="55" height="115" fill="#172e48" stroke="#38bdf8" strokeWidth="0.75" opacity="0.6" />
              ))}
              <text x="689" y="90" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">
                БАССЕЙНОВЫЙ ЗАЛ С ПАНОРАМНЫМ ВИТРАЖОМ
              </text>
              <text x="689" y="110" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="monospace">
                16.0 × 16.0 м (256.0 м²) • ЧАША 10 × 10 м
              </text>

              {/* Ground & Terrace Line */}
              <line x1="10" y1="170" x2="950" y2="170" stroke="#64748b" strokeWidth="2" />
              {/* Terrace Decking */}
              <rect x="30" y="170" width="900" height="14" fill="#382920" stroke="#78350f" strokeWidth="1" />
              <text x="480" y="181" textAnchor="middle" fill="#d97706" fontSize="10" fontFamily="monospace">
                КРЫТАЯ ЮЖНАЯ ТЕРРАСА 30.2 × 4.0 м (120.8 м²)
              </text>

              {/* Dimension marks */}
              <line x1="50" y1="205" x2="910" y2="205" stroke="#94a3b8" strokeWidth="1" />
              <text x="480" y="218" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="monospace" fontWeight="bold">
                ОБЩИЙ ГАБАРИТ ЗДАНИЯ: 30 200 мм (30.2 м)
              </text>
            </svg>
          </div>

          {/* Quick Action Column */}
          <div className="lg:w-80 flex flex-col justify-between bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">
                Спецификация объекта
              </span>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline border-b border-slate-800/80 pb-2">
                  <span className="text-xs text-slate-400">Габариты здания:</span>
                  <span className="text-sm font-semibold text-white font-mono">{BUILDING_WIDTH} × {BUILDING_HEIGHT} м</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-800/80 pb-2">
                  <span className="text-xs text-slate-400">Тёплый контур:</span>
                  <span className="text-sm font-semibold text-cyan-400 font-mono">{TOTAL_GROSS_AREA.toFixed(1)} м²</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-800/80 pb-2">
                  <span className="text-xs text-slate-400">С южной террасой:</span>
                  <span className="text-sm font-semibold text-amber-300 font-mono">{TOTAL_COMPLEX_AREA_WITH_TERRACE_M2.toFixed(1)} м²</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-800/80 pb-2">
                  <span className="text-xs text-slate-400">Чаша бассейна:</span>
                  <span className="text-sm font-semibold text-sky-400 font-mono">{POOL_BASIN.widthMm/1000} × {POOL_BASIN.lengthMm/1000} м ({POOL_BASIN.volumeM3} м³)</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Раздевалки:</span>
                  <span className="text-sm font-semibold text-emerald-400 font-mono">Мужская и Женская</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-2.5">
              <button
                onClick={onExplorePlan}
                className="w-full py-3 px-4 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-colors shadow-lg shadow-white/5 flex items-center justify-center gap-2"
              >
                <span>Изучить 2D план</span>
                <span>→</span>
              </button>
              <button
                onClick={onExplore3D}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 text-slate-200 font-medium text-sm hover:bg-slate-700 transition-colors border border-slate-700 flex items-center justify-center gap-2"
              >
                <span>Открыть 3D модель</span>
                <span>📐</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Metrics Band (Clean Unboxed Typography) */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
        <div>
          <span className="text-xs text-slate-400 font-mono block">ТЁПЛАЯ ПЛОЩАДЬ</span>
          <span className="text-2xl sm:text-3xl font-light text-white tracking-tight font-mono tabular-nums">
            {TOTAL_GROSS_AREA.toFixed(1)} <span className="text-base text-slate-400 font-sans">м²</span>
          </span>
          <span className="text-xs text-slate-400 mt-1 block">100% полезного объёма</span>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-mono block">БАССЕЙН 10×10 М</span>
          <span className="text-2xl sm:text-3xl font-light text-cyan-400 tracking-tight font-mono tabular-nums">
            {POOL_BASIN.volumeM3.toFixed(0)} <span className="text-base text-slate-400 font-sans">м³</span>
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Глубина 1.40 – 1.80 м</span>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-mono block">БАННЫЙ ФРОНТ</span>
          <span className="text-2xl sm:text-3xl font-light text-amber-300 tracking-tight font-mono tabular-nums">
            3 <span className="text-base text-slate-400 font-sans">парные</span>
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Хамам · Сауна · Парная</span>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-mono block">РАЗДЕВАЛКИ М/Ж</span>
          <span className="text-2xl sm:text-3xl font-light text-emerald-400 tracking-tight font-mono tabular-nums">
            49.5 <span className="text-base text-slate-400 font-sans">м²</span>
          </span>
          <span className="text-xs text-slate-400 mt-1 block">2 независимых контура</span>
        </div>
      </div>
    </section>
  );
};
