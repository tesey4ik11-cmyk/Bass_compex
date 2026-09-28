import React, { useState, useEffect } from 'react';
import { img } from '../../lib/assets';
import { BUILDING_WIDTH, BUILDING_HEIGHT, POOL_BASIN } from '../../data/approvedSpaPlanData';

interface Props {
  onExplore: () => void;
  onNavigate: (screen: string) => void;
}

export const ProjectScreen: React.FC<Props> = ({ onExplore }) => {
  const [heroImage, setHeroImage] = useState<string>(img('images/hero_exterior_twilight.png'));

  // Load user image from localStorage if saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem('custom_hero_image');
      if (saved) {
        setHeroImage(saved);
      }
    } catch {
      // LocalStorage access fallback
    }

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const dataUrl = event.target?.result as string;
              if (dataUrl) {
                setHeroImage(dataUrl);
                try {
                  localStorage.setItem('custom_hero_image', dataUrl);
                } catch {
                  // Ignore quota error
                }
                fetch('/api/upload-hero', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ imageBase64: dataUrl })
                }).catch(() => {});
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          if (dataUrl) {
            setHeroImage(dataUrl);
            try {
              localStorage.setItem('custom_hero_image', dataUrl);
            } catch {
              // Ignore quota error
            }
            fetch('/api/upload-hero', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ imageBase64: dataUrl })
            }).catch(() => {});
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener('paste', handlePaste);
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto lg:overflow-hidden bg-stone-950 flex flex-col justify-between select-none">
      {/* =========================================================================
          1. FULL-SCREEN ARCHITECTURAL RENDER BACKGROUND
          ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Экстерьер банного комплекса"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Contrast Scrim Gradient preserving readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/50 pointer-events-none" />
      </div>

      {/* =========================================================================
          2. TOP MINIMALIST ARCHITECTURAL ID
          ========================================================================= */}
      <div className="relative z-10 pt-4 sm:pt-8 px-4 sm:px-16 flex items-center justify-between">
        <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-stone-300 uppercase">
          Экстерьер комплекса • 30.2 × 16.0 м
        </div>
      </div>

      {/* =========================================================================
          3. HERO VISUAL CORE: EDITORIAL MONOGRAPH PRESENCE
          ========================================================================= */}
      <div className="relative z-10 px-4 sm:px-16 pb-8 sm:pb-14 max-w-7xl mx-auto w-full mt-auto">
        {/* Monograph Title */}
        <h1
          className="font-light tracking-tight text-white uppercase leading-[0.92] max-w-6xl mb-4 sm:mb-6"
          style={{ fontSize: 'clamp(40px, 8vw, 130px)' }}
        >
          Банный <br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-stone-200 to-stone-400">
            комплекс
          </span>
        </h1>

        {/* Quiet Editorial Subtitle */}
        <p className="text-base sm:text-2xl text-stone-200 font-light max-w-2xl leading-relaxed mb-6 sm:mb-8">
          Архитектурный прототип пространства воды, тепла и отдыха.
        </p>

        {/* Key Metrics & Single Primary Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 border-t border-white/15 pt-5 sm:pt-8">
          {/* Key Metrics */}
          <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-stone-300 tracking-wider flex-wrap">
            <span>{BUILDING_WIDTH.toFixed(1)} × {BUILDING_HEIGHT.toFixed(1)} М</span>
            <span className="text-stone-500">·</span>
            <span>БАССЕЙН {POOL_BASIN.widthMm / 1000} × {POOL_BASIN.lengthMm / 1000} М</span>
            <span className="text-stone-500 hidden sm:inline">·</span>
            <span className="text-stone-400">ТЕРРАСА 120.8 М²</span>
          </div>

          {/* PRIMARY CTA BUTTON */}
          <div className="flex items-center gap-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-stone-950 font-medium text-sm sm:text-base hover:bg-stone-200 transition-all shadow-2xl shadow-white/10 flex items-center justify-center gap-3 group tracking-tight"
            >
              <span>ИССЛЕДОВАТЬ ПРОЕКТ</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
