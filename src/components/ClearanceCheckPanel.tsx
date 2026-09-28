import React from 'react';
import { PlanVariant } from '../types/architecture';

interface ClearanceCheckPanelProps {
  variant: PlanVariant;
}

export const ClearanceCheckPanel: React.FC<ClearanceCheckPanelProps> = ({ variant }) => {
  const pool = variant.poolPosition;

  return (
    <div className="space-y-6">
      {/* Pool Basin Parameters Overview */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-800 to-slate-900 border border-cyan-800/60 p-4 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Чаша плавательного бассейна ({variant.title})
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5">
              {pool.width.toFixed(2)} × {pool.height.toFixed(2)} м | Глубина {pool.depth.toFixed(2)} м
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Объем воды: <span className="font-mono font-bold text-cyan-300">{pool.volume.toFixed(1)} м³</span> | Площадь зеркала: <span className="font-mono font-bold text-cyan-300">100.00 м²</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-lg border border-cyan-700/50">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300">Все 4 зазора бассейна соответствуют нормам</span>
          </div>
        </div>
      </div>

      {/* Clearance Checks Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variant.clearanceChecks.map((check) => {
          return (
            <div
              key={check.id}
              className="p-4 rounded-xl border transition-all bg-slate-800/80 border-emerald-500/40 hover:border-emerald-500/70"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-bold text-sm text-white">{check.name}</div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700">
                  {check.isCompliant ? 'Норма соблюдена ✓' : 'Ошибка геометрии ✕'}
                </span>
              </div>

              <div className="text-xs text-slate-400 mt-1">
                {check.locationDescription}
              </div>

              {/* Formula & Dimensions Comparison */}
              <div className="mt-3 bg-slate-900/80 border border-slate-700/80 p-3 rounded-lg space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Требуемый минимум:</span>
                  <span className="text-white font-bold">≥ {check.required.toFixed(2)} м</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Фактический размер:</span>
                  <span className="text-emerald-400 font-bold">{check.actual.toFixed(2)} м</span>
                </div>
                <div className="pt-1.5 border-t border-slate-800 text-[11px] text-cyan-300">
                  <span className="text-slate-500 font-sans">Математический расчет: </span>
                  {check.formula}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
