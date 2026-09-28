import React from 'react';
import { PlanVariant } from '../types/architecture';

interface FlowLegendProps {
  variant: PlanVariant;
  showVisitorRoute: boolean;
  setShowVisitorRoute: (val: boolean) => void;
  showTechnicalRoute: boolean;
  setShowTechnicalRoute: (val: boolean) => void;
}

export const FlowLegend: React.FC<FlowLegendProps> = ({
  variant,
  showVisitorRoute,
  setShowVisitorRoute,
  showTechnicalRoute,
  setShowTechnicalRoute
}) => {
  return (
    <div className="space-y-6">
      {/* Route Switchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visitor Route Card */}
        <div
          onClick={() => setShowVisitorRoute(!showVisitorRoute)}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            showVisitorRoute
              ? 'bg-blue-950/40 border-blue-500/80 shadow-lg shadow-blue-900/20'
              : 'bg-slate-800/60 border-slate-700 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md shadow-blue-500/50" />
              <span className="font-bold text-sm text-white">1. Маршрут Посетителя (Синий)</span>
            </div>
            <input
              type="checkbox"
              checked={showVisitorRoute}
              onChange={() => {}}
              className="accent-blue-500 w-4 h-4 cursor-pointer"
            />
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {variant.visitorRoute.description}
          </p>
        </div>

        {/* Technical Route Card */}
        <div
          onClick={() => setShowTechnicalRoute(!showTechnicalRoute)}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            showTechnicalRoute
              ? 'bg-rose-950/40 border-rose-500/80 shadow-lg shadow-rose-900/20'
              : 'bg-slate-800/60 border-slate-700 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md shadow-rose-500/50" />
              <span className="font-bold text-sm text-white">2. Технический Маршрут (Красный)</span>
            </div>
            <input
              type="checkbox"
              checked={showTechnicalRoute}
              onChange={() => {}}
              className="accent-rose-500 w-4 h-4 cursor-pointer"
            />
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {variant.technicalRoute.description}
          </p>
        </div>
      </div>

      {/* Visitor Step-by-Step Chain */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          Пошаговая логика движения гостей ({variant.title})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {variant.visitorRoute.waypoints.map((step, idx) => (
            <div
              key={step.id}
              className="bg-slate-900/70 border border-slate-700/60 p-3 rounded-lg flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                {idx + 1}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{step.label}</div>
                <div className="text-[11px] text-cyan-300 font-medium">{step.action}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{step.roomName}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-950/30 border border-blue-800/40 p-3 rounded-lg text-xs text-blue-200 leading-relaxed">
          💡 <strong>Интуитивный поток:</strong> Улица $\rightarrow$ Главный вход $\rightarrow$ Тамбур $\rightarrow$ Холл $\rightarrow$ Раздевалка $\rightarrow$ Душевые $\rightarrow$ Банный блок $\rightarrow$ Бассейн $\rightarrow$ Зона отдыха. Никаких лишних дверей или проходов через технические помещения.
        </div>
      </div>

      {/* Technical Step-by-Step Chain */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          Служебный изолированный маршрут обслуживающего персонала
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {variant.technicalRoute.waypoints.map((step, idx) => (
            <div
              key={step.id}
              className="bg-slate-900/70 border border-slate-700/60 p-3 rounded-lg flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                T{idx + 1}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{step.label}</div>
                <div className="text-[11px] text-rose-300 font-medium">{step.action}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{step.roomName}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-rose-950/30 border border-rose-800/40 p-3 rounded-lg text-xs text-rose-200 leading-relaxed">
          🔒 <strong>Полная изоляция:</strong> Персонал входит с северного служебного фасада напрямую в блок фильтрации и венткамеры. Ноль пересечений с гостями.
        </div>
      </div>
    </div>
  );
};
