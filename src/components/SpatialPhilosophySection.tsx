import React from 'react';
import {
  SERVICE_BLOCK_AREA_M2,
  POOL_HALL_AREA_M2,
  POOL_BASIN,
  TOTAL_GROSS_AREA,
  TOTAL_COMPLEX_AREA_WITH_TERRACE_M2
} from '../data/approvedSpaPlanData';

export const SpatialPhilosophySection: React.FC = () => {
  return (
    <section id="spatial" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono">
          <span>01. Архитектурная композиция</span>
          <span className="text-slate-600">·</span>
          <span>Пространственное равновесие</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Два мира под одной кровлей: <br />
          <span className="font-semibold text-slate-200">Банный блок и Аква-зал</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
          Здание разделено на два пропорциональных пространства строго по вертикальной оси X = 14 200 мм.
          Все инженерные, санитарные и паровые процессы изолированы в западном блоке, оставляя восточный зал
          непрерывным световым объёмом с водой.
        </p>
      </div>

      {/* Spatial Division Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Block A: Service & Bath */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                Западный сектор • X: 0..14 200 мм
              </span>
              <span className="text-sm font-mono text-slate-400">{SERVICE_BLOCK_AREA_M2.toFixed(1)} м²</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">Банно-сервисный комплекс</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Компактная, логистически выверенная планировка без мёртвых зон. Включает автономную входную группу,
              два изолированных сантехнических тракта (мужской и женский) и верхний термальный фронт из трёх парных.
            </p>

            <div className="pt-4 space-y-2.5">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Мужской и женский маршруты:</strong> раздевалки по 24.75 м² с прямым доступом в душевые и санузлы</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Термальная линия:</strong> Хамам (18 м²), Финская сауна (18 м²), Русская парная (20 м²)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Зона отдыха:</strong> сквозной лаундж 14.2 × 3.0 м (42.6 м²) с фито-баром и доступом к бассейну</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Габариты блока: 14.20 × 16.00 м</span>
            <span className="text-amber-400/90 font-semibold">47% площади контура</span>
          </div>
        </div>

        {/* Block B: Pool Hall */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Восточный сектор • X: 14 200..30 200 мм
              </span>
              <span className="text-sm font-mono text-slate-400">{POOL_HALL_AREA_M2.toFixed(1)} м²</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">Бассейновый зал</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Монументальное квадратное пространство 16.0 × 16.0 м с трёхсторонним панорамным остеклением в пол.
              Центральное место занимает квадратная монолитная чаша 10.0 × 10.0 м с переливным желобом и переменной глубиной.
            </p>

            <div className="pt-4 space-y-2.5">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span><strong>Зеркало воды 100 м²:</strong> 160 м³ тёплой фильтрованной воды с римским сходом и гидромассажем</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span><strong>Нормативные проходы:</strong> 2.0 м со стороны входа и юга, 4.0 м для шезлонгов у восточного витража</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span><strong>Пляжная терраса:</strong> прямой выход через раздвижные стеклянные порталы на южный декинг</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Габариты зала: 16.00 × 16.00 м</span>
            <span className="text-cyan-400/90 font-semibold">53% площади контура</span>
          </div>
        </div>
      </div>

      {/* Visitor Journey Flow Line */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <h4 className="text-lg font-semibold text-white">Логика перемещения гостей (Clean Circulation Flow)</h4>
          <span className="text-xs font-mono text-slate-400">СП 118.13330 / СП 310.1325800</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">ШАГ 01</span>
            <div className="font-semibold text-white text-sm">Тамбур и Ресепшен</div>
            <p className="text-[11px] text-slate-400">Тепловая завеса, регистрация, гардероб верхней одежды</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">ШАГ 02</span>
            <div className="font-semibold text-white text-sm">Раздевалки М / Ж</div>
            <p className="text-[11px] text-slate-400">Индивидуальные шкафчики, зеркала, переодевание</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">ШАГ 03</span>
            <div className="font-semibold text-white text-sm">Душевые и С/У</div>
            <p className="text-[11px] text-slate-400">Обязательный санитарный барьер перед бассейновой зоной</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">ШАГ 04</span>
            <div className="font-semibold text-white text-sm">Зона отдыха и чайный бар</div>
            <p className="text-[11px] text-slate-400">Центральный распределительный лаундж 42.6 м²</p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 space-y-1">
            <span className="text-[11px] font-mono text-cyan-400 block">ШАГ 05</span>
            <div className="font-semibold text-cyan-300 text-sm">Парные и Бассейн</div>
            <p className="text-[11px] text-slate-400">Хамам, Сауна, Русская парная и плавательный бассейн 10×10 м</p>
          </div>
        </div>
      </div>
    </section>
  );
};
