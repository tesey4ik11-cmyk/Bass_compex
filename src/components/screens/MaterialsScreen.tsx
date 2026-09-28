import React, { useState } from 'react';
import { img } from '../lib/assets';
import { ImageLightboxModal } from '../ImageLightboxModal';

export const MaterialsScreen: React.FC = () => {
  const [selectedMat, setSelectedMat] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const materials = [
    {
      id: 'wood',
      title: 'НАТУРАЛЬНОЕ ТЕРМОДЕРЕВО И КЕДР',
      category: 'ОТДЕЛКА ФАСАДОВ И ПАРНЫХ',
      description: 'Канадский красный кедр для сауны, термоясень для декинга террасы и липа для банных полоков. Древесина обработана перегретым паром при 215°C, не впитывает влагу и источает благородный хвойный аромат.',
      origin: 'Северная Америка / Карелия',
      tactile: 'Бархатистая теплая поверхность с выраженным естественным рисунком годовых колец',
      imageSrc: img('images/material_thermowood.jpg'),
      specs: [
        'Влажность после термомодификации: 4 ± 1%',
        'Теплопроводность: λ = 0.09 Вт/(м·К)',
        'Биостойкость: высший 1-й класс по EN 350-2',
        'Эмиссия формальдегида: нулевая (E0)'
      ]
    },
    {
      id: 'stone',
      title: 'ВУЛКАНИЧЕСКИЙ БАЗАЛЬТ И ТРАВЕРТИН',
      category: 'ПОЛЫ И СТЕНОВЫЕ ПОРТАЛЫ',
      description: 'Травертин бежевого оттенка с антискользящей обработкой R11 вокруг чаши бассейна. Стены и основание печей облицованы темно-графитовым колотым базальтом высокой теплоемкости.',
      origin: 'Италия / Армения',
      tactile: 'Фактурный микрорельеф, идеальный для босых ног, с природной теплоотдачей',
      imageSrc: img('images/material_basalt.jpg'),
      specs: [
        'Коэффициент антискольжения: R11 (для мокрых зон)',
        'Плотность: 2 750 кг/м³',
        'Теплоёмкость: c = 0.84 кДж/(кг·°C)',
        'Водопоглощение: менее 0.15%'
      ]
    },
    {
      id: 'marble',
      title: 'НАТУРАЛЬНЫЙ БЕЛЫЙ МРАМОР CARRARA',
      category: 'КУПОЛ, ЧЕБЕК И КУРНЫ ХАМАМА',
      description: 'Крупноформатные слэбы итальянского мрамора с глубокими серыми прожилками. Идеально полированная поверхность, аккумулирующая мягкое глубинное тепло для подогреваемых лежаков.',
      origin: 'Каррара, Тоскана, Италия',
      tactile: 'Гладкая прохладная поверхность при входе, плавно отдающая нежное глубокое тепло',
      imageSrc: img('images/material_marble.jpg'),
      specs: [
        'Толщина слэбов: 30 мм с полировкой',
        'Прочность на сжатие: 130 МПа',
        'Встроенный контур водяного подогрева: +42 °C',
        'Антибактериальная кристаллизация поверхности'
      ]
    },
    {
      id: 'mosaic',
      title: 'СТЕКЛОМОЗАИКА AEGEAN BLUE',
      category: 'ОБЛИЦОВКА ЧАШИ БАССЕЙНА 10×10 М',
      description: 'Итальянская стекломозаика с иризацией и переливами лазурного и ультрамаринового спектра. Устойчива к агрессивной водной среде и хлоридам, уложена на двухкомпонентный эпоксидный состав.',
      origin: 'Виченца, Италия',
      tactile: 'Шелковистое остекление с мягкими скругленными фасками',
      imageSrc: img('images/material_mosaic.jpg'),
      specs: [
        'Размер чипа: 20 × 20 мм (толщина 4 мм)',
        'Затирка: двухкомпонентная эпоксидная Starlike',
        'Водопоглощение: 0.00%',
        'Стойкость к ультрафиолету: 100%'
      ]
    },
    {
      id: 'terrace',
      title: 'ТЕРМОЯСЕНЬ ДЛЯ ОТКРЫТОЙ ТЕРРАСЫ',
      category: 'НАСТИЛ ПАЛУБНЫЙ 120.8 М²',
      description: 'Массивная доска термомодифицированного ясеня сечением 140 × 28 мм. Не коробится под прямыми солнечными лучами, переносит зимние морозы и контакт с водой бассейна.',
      origin: 'Скандинавия / Германия',
      tactile: 'Приятная благородная текстура с легким брашированием для исключения скольжения',
      imageSrc: img('images/terrace_deck.jpg'),
      specs: [
        'Профиль: гладкая палубная доска с микрофаской',
        'Скрытый крепеж: нержавеющие кляймеры Camo',
        'Зазор компенсационный: 5 мм',
        'Покрытие: натуральное тунговое масло в 2 слоя'
      ]
    }
  ];

  const current = materials[selectedMat];

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col bg-stone-950 text-stone-100 select-none overflow-y-auto lg:overflow-hidden">
      {/* Top Floating Control Bar */}
      <div className="min-h-14 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 z-20 shrink-0">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
            06. МАТЕРИАЛЫ И ПАЛИТРА
          </span>
          <span className="text-stone-700 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-stone-300">
            {selectedMat + 1} ИЗ {materials.length}
          </span>
        </div>

        {/* Material Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto">
          {materials.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setSelectedMat(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition whitespace-nowrap shrink-0 ${
                selectedMat === idx
                  ? 'bg-white text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800'
              }`}
            >
              {m.title.split(' ')[0]} {m.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Material Visual Stage */}
      <div className="flex-1 w-full p-4 sm:p-8 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 lg:gap-12 overflow-y-auto">
        {/* Mobile Visual Header */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="lg:hidden w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-stone-900 shrink-0 cursor-pointer"
        >
          <img
            src={current.imageSrc}
            alt={current.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-stone-300">
              МАКРО М 1:1
            </span>
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-stone-200">
              Увеличить 🔍
            </span>
          </div>
        </div>

        {/* Tactile Editorial Description */}
        <div className="flex-1 max-w-xl space-y-4 sm:space-y-6 w-full">
          <div className="space-y-1.5">
            <span className="text-xs font-mono tracking-widest text-amber-300 uppercase block">
              {current.category}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white uppercase leading-tight">
              {current.title}
            </h2>
          </div>

          <p className="text-stone-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed">
            {current.description}
          </p>

          <div className="space-y-2.5 pt-4 border-t border-stone-800 font-mono text-xs">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-stone-500 shrink-0">ПРОИСХОЖДЕНИЕ:</span>
              <span className="text-stone-200 text-right">{current.origin}</span>
            </div>
            <div className="space-y-1">
              <span className="text-stone-500 block">ТАКТИЛЬНЫЕ СВОЙСТВА:</span>
              <span className="text-stone-300 font-sans text-xs leading-relaxed block">{current.tactile}</span>
            </div>
          </div>

          {/* Technical Specs List */}
          <div className="pt-4 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-stone-400">
            {current.specs.map((spec, sIdx) => (
              <div key={sIdx} className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>{spec}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            {materials.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedMat(i)}
                className={`h-1.5 rounded-full transition-all ${
                  selectedMat === i ? 'w-10 bg-white' : 'w-3 bg-stone-700 hover:bg-stone-500'
                }`}
                aria-label={`Материал ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Large Photorealistic Macro Visual Render */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="hidden lg:block flex-1 w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-stone-900 group cursor-pointer"
        >
          <img
            src={current.imageSrc}
            alt={current.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-stone-300 border border-white/10">
              МАКРО-ФРАГМЕНТ МАТЕРИАЛА • М 1:1
            </span>
            <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-stone-300 border border-white/10 group-hover:bg-white group-hover:text-black transition">
              Увеличить фото 🔍
            </span>
          </div>
        </div>
      </div>

      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={current.imageSrc}
        title={current.title}
        subtitle={`${current.category} • ${current.origin}`}
        specs={current.specs}
      />
    </div>
  );
};
