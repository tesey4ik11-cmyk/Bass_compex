import React, { useState } from 'react';
import { ARCHITECTURAL_ROOMS, ArchitecturalRoom, POOL_BASIN } from '../data/approvedSpaPlanData';

interface Props {
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
  onOpenRoomModal: (room: ArchitecturalRoom) => void;
  onScrollToPlan: () => void;
}

export const RoomCatalogSection: React.FC<Props> = ({
  selectedRoomId,
  onSelectRoom,
  onOpenRoomModal,
  onScrollToPlan
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'dry' | 'wet' | 'bath' | 'pool' | 'tech'>('all');

  const filteredRooms = filterCategory === 'all'
    ? ARCHITECTURAL_ROOMS
    : ARCHITECTURAL_ROOMS.filter(r => r.category === filterCategory);

  return (
    <section id="rooms" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono">
            <span>04. Экспликация и пространство</span>
            <span className="text-slate-600">·</span>
            <span>Паспорт помещений</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Каталог помещений <br />
            <span className="font-semibold text-slate-200">и функциональные зоны</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            13 автономных пространств, спроектированных по принципу максимальной эргономики и комфорта гостей.
            Выберите помещение для детального ознакомления со спецификацией отделки, микроклиматом и оборудованием.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl shrink-0 overflow-x-auto">
          {[
            { id: 'all', label: 'Все помещения (13)' },
            { id: 'bath', label: 'Парные (3)' },
            { id: 'wet', label: 'Раздевалки и душ (6)' },
            { id: 'dry', label: 'Холл и лаундж (3)' },
            { id: 'tech', label: 'Инженерия (1)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterCategory(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                filterCategory === f.id
                  ? 'bg-white text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => {
          const isSelected = selectedRoomId === room.id;
          return (
            <div
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              <div className="space-y-4">
                {/* Header line */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center border border-slate-700">
                      {room.num}
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {room.zoneName}
                    </span>
                  </div>
                  <span className="text-sm font-bold font-mono text-white">
                    {room.areaM2.toFixed(2)} м²
                  </span>
                </div>

                {/* Room Title */}
                <div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">{room.name}</h3>
                  <div className="text-xs font-mono text-cyan-400 mt-1">
                    {(room.widthMm / 1000).toFixed(2)} × {(room.lengthMm / 1000).toFixed(2)} м
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                {/* Feature tags */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {room.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <span className="text-cyan-400 mt-0.5">·</span>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenRoomModal(room);
                  }}
                  className="text-xs text-slate-300 hover:text-white font-medium underline flex items-center gap-1"
                >
                  <span>Паспорт помещения</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRoom(room.id);
                    onScrollToPlan();
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                >
                  [Показать на плане]
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
