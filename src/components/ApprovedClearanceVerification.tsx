import React from 'react';
import { POOL_BASIN, REST_ZONE, POOL_HALL_AREA_M2 } from '../data/approvedSpaPlanData';

export const ApprovedClearanceVerification: React.FC = () => {
  const clearances = [
    {
      direction: 'Восточный пляжный фронт (Справа)',
      code: 'CL-EAST',
      actualMm: POOL_BASIN.eastClearanceMm, // 4 000 mm
      normMm: 1500,
      marginMm: POOL_BASIN.eastClearanceMm - 1500, // +2 500 mm
      areaM2: REST_ZONE.eastLoungeAreaM2, // 64.0 m²
      status: 'passed',
      functionality: 'Шезлонги у витражного панорамного остекления, столики, зона солнечных ванн'
    },
    {
      direction: 'Северная лаундж-зона (Сверху)',
      code: 'CL-NORTH',
      actualMm: POOL_BASIN.northClearanceMm, // 4 000 mm
      normMm: 1500,
      marginMm: POOL_BASIN.northClearanceMm - 1500, // +2 500 mm
      areaM2: REST_ZONE.northLoungeAreaM2, // 40.0 m²
      status: 'passed',
      functionality: 'Двуспальные дейбеды, зона гидромассажа и релаксации'
    },
    {
      direction: 'Западный транзитный проход (Слева)',
      code: 'CL-WEST',
      actualMm: POOL_BASIN.westClearanceMm, // 2 000 mm
      normMm: 1500,
      marginMm: POOL_BASIN.westClearanceMm - 1500, // +500 mm
      areaM2: REST_ZONE.westPassageAreaM2, // 32.0 m²
      status: 'passed',
      functionality: 'Широкий коридор доступа к зоне отдыха (лаунджу) и термальным парным'
    },
    {
      direction: 'Южный обходной проход (Снизу)',
      code: 'CL-SOUTH',
      actualMm: POOL_BASIN.southClearanceMm, // 2 000 mm
      normMm: 1500,
      marginMm: POOL_BASIN.southClearanceMm - 1500, // +500 mm
      areaM2: REST_ZONE.southPassageAreaM2, // 20.0 m²
      status: 'passed',
      functionality: 'Сквозной выход на летнюю террасу через раздвижной панорамный портал D16'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-base font-bold text-white tracking-wide">
                ВЕРИФИКАЦИЯ ОБХОДНЫХ ПРОХОДОВ И ЗОНЫ ОТДЫХА БАССЕЙНА (10×10 М)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Согласно нормам СП 310.1325800.2017 (Бассейны) и ГОСТ Р 58458-2020 минимальная ширина обходной дорожки составляет 1 500 мм.
              В проекте заложены увеличенные проходы <strong>2 000 мм</strong> и просторные зоны отдыха <strong>4 000 мм</strong>, обеспечивающие комфорт бизнес-класса.
            </p>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-800 px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Пляжная зона вокруг чаши
            </span>
            <span className="text-2xl font-black text-white font-mono">
              {REST_ZONE.totalPoolHallSurroundAreaM2.toFixed(1)} м²
            </span>
            <span className="text-[11px] text-emerald-300 block">
              из {POOL_HALL_AREA_M2.toFixed(1)} м² зала (60.9%)
            </span>
          </div>
        </div>
      </div>

      {/* Clearance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clearances.map((c) => (
          <div
            key={c.code}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{c.direction}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  НОРМА ВЫПОЛНЕНА (+{c.marginMm} мм)
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-center font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">ФАКТ</span>
                  <span className="font-bold text-cyan-300 text-sm">{c.actualMm} мм</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">НОРМАТИВ</span>
                  <span className="font-medium text-slate-300 text-sm">{c.normMm} мм</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">ПЛОЩАДЬ</span>
                  <span className="font-bold text-emerald-400 text-sm">{c.areaM2.toFixed(1)} м²</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {c.functionality}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Код оси: {c.code}</span>
              <span className="text-emerald-400 font-medium">Безопасный двусторонний трафик</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
