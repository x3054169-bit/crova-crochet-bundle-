import { useState, useEffect } from 'react';
import { Eye, Flame } from 'lucide-react';

interface LiveShoppersBadgeProps {
  className?: string;
  variant?: 'inline' | 'banner';
}

export function LiveShoppersBadge({ className = '', variant = 'inline' }: LiveShoppersBadgeProps) {
  // Natural realistic fluctuation between 34 and 52 active viewers
  const [viewers, setViewers] = useState(38);
  const [copiesLeft, setCopiesLeft] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next < 28 ? 32 : next > 58 ? 50 : next;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  if (variant === 'banner') {
    return (
      <div className={`flex items-center justify-center gap-2 py-2 px-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-950 font-bold ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
          <span><strong>{viewers} people</strong> are viewing this offer right now</span>
        </span>
        <span className="text-stone-300 hidden sm:inline">•</span>
        <span className="text-[#dc2626] font-black hidden sm:inline">
          Only {copiesLeft} copies left at ₹199
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50/90 border border-amber-300/80 text-amber-950 text-xs font-semibold shadow-2xs ${className}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="flex items-center gap-1">
        <Eye className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span><strong className="text-stone-900 font-extrabold">{viewers} people</strong> viewing</span>
      </span>
      <span className="text-amber-300">•</span>
      <span className="text-[#dc2626] font-extrabold flex items-center gap-0.5">
        <Flame className="w-3 h-3 text-[#dc2626] shrink-0" />
        <span>Only {copiesLeft} left at ₹199</span>
      </span>
    </div>
  );
}
