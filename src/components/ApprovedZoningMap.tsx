import React from 'react';
import { FUNCTIONAL_ZONES, TOTAL_GROSS_AREA } from '../data/approvedSpaPlanData';

export const ApprovedZoningMap: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          ФУНКЦИОНАЛЬНОЕ ЗОНИРОВАНИЕ СПА-КОМПЛЕКСА (30.2 × 16.0 М)
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Грамотная логистика потоков: раздельные мужские и женские раздевальные и санитарные блоки, центральный лаундж и изолированный бассейновый зал
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FUNCTIONAL_ZONES.map((zone) => {
          const share = ((zone.area / TOTAL_GROSS_AREA) * 100).toFixed(1);
          return (
            <div
              key={zone.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="w-3.5 h-3.5 rounded-md flex-shrink-0"
                    style={{ backgroundColor: zone.color, border: `1px solid ${zone.borderColor}` }}
                  />
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {share}% от здания
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-2">
                  {zone.name}
                </h4>

                <div className="text-xl font-extrabold text-white mt-1">
                  {zone.area.toFixed(1)} м²
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Входящие помещения:
                  </div>
                  <ul className="space-y-1">
                    {zone.rooms.map((r, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
