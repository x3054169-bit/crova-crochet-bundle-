import { Sparkles, Layers, ArrowRight } from 'lucide-react';

interface PageSwitcherBarProps {
  currentOffer: '2200' | '1000';
  onSwitch: (offer: '2200' | '1000') => void;
}

export function PageSwitcherBar({ currentOffer, onSwitch }: PageSwitcherBarProps) {
  return (
    <>
      {/* Top Banner Switcher */}
      <div className="w-full bg-stone-950 text-white border-b border-stone-800 text-xs py-2 px-3 sm:px-6 relative z-50 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Current Page Indicator */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-stone-300 font-medium">
              Currently Viewing:
            </span>
            <span className="font-extrabold text-amber-400 tracking-wide">
              {currentOffer === '2200'
                ? '2200+ Crochet Mastery Bundle'
                : '1000+ Classic Crochet Bundle'}
            </span>
          </div>

          {/* Quick Page Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-stone-900 p-0.5 rounded-lg border border-stone-700/80">
            <button
              type="button"
              onClick={() => onSwitch('2200')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentOffer === '2200'
                  ? 'bg-[#ea580c] text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>2200+ Bundle (₹199)</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitch('1000')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentOffer === '1000'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1000+ Bundle (₹199)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Fast Toggle Button on Bottom-Left */}
      <aside aria-label="Bundle page switcher" className="fixed bottom-20 left-3 z-50 hidden sm:block">
        <button
          type="button"
          onClick={() => onSwitch(currentOffer === '2200' ? '1000' : '2200')}
          className="bg-stone-900/95 hover:bg-black text-white text-xs font-bold py-2 px-3.5 rounded-full shadow-2xl border border-stone-700/80 flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Switch between 2200+ and 1000+ pattern bundles"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>
            Switch to {currentOffer === '2200' ? '1000+ Bundle' : '2200+ Bundle'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </button>
      </aside>
    </>
  );
}
