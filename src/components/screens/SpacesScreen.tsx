import React, { useState } from 'react';
import {
  HamamInteriorRender,
  SaunaInteriorRender,
  RussianBanyaRender,
  PoolInteriorRender,
  LoungeInteriorRender,
  LockerRoomRender,
  ShowerZoneRender,
  TerraceRender
} from '../renders/ArchitecturalRenders';
import { img } from '../lib/assets';
import { ImageLightboxModal } from '../ImageLightboxModal';
import { ARCHITECTURAL_ROOMS, ArchitecturalRoom } from '../../data/approvedSpaPlanData';

interface Props {
  onOpenRoomModal: (room: ArchitecturalRoom) => void;
  onExploreIn3D: (roomId: string) => void;
}

export const SpacesScreen: React.FC<Props> = ({ onOpenRoomModal, onExploreIn3D }) => {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const spaces = [
    {
      id: 'room_hamam',
      name: 'ХАМАМ',
      area: '18.0 м²',
      dims: '3.60 × 5.00 м',
      tagline: 'Тёплое влажное пространство с мягкой архитектурой света и каррарского мрамора.',
      temp: '45–50 °C',
      humidity: '95–100%',
      imageSrc: img('images/hamam_marble.jpg'),
      renderComponent: (onExp: () => void) => <HamamInteriorRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Купольный свод со светодиодным "звездным небом"',
        'Подогреваемый центральный чебек из белого мрамора',
        'Встроенные курны с медной сантехникой ручной ковки',
        'Анатомические лавки с подогревом спинок'
      ]
    },
    {
      id: 'room_sauna',
      name: 'ФИНСКАЯ САУНА',
      area: '18.0 м²',
      dims: '3.60 × 5.00 м',
      tagline: 'Сухой термальный микроклимат в окружении натурального канадского кедра.',
      temp: '90–110 °C',
      humidity: '10–15%',
      imageSrc: img('images/sauna_cedar.jpg'),
      renderComponent: (onExp: () => void) => <SaunaInteriorRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Стеновые панели из бессучкового красного канадского кедра',
        'Парящие полоки из африканского термоабаши',
        'Каменка с вулканическим жадеитом и перидотитом',
        'Скрытая линия теплого контурного освещения 2700K'
      ]
    },
    {
      id: 'room_steam',
      name: 'РУССКАЯ ПАРНАЯ',
      area: '20.0 м²',
      dims: '4.00 × 5.00 м',
      tagline: 'Традиционная парная высокой теплоёмкости с кирпичной печью и мягким мелкодисперсным паром.',
      temp: '60–75 °C',
      humidity: '50–65%',
      imageSrc: img('images/russian_banya_stove.jpg'),
      renderComponent: (onExp: () => void) => <RussianBanyaRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Массивная теплоаккумулирующая каменка 1 200 кг',
        'Широкие банные лавки шириной 1 200 мм для парения вениками',
        'Вентиляция "Басту" с подачей свежего воздуха под печь',
        'Трапы из термоясеня с бактерицидной пропиткой'
      ]
    },
    {
      id: 'room_lounge',
      name: 'ЗОНА ОТДЫХА И ЛАУНДЖ',
      area: '42.6 м²',
      dims: '14.20 × 3.00 м',
      tagline: 'Центральный распределительный холл с панорамным светом, камином и фито-баром.',
      temp: '22–24 °C',
      humidity: '40–50%',
      imageSrc: img('images/lounge_relaxation.jpg'),
      renderComponent: (onExp: () => void) => <LoungeInteriorRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Сквозной портал 14.2 м, объединяющий парные и бассейновый зал',
        'Диванные группы из натурального льна и столы из массива дуба',
        'Чайная станция с родниковой водой и травяными сборами',
        'Акустические панели из реек ясеня с шумопоглощением'
      ]
    },
    {
      id: 'room_pool_hall',
      name: 'БАССЕЙНОВЫЙ ЗАЛ',
      area: '256.0 м²',
      dims: '16.00 × 16.00 м',
      tagline: 'Монументальный стеклянный павильон с 10-метровым зеркалом воды и выходом на террасу.',
      temp: '28–30 °C (вода 28 °C)',
      humidity: '55–60%',
      imageSrc: img('images/pool_hall_10x10.jpg'),
      renderComponent: (onExp: () => void) => <PoolInteriorRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Монолитная чаша 10×10 м со скрытым переливным лотком',
        'Витражное панорамное остекление в пол на юг и восток',
        'Широкий обходной пляж 4.0 м с шезлонгами из тика',
        'Римская пологая лестница с противоскользящей насечкой'
      ]
    },
    {
      id: 'room_locker_male',
      name: 'МУЖСКАЯ РАЗДЕВАЛКА',
      area: '24.75 м²',
      dims: '5.50 × 4.50 м',
      tagline: 'Функциональный гардеробный блок с отделкой термодеревом и прямым выходом в душевую.',
      temp: '23–25 °C',
      humidity: '40–50%',
      imageSrc: img('images/locker_room.jpg'),
      renderComponent: (onExp: () => void) => <LockerRoomRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Индивидуальные шкафчики из темного дуба с электронными замками',
        'Прямой санитарный шлюз в Мужскую душевую (12.25 м²) и С/У',
        'Влажная и сухая зоны переодевания',
        'Встроенная система вентиляции и подогрева пола'
      ]
    },
    {
      id: 'room_locker_female',
      name: 'ЖЕНСКАЯ РАЗДЕВАЛКА',
      area: '24.75 м²',
      dims: '5.50 × 4.50 м',
      tagline: 'Просторный гардеробный блок с туалетными столиками, мягкими банкетками и душевой группой.',
      temp: '23–25 °C',
      humidity: '40–50%',
      imageSrc: img('images/locker_room.jpg'),
      renderComponent: (onExp: () => void) => <LockerRoomRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Индивидуальные гардеробные модули с зеркальной подсветкой',
        'Зона макияжа с косметическими столиками и фенами',
        'Изолированный вход в Женскую душевую (12.25 м²) и санузел',
        'Светлая отделка из теплого дуба и бежевого керамогранита'
      ]
    },
    {
      id: 'room_showers',
      name: 'ДУШЕВЫЕ ЗОНЫ',
      area: '24.50 м²',
      dims: '2 группы × 12.25 м²',
      tagline: 'Санитарный узел с отделкой темно-графитовым базальтом и тропическими лейками.',
      temp: '24–26 °C',
      humidity: '70–80%',
      imageSrc: img('images/shower_basalt.jpg'),
      renderComponent: (onExp: () => void) => <ShowerZoneRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Индивидуальные душевые кабины с верхним каскадным душем',
        'Облицовка плиткой из натурального матового базальта',
        'Встроенные щелевые трапы из кислотостойкой нержавеющей стали',
        'Прямое примыкание к санузлам и раздевалкам'
      ]
    },
    {
      id: 'terrace_outdoor',
      name: 'ОТКРЫТАЯ ЮЖНАЯ ТЕРРАСА',
      area: '120.8 м²',
      dims: '30.20 × 4.00 м',
      tagline: 'Широкий деревянный настил вдоль всего южного фасада с подогревом и шезлонгами.',
      temp: 'На открытом воздухе',
      humidity: 'Естественная',
      imageSrc: img('images/terrace_deck.jpg'),
      renderComponent: (onExp: () => void) => <TerraceRender className="w-full h-full" onExpand={onExp} />,
      features: [
        'Сплошной консольный навес вылетом 4.0 м для защиты от осадков',
        'Настил из палубной термодоски ясеня 28 мм',
        'Выход непосредственно из Бассейнового зала и Зоны отдыха',
        'Встроенная контурная подсветка ступеней и колонн'
      ]
    }
  ];

  const current = spaces[activeSpaceIdx];
  const matchedRoom = ARCHITECTURAL_ROOMS.find(r => r.id === current.id);

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col bg-stone-950 text-stone-100 select-none overflow-y-auto lg:overflow-hidden">
      {/* Top Floating Space Selector Bar */}
      <div className="min-h-14 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 z-20 shrink-0">
        <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
            04. АРХИТЕКТУРНЫЕ ПРОСТРАНСТВА
          </span>
          <span className="text-stone-700 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-stone-400">
            {activeSpaceIdx + 1} ИЗ {spaces.length}
          </span>
        </div>

        {/* Space Selector Tabs (Horizontally scrollable with touch) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto">
          {spaces.map((sp, idx) => (
            <button
              key={sp.id}
              onClick={() => setActiveSpaceIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition whitespace-nowrap shrink-0 ${
                activeSpaceIdx === idx
                  ? 'bg-white text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800'
              }`}
            >
              {sp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Presentation Stage */}
      {/* DESKTOP LAYOUT (lg): Fullscreen cinematic background with editorial text */}
      {/* MOBILE LAYOUT (<lg): Scrollable card layout with prominent media preview at top */}
      <div className="flex-1 w-full relative flex flex-col justify-between p-4 sm:p-8 lg:p-14 overflow-y-auto lg:overflow-hidden">
        {/* Render Artwork Background (Desktop view) */}
        <div className="hidden lg:block absolute inset-0 z-0">
          {current.renderComponent(() => setLightboxOpen(true))}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/40 to-transparent pointer-events-none" />
        </div>

        {/* Mobile Visual Header (< lg): Interactive Render Preview Box */}
        <div className="lg:hidden w-full h-56 sm:h-72 rounded-2xl overflow-hidden relative mb-5 shrink-0 border border-stone-800/80 shadow-2xl">
          {current.renderComponent(() => setLightboxOpen(true))}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 pointer-events-none" />
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-stone-200 border border-white/10 text-xs font-mono hover:bg-white hover:text-stone-950 transition"
          >
            Увеличить фото ↗
          </button>
        </div>

        {/* Main Editorial Content */}
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6 pt-1 lg:pt-4">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono tracking-widest text-amber-300 uppercase flex-wrap">
            <span className="font-bold">{current.area}</span>
            <span className="text-stone-600">·</span>
            <span>{current.dims}</span>
            <span className="text-stone-600 hidden lg:inline">·</span>
            <button
              onClick={() => setLightboxOpen(true)}
              className="hidden lg:inline text-stone-400 hover:text-white transition underline underline-offset-4"
            >
              Увеличить фото ↗
            </button>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white uppercase leading-tight">
            {current.name}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-stone-300 font-light leading-relaxed">
            {current.tagline}
          </p>

          {/* Microclimate Tags */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono flex-wrap">
            <div className="px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
              <span className="text-stone-400">ТЕМПЕРАТУРА: </span>
              <span className="text-amber-200 font-semibold">{current.temp}</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
              <span className="text-stone-400">ВЛАЖНОСТЬ: </span>
              <span className="text-cyan-200 font-semibold">{current.humidity}</span>
            </div>
          </div>
        </div>

        {/* Bottom Feature Details & Actions (Always accessible, fully scrollable) */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-5 sm:gap-6 pt-6 mt-6 lg:mt-0 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-3xl">
            {current.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-300">
                <span className="text-amber-400 mt-0.5 shrink-0">•</span>
                <span className="font-light leading-snug">{feat}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons (Touch-friendly and full-width on mobile) */}
          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
            {matchedRoom && (
              <button
                onClick={() => onOpenRoomModal(matchedRoom)}
                className="flex-1 lg:flex-none px-4 sm:px-5 py-2.5 rounded-xl border border-white/20 text-xs font-mono hover:bg-stone-800 transition text-center"
              >
                Паспорт помещения
              </button>
            )}
            <button
              onClick={() => onExploreIn3D(current.id)}
              className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-white text-stone-950 text-xs font-semibold hover:bg-stone-200 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Показать в 3D</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox for current space */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={current.imageSrc}
        title={`${current.name} • ${current.area}`}
        subtitle={`Габариты: ${current.dims} • Температура: ${current.temp} • Влажность: ${current.humidity}`}
        specs={current.features}
      />
    </div>
  );
};
