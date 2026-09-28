import React, { useState } from 'react';
import {
  DXF_ORIGIN_X,
  DXF_ORIGIN_Y,
  DXF_SCALE,
  localToDxf,
  dxfToLocal,
  GRID_X_AXES,
  GRID_Y_AXES,
  ARCHITECTURAL_ROOMS,
  POOL_BASIN
} from '../data/approvedSpaPlanData';

export const DxfCoordinateInspector: React.FC = () => {
  const [inputMode, setInputMode] = useState<'local' | 'dxf'>('local');
  const [inputLocalX, setInputLocalX] = useState<string>('16200');
  const [inputLocalY, setInputLocalY] = useState<string>('2000');
  const [inputDxfX, setInputDxfX] = useState<string>('5066.89');
  const [inputDxfY, setInputDxfY] = useState<string>('2254.96');

  // Computed results
  const calcFromLocal = () => {
    const lx = parseFloat(inputLocalX) || 0;
    const ly = parseFloat(inputLocalY) || 0;
    return localToDxf(lx, ly);
  };

  const calcFromDxf = () => {
    const dx = parseFloat(inputDxfX) || DXF_ORIGIN_X;
    const dy = parseFloat(inputDxfY) || DXF_ORIGIN_Y;
    return dxfToLocal(dx, dy);
  };

  const currentDxf = calcFromLocal();
  const currentLocal = calcFromDxf();

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="text-base font-bold text-white tracking-wide uppercase">
                ТОЧНАЯ СИСТЕМА КООРДИНАТ DXF ↔ LOCAL (ММ)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              За точку отсчёта (0, 0) принят левый нижний угол основного здания. Все линейные размеры строго привязаны к первоисточнику в чертеже BK-26-003-KR. Вторая смещенная копия чертежа (ΔX = +2578.47) исключена из расчетов.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Базовая точка (ORIGIN):</div>
            <div className="text-cyan-400">DXF X₀ = <strong>{DXF_ORIGIN_X}</strong></div>
            <div className="text-cyan-400">DXF Y₀ = <strong>{DXF_ORIGIN_Y}</strong></div>
            <div className="text-amber-400 text-[11px] font-bold">SCALE = 1 DXF unit : 50 мм</div>
          </div>
        </div>
      </div>

      {/* CONVERTER CALCULATOR & RULE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Converter Tool */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🎯</span>
              Интерактивный координатный калькулятор
            </h3>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => setInputMode('local')}
                className={`px-3 py-1 rounded font-medium transition ${
                  inputMode === 'local' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Local (мм) → DXF
              </button>
              <button
                onClick={() => setInputMode('dxf')}
                className={`px-3 py-1 rounded font-medium transition ${
                  inputMode === 'dxf' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                DXF → Local (мм)
              </button>
            </div>
          </div>

          {inputMode === 'local' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Local X (мм) [0 .. 30200]
                  </label>
                  <input
                    type="number"
                    value={inputLocalX}
                    onChange={(e) => setInputLocalX(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Local Y (мм) [0 .. 16000]
                  </label>
                  <input
                    type="number"
                    value={inputLocalY}
                    onChange={(e) => setInputLocalY(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Converted Output */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono">
                <span className="text-[11px] font-bold text-amber-400 block uppercase">
                  Результат в координатах DXF чертежа:
                </span>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">DXF X:</span>
                    <strong className="text-amber-300 text-base">{currentDxf.dxfX.toFixed(6)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">DXF Y:</span>
                    <strong className="text-amber-300 text-base">{currentDxf.dxfY.toFixed(6)}</strong>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-1.5 font-sans">
                  Формула: DXF X = (Local X / 50) + 4742.892832
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    DXF X [~4742.89 .. 5346.89]
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputDxfX}
                    onChange={(e) => setInputDxfX(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    DXF Y [~2214.96 .. 2534.96]
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputDxfY}
                    onChange={(e) => setInputDxfY(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Converted Output */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono">
                <span className="text-[11px] font-bold text-cyan-400 block uppercase">
                  Результат в локальных координатах здания:
                </span>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">Local X (мм):</span>
                    <strong className="text-cyan-300 text-base">{Math.round(currentLocal.localX)} мм</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Local Y (мм):</span>
                    <strong className="text-cyan-300 text-base">{Math.round(currentLocal.localY)} мм</strong>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-1.5 font-sans">
                  Формула: Local X = (DXF X - 4742.892832) × 50
                </div>
              </div>
            </div>
          )}

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="text-[10px] text-slate-400 font-semibold self-center mr-1">Точки:</span>
            {[
              { label: 'Бассейн угол (16200; 2000)', x: 16200, y: 2000 },
              { label: 'P1 Левый низ (0; 0)', x: 0, y: 0 },
              { label: 'P2 Правый низ (30200; 0)', x: 30200, y: 0 },
              { label: 'P3 Правый верх (30200; 16000)', x: 30200, y: 16000 },
              { label: 'P4 Левый верх (0; 16000)', x: 0, y: 16000 },
              { label: 'Стена зала X=14200', x: 14200, y: 8000 }
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputLocalX(p.x.toString());
                  setInputLocalY(p.y.toString());
                  const c = localToDxf(p.x, p.y);
                  setInputDxfX(c.dxfX.toFixed(2));
                  setInputDxfY(c.dxfY.toFixed(2));
                  setInputMode('local');
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-mono transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mathematical Rules Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Ключевые привязки и контуры
          </h3>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <strong className="text-cyan-300 block mb-0.5">Основной контур теплого здания (30.2 × 16.0 м):</strong>
              <div className="font-mono text-[11px] text-slate-400">
                P1 = (0, 0) | P2 = (30200, 0) | P3 = (30200, 16000) | P4 = (0, 16000)<br />
                Площадь = 483.20 м²
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <strong className="text-emerald-300 block mb-0.5">Точное положение бассейна 10×10 м:</strong>
              <div className="font-mono text-[11px] text-slate-400">
                X = 16 200 .. 26 200 мм | Y = 2 000 .. 12 000 мм<br />
                • От левой стены здания до бассейна: 16 200 мм (от стены зала: 2 000 мм)<br />
                • До правой стены здания: 4 000 мм<br />
                • От нижней стены здания: 2 000 мм<br />
                • До верхней стены здания: 4 000 мм
              </div>
            </div>

            <div className="bg-rose-950/40 p-3 rounded-lg border border-rose-900/60 text-rose-200">
              <strong className="text-rose-400 block mb-0.5">Защита от ошибки двойной геометрии в DXF:</strong>
              <div className="text-[11px]">
                В исходном DXF присутствует смещенная копия со смещением ΔX = 2578.466237 (начиная с X ≈ 7321.36). В приложении жестко зафиксировано использование исключительно <strong>первой оригинальной геометрии</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID AXES REFERENCE TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Сводная таблица разбивочных осей (1–12 и А–Ж)
          </h3>
          <span className="text-xs font-mono text-cyan-300">
            Все перегородки совпадают с исходной сеткой
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-xs">
          {/* Vertical Axes X */}
          <div className="p-4 space-y-2">
            <span className="font-bold text-cyan-400 uppercase text-[11px] tracking-wider block">
              Вертикальные оси X (1 .. 12)
            </span>
            <div className="space-y-1.5 font-mono">
              {GRID_X_AXES.map((xVal, idx) => {
                const dxf = localToDxf(xVal, 0);
                return (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400 font-bold">Ось {idx + 1}:</span>
                    <span className="text-white font-bold">{xVal.toLocaleString()} мм</span>
                    <span className="text-amber-400 text-[11px]">DXF X = {dxf.dxfX.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Horizontal Axes Y */}
          <div className="p-4 space-y-2">
            <span className="font-bold text-amber-400 uppercase text-[11px] tracking-wider block">
              Горизонтальные оси Y (А .. Ж)
            </span>
            <div className="space-y-1.5 font-mono">
              {GRID_Y_AXES.map((yVal, idx) => {
                const letter = String.fromCharCode(1040 + idx); // А, Б, В, Г, Д, Е, Ж
                const dxf = localToDxf(0, yVal);
                return (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400 font-bold">Ось {letter}:</span>
                    <span className="text-white font-bold">{yVal.toLocaleString()} мм</span>
                    <span className="text-cyan-400 text-[11px]">DXF Y = {dxf.dxfY.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
