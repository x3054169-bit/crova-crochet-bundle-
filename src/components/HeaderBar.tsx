import { useState, useEffect } from 'react';
import { Sparkles, BookOpen, ShoppingBag, Star } from 'lucide-react';
import { BUY_NOW_URL } from '../data/bundleData';

interface HeaderBarProps {
  onOpenCheckout: () => void;
  onOpenPreview: () => void;
}

export function HeaderBar({ onOpenCheckout, onOpenPreview }: HeaderBarProps) {
  // Countdown timer initialized to 14 minutes and 52 seconds (with local storage persistence)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>(() => {
    const savedEndTime = localStorage.getItem('crova_offer_end_time');
    const now = Date.now();
    if (savedEndTime) {
      const remaining = Math.max(0, parseInt(savedEndTime, 10) - now);
      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return { hours, minutes, seconds };
    } else {
      // 15 minutes offer window
      const newEndTime = now + 15 * 60 * 1000;
      localStorage.setItem('crova_offer_end_time', newEndTime.toString());
      return { hours: 0, minutes: 14, seconds: 59 };
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          // Reset gracefully for another cycle so user never sees expired 00 forever
          const newEndTime = Date.now() + 15 * 60 * 1000;
          localStorage.setItem('crova_offer_end_time', newEndTime.toString());
          return { hours: 0, minutes: 14, seconds: 59 };
        }
        let total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (total < 0) total = 0;
        const hours = Math.floor(total / 3600);
        const minutes = Math.floor((total % 3600) / 60);
        const seconds = total % 60;
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <header className="w-full bg-[#f7f5f2] border-b border-stone-200">
      {/* 1. Dark Top Bar with Countdown Timer matching Screenshot */}
      <div className="w-full bg-[#194c36] text-white py-2 px-2.5 sm:px-4">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-2 sm:gap-3.5">
          <span className="text-white text-xs sm:text-base font-bold tracking-normal whitespace-nowrap">
            Offer Expiring In
          </span>

          {/* 3 White boxes with Hour : Min : Sec matching user reference */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {/* Hours Block */}
            <div className="bg-white rounded-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-center shadow-xs min-w-[38px] sm:min-w-[46px]">
              <div className="text-xs sm:text-sm md:text-base font-bold text-stone-950 leading-tight">
                {format2(timeLeft.hours)}
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-stone-700 leading-tight">
                Hour
              </div>
            </div>

            <span className="text-white font-bold text-xs sm:text-sm leading-none">:</span>

            {/* Minutes Block */}
            <div className="bg-white rounded-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-center shadow-xs min-w-[38px] sm:min-w-[46px]">
              <div className="text-xs sm:text-sm md:text-base font-bold text-stone-950 leading-tight">
                {format2(timeLeft.minutes)}
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-stone-700 leading-tight">
                Min
              </div>
            </div>

            <span className="text-white font-bold text-xs sm:text-sm leading-none">:</span>

            {/* Seconds Block */}
            <div className="bg-white rounded-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-center shadow-xs min-w-[38px] sm:min-w-[46px]">
              <div className="text-xs sm:text-sm md:text-base font-bold text-stone-950 leading-tight">
                {format2(timeLeft.seconds)}
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-stone-700 leading-tight">
                Sec
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Site Header with Crova Logo */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 bg-[#f7f5f2]">
        {/* Left Rating / Trust Indicator (balances the right button for true optical centering) */}
        <div className="flex-1 flex items-center justify-start">
          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-white/80 border border-stone-200/90 px-3 py-1.5 rounded-full shadow-2xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-stone-900">4.9/5</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-600">15,000+ Crafters</span>
          </div>
          <div className="sm:hidden inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-white/90 border border-stone-200 px-2 py-0.5 rounded-md shadow-2xs">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>4.9/5</span>
          </div>
        </div>

        {/* Centered Brand Name Crova with Asterisk Icon */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 leading-none">
              Crova
            </h1>
            {/* Yellow Asterisk / Star Badge */}
            <div className="w-6 h-6 rounded-md bg-[#eab308] border border-amber-400 flex items-center justify-center text-stone-950 font-black text-sm shadow-xs select-none">
              ✱
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-stone-500 leading-tight mt-0.5">
            Crochet Patterns
          </span>
        </div>

        {/* Header Right Action */}
        <div className="flex-1 flex items-center justify-end">
          <a
            href={BUY_NOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onOpenCheckout}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#f95721] to-[#ea580c] hover:from-[#e04511] hover:to-[#c2410c] text-white shadow-sm hover:shadow-md transition-all transform active:scale-95 cursor-pointer no-underline"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="font-black">Get Bundle</span>
              <span className="text-[10px] sm:text-[11px] line-through text-orange-200 hidden md:inline">₹3,999</span>
              <span className="bg-white/20 text-white text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded">₹199</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
