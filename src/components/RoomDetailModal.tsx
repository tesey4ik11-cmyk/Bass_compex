import React from 'react';
import { ArchitecturalRoom, localToDxf } from '../data/approvedSpaPlanData';

interface Props {
  room: ArchitecturalRoom | null;
  onClose: () => void;
  onShowOnPlan: (roomId: string) => void;
}

export const RoomDetailModal: React.FC<Props> = ({ room, onClose, onShowOnPlan }) => {
  if (!room) return null;

  const dxfBottomLeft = localToDxf(room.xMin, room.yMin);
  const dxfTopRight = localToDxf(room.xMax, room.yMax);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-white text-stone-950 font-bold flex items-center justify-center text-sm font-mono shadow-md">
              {room.num}
            </span>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{room.name}</h3>
              <p className="text-xs text-stone-400 font-mono">{room.zoneName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Площадь</span>
              <span className="text-lg font-bold text-emerald-400">{room.areaM2.toFixed(2)} м²</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Габарит (Ш×Д)</span>
              <span className="text-lg font-bold text-white">{(room.widthMm / 1000).toFixed(2)} × {(room.lengthMm / 1000).toFixed(2)} м</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Высота</span>
              <span className="text-lg font-bold text-stone-200">3.80 м</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Объём</span>
              <span className="text-lg font-bold text-amber-300">{((room.areaM2 * 3.8)).toFixed(1)} м³</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-mono">Назначение и концепция</h4>
            <p className="text-sm text-stone-300 leading-relaxed bg-stone-950/40 p-4 rounded-2xl border border-stone-800/80">
              {room.description}
            </p>
          </div>

          {/* Exact Coordinates in Master Model */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-mono">Точные архитектурные координаты (Origin [0, 0])</h4>
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 font-mono text-xs space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-500 block text-[11px]">ЛОКАЛЬНАЯ ОСЬ X (мм)</span>
                  <span className="text-white font-semibold">{room.xMin.toLocaleString()} .. {room.xMax.toLocaleString()} мм</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">ЛОКАЛЬНАЯ ОСЬ Y (мм)</span>
                  <span className="text-white font-semibold">{room.yMin.toLocaleString()} .. {room.yMax.toLocaleString()} мм</span>
                </div>
              </div>
              <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                DXF геопривязка: [{dxfBottomLeft.dxfX.toFixed(4)}, {dxfBottomLeft.dxfY.toFixed(4)}] → [{dxfTopRight.dxfX.toFixed(4)}, {dxfTopRight.dxfY.toFixed(4)}]
              </div>
            </div>
          </div>

          {/* Architectural features & equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
              <h5 className="text-xs uppercase tracking-wider text-amber-300 font-mono">Особенности и проходы</h5>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {room.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
              <h5 className="text-xs uppercase tracking-wider text-stone-300 font-mono">Оборудование и инженерия</h5>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {room.equipment.map((eq, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-stone-400 mt-0.5">•</span>
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <button
            onClick={() => {
              onShowOnPlan(room.id);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-200 text-stone-950 font-semibold text-xs transition flex items-center gap-2"
          >
            <span>Показать на 2D плане</span>
            <span>📐</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium transition"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
