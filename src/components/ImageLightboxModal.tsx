import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  subtitle?: string;
  specs?: string[];
}

export const ImageLightboxModal: React.FC<Props> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
  specs
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in select-none">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl max-h-[92vh] flex flex-col bg-stone-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="h-16 px-6 sm:px-8 border-b border-white/10 flex items-center justify-between bg-stone-950/80 backdrop-blur-md shrink-0">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">{title}</h3>
            {subtitle && <p className="text-xs text-stone-400 font-mono">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Image Showcase */}
        <div className="relative flex-1 min-h-[400px] max-h-[70vh] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={imageSrc}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bottom Technical Spec Bar */}
        {specs && specs.length > 0 && (
          <div className="p-4 sm:p-6 bg-stone-900/90 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-stone-300">
            {specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
