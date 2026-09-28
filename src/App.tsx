import React, { useState } from 'react';
import { ProjectScreen } from './components/screens/ProjectScreen';
import { PlanScreen } from './components/screens/PlanScreen';
import { ThreeDViewerScreen } from './components/screens/ThreeDViewerScreen';
import { SpacesScreen } from './components/screens/SpacesScreen';
import { PoolScreen } from './components/screens/PoolScreen';
import { MaterialsScreen } from './components/screens/MaterialsScreen';
import { TechnicalScreen } from './components/screens/TechnicalScreen';
import { RoomDetailModal } from './components/RoomDetailModal';
import { ARCHITECTURAL_ROOMS, ArchitecturalRoom } from './data/approvedSpaPlanData';

export type ScreenId = 'project' | 'plan' | '3d' | 'spaces' | 'pool' | 'materials' | 'technical';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('project');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [modalRoom, setModalRoom] = useState<ArchitecturalRoom | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenId; num: string; label: string }[] = [
    { id: 'project', num: '01', label: 'ПРОЕКТ' },
    { id: 'plan', num: '02', label: 'ПЛАН' },
    { id: '3d', num: '03', label: '3D' },
    { id: 'spaces', num: '04', label: 'ПРОСТРАНСТВА' },
    { id: 'pool', num: '05', label: 'БАССЕЙН' },
    { id: 'materials', num: '06', label: 'МАТЕРИАЛЫ' },
    { id: 'technical', num: '07', label: 'ТЕХНИЧЕСКИЕ ДАННЫЕ' }
  ];

  const handleOpenRoomIn3D = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActiveScreen('3d');
  };

  const handleOpenRoomInPlan = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActiveScreen('plan');
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-stone-950 text-stone-100 flex flex-col font-sans select-none antialiased">
      {/* =========================================================================
          TOP NAVIGATION BAR (Application Header with 7 Full-Screen Route Tabs)
          ========================================================================= */}
      <header className="h-16 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-xl px-6 sm:px-12 flex items-center justify-between z-40 shrink-0">
        {/* Brand Lockup */}
        <button
          onClick={() => setActiveScreen('project')}
          className="text-left group flex items-center gap-3"
        >
          <span className="text-sm font-semibold tracking-wider text-white uppercase group-hover:text-stone-300 transition">
            THERMA RESIDENCE
          </span>
          <span className="hidden sm:inline text-[11px] font-mono text-stone-500">
            · BK-26-003-KR
          </span>
        </button>

        {/* Desktop Screen Switcher Tabs */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-stone-950 font-semibold shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900/60'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-stone-500' : 'text-stone-600'}`}>
                  {item.num}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Corner: Quick Action & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveScreen(activeScreen === '3d' ? 'plan' : '3d')}
            className="hidden sm:flex px-4 py-1.5 rounded-xl border border-white/15 text-xs font-mono hover:bg-stone-800 transition items-center gap-2"
          >
            <span>{activeScreen === '3d' ? 'Открыть план' : '3D Модель'}</span>
            <span className="text-stone-400">📐</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            aria-label="Меню навигации"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-50 bg-stone-950/98 backdrop-blur-xl border-b border-stone-800 p-4 space-y-1 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveScreen(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-between ${
                activeScreen === item.id
                  ? 'bg-white text-stone-950 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-stone-500">{item.num}</span>
            </button>
          ))}
        </div>
      )}

      {/* =========================================================================
          MAIN APPLICATION VIEWPORT (Scrollable on mobile, sleek full-height on desktop)
          ========================================================================= */}
      <main className="flex-1 w-full min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] relative overflow-y-auto lg:overflow-hidden flex flex-col">
        {activeScreen === 'project' && (
          <ProjectScreen
            onExplore={() => setActiveScreen('spaces')}
            onNavigate={(screen) => setActiveScreen(screen as ScreenId)}
          />
        )}

        {activeScreen === 'plan' && (
          <PlanScreen
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
            onOpenRoomModal={(room) => setModalRoom(room)}
          />
        )}

        {activeScreen === '3d' && (
          <ThreeDViewerScreen
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
            onOpenRoomModal={(room) => setModalRoom(room)}
          />
        )}

        {activeScreen === 'spaces' && (
          <SpacesScreen
            onOpenRoomModal={(room) => setModalRoom(room)}
            onExploreIn3D={(roomId) => handleOpenRoomIn3D(roomId)}
          />
        )}

        {activeScreen === 'pool' && (
          <PoolScreen
            onExploreIn3D={(roomId) => handleOpenRoomIn3D(roomId)}
          />
        )}

        {activeScreen === 'materials' && (
          <MaterialsScreen />
        )}

        {activeScreen === 'technical' && (
          <TechnicalScreen />
        )}
      </main>

      {/* =========================================================================
          ROOM DETAIL PASSPORT MODAL (Available in all screens when clicking a room)
          ========================================================================= */}
      {modalRoom && (
        <RoomDetailModal
          room={modalRoom}
          onClose={() => setModalRoom(null)}
          onShowOnPlan={(roomId) => {
            handleOpenRoomInPlan(roomId);
            setModalRoom(null);
          }}
        />
      )}
    </div>
  );
}
