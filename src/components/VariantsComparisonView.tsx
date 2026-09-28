import React from 'react';
import { ALL_VARIANTS } from '../data/variantsData';
import { PlanVariant } from '../types/architecture';

interface VariantsComparisonViewProps {
  onSelectVariant: (variantId: 'variant_a' | 'variant_b' | 'variant_c') => void;
  activeVariantId: string;
}

export const VariantsComparisonView: React.FC<VariantsComparisonViewProps> = ({
  onSelectVariant,
  activeVariantId
}) => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-5 rounded-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-cyan-400" />
          Сравнительный анализ 3-х архитектурных концепций SPA-комплекса 20×15 м
        </h2>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
          Все 3 варианта строго вписаны в габариты 20.00 × 15.00 м (300 м²), включают чашу бассейна 10.00 × 10.00 м (h=1.40 м, 140 м³), полный состав из 12 помещений, изолированный техблок с отдельным входом и соблюдение санитарно-гигиенического шлюза (Раздевалка $\rightarrow$ Душ $\rightarrow$ Парные/Бассейн).
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {ALL_VARIANTS.map((v) => {
          const isActive = activeVariantId === v.id;
          return (
            <div
              key={v.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                isActive
                  ? 'bg-slate-800 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500'
                  : 'bg-slate-900/80 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="space-y-4">
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {v.id === 'variant_a' ? 'Концепт А' : v.id === 'variant_b' ? 'Концепт Б' : 'Концепт В'}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                      {v.title.split(':')[1] || v.title}
                    </h3>
                  </div>
                  {isActive && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-700 whitespace-nowrap">
                      Текущий просмотр
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {v.conceptDescription}
                </p>

                {/* Key Metric Badge */}
                <div className="bg-slate-950/70 border border-slate-700/80 p-3 rounded-lg space-y-1 text-xs">
                  <div className="text-cyan-400 font-semibold font-mono text-[11px]">
                    ★ Ключевое отличие:
                  </div>
                  <div className="text-slate-200 text-xs font-medium">
                    {v.keyFeature}
                  </div>
                </div>

                {/* Quantitative Data */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Зона отдыха (Lounge)</div>
                    <div className="text-amber-400 font-bold">{v.loungeZone.area.toFixed(1)} м²</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Бассейн 10×10 м</div>
                    <div className="text-cyan-400 font-bold">100.0 м² (140 м³)</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Боковые проходы</div>
                    <div className="text-emerald-400 font-bold">
                      {v.clearanceChecks.find(c => c.id.includes('north'))?.actual.toFixed(2)} / {v.clearanceChecks.find(c => c.id.includes('south'))?.actual.toFixed(2)} м
                    </div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Торцевые проходы</div>
                    <div className="text-emerald-400 font-bold">
                      {v.clearanceChecks.find(c => c.id.includes('west'))?.actual.toFixed(2)} / {v.clearanceChecks.find(c => c.id.includes('east'))?.actual.toFixed(2)} м
                    </div>
                  </div>
                </div>

                {/* Pros List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Преимущества:
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {v.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    Особенности / Минусы:
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {v.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">!</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-700">
                <button
                  onClick={() => onSelectVariant(v.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <span>{isActive ? '✓ Открыт на плане' : 'Показать 2D-план варианта'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
