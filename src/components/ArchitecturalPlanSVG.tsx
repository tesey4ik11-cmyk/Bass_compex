import React, { useState } from 'react';
import { PlanVariant, Room, Door } from '../types/architecture';
import { BUILDING_WIDTH, BUILDING_HEIGHT } from '../data/variantsData';

interface ArchitecturalPlanSVGProps {
  variant: PlanVariant;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
  showVisitorRoute: boolean;
  showTechnicalRoute: boolean;
  showDimensions: boolean;
  showClearances: boolean;
  showFurniture: boolean;
  showGrid: boolean;
  showDoorArcs: boolean;
}

export const ArchitecturalPlanSVG: React.FC<ArchitecturalPlanSVGProps> = ({
  variant,
  selectedRoomId,
  onSelectRoom,
  showVisitorRoute,
  showTechnicalRoute,
  showDimensions,
  showClearances,
  showFurniture,
  showGrid,
  showDoorArcs
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredRoom, setHoveredRoom] = useState<Room | null>(null);

  // Coordinate conversion: 1 meter = 45 SVG units
  const SCALE = 45;
  const MARGIN_LEFT = 85;
  const MARGIN_TOP = 85;
  const SVG_WIDTH = BUILDING_WIDTH * SCALE + MARGIN_LEFT * 2 + 100;
  const SVG_HEIGHT = BUILDING_HEIGHT * SCALE + MARGIN_TOP * 2 + 100;

  const toSvgX = (m: number) => MARGIN_LEFT + m * SCALE;
  const toSvgY = (m: number) => MARGIN_TOP + m * SCALE;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.6), 3.0));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const pool = variant.poolPosition;
  const lounge = variant.loungeZone;

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden select-none flex flex-col items-center justify-center">
      {/* Zoom / View controls overlay */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-1.5 rounded-lg shadow-xl text-slate-200">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.15, 3.0))}
          className="p-1.5 hover:bg-slate-700 rounded transition text-xs font-semibold px-2.5"
          title="Приблизить (+)"
        >
          +
        </button>
        <span className="text-xs px-2 text-slate-300 font-mono">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.15, 0.6))}
          className="p-1.5 hover:bg-slate-700 rounded transition text-xs font-semibold px-2.5"
          title="Отдалить (-)"
        >
          −
        </button>
        <button
          onClick={resetView}
          className="p-1.5 hover:bg-slate-700 rounded transition text-xs font-medium px-2.5 ml-1 border-l border-slate-700 text-cyan-400"
          title="Сбросить масштаб и положение"
        >
          Сброс
        </button>
      </div>

      {/* SVG Canvas */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full max-h-[85vh] transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid-1m" width={SCALE} height={SCALE} patternUnits="userSpaceOnUse">
              <path d={`M ${SCALE} 0 L 0 0 0 ${SCALE}`} fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
            </pattern>
            <pattern id="grid-5m" width={SCALE * 5} height={SCALE * 5} patternUnits="userSpaceOnUse">
              <rect width={SCALE * 5} height={SCALE * 5} fill="none" stroke="#475569" strokeWidth="1" />
            </pattern>

            {/* Wall Hatch Pattern */}
            <pattern id="wall-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#64748B" strokeWidth="1.5" />
            </pattern>

            {/* Pool Water Gradient */}
            <linearGradient id="poolWater" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#0369A1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#075985" stopOpacity="0.95" />
            </linearGradient>

            {/* Pool Grid Pattern (Tiles) */}
            <pattern id="poolTiles" width="15" height="15" patternUnits="userSpaceOnUse">
              <rect width="15" height="15" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>

            {/* Lounge Deck Pattern */}
            <pattern id="woodDeck" width="30" height="8" patternUnits="userSpaceOnUse">
              <rect width="30" height="8" fill="#F8FAFC" fillOpacity="0.05" />
              <line x1="0" y1="0" x2="30" y2="0" stroke="#CBD5E1" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>

            {/* Filters */}
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background */}
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#0F172A" />

          {/* 1m / 5m Grid */}
          {showGrid && (
            <g opacity="0.6">
              <rect
                x={toSvgX(0)}
                y={toSvgY(0)}
                width={BUILDING_WIDTH * SCALE}
                height={BUILDING_HEIGHT * SCALE}
                fill="url(#grid-1m)"
              />
              <rect
                x={toSvgX(0)}
                y={toSvgY(0)}
                width={BUILDING_WIDTH * SCALE}
                height={BUILDING_HEIGHT * SCALE}
                fill="url(#grid-5m)"
              />
            </g>
          )}

          {/* Building Outer Footprint Base */}
          <rect
            x={toSvgX(0)}
            y={toSvgY(0)}
            width={BUILDING_WIDTH * SCALE}
            height={BUILDING_HEIGHT * SCALE}
            fill="#1E293B"
            stroke="#475569"
            strokeWidth="1"
            filter="url(#shadow)"
          />

          {/* ROOM SURFACES */}
          <g id="rooms-group">
            {variant.rooms.filter(r => r.id !== 'a_pool_hall' && r.id !== 'b_pool_hall' && r.id !== 'v_pool_hall' && r.id !== 'a_lounge' && r.id !== 'b_lounge' && r.id !== 'v_lounge').map((room) => {
              const isSelected = selectedRoomId === room.id;
              const isHovered = hoveredRoom?.id === room.id;

              return (
                <g
                  key={room.id}
                  onClick={() => onSelectRoom(isSelected ? null : room.id)}
                  onMouseEnter={() => setHoveredRoom(room)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className="cursor-pointer transition-all duration-150"
                >
                  <rect
                    x={toSvgX(room.x)}
                    y={toSvgY(room.y)}
                    width={room.width * SCALE}
                    height={room.height * SCALE}
                    fill={room.color}
                    fillOpacity={isSelected ? 0.35 : isHovered ? 0.25 : 0.15}
                    stroke={isSelected ? '#38BDF8' : isHovered ? '#94A3B8' : room.borderColor}
                    strokeWidth={isSelected ? 3 : 1.5}
                    strokeDasharray={isSelected ? '6 3' : undefined}
                  />

                  {/* Room Label Box */}
                  <g pointerEvents="none">
                    <rect
                      x={toSvgX(room.x + room.width / 2) - 65}
                      y={toSvgY(room.y + room.height / 2) - 18}
                      width="130"
                      height="36"
                      rx="6"
                      fill="#0F172A"
                      fillOpacity="0.88"
                      stroke={isSelected ? '#38BDF8' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x={toSvgX(room.x + room.width / 2)}
                      y={toSvgY(room.y + room.height / 2) - 4}
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="9.5"
                      fontWeight="600"
                    >
                      {room.name.length > 22 ? room.name.substring(0, 21) + '…' : room.name}
                    </text>
                    <text
                      x={toSvgX(room.x + room.width / 2)}
                      y={toSvgY(room.y + room.height / 2) + 10}
                      textAnchor="middle"
                      fill="#38BDF8"
                      fontSize="9.5"
                      fontWeight="700"
                      fontFamily="monospace"
                    >
                      {room.width.toFixed(2)} × {room.height.toFixed(2)} м | {room.area.toFixed(2)} м²
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* POOL 10.00 × 10.00 M */}
          <g id="pool-10x10">
            {/* Pool Basin Outer Border / Overflow Gutter */}
            <rect
              x={toSvgX(pool.x - 0.25)}
              y={toSvgY(pool.y - 0.25)}
              width={(pool.width + 0.5) * SCALE}
              height={(pool.height + 0.5) * SCALE}
              fill="#082F49"
              stroke="#0284C7"
              strokeWidth="2"
              rx="4"
            />
            {/* Pool Overflow Grate */}
            <rect
              x={toSvgX(pool.x - 0.15)}
              y={toSvgY(pool.y - 0.15)}
              width={(pool.width + 0.3) * SCALE}
              height={(pool.height + 0.3) * SCALE}
              fill="none"
              stroke="#0369A1"
              strokeWidth="4"
              strokeDasharray="4 2"
            />
            {/* Water Surface */}
            <rect
              x={toSvgX(pool.x)}
              y={toSvgY(pool.y)}
              width={pool.width * SCALE}
              height={pool.height * SCALE}
              fill="url(#poolWater)"
              stroke="#38BDF8"
              strokeWidth="2"
              rx="2"
            />
            {/* Pool Tile Texture */}
            <rect
              x={toSvgX(pool.x)}
              y={toSvgY(pool.y)}
              width={pool.width * SCALE}
              height={pool.height * SCALE}
              fill="url(#poolTiles)"
              pointerEvents="none"
            />

            {/* Entry Steps on West Side */}
            <g opacity="0.8">
              <rect x={toSvgX(pool.x + 0.2)} y={toSvgY(pool.y + 1.0)} width={SCALE * 0.8} height={SCALE * 2.5} fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
              <line x1={toSvgX(pool.x + 0.45)} y1={toSvgY(pool.y + 1.0)} x2={toSvgX(pool.x + 0.45)} y2={toSvgY(pool.y + 3.5)} stroke="#E0F2FE" strokeWidth="1" />
              <line x1={toSvgX(pool.x + 0.7)} y1={toSvgY(pool.y + 1.0)} x2={toSvgX(pool.x + 0.7)} y2={toSvgY(pool.y + 3.5)} stroke="#E0F2FE" strokeWidth="1" />
              <line x1={toSvgX(pool.x + 0.1)} y1={toSvgY(pool.y + 1.2)} x2={toSvgX(pool.x + 0.9)} y2={toSvgY(pool.y + 1.2)} stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1={toSvgX(pool.x + 0.1)} y1={toSvgY(pool.y + 3.3)} x2={toSvgX(pool.x + 0.9)} y2={toSvgY(pool.y + 3.3)} stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Center Pool Badge */}
            <rect
              x={toSvgX(pool.x + pool.width / 2) - 105}
              y={toSvgY(pool.y + pool.height / 2) - 30}
              width="210"
              height="60"
              rx="8"
              fill="#0F172A"
              fillOpacity="0.92"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            <text
              x={toSvgX(pool.x + pool.width / 2)}
              y={toSvgY(pool.y + pool.height / 2) - 8}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12.5"
              fontWeight="bold"
            >
              БАССЕЙН 10.00 × 10.00 м
            </text>
            <text
              x={toSvgX(pool.x + pool.width / 2)}
              y={toSvgY(pool.y + pool.height / 2) + 10}
              textAnchor="middle"
              fill="#7DD3FC"
              fontSize="10.5"
              fontFamily="monospace"
              fontWeight="600"
            >
              S = 100.00 м² | h = 1.40 м | V = 140 м³
            </text>
            <text
              x={toSvgX(pool.x + pool.width / 2)}
              y={toSvgY(pool.y + pool.height / 2) + 24}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="9"
            >
              Переливной борт, гидромассаж, подсветка
            </text>
          </g>

          {/* DEDICATED LOUNGE / RELAXATION ZONE */}
          {showFurniture && (
            <g id="lounge-furniture" opacity="0.95">
              <rect
                x={toSvgX(lounge.x)}
                y={toSvgY(lounge.y)}
                width={lounge.width * SCALE}
                height={lounge.height * SCALE}
                fill="url(#woodDeck)"
                stroke="#EAB308"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                rx="4"
              />
              <rect
                x={toSvgX(lounge.x + lounge.width / 2) - 110}
                y={toSvgY(lounge.y + lounge.height / 2) - 12}
                width="220"
                height="24"
                rx="4"
                fill="#0F172A"
                fillOpacity="0.9"
                stroke="#EAB308"
                strokeWidth="1"
              />
              <text
                x={toSvgX(lounge.x + lounge.width / 2)}
                y={toSvgY(lounge.y + lounge.height / 2) + 4}
                textAnchor="middle"
                fill="#FEF08A"
                fontSize="10.5"
                fontWeight="700"
              >
                ЗОНА ОТДЫХА (LOUNGE) • {lounge.area.toFixed(1)} м²
              </text>

              {/* Sun Loungers Rendering */}
              {Array.from({ length: Math.min(Math.floor(lounge.width / 1.5), 8) }).map((_, idx) => {
                const lx = lounge.x + 0.5 + idx * 1.5;
                if (lx + 0.8 > lounge.x + lounge.width) return null;
                return (
                  <g key={`lounger-${idx}`}>
                    <rect
                      x={toSvgX(lx)}
                      y={toSvgY(lounge.y + 0.3)}
                      width={SCALE * 0.7}
                      height={SCALE * 1.5}
                      rx="3"
                      fill="#334155"
                      stroke="#94A3B8"
                      strokeWidth="1"
                    />
                    <rect
                      x={toSvgX(lx + 0.05)}
                      y={toSvgY(lounge.y + 0.35)}
                      width={SCALE * 0.6}
                      height={SCALE * 0.35}
                      rx="2"
                      fill="#64748B"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* EXTERIOR WALLS & SEPARATION PARTITIONS */}
          <g id="walls-structure">
            {/* South Outer Wall */}
            <rect x={toSvgX(0)} y={toSvgY(0)} width={BUILDING_WIDTH * SCALE} height={0.3 * SCALE} fill="url(#wall-hatch)" stroke="#94A3B8" strokeWidth="1.5" />
            {/* North Outer Wall */}
            <rect x={toSvgX(0)} y={toSvgY(14.7)} width={BUILDING_WIDTH * SCALE} height={0.3 * SCALE} fill="url(#wall-hatch)" stroke="#94A3B8" strokeWidth="1.5" />
            {/* West Outer Wall */}
            <rect x={toSvgX(0)} y={toSvgY(0)} width={0.3 * SCALE} height={BUILDING_HEIGHT * SCALE} fill="url(#wall-hatch)" stroke="#94A3B8" strokeWidth="1.5" />
            {/* East Outer Wall (Panoramic Glazing) */}
            <rect x={toSvgX(19.7)} y={toSvgY(0)} width={0.3 * SCALE} height={BUILDING_HEIGHT * SCALE} fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="1.5" />

            {/* Main divider partition between Service/Bath block & Pool Hall */}
            <rect x={toSvgX(6.5)} y={toSvgY(0.3)} width={0.2 * SCALE} height={(5.5 - 0.3) * SCALE} fill="url(#wall-hatch)" stroke="#94A3B8" strokeWidth="1" />
            <rect x={toSvgX(6.5)} y={toSvgY(6.9)} width={0.2 * SCALE} height={(14.7 - 6.9) * SCALE} fill="url(#wall-hatch)" stroke="#94A3B8" strokeWidth="1" />
          </g>

          {/* REAL DOOR OPENINGS WITH LEAVES, CODES AND SWING ARCS */}
          <g id="doors-layer">
            {variant.doors.map((door) => {
              const dx = toSvgX(door.x);
              const dy = toSvgY(door.y);
              const w = (door.width / 1000) * SCALE;

              if (door.type === 'portal') {
                return (
                  <g key={door.id}>
                    <rect
                      x={dx - 3}
                      y={dy - w / 2}
                      width={6}
                      height={w}
                      fill="#0284C7"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                    />
                    <text
                      x={dx + 10}
                      y={dy + 4}
                      fill="#38BDF8"
                      fontSize="9.5"
                      fontWeight="bold"
                    >
                      {door.code}: Портал {door.width} мм →
                    </text>
                  </g>
                );
              }

              return (
                <g key={door.id} className="cursor-pointer">
                  {door.orientation === 'horizontal' ? (
                    <>
                      <rect x={dx - w / 2 - 2} y={dy - 3} width="4" height="6" fill="#F8FAFC" />
                      <rect x={dx + w / 2 - 2} y={dy - 3} width="4" height="6" fill="#F8FAFC" />
                      <line
                        x1={dx - w / 2}
                        y1={dy}
                        x2={dx - w / 2}
                        y2={door.swingDirection === 'down' ? dy + w : dy - w}
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {showDoorArcs && (
                        <path
                          d={`M ${dx + w / 2} ${dy} A ${w} ${w} 0 0 ${door.swingDirection === 'down' ? 1 : 0} ${dx - w / 2} ${door.swingDirection === 'down' ? dy + w : dy - w}`}
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          opacity="0.8"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <rect x={dx - 3} y={dy - w / 2 - 2} width="6" height="4" fill="#F8FAFC" />
                      <rect x={dx - 3} y={dy + w / 2 - 2} width="6" height="4" fill="#F8FAFC" />
                      <line
                        x1={dx}
                        y1={dy - w / 2}
                        x2={door.swingDirection === 'right' ? dx + w : dx - w}
                        y2={dy - w / 2}
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {showDoorArcs && (
                        <path
                          d={`M ${dx} ${dy + w / 2} A ${w} ${w} 0 0 ${door.swingDirection === 'right' ? 0 : 1} ${door.swingDirection === 'right' ? dx + w : dx - w} ${dy - w / 2}`}
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          opacity="0.8"
                        />
                      )}
                    </>
                  )}

                  {/* Door Code Badge */}
                  <text
                    x={dx}
                    y={dy + (door.orientation === 'horizontal' ? 14 : -10)}
                    textAnchor="middle"
                    fill="#F59E0B"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {door.code} ({door.width})
                  </text>
                </g>
              );
            })}
          </g>

          {/* MAIN ENTRANCE & TECHNICAL ENTRANCE BEACONS */}
          <g id="entrance-callouts">
            {/* Main Entrance (South) */}
            <g>
              <polygon
                points={`${toSvgX(1.55)},${toSvgY(-0.3)} ${toSvgX(1.3)},${toSvgY(-0.7)} ${toSvgX(1.8)},${toSvgY(-0.7)}`}
                fill="#38BDF8"
              />
              <rect
                x={toSvgX(1.55) - 75}
                y={toSvgY(-1.35)}
                width="150"
                height="26"
                rx="6"
                fill="#0284C7"
                stroke="#38BDF8"
                strokeWidth="1.5"
                filter="url(#shadow)"
              />
              <text
                x={toSvgX(1.55)}
                y={toSvgY(-1.35) + 17}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="bold"
              >
                ★ ГЛАВНЫЙ ВХОД (1100 мм)
              </text>
            </g>

            {/* Technical Entrance (North) */}
            <g>
              <polygon
                points={`${toSvgX(1.8)},${toSvgY(15.3)} ${toSvgX(1.55)},${toSvgY(15.7)} ${toSvgX(2.05)},${toSvgY(15.7)}`}
                fill="#EF4444"
              />
              <rect
                x={toSvgX(1.8) - 80}
                y={toSvgY(15.8)}
                width="160"
                height="26"
                rx="6"
                fill="#991B1B"
                stroke="#EF4444"
                strokeWidth="1.5"
                filter="url(#shadow)"
              />
              <text
                x={toSvgX(1.8)}
                y={toSvgY(15.8) + 17}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10.5"
                fontWeight="bold"
              >
                ⚙ ТЕХНИЧЕСКИЙ ВХОД (900 мм)
              </text>
            </g>
          </g>

          {/* VISITOR FLOW ROUTE (BLUE) */}
          {showVisitorRoute && (
            <g id="visitor-route" filter="url(#glow-blue)">
              <polyline
                points={variant.visitorRoute.waypoints.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 4"
              />
              {variant.visitorRoute.waypoints.map((wp, i) => (
                <g key={wp.id}>
                  <circle
                    cx={toSvgX(wp.x)}
                    cy={toSvgY(wp.y)}
                    r="12"
                    fill="#0284C7"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    x={toSvgX(wp.x)}
                    y={toSvgY(wp.y) + 4}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {i + 1}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* TECHNICAL FLOW ROUTE (RED) */}
          {showTechnicalRoute && (
            <g id="technical-route" filter="url(#glow-red)">
              <polyline
                points={variant.technicalRoute.waypoints.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                fill="none"
                stroke="#EF4444"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 4"
              />
              {variant.technicalRoute.waypoints.map((wp, i) => (
                <g key={wp.id}>
                  <circle
                    cx={toSvgX(wp.x)}
                    cy={toSvgY(wp.y)}
                    r="12"
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    x={toSvgX(wp.x)}
                    y={toSvgY(wp.y) + 4}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    T{i + 1}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* CLEARANCE CHECK LABELS */}
          {showClearances && (
            <g id="clearances-overlay">
              {variant.clearanceChecks.map((check) => {
                let cx = 0, cy = 0;
                if (check.id.includes('north')) {
                  cx = toSvgX(pool.x + pool.width / 2);
                  cy = toSvgY(pool.y + pool.height + 0.6);
                } else if (check.id.includes('south')) {
                  cx = toSvgX(pool.x + pool.width / 2);
                  cy = toSvgY(pool.y - 0.6);
                } else if (check.id.includes('east')) {
                  cx = toSvgX(pool.x + pool.width + 0.6);
                  cy = toSvgY(pool.y + pool.height / 2);
                } else {
                  cx = toSvgX(pool.x - 0.6);
                  cy = toSvgY(pool.y + pool.height / 2);
                }

                return (
                  <g key={check.id}>
                    <rect
                      x={cx - 45}
                      y={cy - 10}
                      width="90"
                      height="20"
                      rx="4"
                      fill="#065F46"
                      stroke="#10B981"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      fill="#A7F3D0"
                      fontSize="9.5"
                      fontWeight="bold"
                    >
                      {check.actual.toFixed(2)} м ≥ {check.required.toFixed(2)} ✓
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* OVERALL DIMENSION STRINGS */}
          {showDimensions && (
            <g id="dimension-strings" opacity="0.9">
              {/* Overall X = 20.00 m */}
              <line x1={toSvgX(0)} y1={toSvgY(-0.8)} x2={toSvgX(20)} y2={toSvgY(-0.8)} stroke="#94A3B8" strokeWidth="1" />
              <line x1={toSvgX(0) - 4} y1={toSvgY(-0.8) - 4} x2={toSvgX(0) + 4} y2={toSvgY(-0.8) + 4} stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1={toSvgX(20) - 4} y1={toSvgY(-0.8) - 4} x2={toSvgX(20) + 4} y2={toSvgY(-0.8) + 4} stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x={toSvgX(10) - 55} y={toSvgY(-0.8) - 10} width="110" height="18" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="0.5" />
              <text x={toSvgX(10)} y={toSvgY(-0.8) + 3} textAnchor="middle" fill="#E2E8F0" fontSize="9" fontFamily="monospace" fontWeight="600">
                20.00 м (Длина здания)
              </text>

              {/* Overall Y = 15.00 m */}
              <line x1={toSvgX(-0.8)} y1={toSvgY(0)} x2={toSvgX(-0.8)} y2={toSvgY(15)} stroke="#94A3B8" strokeWidth="1" />
              <line x1={toSvgX(-0.8) - 4} y1={toSvgY(0) - 4} x2={toSvgX(-0.8) + 4} y2={toSvgY(0) + 4} stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1={toSvgX(-0.8) - 4} y1={toSvgY(15) - 4} x2={toSvgX(-0.8) + 4} y2={toSvgY(15) + 4} stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x={toSvgX(-0.8) - 10} y={toSvgY(7.5) - 35} width="20" height="70" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="0.5" />
              <text
                x={toSvgX(-0.8) + 4}
                y={toSvgY(7.5)}
                textAnchor="middle"
                fill="#E2E8F0"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="600"
                transform={`rotate(-90 ${toSvgX(-0.8)} ${toSvgY(7.5)})`}
              >
                15.00 м (Ширина)
              </text>
            </g>
          )}

          {/* North Direction Compass */}
          <g transform={`translate(${toSvgX(19.2)}, ${toSvgY(0.7)})`} opacity="0.85">
            <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <polygon points="0,-13 4,0 0,-3 -4,0" fill="#EF4444" />
            <polygon points="0,13 4,0 0,3 -4,0" fill="#94A3B8" />
            <text x="0" y="-15" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold">С (N)</text>
          </g>
        </svg>
      </div>

      {/* Floating Info Pill on Hover */}
      {hoveredRoom && (
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-2xl text-xs max-w-sm">
          <div className="flex items-center gap-2 font-bold text-white mb-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredRoom.borderColor }} />
            {hoveredRoom.name}
          </div>
          <div className="text-cyan-400 font-mono font-semibold mb-1">
            Габариты: {hoveredRoom.width.toFixed(2)} × {hoveredRoom.height.toFixed(2)} м | S = {hoveredRoom.area.toFixed(2)} м²
          </div>
          <div className="text-slate-300 text-[11px] leading-relaxed">
            {hoveredRoom.description}
          </div>
        </div>
      )}
    </div>
  );
};
