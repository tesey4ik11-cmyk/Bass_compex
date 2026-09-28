import React, { useState } from 'react';
import { ApprovedBalanceTable } from './ApprovedBalanceTable';
import { ApprovedClearanceVerification } from './ApprovedClearanceVerification';
import { ApprovedDoorsSchedule } from './ApprovedDoorsSchedule';
import { DxfCoordinateInspector } from './DxfCoordinateInspector';

export const EngineeringBalanceSection: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<'balance' | 'clearances' | 'doors' | 'dxf'>('balance');

  return (
    <section id="engineering" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono">
            <span>05. Инженерный архив</span>
            <span className="text-slate-600">·</span>
            <span>Технические расчёты</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Баланс площадей <br />
            <span className="font-semibold text-slate-200">и инженерные ведомости</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Полный комплект конструкторской документации: расчет баланса площадей теплого и холодного контуров,
            проверка нормативных ширин проходов по СП 310.1325800, спецификация дверных блоков и калькулятор пересчёта DXF-координат.
          </p>
        </div>

        {/* Sheet Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl shrink-0 overflow-x-auto">
          {[
            { id: 'balance', label: '📊 Баланс площадей' },
            { id: 'clearances', label: '🚪 Нормативные проходы' },
            { id: 'doors', label: '🚪 Ведомость дверей' },
            { id: 'dxf', label: '📐 Координаты DXF' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSheet(s.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                activeSheet === s.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Technical Sheet View */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-10 shadow-2xl">
        {activeSheet === 'balance' && <ApprovedBalanceTable />}
        {activeSheet === 'clearances' && <ApprovedClearanceVerification />}
        {activeSheet === 'doors' && <ApprovedDoorsSchedule />}
        {activeSheet === 'dxf' && <DxfCoordinateInspector />}
      </div>
    </section>
  );
};
