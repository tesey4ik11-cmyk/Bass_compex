import React from 'react';
import { ARCHITECTURAL_DOORS, localToDxf } from '../data/approvedSpaPlanData';

export const ApprovedDoorsSchedule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              ВЕДОМОСТЬ ДВЕРНЫХ ПРОЁМОВ И ПОРТАЛОВ D1–D16
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">
              Включает главный вход, раздельные входы в мужскую/женскую раздевалки и душевые, парные и террасу
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300">
            {ARCHITECTURAL_DOORS.length} проёмов
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-semibold tracking-wider font-mono">
              <tr>
                <th className="py-3 px-3 text-center">Код</th>
                <th className="py-3 px-4">Назначение проёма</th>
                <th className="py-3 px-3">Откуда → Куда</th>
                <th className="py-3 px-3 text-center">Локальные (X; Y) мм</th>
                <th className="py-3 px-3 text-center">DXF (X; Y)</th>
                <th className="py-3 px-3 text-right">Ширина</th>
                <th className="py-3 px-3">Тип дверного блока</th>
                <th className="py-3 px-3">Распахивание</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200 font-mono">
              {ARCHITECTURAL_DOORS.map((door) => {
                const dxfPos = localToDxf(door.xMm, door.yMm);
                return (
                  <tr key={door.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 text-center font-bold text-amber-400">
                      {door.code}
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-white">
                      {door.name}
                    </td>
                    <td className="py-3 px-3 text-slate-300 text-[11px] font-sans">
                      {door.fromRoom} → {door.toRoom}
                    </td>
                    <td className="py-3 px-3 text-center text-cyan-300 text-[11px]">
                      X={door.xMm.toLocaleString()}; Y={door.yMm.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center text-amber-300 text-[11px]">
                      {dxfPos.dxfX.toFixed(2)}; {dxfPos.dxfY.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-cyan-300">
                      {door.widthMm} мм
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans text-[11px]">
                      {door.type === 'main' ? 'Утепленная с терморазрывом' :
                       door.type === 'tech' ? 'Стальная противопожарная EI60' :
                       door.type === 'thermal' ? 'Закаленное термостекло 8 мм' :
                       door.type === 'portal' ? 'Открытый световой портал' :
                       'Влагостойкая межкомнатная'}
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-sans text-[11px]">
                      {door.swing === 'outward' ? 'Наружу по эвакуации' :
                       door.swing === 'inward' ? 'Внутрь помещения' :
                       door.swing === 'portal' ? 'Свободный проход' :
                       door.swing === 'right' ? 'Правое открывание' : 'Левое открывание'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
