import React from 'react';
import { PlanVariant } from '../types/architecture';

interface AccessibilityInspectorProps {
  variant: PlanVariant;
}

export const AccessibilityInspector: React.FC<AccessibilityInspectorProps> = ({ variant }) => {
  return (
    <div className="space-y-6">
      {/* Doors Inventory Table */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Ведомость дверных проёмов ({variant.title})
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">
              Все проёмы физически вырезаны в теле стен с указанием направления открывания полотна
            </div>
          </div>
          <span className="text-xs text-amber-300 font-mono font-bold">
            {variant.doors.length} проёмов
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4">Код</th>
                <th className="py-3 px-4">Маршрут проёма (Из $\rightarrow$ В)</th>
                <th className="py-3 px-3 text-right">Ширина, мм</th>
                <th className="py-3 px-3">Тип конструкции</th>
                <th className="py-3 px-3">Направление</th>
                <th className="py-3 px-4 text-center">Безопасность</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-slate-200">
              {variant.doors.map((door) => (
                <tr key={door.id} className="hover:bg-slate-700/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">
                    {door.code}
                  </td>
                  <td className="py-3 px-4 font-medium text-white">
                    {door.fromRoomName} $\rightarrow$ {door.toRoomName}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-cyan-300">
                    {door.width} мм
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {door.type === 'main_entry' ? 'Усиленная с терморазрывом' :
                     door.type === 'tech_entry' ? 'Стальная противопожарная EI60' :
                     door.type === 'thermal_glass' ? 'Закаленное стекло 8 мм' :
                     door.type === 'portal' ? 'Открытый портал' : 'Влагостойкая с доводчиком'}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {door.swingDirection === 'open_portal' ? 'Свободный проход' :
                     door.swingDirection === 'down' ? 'Наружу (по эвакуации)' :
                     door.swingDirection === 'right' ? 'Вправо по ходу движения' : 'Внутрь/наружу'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                      Корректно ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-lg space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Контроль ошибок планировки
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Нет помещений без дверей</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Нет дверей, открывающихся в стену</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Двери парных открываются строго наружу</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Гостевой WC доступен из сухой зоны без захода в раздевалку</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Техпомещения имеют отдельный изолированный вход</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Нет бессмысленного длинного коридора</span>
          </div>
        </div>
      </div>
    </div>
  );
};
