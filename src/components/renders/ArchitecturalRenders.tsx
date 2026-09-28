import { img } from '../../lib/assets';
import React, { useState } from 'react';

// ============================================================================
// PHOTOREALISTIC ARCHITECTURAL RENDERS & PHOTOGRAPHY SUITE
// Premium architectural imagery for the 30.2 × 16.0 m Luxury Thermal Spa Complex
// Authentic materials: Thermowood timber, Carrara marble, Basalt stone, 10x10m pool
// ============================================================================

interface RenderProps {
  className?: string;
  timeOfDay?: 'twilight' | 'day' | 'night';
  showControls?: boolean;
}

// 1. Full Exterior Pavilion Render (Twilight / Day / Night)
export const HeroExteriorRender: React.FC<RenderProps> = ({
  className = '',
  timeOfDay = 'twilight'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageMap = {
    twilight: img('images/hero_exterior_twilight.jpg'),
    day: img('images/hero_exterior_day.jpg'),
    night: img('images/hero_exterior_night.jpg')
  };

  const imageSrc = imageMap[timeOfDay] || imageMap.twilight;

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-stone-950 ${className}`}>
      {/* High-Resolution Photorealistic Render */}
      <img
        key={imageSrc}
        src={imageSrc}
        alt="Экстерьер банного комплекса в вечерней подсветке"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out transform scale-100 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Atmospheric depth grading, reflections and subtle warm 2700K lighting bloom */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/40 pointer-events-none" />
      {timeOfDay === 'twilight' && (
        <div className="absolute inset-0 bg-amber-500/10 mix-blend-color-dodge pointer-events-none" />
      )}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply pointer-events-none" />
      )}

      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Загрузка фотореалистичного рендера...
          </span>
        </div>
      )}
    </div>
  );
};

// 2. Interior Pool Hall Render (10x10 m basin, floor-to-ceiling glass, travertine)
export const PoolInteriorRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/pool_hall_10x10.jpg')}
        alt="Интерьер бассейнового зала с чашей 10х10 м"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Atmospheric Water Caustics & Architectural Tone */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/15 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-cyan-500/5 mix-blend-screen pointer-events-none" />

      {/* Inspect Hint */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер бассейнового зала...
          </span>
        </div>
      )}
    </div>
  );
};

// 3. Pool Water Caustics Macro
export const PoolCausticsRender: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-cyan-950 ${className}`}>
      <img
        src={img('images/pool_water_caustics.jpg')}
        alt="Кристально чистая вода бассейна с переливом"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

// 4. Turkish Hamam Interior Render (Carrara marble, steam, soft lights)
export const HamamInteriorRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/hamam_marble.jpg')}
        alt="Интерьер турецкого хамама с подогреваемым мраморным чебеком"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-amber-500/5 mix-blend-color-dodge pointer-events-none" />

      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер хамама...
          </span>
        </div>
      )}
    </div>
  );
};

// 5. Finnish Sauna & Cedar Steam Interior Render
export const SaunaInteriorRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/sauna_cedar.jpg')}
        alt="Финская сауна из канадского кедра с каменкой"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-amber-600/10 mix-blend-color-dodge pointer-events-none" />

      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер сауны...
          </span>
        </div>
      )}
    </div>
  );
};

// 6. Traditional Russian Banya / Steam Room Render
export const RussianBanyaRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/russian_banya_stove.jpg')}
        alt="Русская парная высокой теплоемкости с печью"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/30 pointer-events-none" />

      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер русской парной...
          </span>
        </div>
      )}
    </div>
  );
};

// 7. Lounge & Rest Area Interior Render (Panoramic windows, fireplace, linen)
export const LoungeInteriorRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/lounge_relaxation.jpg')}
        alt="Зона отдыха и лаундж с панорамным видом на сосны"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/30 pointer-events-none" />

      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер лаунджа...
          </span>
        </div>
      )}
    </div>
  );
};

// 8. Locker Room Render (Anthracite lockers, walnut benches)
export const LockerRoomRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/locker_room.jpg')}
        alt="Интерьер раздевального блока премиального уровня"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/30 pointer-events-none" />

      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер раздевалки...
          </span>
        </div>
      )}
    </div>
  );
};

// 9. Shower Zone Render (Basalt stone, rainfall shower)
export const ShowerZoneRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/shower_basalt.jpg')}
        alt="Душевая зона с отделкой темно-серым базальтом"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/30 pointer-events-none" />

      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер душевых...
          </span>
        </div>
      )}
    </div>
  );
};

// 10. South Terrace Render (Thermowood decking, cantilevered steel canopy)
export const TerraceRender: React.FC<{ className?: string; onExpand?: () => void }> = ({
  className = '',
  onExpand
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onExpand}
      className={`relative w-full h-full overflow-hidden select-none bg-stone-950 group cursor-pointer ${className}`}
    >
      <img
        src={img('images/terrace_deck.jpg')}
        alt="Южная терраса 30.2х4.0 м с декингом из термоясеня"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-black/30 pointer-events-none" />

      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>Увеличить рендер</span>
        <span>🔍</span>
      </div>

      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">
            Рендер террасы...
          </span>
        </div>
      )}
    </div>
  );
};
