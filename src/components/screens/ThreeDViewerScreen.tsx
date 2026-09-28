import React from 'react';
import { Spa3DViewer } from '../Spa3DViewer';
import { ARCHITECTURAL_ROOMS, ArchitecturalRoom } from '../../data/approvedSpaPlanData';

interface Props {
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
  onOpenRoomModal: (room: ArchitecturalRoom) => void;
}

export const ThreeDViewerScreen: React.FC<Props> = ({
  selectedRoomId,
  onSelectRoom,
  onOpenRoomModal
}) => {
  const selectedRoom = ARCHITECTURAL_ROOMS.find(r => r.id === selectedRoomId);

  // Quick navigation destinations in 3D
  const quickLocations = [
    { id: 'room_pool_hall', label: '🏊 Бассейн' },
    { id: 'room_hamam', label: '💨 Хамам' },
    { id: 'room_sauna', label: '🌲 Сауна' },
    { id: 'room_steam', label: '🔥 Парная' },
    { id: 'room_lounge', label: '🍵 Лаундж' },
    { id: 'room_locker_male', label: '👔 Мужской блок (Юг)' },
    { id: 'room_locker_female', label: '👗 Женский блок (Юг)' }
  ];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col bg-stone-950 text-stone-100 select-none overflow-hidden">
      {/* Top Floating Control Bar */}
      <div className="min-h-12 sm:h-14 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md px-3 sm:px-6 lg:px-12 py-1.5 flex flex-wrap items-center justify-between gap-2 z-20 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
            03. 3D ПРОСТРАНСТВО
          </span>
          <span className="text-stone-700 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-cyan-300 hidden md:inline">
            МАСШТАБ 1:50 • MASTER MODEL
          </span>
        </div>

        {/* Selected Room Pill */}
        <div className="flex items-center gap-2">
          {selectedRoom ? (
            <button
              onClick={() => onOpenRoomModal(selectedRoom)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono hover:bg-cyan-500/20 transition truncate max-w-[200px] sm:max-w-none"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="truncate">{selectedRoom.name}</span>
              <span className="text-cyan-400 underline font-sans text-[11px] shrink-0">Паспорт →</span>
            </button>
          ) : (
            <span className="text-[11px] sm:text-xs font-mono text-stone-400">
              Кликните по помещению в 3D
            </span>
          )}
        </div>
      </div>

      {/* Quick Jump Buttons Ribbon (Visible on all devices, touch-scrollable) */}
      <div className="border-b border-stone-800/60 bg-stone-900/40 px-3 sm:px-6 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar z-10 shrink-0">
        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Перейти:
        </span>
        {quickLocations.map(loc => (
          <button
            key={loc.id}
            onClick={() => onSelectRoom(loc.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition shrink-0 whitespace-nowrap ${
              selectedRoomId === loc.id
                ? 'bg-cyan-500 text-stone-950 font-bold'
                : 'bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
            }`}
          >
            {loc.label}
          </button>
        ))}
      </div>

      {/* Main Full-Height 3D Viewport */}
      <div className="flex-1 w-full h-full min-h-0 relative">
        <Spa3DViewer
          selectedRoomId={selectedRoomId}
          onSelectRoom={onSelectRoom}
          initialPreset="axonometric"
          className="h-full w-full"
        />
      </div>
    </div>
  );
};
