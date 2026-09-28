import React from 'react';
import { PlanVariant } from '../types/architecture';
import { TOTAL_GROSS_AREA, BUILDING_WIDTH, BUILDING_HEIGHT } from '../data/variantsData';

interface AreaBalanceTableProps {
  variant: PlanVariant;
}

export const AreaBalanceTable: React.FC<AreaBalanceTableProps> = ({ variant }) => {
  const totalNetCalculated = variant.rooms.reduce((acc, r) => acc + r.area, 0);
  const wallsCalculated = TOTAL_GROSS_AREA - totalNetCalculated;

  return (
    <div className="space-y-6">
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Габариты здания</div>
          <div className="text-xl font-bold text-white mt-1">
            {BUILDING_WIDTH.toFixed(2)} × {BUILDING_HEIGHT.toFixed(2)} м
          </div>
          <div className="text-xs text-slate-400 mt-0.5">В осях наружных стен</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Общая площадь (Gross)</div>
          <div className="text-xl font-bold text-cyan-400 mt-1">
            {TOTAL_GROSS_AREA.toFixed(2)} м²
          </div>
          <div className="text-xs text-slate-400 mt-0.5">100.0% от застройки</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Полезная площадь (Net)</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {totalNetCalculated.toFixed(2)} м²
          </div>
          <div className="text-xs text-emerald-400/80 mt-0.5">
            {((totalNetCalculated / TOTAL_GROSS_AREA) * 100).toFixed(1)}% чистая площадь
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Стены и перегородки</div>
          <div className="text-xl font-bold text-amber-400 mt-1">
            {wallsCalculated.toFixed(2)} м²
          </div>
          <div className="text-xs text-amber-400/80 mt-0.5">
            {((wallsCalculated / TOTAL_GROSS_AREA) * 100).toFixed(1)}% толщина стен (300/150 мм)
          </div>
        </div>
      </div>

      {/* Room-by-Room Geometric Calculations Table */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Экспликация помещений и геометрический расчет ({variant.title})
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">
              Площади вычислены математически из фактических размеров длины и ширины (без подгонки)
            </div>
          </div>
          <span className="text-xs text-cyan-300 font-mono font-bold">
            12 помещений
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700/80 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4">№ и Помещение</th>
                <th className="py-3 px-3">Категория</th>
                <th className="py-3 px-3 text-right">Длина, м</th>
                <th className="py-3 px-3 text-right">Ширина, м</th>
                <th className="py-3 px-3 text-right">Формула</th>
                <th className="py-3 px-4 text-right">Площадь, м²</th>
                <th className="py-3 px-4 text-right">Доля в Gross</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-slate-200">
              {variant.rooms.map((room) => {
                const percent = ((room.area / TOTAL_GROSS_AREA) * 100).toFixed(1);
                return (
                  <tr key={room.id} className="hover:bg-slate-700/40 transition">
                    <td className="py-3 px-4 font-medium flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: room.borderColor }} />
                      <span className="text-white">{room.name}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        room.category === 'pool' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                        room.category === 'bath' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        room.category === 'tech' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        room.category === 'lounge' ? 'bg-yellow-950 text-yellow-300 border border-yellow-800' :
                        'bg-slate-700 text-slate-300 border border-slate-600'
                      }`}>
                        {room.category === 'pool' ? 'Бассейн' :
                         room.category === 'bath' ? 'Банный блок' :
                         room.category === 'tech' ? 'Технический' :
                         room.category === 'lounge' ? 'Lounge' : 'Сервисный'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{room.width.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{room.height.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">
                      {room.width.toFixed(2)} × {room.height.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-cyan-300">
                      {room.area.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">
                      {percent}%
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-slate-900/90 font-bold border-t-2 border-slate-600 text-white">
                <td colSpan={5} className="py-3.5 px-4 text-right uppercase tracking-wider text-xs">
                  Итого чистая площадь помещений (Net):
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm text-emerald-400">
                  {totalNetCalculated.toFixed(2)} м²
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-300">
                  {((totalNetCalculated / TOTAL_GROSS_AREA) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
