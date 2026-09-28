import React, { useState } from 'react';
import { ApprovedArchitecturalPlanSVG } from '../ApprovedArchitecturalPlanSVG';
import { Spa3DViewer } from '../Spa3DViewer';
import {
  ARCHITECTURAL_ROOMS,
  TOTAL_GROSS_AREA,
  ArchitecturalRoom
} from '../../data/approvedSpaPlanData';

interface Props {
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
  onOpenRoomModal: (room: ArchitecturalRoom) => void;
}

export const PlanScreen: React.FC<Props> = ({
  selectedRoomId,
  onSelectRoom,
  onOpenRoomModal
}) => {
  const [viewMode, setViewMode] = useState<'2d' | '3d-top' | 'comparison'>('2d');
  const [showDimensions, setShowDimensions] = useState(true);
  const [showClearances, setShowClearances] = useState(false);
  const [showFurniture, setShowFurniture] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const selectedRoom = ARCHITECTURAL_ROOMS.find(r => r.id === selectedRoomId);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col bg-stone-950 text-stone-100 select-none overflow-hidden">
      {/* Top Floating Architectural Control Bar */}
      <div className="min-h-12 sm:h-14 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md px-3 sm:px-6 lg:px-12 py-1.5 flex flex-wrap items-center justify-between gap-2 z-20 shrink-0">
        {/* Left: Section Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
            02. АРХИТЕКТУРНЫЙ ПЛАН
          </span>
          <span className="text-stone-700 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-stone-300 hidden md:inline">
            30.2 × 16.0 М ({TOTAL_GROSS_AREA.toFixed(1)} М²)
          </span>
        </div>

        {/* Center: Mode Switcher (2D / 3D TOP / СРАВНЕНИЕ) */}
        <div className="flex items-center bg-black/50 border border-white/10 p-0.5 sm:p-1 rounded-xl text-xs font-mono overflow-x-auto no-scrollbar">
          <button
            onClick={() => setViewMode('2d')}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap ${
              viewMode === '2d'
                ? 'bg-white text-stone-950 font-semibold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            2D Чертёж
          </button>
          <button
            onClick={() => setViewMode('3d-top')}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap ${
              viewMode === '3d-top'
                ? 'bg-white text-stone-950 font-semibold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            План 3D (Top)
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap ${
              viewMode === 'comparison'
                ? 'bg-white text-stone-950 font-semibold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Сравнение (2D | 3D)
          </button>
        </div>

        {/* Right: Selected Room Inspector Pill */}
        <div className="flex items-center gap-2">
          {selectedRoom ? (
            <button
              onClick={() => onOpenRoomModal(selectedRoom)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono hover:bg-amber-500/20 transition truncate max-w-[200px] sm:max-w-none"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="truncate">{selectedRoom.name}</span>
              <span className="text-amber-400 underline font-sans text-[11px] shrink-0">Паспорт →</span>
            </button>
          ) : (
            <span className="text-[11px] sm:text-xs font-mono text-stone-400 hidden sm:inline">
              Кликните по помещению
            </span>
          )}
        </div>
      </div>

      {/* Main Visual Presentation Canvas View */}
      <div className="flex-1 w-full relative overflow-hidden flex">
        {/* VIEW 1: Pure 2D Master CAD Drawing */}
        {viewMode === '2d' && (
          <div className="w-full h-full relative">
            <ApprovedArchitecturalPlanSVG
              selectedRoomId={selectedRoomId}
              onSelectRoom={onSelectRoom}
              showVisitorRoute={false}
              showTechnicalRoute={false}
              showDimensions={showDimensions}
              showClearances={showClearances}
              showFurniture={showFurniture}
              showGrid={showGrid}
            />

            {/* Layer Toggles in bottom corner */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-6 z-20 flex items-center gap-1 sm:gap-2 bg-stone-950/85 backdrop-blur-md border border-stone-800 p-1 sm:p-1.5 rounded-xl text-[10px] sm:text-[11px] font-mono overflow-x-auto max-w-[90%]">
              <span className="text-stone-400 px-1 uppercase tracking-wider text-[9px] sm:text-[10px] hidden sm:inline">
                Слои:
              </span>
              <button
                onClick={() => setShowDimensions(v => !v)}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  showDimensions ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Размеры
              </button>
              <button
                onClick={() => setShowFurniture(v => !v)}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  showFurniture ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Мебель
              </button>
              <button
                onClick={() => setShowGrid(v => !v)}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  showGrid ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Оси
              </button>
              <button
                onClick={() => setShowClearances(v => !v)}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  showClearances ? 'bg-amber-950/80 text-amber-300 font-medium border border-amber-800/80' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Проходы
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: 3D Top View (Камера сверху, стены в объёме) */}
        {viewMode === '3d-top' && (
          <div className="w-full h-full relative">
            <Spa3DViewer
              selectedRoomId={selectedRoomId}
              onSelectRoom={onSelectRoom}
              initialPreset="top"
              className="h-full w-full"
            />
          </div>
        )}

        {/* VIEW 3: Side-by-Side Comparison (2D слева, 3D справа на десктопе; вертикальный стек со скроллом на мобильных) */}
        {viewMode === 'comparison' && (
          <div className="w-full h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
            {/* 2D Plan Panel */}
            <div className="w-full lg:w-1/2 h-[380px] sm:h-[460px] lg:h-full border-b lg:border-b-0 lg:border-r border-stone-800 relative shrink-0">
              <div className="absolute top-2.5 left-3 sm:top-3 sm:left-4 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono text-stone-300 border border-white/10">
                2D MASTER BLUEPRINT (ЧЕРТЁЖ)
              </div>
              <ApprovedArchitecturalPlanSVG
                selectedRoomId={selectedRoomId}
                onSelectRoom={onSelectRoom}
                showVisitorRoute={false}
                showTechnicalRoute={false}
                showDimensions={true}
                showClearances={false}
                showFurniture={true}
                showGrid={true}
              />
            </div>

            {/* 3D Scene Panel */}
            <div className="w-full lg:w-1/2 h-[420px] sm:h-[500px] lg:h-full relative shrink-0">
              <div className="absolute top-2.5 left-3 sm:top-3 sm:left-4 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono text-cyan-300 border border-white/10">
                3D ОБЪЁМНАЯ МОДЕЛЬ (СИНХРОНИЗИРОВАНА)
              </div>
              <Spa3DViewer
                selectedRoomId={selectedRoomId}
                onSelectRoom={onSelectRoom}
                initialPreset="axonometric"
                className="h-full w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
