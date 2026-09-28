import React, { useState } from 'react';
import { img } from '../../lib/assets';
import { PoolInteriorRender, PoolCausticsRender } from '../renders/ArchitecturalRenders';
import { ImageLightboxModal } from '../ImageLightboxModal';

interface Props {
  onExploreIn3D: (roomId: string) => void;
}

export const PoolScreen: React.FC<Props> = ({ onExploreIn3D }) => {
  const [activeTab, setActiveTab] = useState<'render' | 'water' | 'section'>('render');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col bg-stone-950 text-stone-100 select-none overflow-y-auto lg:overflow-hidden">
      {/* Top Floating Control Bar */}
      <div className="min-h-14 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 z-20 shrink-0">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
            05. МОНОЛИТНАЯ ЧАША БАССЕЙНА
          </span>
          <span className="text-stone-700 hidden md:inline">/</span>
          <span className="text-xs font-mono text-cyan-300 hidden md:inline">
            10.0 × 10.0 М • ЗЕРКАЛО 100 М² • ОБЪЁМ 160 М³
          </span>
        </div>

        {/* View Switcher & Action Button */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center bg-black/50 border border-white/10 p-0.5 sm:p-1 rounded-xl text-xs font-mono shrink-0">
            <button
              onClick={() => setActiveTab('render')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'render'
                  ? 'bg-white text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Фоторендер
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'water'
                  ? 'bg-white text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Вода
            </button>
            <button
              onClick={() => setActiveTab('section')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'section'
                  ? 'bg-white text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Разрез 1-1
            </button>
          </div>

          <button
            onClick={() => onExploreIn3D('room_pool_hall')}
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-semibold text-xs transition flex items-center gap-1.5 shrink-0 whitespace-nowrap"
          >
            <span>В 3D</span>
            <span>📐</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 w-full relative flex flex-col justify-between overflow-y-auto lg:overflow-hidden">
        {activeTab === 'render' ? (
          /* TAB 1: Cinematic Render View */
          <div className="w-full relative flex flex-col justify-between p-4 sm:p-8 lg:p-14 min-h-full">
            {/* Desktop Background */}
            <div className="hidden lg:block absolute inset-0 z-0 cursor-pointer" onClick={() => setLightboxOpen(true)}>
              <PoolInteriorRender className="w-full h-full" onExpand={() => setLightboxOpen(true)} />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Mobile Visual Header */}
            <div className="lg:hidden w-full h-56 sm:h-72 rounded-2xl overflow-hidden relative mb-5 shrink-0 border border-stone-800 shadow-2xl">
              <PoolInteriorRender className="w-full h-full" onExpand={() => setLightboxOpen(true)} />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 pointer-events-none" />
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-cyan-300 border border-white/10 text-xs font-mono hover:bg-white hover:text-stone-950 transition"
              >
                Увеличить фото ↗
              </button>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-xl space-y-3 sm:space-y-4 pt-1 lg:pt-6">
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase block">
                АКВА-КОМПЛЕКС • ГЛУБИНА 1.40 – 1.80 М
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white uppercase">
                Чаша бассейна
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                Монолитная железобетонная чаша 10 × 10 метров с переливом финского типа в едином уровне с полом.
                Панорамный трехсторонний витраж открывает вид на сосновый бор и южную террасу.
              </p>
              <button
                onClick={() => setLightboxOpen(true)}
                className="hidden lg:flex text-xs font-mono text-cyan-300 hover:underline items-center gap-1.5"
              >
                <span>Увеличить фотореалистичный рендер</span>
                <span>↗</span>
              </button>
            </div>

            {/* Bottom Technical Spec Strip (Grid on Mobile) */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 font-mono text-xs max-w-4xl mt-6 lg:mt-0">
              <div>
                <span className="text-stone-500 block text-[10px]">ГАБАРИТЫ ЗЕРКАЛА</span>
                <span className="text-sm sm:text-base font-bold text-white">10.00 × 10.00 м</span>
                <span className="text-stone-400 block text-[10px] sm:text-[11px]">Площадь 100.0 м²</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">ОБЪЁМ ВОДЫ</span>
                <span className="text-sm sm:text-base font-bold text-cyan-300">160.0 м³</span>
                <span className="text-stone-400 block text-[10px] sm:text-[11px]">Циркуляция 4 ч</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">ГЛУБИНА</span>
                <span className="text-sm sm:text-base font-bold text-amber-300">1.40 – 1.80 м</span>
                <span className="text-stone-400 block text-[10px] sm:text-[11px]">Уклон дна 3%</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">ПЛЯЖНАЯ ЗОНА</span>
                <span className="text-sm sm:text-base font-bold text-emerald-300">4.00 м лаундж</span>
                <span className="text-stone-400 block text-[10px] sm:text-[11px]">Травертин, шезлонги</span>
              </div>
            </div>
          </div>
        ) : activeTab === 'water' ? (
          /* TAB 2: Water Macro Caustics */
          <div className="w-full relative flex flex-col justify-between p-4 sm:p-8 lg:p-14 min-h-full">
            <div className="hidden lg:block absolute inset-0 z-0">
              <PoolCausticsRender className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 pointer-events-none" />
            </div>

            <div className="lg:hidden w-full h-56 sm:h-72 rounded-2xl overflow-hidden relative mb-5 shrink-0 border border-stone-800 shadow-2xl">
              <PoolCausticsRender className="w-full h-full" />
            </div>

            <div className="relative z-10 max-w-xl space-y-3 sm:space-y-4 pt-1 lg:pt-6">
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase block">
                ВОДНАЯ СТИХИЯ • СИСТЕМА ВОДОПОДГОТОВКИ
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white uppercase">
                Кристальное зеркало
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                Многоступенчатая фильтрация с ультрафиолетовой стерилизацией и песчано-гравийными кварцевыми фильтрами.
                Бесшумный перелив по всему периметру исключает образование волн и застойных зон.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 font-mono text-xs max-w-3xl mt-6 lg:mt-0">
              <div>
                <span className="text-stone-500 block text-[10px]">ТЕМПЕРАТУРА ВОДЫ</span>
                <span className="text-sm sm:text-base font-bold text-cyan-300">+28.0 °C</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">УФ-ДЕЗИНФЕКЦИЯ</span>
                <span className="text-sm sm:text-base font-bold text-emerald-300">100% без хлорного запаха</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">ПЕРЕЛИВНОЙ ЛОТОК</span>
                <span className="text-sm sm:text-base font-bold text-white">Скрытый щелевой монтаж</span>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 3: Architectural Engineering Cross-Section Drawing (Разрез 1-1) */
          <div className="w-full p-4 sm:p-8 lg:p-12 flex flex-col justify-center items-center overflow-x-auto bg-stone-900/60">
            <div className="w-full max-w-5xl min-w-[540px] bg-stone-950 p-5 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white font-sans">
                    АРХИТЕКТУРНЫЙ РАЗРЕЗ 1-1 ПО ЧАШЕ БАССЕЙНА 10×10 М
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-stone-400">
                    Утверждённый конструктивный профиль чаши со скрытым переливом и уклоном дна
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 rounded-lg shrink-0">
                  М 1:50
                </span>
              </div>

              {/* Section Drawing SVG */}
              <div className="w-full overflow-x-auto">
                <svg viewBox="0 0 1000 420" className="w-full h-auto text-stone-200 font-mono min-w-[500px]">
                  <rect x="50" y="320" width="900" height="60" fill="#1c1917" stroke="#44403c" strokeWidth="1" strokeDasharray="6 4" />
                  <text x="500" y="355" fill="#78716c" fontSize="12" textAnchor="middle">
                    ГРУНТОВОЕ ОСНОВАНИЕ И ПЕСЧАНО-ГРАВИЙНАЯ ПОДУШКА h=300 мм
                  </text>

                  <path
                    d="M 120 120 L 170 120 L 220 150 L 220 290 L 800 330 L 800 150 L 850 120 L 900 120 L 900 380 L 120 380 Z"
                    fill="#292524"
                    stroke="#57534e"
                    strokeWidth="2"
                  />

                  <rect x="170" y="120" width="50" height="30" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="800" y="120" width="50" height="30" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
                  <text x="145" y="105" fill="#38bdf8" fontSize="10">ПЕРЕЛИВ</text>
                  <text x="825" y="105" fill="#38bdf8" fontSize="10">ПЕРЕЛИВ</text>

                  <polygon
                    points="220,135 800,135 800,330 220,290"
                    fill="#0284c7"
                    fillOpacity="0.45"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />

                  <line x1="200" y1="135" x2="820" y2="135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 4" />
                  <text x="510" y="130" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    УРОВЕНЬ ВОДЫ: -0.150 м (ЗЕРКАЛО 100.0 м²)
                  </text>

                  <line x1="60" y1="120" x2="940" y2="120" stroke="#a8a29e" strokeWidth="1" />
                  <text x="90" y="112" fill="#e7e5e4" fontSize="11" fontWeight="bold">
                    УР. ЧИСТОГО ПОЛА ±0.000
                  </text>

                  <line x1="220" y1="290" x2="800" y2="330" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="250" y1="135" x2="250" y2="292" stroke="#f59e0b" strokeWidth="1" />
                  <text x="260" y="220" fill="#fbbf24" fontSize="11" fontWeight="bold">H = 1.40 м</text>

                  <line x1="770" y1="135" x2="770" y2="328" stroke="#f59e0b" strokeWidth="1" />
                  <text x="710" y="240" fill="#fbbf24" fontSize="11" fontWeight="bold">H = 1.80 м</text>

                  <line x1="220" y1="100" x2="800" y2="100" stroke="#e0f2fe" strokeWidth="1.5" />
                  <text x="510" y="90" fill="#e0f2fe" fontSize="13" fontWeight="bold" textAnchor="middle">
                    ШИРИНА ЧАШИ 10 000 мм (10.0 МЕТРОВ)
                  </text>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={img('images/pool_hall_10x10.jpg')}
        title="Бассейновый зал • 256.0 м² • Чаша 10.0 × 10.0 м"
        subtitle="Панорамное витражное остекление в пол • Травертин R11 • Переливной лоток"
        specs={[
          'Габариты чаши: 10.00 × 10.00 м',
          'Зеркало воды: 100.0 м²',
          'Объём воды: 160.0 м³',
          'Глубина: переменная 1.40 – 1.80 м',
          'Температура воды: +28.0 °C'
        ]}
      />
    </div>
  );
};
