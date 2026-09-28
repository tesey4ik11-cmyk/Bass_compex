import React, { useState } from 'react';
import { ApprovedArchitecturalPlanSVG } from './ApprovedArchitecturalPlanSVG';
import {
  ARCHITECTURAL_ROOMS,
  BUILDING_WIDTH,
  BUILDING_HEIGHT,
  TOTAL_GROSS_AREA,
  DXF_ORIGIN_X,
  DXF_ORIGIN_Y,
  DXF_SCALE,
  ArchitecturalRoom
} from '../data/approvedSpaPlanData';

interface Props {
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
  onOpenRoomModal: (room: ArchitecturalRoom) => void;
}

export const MasterPlanSection: React.FC<Props> = ({
  selectedRoomId,
  onSelectRoom,
  onOpenRoomModal
}) => {
  const [showVisitorRoute, setShowVisitorRoute] = useState(true);
  const [showTechnicalRoute, setShowTechnicalRoute] = useState(false);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showClearances, setShowClearances] = useState(true);
  const [showFurniture, setShowFurniture] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const selectedRoom = ARCHITECTURAL_ROOMS.find(r => r.id === selectedRoomId);

  return (
    <section id="plan" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono">
            <span>02. Единственный источник истины</span>
            <span className="text-slate-600">·</span>
            <span>Master Model 2D</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Архитектурный план <br />
            <span className="font-semibold text-slate-200">высокой точности</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Векторный чертёж в масштабе 1:1 (миллиметры). Все координаты привязаны к геодезической точке 
            чертежа BK-26-003-KR. Кликните по любому помещению для изучения спецификации оборудования и микроклимата.
          </p>
        </div>

        {/* CAD Blueprint Master Tag */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400 space-y-1 shrink-0">
          <div className="text-white font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>ORIGIN: ({DXF_ORIGIN_X.toFixed(4)}, {DXF_ORIGIN_Y.toFixed(4)})</span>
          </div>
          <div>Масштаб пересчёта: ×{DXF_SCALE} (единицы: мм)</div>
          <div>Габарит контура: {BUILDING_WIDTH.toFixed(1)} × {BUILDING_HEIGHT.toFixed(1)} м ({TOTAL_GROSS_AREA.toFixed(1)} м²)</div>
        </div>
      </div>

      {/* Floating Layer Controls Strip */}
      <div className="mb-6 p-2 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-mono px-3 text-[11px] uppercase tracking-wider hidden sm:inline">
            Слои чертежа:
          </span>

          <button
            onClick={() => setShowDimensions(v => !v)}
            className={`px-3 py-1.5 rounded-xl font-medium transition ${
              showDimensions ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white bg-slate-800/40 border border-transparent'
            }`}
          >
            📏 Размеры и выноски
          </button>

          <button
            onClick={() => setShowClearances(v => !v)}
            className={`px-3 py-1.5 rounded-xl font-medium transition ${
              showClearances ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white bg-slate-800/40 border border-transparent'
            }`}
          >
            🚪 Ширина проходов
          </button>

          <button
            onClick={() => setShowFurniture(v => !v)}
            className={`px-3 py-1.5 rounded-xl font-medium transition ${
              showFurniture ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white bg-slate-800/40 border border-transparent'
            }`}
          >
            🛋 Мебель и оборудование
          </button>

          <button
            onClick={() => setShowVisitorRoute(v => !v)}
            className={`px-3 py-1.5 rounded-xl font-medium transition ${
              showVisitorRoute ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white bg-slate-800/40 border border-transparent'
            }`}
          >
            🚶 Маршрут гостей
          </button>

          <button
            onClick={() => setShowGrid(v => !v)}
            className={`px-3 py-1.5 rounded-xl font-medium transition ${
              showGrid ? 'bg-slate-700 text-white border border-slate-600' : 'text-slate-400 hover:text-white bg-slate-800/40 border border-transparent'
            }`}
          >
            🌐 Сетка осей
          </button>
        </div>

        {selectedRoom && (
          <div className="flex items-center gap-3 px-3 py-1 bg-cyan-950/40 border border-cyan-700/50 rounded-xl text-cyan-300">
            <span className="font-semibold">{selectedRoom.name} ({selectedRoom.areaM2.toFixed(1)} м²)</span>
            <button
              onClick={() => onOpenRoomModal(selectedRoom)}
              className="text-[11px] underline hover:text-white"
            >
              Паспорт помещения →
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas Box */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl relative min-h-[580px]">
        <ApprovedArchitecturalPlanSVG
          selectedRoomId={selectedRoomId}
          onSelectRoom={onSelectRoom}
          showVisitorRoute={showVisitorRoute}
          showTechnicalRoute={showTechnicalRoute}
          showDimensions={showDimensions}
          showClearances={showClearances}
          showFurniture={showFurniture}
          showGrid={showGrid}
        />
      </div>

      {/* Under-canvas Caption */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-2">
        <div>Нажмите на любое помещение на плане для выделения и просмотра паспорта. Масштабирование: колёсико мыши.</div>
        <div className="text-slate-400">Север: сверху (Y=16 000 мм) • Юг: снизу (Y=0 мм) • Терраса 30.2×4.0 м</div>
      </div>
    </section>
  );
};
