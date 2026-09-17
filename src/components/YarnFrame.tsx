import React from 'react';

interface YarnFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function YarnFrame({ children, className = '' }: YarnFrameProps) {
  return (
    <div className={`relative p-2.5 sm:p-3 bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-hidden ${className}`}>
      {/* Handcrafted colorful yarn & craft supplies border pattern */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Top Border Craft Doodles */}
        <div className="absolute top-1 left-2 text-[13px] select-none">🧶</div>
        <div className="absolute top-1 left-1/5 text-[12px] select-none">🧵</div>
        <div className="absolute top-0.5 left-2/5 text-[13px] select-none">✂️</div>
        <div className="absolute top-1 left-3/5 text-[12px] select-none">🧷</div>
        <div className="absolute top-0.5 left-4/5 text-[13px] select-none">🧶</div>
        <div className="absolute top-1 right-2 text-[12px] select-none">🌸</div>

        {/* Left Border Craft Doodles */}
        <div className="absolute top-1/5 left-1 text-[13px] select-none">🧶</div>
        <div className="absolute top-2/5 left-1 text-[12px] select-none">🪡</div>
        <div className="absolute top-3/5 left-1 text-[13px] select-none">🧶</div>
        <div className="absolute top-4/5 left-1 text-[12px] select-none">🧵</div>

        {/* Right Border Craft Doodles */}
        <div className="absolute top-1/5 right-1 text-[12px] select-none">🧵</div>
        <div className="absolute top-2/5 right-1 text-[13px] select-none">🧶</div>
        <div className="absolute top-3/5 right-1 text-[12px] select-none">🧷</div>
        <div className="absolute top-4/5 right-1 text-[13px] select-none">🧶</div>

        {/* Bottom Border Craft Doodles */}
        <div className="absolute bottom-1 left-2 text-[12px] select-none">🌸</div>
        <div className="absolute bottom-1 left-1/5 text-[13px] select-none">🧶</div>
        <div className="absolute bottom-0.5 left-2/5 text-[12px] select-none">🧷</div>
        <div className="absolute bottom-1 left-3/5 text-[13px] select-none">✂️</div>
        <div className="absolute bottom-0.5 left-4/5 text-[12px] select-none">🧵</div>
        <div className="absolute bottom-1 right-2 text-[13px] select-none">🧶</div>

        {/* Tiny pastel colored dot confetti like in the screenshot */}
        <span className="absolute top-2.5 left-10 w-2 h-2 rounded-full bg-cyan-400 opacity-80" />
        <span className="absolute top-1.5 right-10 w-2.5 h-2.5 rounded-full bg-amber-400 opacity-80" />
        <span className="absolute top-1/3 left-2.5 w-2 h-2 rounded-full bg-rose-400 opacity-80" />
        <span className="absolute top-2/3 right-2.5 w-2 h-2 rounded-full bg-emerald-400 opacity-80" />
        <span className="absolute bottom-2.5 left-14 w-2 h-2 rounded-full bg-orange-400 opacity-80" />
        <span className="absolute bottom-1.5 right-14 w-2 h-2 rounded-full bg-pink-400 opacity-80" />
      </div>

      {/* Inner photograph container with thin black border */}
      <div className="relative z-0 rounded-sm overflow-hidden border border-stone-800 shadow-sm bg-stone-100">
        {children}
      </div>
    </div>
  );
}
