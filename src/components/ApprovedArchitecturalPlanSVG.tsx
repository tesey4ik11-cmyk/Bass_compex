import React, { useState, useRef } from 'react';
import {
  ARCHITECTURAL_ROOMS,
  ARCHITECTURAL_DOORS,
  POOL_BASIN,
  BUILDING_WIDTH_MM,
  BUILDING_LENGTH_MM,
  GRID_X_AXES,
  GRID_Y_AXES,
  VISITOR_ROUTE_POINTS,
  TECHNICAL_ROUTE_POINTS,
  localToDxf,
  ArchitecturalRoom
} from '../data/approvedSpaPlanData';

interface Props {
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
  showVisitorRoute: boolean;
  showTechnicalRoute: boolean;
  showDimensions: boolean;
  showClearances: boolean;
  showFurniture: boolean;
  showGrid: boolean;
}

export const ApprovedArchitecturalPlanSVG: React.FC<Props> = ({
  selectedRoomId,
  onSelectRoom,
  showVisitorRoute,
  showTechnicalRoute,
  showDimensions,
  showClearances,
  showFurniture,
  showGrid
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [cursorCoords, setCursorCoords] = useState<{ localX: number; localY: number; dxfX: number; dxfY: number } | null>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // In SVG, Top is North (Y=0 in SVG corresponds to Y=16000 in model)
  // Model coordinates have Y=0 at South and Y=16000 at North.
  // Transform: toSvgY(yMm) = BUILDING_LENGTH_MM - yMm
  const toSvgY = (yMm: number) => BUILDING_LENGTH_MM - yMm;

  // Pool Coordinates in SVG
  const poolSvgX = POOL_BASIN.xMin; // 16 200
  const poolSvgY = toSvgY(POOL_BASIN.yMax); // 16 000 - 12 000 = 4 000
  const poolSvgW = POOL_BASIN.widthMm; // 10 000
  const poolSvgH = POOL_BASIN.lengthMm; // 10 000

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      isDragging.current = true;
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }

    // Calculate real local & DXF coordinates from cursor
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // ViewBox dimensions: -2500 -2000 to 35500 20500 (total width 38000, height 22500)
      const vbX = -2500;
      const vbY = -2000;
      const vbW = 36500;
      const vbH = 21500;

      const scaleX = vbW / rect.width;
      const scaleY = vbH / rect.height;

      // Adjust for pan & zoom
      const rawSvgX = (clientX / zoom - pan.x / zoom) * scaleX + vbX;
      const rawSvgY = (clientY / zoom - pan.y / zoom) * scaleY + vbY;

      const localX = Math.round(rawSvgX);
      const localY = Math.round(BUILDING_LENGTH_MM - rawSvgY);

      if (localX >= -2000 && localX <= 32000 && localY >= -4500 && localY <= 18000) {
        const { dxfX, dxfY } = localToDxf(localX, localY);
        setCursorCoords({ localX, localY, dxfX, dxfY });
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full bg-stone-950 overflow-hidden flex flex-col select-none">
      {/* CAD PLAN CONTROLS HEADER */}
      <div className="bg-stone-900/90 border-b border-stone-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wide uppercase text-[11px] font-mono">
            АРХИТЕКТУРНЫЙ ЧЕРТЁЖ • М 1:100 (ММ)
          </span>
          <span className="text-stone-600 font-mono">|</span>
          <span className="text-stone-400 font-mono text-[11px]">
            30 200 × 16 000 мм (483.2 м²) • БАССЕЙН 10×10 М
          </span>
        </div>

        <div className="flex items-center gap-2">
          {cursorCoords && (
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 bg-stone-950 rounded border border-stone-800 font-mono text-[11px]">
              <span className="text-stone-500">LOCAL:</span>
              <span className="text-stone-200 font-bold">X={cursorCoords.localX} Y={cursorCoords.localY}</span>
              <span className="text-stone-600">|</span>
              <span className="text-stone-500">DXF:</span>
              <span className="text-amber-300 font-bold">X={cursorCoords.dxfX.toFixed(2)} Y={cursorCoords.dxfY.toFixed(2)}</span>
            </div>
          )}

          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.15, 2.5))}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700 font-mono text-xs transition"
            title="Приблизить"
          >
            + Zoom
          </button>
          <span className="text-stone-300 font-mono text-xs px-1">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.6))}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700 font-mono text-xs transition"
            title="Отдалить"
          >
            - Zoom
          </button>
          <button
            onClick={handleResetView}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 text-xs font-semibold transition"
          >
            Сброс
          </button>
        </div>
      </div>

      {/* SVG CANVAS */}
      <div
        className="w-full h-[660px] overflow-hidden cursor-crosshair relative bg-[#090d16]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          viewBox="-2500 -2000 36500 21500"
          className="w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center center',
            transition: isDragging.current ? 'none' : 'transform 0.05s ease-out'
          }}
        >
          <defs>
            {/* Fine Architectural Grid */}
            <pattern id="archGridMinor" width="1000" height="1000" patternUnits="userSpaceOnUse">
              <path d="M 1000 0 L 0 0 0 1000" fill="none" stroke="#1e293b" strokeWidth="25" opacity="0.4" />
            </pattern>
            <pattern id="archGridMajor" width="5000" height="5000" patternUnits="userSpaceOnUse">
              <path d="M 5000 0 L 0 0 0 5000" fill="none" stroke="#334155" strokeWidth="60" opacity="0.6" />
            </pattern>

            {/* Hatch for walls */}
            <pattern id="wallHatch" width="400" height="400" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="400" stroke="#475569" strokeWidth="50" />
            </pattern>

            {/* Mosaic pattern for pool basin */}
            <pattern id="poolMosaic" width="400" height="400" patternUnits="userSpaceOnUse">
              <rect width="400" height="400" fill="#0284c7" />
              <path d="M 400 0 L 0 0 0 400" fill="none" stroke="#38bdf8" strokeWidth="20" opacity="0.4" />
              <rect x="50" y="50" width="300" height="300" fill="#0369a1" opacity="0.3" />
            </pattern>

            {/* Floor tile patterns */}
            <pattern id="ceramicTiles" width="600" height="600" patternUnits="userSpaceOnUse">
              <rect width="600" height="600" fill="#0f172a" />
              <path d="M 600 0 L 0 0 0 600" fill="none" stroke="#334155" strokeWidth="20" />
            </pattern>

            <pattern id="woodPlanks" width="300" height="1800" patternUnits="userSpaceOnUse">
              <rect width="300" height="1800" fill="#78350f" opacity="0.3" />
              <line x1="300" y1="0" x2="300" y2="1800" stroke="#b45309" strokeWidth="20" opacity="0.5" />
            </pattern>

            <pattern id="terraceDeck" width="200" height="2000" patternUnits="userSpaceOnUse">
              <rect width="200" height="2000" fill="#291c14" />
              <line x1="200" y1="0" x2="200" y2="2000" stroke="#573822" strokeWidth="25" />
            </pattern>

            {/* Marker Arrows */}
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
            <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
            <marker id="dimensionTick" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <line x1="2" y1="8" x2="8" y2="2" stroke="#94a3b8" strokeWidth="2" />
            </marker>
          </defs>

          {/* BACKGROUND GRIDS */}
          {showGrid && (
            <>
              <rect x="-2500" y="-2000" width="36500" height="21500" fill="url(#archGridMinor)" />
              <rect x="-2500" y="-2000" width="36500" height="21500" fill="url(#archGridMajor)" />
            </>
          )}

          {/* TERRACE (OUTDOOR CANOPY) 30 200 x 4 000 mm */}
          <g id="terrace_south">
            <rect
              x="0"
              y={toSvgY(0)}
              width={BUILDING_WIDTH_MM}
              height="4000"
              fill="url(#terraceDeck)"
              stroke="#78350f"
              strokeWidth="50"
              strokeDasharray="200,100"
            />
            <text
              x={BUILDING_WIDTH_MM / 2}
              y={toSvgY(-2000)}
              fill="#d97706"
              fontSize="450"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
              opacity="0.85"
            >
              ОТКРЫТАЯ ЛЕТНЯЯ ТЕРРАСА (30.20 × 4.00 М) • ПЛОЩАДЬ 120.8 М²
            </text>
            {/* Terrace columns */}
            {[0, 6000, 12000, 18000, 24000, 30200].map(tx => (
              <rect
                key={`tcol_${tx}`}
                x={tx - 150}
                y={toSvgY(-3850)}
                width="300"
                height="300"
                fill="#475569"
                stroke="#94a3b8"
                strokeWidth="30"
              />
            ))}
          </g>

          {/* ROOM FLOOR POLYGONS */}
          <g id="rooms_layer">
            {ARCHITECTURAL_ROOMS.map(room => {
              const rx = room.xMin;
              const ry = toSvgY(room.yMax);
              const rw = room.widthMm;
              const rh = room.lengthMm;
              const isSelected = room.id === selectedRoomId;

              // Don't render pool hall as a simple box; handle pool hall floor around pool basin
              if (room.id === 'room_pool_hall') {
                return (
                  <g
                    key={room.id}
                    onClick={(e) => { e.stopPropagation(); onSelectRoom(room.id); }}
                    className="cursor-pointer transition-all duration-200"
                  >
                    {/* Pool Hall Floor */}
                    <rect
                      x={rx}
                      y={ry}
                      width={rw}
                      height={rh}
                      fill={isSelected ? '#0369a1' : '#0c2238'}
                      fillOpacity={isSelected ? 0.45 : 0.8}
                      stroke={isSelected ? '#38bdf8' : '#0369a1'}
                      strokeWidth={isSelected ? 100 : 40}
                    />

                    {/* Ceramic tile overlay */}
                    <rect
                      x={rx}
                      y={ry}
                      width={rw}
                      height={rh}
                      fill="url(#ceramicTiles)"
                      opacity="0.15"
                    />

                    {/* Zone Badge in Pool Hall */}
                    <g transform={`translate(${rx + 2000}, ${ry + 1500})`}>
                      <rect x="0" y="0" width="3800" height="900" rx="200" fill="#082f49" stroke="#0284c7" strokeWidth="40" />
                      <text x="1900" y="420" fill="#38bdf8" fontSize="320" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                        БАССЕЙНОВЫЙ ЗАЛ
                      </text>
                      <text x="1900" y="750" fill="#7dd3fc" fontSize="240" fontFamily="monospace" textAnchor="middle">
                        16.0 × 16.0 м (256.0 м²)
                      </text>
                    </g>
                  </g>
                );
              }

              return (
                <g
                  key={room.id}
                  onClick={(e) => { e.stopPropagation(); onSelectRoom(room.id); }}
                  className="cursor-pointer transition-all duration-200"
                >
                  <rect
                    x={rx}
                    y={ry}
                    width={rw}
                    height={rh}
                    fill={
                      isSelected
                        ? '#44403c'
                        : room.category === 'bath'
                        ? '#2b1911'
                        : room.category === 'wet'
                        ? '#141e2b'
                        : room.id === 'room_lounge'
                        ? '#18241b'
                        : room.category === 'tech'
                        ? '#1c1917'
                        : '#1c1b18'
                    }
                    fillOpacity={isSelected ? 0.9 : 0.8}
                    stroke={isSelected ? '#d97706' : '#57534e'}
                    strokeWidth={isSelected ? 90 : 35}
                  />

                  {/* Room Label Badge */}
                  <g transform={`translate(${rx + rw / 2}, ${ry + rh / 2})`}>
                    {/* Circle room number */}
                    <circle cx="0" cy="-350" r="320" fill="#1c1917" stroke={isSelected ? '#d97706' : '#78716c'} strokeWidth="40" />
                    <text x="0" y="-230" fill="#f5f5f4" fontSize="300" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {room.num}
                    </text>

                    {/* Room Name */}
                    <text x="0" y="150" fill="#fafaf9" fontSize="340" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">
                      {room.name.length > 20 ? room.name.slice(0, 18) + '...' : room.name}
                    </text>

                    {/* Room Dimensions & Area */}
                    <text x="0" y="550" fill={isSelected ? '#fbbf24' : '#e7e5e4'} fontSize="280" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {room.areaM2.toFixed(2)} м²
                    </text>
                    <text x="0" y="850" fill="#a8a29e" fontSize="220" fontFamily="monospace" textAnchor="middle">
                      {(room.widthMm / 1000).toFixed(1)} × {(room.lengthMm / 1000).toFixed(1)} м
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* POOL BASIN 10.0 x 10.0 m WITH WATER & MOSAIC */}
          <g id="pool_basin_group">
            {/* Outer coping stone border */}
            <rect
              x={poolSvgX - 250}
              y={poolSvgY - 250}
              width={poolSvgW + 500}
              height={poolSvgH + 500}
              rx="150"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="60"
            />

            {/* Basin Mirror of Water with Mosaic */}
            <rect
              x={poolSvgX}
              y={poolSvgY}
              width={poolSvgW}
              height={poolSvgH}
              fill="url(#poolMosaic)"
              stroke="#0ea5e9"
              strokeWidth="100"
            />

            {/* Roman Entry Steps (South side of pool basin) */}
            {[0, 1, 2, 3].map(step => (
              <rect
                key={`pstep_${step}`}
                x={poolSvgX + 3250}
                y={poolSvgY + poolSvgH - (step + 1) * 450}
                width="3500"
                height="450"
                fill="#0369a1"
                stroke="#38bdf8"
                strokeWidth="25"
                opacity="0.8"
              />
            ))}

            {/* Stainless steel ladder indicator */}
            <line
              x1={poolSvgX + 1500}
              y1={poolSvgY + 200}
              x2={poolSvgX + 1500}
              y2={poolSvgY + 800}
              stroke="#e2e8f0"
              strokeWidth="80"
              strokeLinecap="round"
            />
            <line
              x1={poolSvgX + 2200}
              y1={poolSvgY + 200}
              x2={poolSvgX + 2200}
              y2={poolSvgY + 800}
              stroke="#e2e8f0"
              strokeWidth="80"
              strokeLinecap="round"
            />

            {/* Basin Info Badge in Center */}
            <g transform={`translate(${poolSvgX + poolSvgW / 2}, ${poolSvgY + poolSvgH / 2 - 400})`}>
              <rect x="-3200" y="-1000" width="6400" height="2000" rx="300" fill="#082f49" fillOpacity="0.88" stroke="#38bdf8" strokeWidth="60" />
              <text x="0" y="-450" fill="#ffffff" fontSize="480" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                ЧАША БАССЕЙНА
              </text>
              <text x="0" y="0" fill="#38bdf8" fontSize="400" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                10 000 × 10 000 мм (100.0 м²)
              </text>
              <text x="0" y="420" fill="#7dd3fc" fontSize="320" fontFamily="monospace" textAnchor="middle">
                Глубина: 1.40 – 1.80 м • Объём: ~160 м³
              </text>
              <text x="0" y="800" fill="#a5f3fc" fontSize="260" fontFamily="sans-serif" textAnchor="middle">
                Монолитная чаша • Переливной лоток • Римский вход
              </text>
            </g>
          </g>

          {/* CLEARANCES & DIMENSIONS AROUND POOL */}
          {showClearances && (
            <g id="pool_clearances" opacity="0.95">
              {/* West clearance: 2000 mm (14200 to 16200) */}
              <rect x="14200" y={toSvgY(12000)} width="2000" height="10000" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="30" strokeDasharray="100,50" />
              <g transform="translate(15200, 9000)">
                <rect x="-1100" y="-300" width="2200" height="600" rx="100" fill="#064e3b" stroke="#10b981" strokeWidth="30" />
                <text x="0" y="80" fill="#a7f3d0" fontSize="280" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  2 000 мм
                </text>
              </g>

              {/* East clearance: 4000 mm (26200 to 30200) */}
              <rect x="26200" y={toSvgY(16000)} width="4000" height="16000" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="30" strokeDasharray="100,50" />
              <g transform="translate(28200, 7000)">
                <rect x="-1800" y="-400" width="3600" height="800" rx="150" fill="#064e3b" stroke="#10b981" strokeWidth="40" />
                <text x="0" y="-20" fill="#a7f3d0" fontSize="340" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  4 000 мм
                </text>
                <text x="0" y="260" fill="#6ee7b7" fontSize="220" fontFamily="sans-serif" textAnchor="middle">
                  ПЛЯЖНАЯ ЗОНА ОТДЫХА
                </text>
              </g>

              {/* South clearance: 2000 mm (Y: 0 to 2000) */}
              <rect x="16200" y={toSvgY(2000)} width="10000" height="2000" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="30" strokeDasharray="100,50" />
              <g transform="translate(21200, 15000)">
                <rect x="-1100" y="-300" width="2200" height="600" rx="100" fill="#064e3b" stroke="#10b981" strokeWidth="30" />
                <text x="0" y="80" fill="#a7f3d0" fontSize="280" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  2 000 мм
                </text>
              </g>

              {/* North clearance: 4000 mm (Y: 12000 to 16000) */}
              <rect x="16200" y={toSvgY(16000)} width="10000" height="4000" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="30" strokeDasharray="100,50" />
              <g transform="translate(21200, 2000)">
                <rect x="-1800" y="-400" width="3600" height="800" rx="150" fill="#064e3b" stroke="#10b981" strokeWidth="40" />
                <text x="0" y="-20" fill="#a7f3d0" fontSize="340" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  4 000 мм
                </text>
                <text x="0" y="260" fill="#6ee7b7" fontSize="220" fontFamily="sans-serif" textAnchor="middle">
                  ЗОНА РЕЛАКСА И ДЕЙБЕДОВ
                </text>
              </g>
            </g>
          )}

          {/* FURNITURE & EQUIPMENT 2D ICONS */}
          {showFurniture && (
            <g id="furniture_layer" opacity="0.9">
              {/* Sun loungers in Pool Hall (East Zone) */}
              {[2500, 4800, 7100, 9400, 11700, 14000].map(yMm => (
                <g key={`lounger_${yMm}`} transform={`translate(28000, ${toSvgY(yMm)})`}>
                  <rect x="-1000" y="-350" width="2000" height="700" rx="100" fill="#334155" stroke="#94a3b8" strokeWidth="30" />
                  <rect x="-950" y="-300" width="600" height="600" rx="80" fill="#f8fafc" />
                  <circle cx="1400" cy="0" r="220" fill="#64748b" stroke="#cbd5e1" strokeWidth="20" />
                </g>
              ))}

              {/* Daybeds in Pool Hall (North Zone) */}
              {[18000, 21200, 24400].map(xMm => (
                <g key={`daybed_${xMm}`} transform={`translate(${xMm}, ${toSvgY(14000)})`}>
                  <rect x="-900" y="-900" width="1800" height="1800" rx="150" fill="#1e293b" stroke="#64748b" strokeWidth="40" />
                  <rect x="-800" y="-800" width="1600" height="1600" rx="100" fill="#f1f5f9" opacity="0.9" />
                  <circle cx="0" cy="0" r="250" fill="#e2e8f0" />
                </g>
              ))}

              {/* Lounge Sofas in Room 3 */}
              {[2500, 6000, 9500, 12500].map(xMm => (
                <g key={`lsofa_${xMm}`} transform={`translate(${xMm}, ${toSvgY(9500)})`}>
                  <rect x="-900" y="-450" width="1800" height="900" rx="150" fill="#1e293b" stroke="#22c55e" strokeWidth="30" />
                  <rect x="-700" y="-250" width="1400" height="500" rx="100" fill="#475569" />
                </g>
              ))}

              {/* Reception Desk in Room 2 */}
              <g transform={`translate(1600, ${toSvgY(4500)})`}>
                <rect x="-1000" y="-400" width="2000" height="800" rx="150" fill="#0f172a" stroke="#eab308" strokeWidth="40" />
                <text x="0" y="80" fill="#fef08a" fontSize="240" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                  РЕЦЕПЦИЯ
                </text>
              </g>

              {/* Lockers rows in Male & Female Lockers */}
              <g id="lockers_male" transform={`translate(4500, ${toSvgY(6000)})`}>
                <rect x="0" y="-1200" width="3000" height="400" fill="#451a03" stroke="#f97316" strokeWidth="20" />
                <rect x="0" y="-200" width="3000" height="400" fill="#451a03" stroke="#f97316" strokeWidth="20" />
              </g>
              <g id="lockers_female" transform={`translate(10000, ${toSvgY(6000)})`}>
                <rect x="0" y="-1200" width="3000" height="400" fill="#451a03" stroke="#f97316" strokeWidth="20" />
                <rect x="0" y="-200" width="3000" height="400" fill="#451a03" stroke="#f97316" strokeWidth="20" />
              </g>
            </g>
          )}

          {/* VISITOR FLOW ROUTE */}
          {showVisitorRoute && (
            <g id="visitor_route_layer">
              <path
                d={VISITOR_ROUTE_POINTS.reduce((acc, pt, idx) => {
                  const sy = toSvgY(pt.y);
                  return idx === 0 ? `M ${pt.x} ${sy}` : `${acc} L ${pt.x} ${sy}`;
                }, '')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="120"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="400,200"
                markerEnd="url(#arrowBlue)"
              />
              {VISITOR_ROUTE_POINTS.map((pt, idx) => (
                <circle
                  key={`vp_${idx}`}
                  cx={pt.x}
                  cy={toSvgY(pt.y)}
                  r="150"
                  fill="#60a5fa"
                  stroke="#1d4ed8"
                  strokeWidth="50"
                />
              ))}
            </g>
          )}

          {/* TECHNICAL STAFF ROUTE */}
          {showTechnicalRoute && (
            <g id="tech_route_layer">
              <path
                d={TECHNICAL_ROUTE_POINTS.reduce((acc, pt, idx) => {
                  const sy = toSvgY(pt.y);
                  return idx === 0 ? `M ${pt.x} ${sy}` : `${acc} L ${pt.x} ${sy}`;
                }, '')}
                fill="none"
                stroke="#ef4444"
                strokeWidth="90"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="300,150"
                markerEnd="url(#arrowRed)"
              />
            </g>
          )}

          {/* DOORS D1 - D16 */}
          <g id="doors_layer">
            {ARCHITECTURAL_DOORS.map(door => {
              const dx = door.xMm;
              const dy = toSvgY(door.yMm);
              const dw = door.widthMm;

              if (door.type === 'portal') {
                return (
                  <g key={door.id} transform={`translate(${dx}, ${dy})`}>
                    <line
                      x1={door.orientation === 'horizontal' ? -dw / 2 : 0}
                      y1={door.orientation === 'vertical' ? -dw / 2 : 0}
                      x2={door.orientation === 'horizontal' ? dw / 2 : 0}
                      y2={door.orientation === 'vertical' ? dw / 2 : 0}
                      stroke="#38bdf8"
                      strokeWidth="200"
                      strokeDasharray="150,100"
                    />
                    <circle cx="0" cy="0" r="240" fill="#082f49" stroke="#38bdf8" strokeWidth="40" />
                    <text x="0" y="70" fill="#e0f2fe" fontSize="220" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {door.code}
                    </text>
                  </g>
                );
              }

              return (
                <g key={door.id} transform={`translate(${dx}, ${dy})`}>
                  {/* Door Opening Gap & Leaf */}
                  <circle cx="0" cy="0" r="220" fill="#1e293b" stroke="#eab308" strokeWidth="40" />
                  <text x="0" y="70" fill="#fef08a" fontSize="200" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    {door.code}
                  </text>
                  {/* Swing arc representation */}
                  <path
                    d={
                      door.orientation === 'horizontal'
                        ? `M ${-dw / 2} 0 A ${dw} ${dw} 0 0 1 ${dw / 2} ${-dw / 2}`
                        : `M 0 ${-dw / 2} A ${dw} ${dw} 0 0 1 ${dw / 2} ${dw / 2}`
                    }
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="35"
                    strokeDasharray="80,50"
                  />
                </g>
              );
            })}
          </g>

          {/* EXTERIOR & INTERIOR WALLS (FULL THICKNESS) */}
          <g id="walls_layer" stroke="#64748b" strokeWidth="240" strokeLinecap="square">
            {/* Outer Perimeter (30 200 x 16 000 mm) */}
            <rect
              x="0"
              y={toSvgY(BUILDING_LENGTH_MM)}
              width={BUILDING_WIDTH_MM}
              height={BUILDING_LENGTH_MM}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="320"
            />

            {/* Vertical Partitions */}
            {/* Axis X = 3200 (Y: 0..8000) */}
            <line x1="3200" y1={toSvgY(0)} x2="3200" y2={toSvgY(8000)} />
            {/* Axis X = 6700 (Y: 0..3500) */}
            <line x1="6700" y1={toSvgY(0)} x2="6700" y2={toSvgY(3500)} />
            {/* Axis X = 8700 (Y: 0..8000) */}
            <line x1="8700" y1={toSvgY(0)} x2="8700" y2={toSvgY(8000)} />
            {/* Axis X = 10700 (Y: 0..3500) */}
            <line x1="10700" y1={toSvgY(0)} x2="10700" y2={toSvgY(3500)} />
            {/* Axis X = 14200 (Master dividing wall Y: 0..16000) */}
            <line x1="14200" y1={toSvgY(0)} x2="14200" y2={toSvgY(8000)} stroke="#94a3b8" strokeWidth="320" />
            <line x1="14200" y1={toSvgY(11000)} x2="14200" y2={toSvgY(16000)} stroke="#94a3b8" strokeWidth="320" />
            {/* Axis X = 3600 (Y: 11000..16000) */}
            <line x1="3600" y1={toSvgY(11000)} x2="3600" y2={toSvgY(16000)} />
            {/* Axis X = 7200 (Y: 11000..16000) */}
            <line x1="7200" y1={toSvgY(11000)} x2="7200" y2={toSvgY(16000)} />
            {/* Axis X = 11200 (Y: 11000..16000) */}
            <line x1="11200" y1={toSvgY(11000)} x2="11200" y2={toSvgY(16000)} />

            {/* Horizontal Partitions */}
            {/* Axis Y = 2000 (X: 0..3200) */}
            <line x1="0" y1={toSvgY(2000)} x2="3200" y2={toSvgY(2000)} />
            {/* Axis Y = 3500 (X: 3200..14200) */}
            <line x1="3200" y1={toSvgY(3500)} x2="14200" y2={toSvgY(3500)} />
            {/* Axis Y = 8000 (X: 0..14200) */}
            <line x1="0" y1={toSvgY(8000)} x2="14200" y2={toSvgY(8000)} />
            {/* Axis Y = 11000 (X: 0..14200) */}
            <line x1="0" y1={toSvgY(11000)} x2="14200" y2={toSvgY(11000)} />
          </g>

          {/* ARCHITECTURAL DIMENSION CHAINS (РАЗМЕРНЫЕ ЦЕПОЧКИ) */}
          {showDimensions && (
            <g id="dimension_chains" stroke="#94a3b8" strokeWidth="35">
              {/* SOUTH DIMENSION LINE: Total 30 200 mm */}
              <line x1="0" y1={toSvgY(-700)} x2={BUILDING_WIDTH_MM} y2={toSvgY(-700)} />
              <line x1="0" y1={toSvgY(-500)} x2="0" y2={toSvgY(-900)} strokeWidth="50" />
              <line x1={BUILDING_WIDTH_MM} y1={toSvgY(-500)} x2={BUILDING_WIDTH_MM} y2={toSvgY(-900)} strokeWidth="50" />
              <g transform={`translate(${BUILDING_WIDTH_MM / 2}, ${toSvgY(-850)})`}>
                <rect x="-1800" y="-250" width="3600" height="500" fill="#0b1120" />
                <text x="0" y="90" fill="#f8fafc" fontSize="380" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                  30 200 мм (30.20 м)
                </text>
              </g>

              {/* WEST DIMENSION LINE: Total 16 000 mm */}
              <line x1="-700" y1={toSvgY(0)} x2="-700" y2={toSvgY(BUILDING_LENGTH_MM)} />
              <line x1="-900" y1={toSvgY(0)} x2="-500" y2={toSvgY(0)} strokeWidth="50" />
              <line x1="-900" y1={toSvgY(BUILDING_LENGTH_MM)} x2="-500" y2={toSvgY(BUILDING_LENGTH_MM)} strokeWidth="50" />
              <g transform={`translate(-850, ${toSvgY(BUILDING_LENGTH_MM / 2)}) rotate(-90)`}>
                <rect x="-1800" y="-250" width="3600" height="500" fill="#0b1120" />
                <text x="0" y="90" fill="#f8fafc" fontSize="380" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                  16 000 мм (16.00 м)
                </text>
              </g>

              {/* NORTH DETAIL CHAIN (X: 0, 3600, 7200, 11200, 14200, 30200) */}
              {[
                { x1: 0, x2: 3600, label: '3 600' },
                { x1: 3600, x2: 7200, label: '3 600' },
                { x1: 7200, x2: 11200, label: '4 000' },
                { x1: 11200, x2: 14200, label: '3 000' },
                { x1: 14200, x2: 30200, label: '16 000' }
              ].map((dim, idx) => (
                <g key={`ndim_${idx}`}>
                  <line x1={dim.x1} y1={toSvgY(16600)} x2={dim.x2} y2={toSvgY(16600)} />
                  <line x1={dim.x1} y1={toSvgY(16450)} x2={dim.x1} y2={toSvgY(16750)} strokeWidth="40" />
                  <line x1={dim.x2} y1={toSvgY(16450)} x2={dim.x2} y2={toSvgY(16750)} strokeWidth="40" />
                  <text
                    x={(dim.x1 + dim.x2) / 2}
                    y={toSvgY(16800)}
                    fill="#38bdf8"
                    fontSize="260"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {dim.label}
                  </text>
                </g>
              ))}

              {/* EAST DETAIL CHAIN (Y: 0, 2000, 12000, 16000) around pool */}
              {[
                { y1: 0, y2: 2000, label: '2 000' },
                { y1: 2000, y2: 12000, label: '10 000' },
                { y1: 12000, y2: 16000, label: '4 000' }
              ].map((dim, idx) => (
                <g key={`edim_${idx}`}>
                  <line x1="30700" y1={toSvgY(dim.y1)} x2="30700" y2={toSvgY(dim.y2)} />
                  <line x1="30550" y1={toSvgY(dim.y1)} x2="30850" y2={toSvgY(dim.y1)} strokeWidth="40" />
                  <line x1="30550" y1={toSvgY(dim.y2)} x2="30850" y2={toSvgY(dim.y2)} strokeWidth="40" />
                  <text
                    x="31200"
                    y={toSvgY((dim.y1 + dim.y2) / 2)}
                    fill="#38bdf8"
                    fontSize="260"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {dim.label}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* AXES LABELS (A, B, C... & 1, 2, 3...) */}
          <g id="grid_axes_markers">
            {GRID_X_AXES.map((axisX, idx) => (
              <g key={`ax_${axisX}`} transform={`translate(${axisX}, ${toSvgY(17500)})`}>
                <line x1="0" y1="0" x2="0" y2="800" stroke="#475569" strokeWidth="30" strokeDasharray="100,50" />
                <circle cx="0" cy="0" r="300" fill="#0f172a" stroke="#38bdf8" strokeWidth="40" />
                <text x="0" y="100" fill="#f8fafc" fontSize="260" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {idx + 1}
                </text>
              </g>
            ))}

            {GRID_Y_AXES.map((axisY, idx) => (
              <g key={`ay_${axisY}`} transform={`translate(-1500, ${toSvgY(axisY)})`}>
                <line x1="0" y1="0" x2="600" y2="0" stroke="#475569" strokeWidth="30" strokeDasharray="100,50" />
                <circle cx="0" cy="0" r="300" fill="#0f172a" stroke="#38bdf8" strokeWidth="40" />
                <text x="0" y="90" fill="#f8fafc" fontSize="260" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                  {String.fromCharCode(65 + idx)}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* BOTTOM HUD INDICATOR */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-4 text-xs font-mono shadow-xl pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-white font-bold">ОСНОВНОЙ КОНТУР:</span>
            <span className="text-cyan-300">P1(0,0) → P2(30200,0) → P3(30200,16000) → P4(0,16000)</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span>SCALE:</span>
            <span className="text-amber-400">1:50 DXF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
