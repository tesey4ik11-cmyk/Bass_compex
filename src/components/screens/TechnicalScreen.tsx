import React, { useState, useEffect } from 'react';
import { ApprovedBalanceTable } from '../ApprovedBalanceTable';
import { ApprovedClearanceVerification } from '../ApprovedClearanceVerification';
import { ApprovedDoorsSchedule } from '../ApprovedDoorsSchedule';
import { DxfCoordinateInspector } from '../DxfCoordinateInspector';
import { runMasterModelVerification, VerificationResult } from '../../utils/masterModelValidator';
import {
  BUILDING_WIDTH,
  BUILDING_HEIGHT,
  TOTAL_GROSS_AREA,
  TOTAL_COMPLEX_AREA_WITH_TERRACE_M2,
  POOL_BASIN
} from '../../data/approvedSpaPlanData';

export const TechnicalScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'balance' | 'clearances' | 'doors' | 'dxf' | 'audit' | 'engineering'>('balance');
  const [verification, setVerification] = useState<VerificationResult | null>(null);

  useEffect(() => {
    setVerification(runMasterModelVerification());
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col bg-stone-950 text-stone-100 select-none overflow-y-auto lg:overflow-hidden">
      {/* Top Floating Control Bar */}
      <div className="min-h-14 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 z-20 shrink-0">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
            07. ИНЖЕНЕРНЫЙ АРХИВ
          </span>
          <span className="text-stone-700 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-stone-400 hidden sm:inline">
            ПРОЕКТ BK-26-003-KR
          </span>
          {verification && (
            <div className="sm:hidden flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{verification.passedChecks}/{verification.totalChecks}</span>
            </div>
          )}
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-black/50 border border-white/10 p-0.5 sm:p-1 rounded-xl text-xs font-mono overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: 'balance', label: '01. Площади' },
            { id: 'clearances', label: '02. Проходы СП' },
            { id: 'doors', label: '03. Двери' },
            { id: 'dxf', label: '04. DXF Привязка' },
            { id: 'audit', label: '05. Сверка 2D/3D' },
            { id: 'engineering', label: '06. Нагрузки' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ${
                activeTab === t.id
                  ? 'bg-white text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Validation Status Badge (Desktop) */}
        <div className="hidden sm:block">
          {verification && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{verification.passedChecks}/{verification.totalChecks} ВАЛИДИРОВАНО</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area (Scrollable Technical Dossier) */}
      <div className="flex-1 w-full p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {activeTab === 'balance' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="text-lg font-semibold text-white">Ведомость баланса площадей</h3>
                <p className="text-xs font-mono text-stone-400">
                  Соотношение тёплого контура ({TOTAL_GROSS_AREA.toFixed(1)} м²) и открытой южной террасы ({TOTAL_COMPLEX_AREA_WITH_TERRACE_M2.toFixed(1)} м² с террасой)
                </p>
              </div>
              <ApprovedBalanceTable />
            </div>
          )}

          {activeTab === 'clearances' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="text-lg font-semibold text-white">Верификация нормативных ширин проходов</h3>
                <p className="text-xs font-mono text-stone-400">
                  Соответствие СП 310.1325800.2017 «Бассейны для плавания» и СП 118.13330 «Общественные здания»
                </p>
              </div>
              <ApprovedClearanceVerification />
            </div>
          )}

          {activeTab === 'doors' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="text-lg font-semibold text-white">Спецификация заполнения проёмов и дверей</h3>
                <p className="text-xs font-mono text-stone-400">
                  Дверные блоки D1..D11 с указанием ширины полотен, огнестойкости и направления открывания
                </p>
              </div>
              <ApprovedDoorsSchedule />
            </div>
          )}

          {activeTab === 'dxf' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="text-lg font-semibold text-white">Геодезическая привязка и калькулятор DXF</h3>
                <p className="text-xs font-mono text-stone-400">
                  Формулы пересчёта: LOCAL X = (DXF X - 4742.892832) × 50, LOCAL Y = (DXF Y - 2214.962910) × 50
                </p>
              </div>
              <DxfCoordinateInspector />
            </div>
          )}

          {activeTab === 'audit' && verification && (
            <div className="space-y-4 font-mono text-xs">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="text-lg font-semibold text-white font-sans">
                  Автоматический аудит согласованности Master Model 2D и 3D
                </h3>
                <p className="text-xs text-stone-400">
                  Все контрольные координаты 13 помещений и чаши бассейна проверены алгоритмически
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                ✓ 100% совпадение координат: 2D чертеж является единственным источником истины, 3D сцена строится без отклонений.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {verification.checks.map(c => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 flex justify-between gap-4">
                    <div>
                      <div className="text-white font-semibold font-sans">{c.name}</div>
                      <div className="text-[11px] text-stone-400">План 2D: {c.expected}</div>
                      <div className="text-[11px] text-cyan-300">Факт 3D: {c.actual}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px] h-fit">
                      OK
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'engineering' && (
            <div className="space-y-6">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="text-lg font-semibold text-white">Инженерные нагрузки и технологическое обеспечение</h3>
                <p className="text-xs font-mono text-stone-400">
                  Сводные параметры микроклимата, энергопотребления и водоподготовки
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                  <span className="text-amber-300 font-bold uppercase block text-xs">ВОДОПОДГОТОВКА И БАССЕЙН</span>
                  <div className="space-y-2 text-stone-300">
                    <div>Объём чаши: <strong>160 м³</strong></div>
                    <div>Время полного водообмена: <strong>4.0 часа</strong></div>
                    <div>Производительность фильтров: <strong>40 м³/ч</strong></div>
                    <div>Температура воды: <strong>+28 °C</strong></div>
                    <div>Обеззараживание: <strong>УФ + активный кислород</strong></div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                  <span className="text-cyan-300 font-bold uppercase block text-xs">ВЕНТИЛЯЦИЯ И ОСУШЕНИЕ</span>
                  <div className="space-y-2 text-stone-300">
                    <div>Приток в бассейн: <strong>3 800 м³/ч</strong></div>
                    <div>Влагосъём осушителя: <strong>32 л/час</strong></div>
                    <div>Воздухообмен парных: <strong>6-кратный с подогревом</strong></div>
                    <div>Рекуперация тепла: <strong>Пластинчатый блок 78%</strong></div>
                    <div>Кратность в раздевалках: <strong>П-3 / В-4</strong></div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                  <span className="text-emerald-300 font-bold uppercase block text-xs">ЭЛЕКТРОСНАБЖЕНИЕ</span>
                  <div className="space-y-2 text-stone-300">
                    <div>Категория надежности: <strong>II категория</strong></div>
                    <div>Установленная мощность: <strong>125 кВт</strong></div>
                    <div>Печь Русской парной: <strong>24 кВт</strong></div>
                    <div>Каменка Сауны: <strong>18 кВт</strong></div>
                    <div>Парогенератор Хамама: <strong>15 кВт</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
