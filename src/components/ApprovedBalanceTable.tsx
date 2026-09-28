import React from 'react';
import {
  ARCHITECTURAL_ROOMS,
  SERVICE_BLOCK_AREA_M2,
  POOL_HALL_AREA_M2,
  TOTAL_BUILDING_AREA_M2,
  BUILDING_WIDTH,
  BUILDING_HEIGHT,
  POOL_BASIN,
  REST_ZONE,
  TERRACE_DEPTH_MM,
  TOTAL_COMPLEX_AREA_WITH_TERRACE_M2,
  localToDxf
} from '../data/approvedSpaPlanData';

export const ApprovedBalanceTable: React.FC = () => {
  const serviceRooms = ARCHITECTURAL_ROOMS.filter(r => r.category !== 'pool');
  const serviceNetTotal = serviceRooms.reduce((acc, r) => acc + r.areaM2, 0);

  return (
    <div className="space-y-6">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Габарит теплого контура
          </span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">
            {BUILDING_WIDTH.toFixed(2)} × {BUILDING_HEIGHT.toFixed(2)} м
          </span>
          <span className="text-xs text-slate-400 mt-0.5 block">
            Общая площадь: <strong className="text-cyan-300">{TOTAL_BUILDING_AREA_M2.toFixed(1)} м²</strong> (+ терраса 120.8 м²)
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Банно-сервисный блок
          </span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
            14.20 × 16.00 м
          </span>
          <span className="text-xs text-slate-400 mt-0.5 block">
            Площадь блока: <strong className="text-amber-300">{SERVICE_BLOCK_AREA_M2.toFixed(1)} м²</strong> (чистая: {serviceNetTotal.toFixed(2)} м²)
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Бассейновый зал
          </span>
          <span className="text-2xl font-black text-sky-400 font-mono mt-1 block">
            16.00 × 16.00 м
          </span>
          <span className="text-xs text-slate-400 mt-0.5 block">
            Площадь зала: <strong className="text-sky-300">{POOL_HALL_AREA_M2.toFixed(1)} м²</strong> (пляж + чаша)
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Бассейн + Пляж
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
            10.0 × 10.0 м
          </span>
          <span className="text-xs text-slate-400 mt-0.5 block">
            Чаша: <strong className="text-emerald-300">{POOL_BASIN.areaM2.toFixed(0)} м²</strong> | Пляж: <strong className="text-emerald-300">{REST_ZONE.totalPoolHallSurroundAreaM2.toFixed(0)} м²</strong>
          </span>
        </div>
      </div>

      {/* DETAILED EXPLICATION TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              ЭКСПЛИКАЦИЯ ПОМЕЩЕНИЙ И ПРИВЯЗКА DXF (ОРИГИНАЛЬНЫЙ ЧЕРТЕЖ BK-26-003-KR)
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">
              Origin DXF: X = 4742.892832, Y = 2214.962910 | Масштаб: Local = (DXF - Origin) × 50
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
            Баланс сходимости: 100.0% (Δ = 0.00 м²)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-semibold tracking-wider font-mono">
              <tr>
                <th className="py-3 px-3 text-center">№</th>
                <th className="py-3 px-4">Наименование помещения</th>
                <th className="py-3 px-3">Функциональная зона</th>
                <th className="py-3 px-3 text-center">Локальные координаты (мм)</th>
                <th className="py-3 px-3 text-center">DXF координаты (units)</th>
                <th className="py-3 px-3 text-right">Ширина × Длина (мм)</th>
                <th className="py-3 px-3 text-right font-bold text-cyan-300">Площадь (м²)</th>
                <th className="py-3 px-4">Комплектация и оснащение</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {ARCHITECTURAL_ROOMS.map((room) => {
                const minDxf = localToDxf(room.xMin, room.yMin);
                const maxDxf = localToDxf(room.xMax, room.yMax);
                return (
                  <tr key={room.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 text-center font-bold text-cyan-400 font-mono">
                      {room.num}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {room.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {room.zoneName}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[11px] text-cyan-300">
                      X: {room.xMin}..{room.xMax}<br />
                      Y: {room.yMin}..{room.yMax}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[11px] text-amber-300">
                      X: {minDxf.dxfX.toFixed(2)}..{maxDxf.dxfX.toFixed(2)}<br />
                      Y: {minDxf.dxfY.toFixed(2)}..{maxDxf.dxfY.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {room.widthMm.toLocaleString()} × {room.lengthMm.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-cyan-300 text-sm">
                      {room.areaM2.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] max-w-xs truncate">
                      {room.features[0] || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-950 font-bold border-t border-slate-800 text-white font-mono">
              <tr>
                <td colSpan={6} className="py-3 px-4 text-right">
                  ИТОГО ТЕПЛЫЙ КОНТУР ЗДАНИЯ:
                </td>
                <td className="py-3 px-3 text-right text-emerald-400 text-base">
                  {TOTAL_BUILDING_AREA_M2.toFixed(2)} м²
                </td>
                <td className="py-3 px-4 text-slate-400 font-sans text-xs">
                  Габарит 30 200 × 16 000 мм (100% заполнение объема)
                </td>
              </tr>
              <tr>
                <td colSpan={6} className="py-3 px-4 text-right text-amber-300">
                  + ЛЕТНЯЯ ТЕРРАСА С НАВЕСОМ (30.20 × 4.00 М):
                </td>
                <td className="py-3 px-3 text-right text-amber-400 text-base">
                  120.80 м²
                </td>
                <td className="py-3 px-4 text-slate-400 font-sans text-xs">
                  Общая площадь застройки с террасой: {TOTAL_COMPLEX_AREA_WITH_TERRACE_M2.toFixed(2)} м²
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
