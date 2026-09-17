import { useState, useEffect } from 'react';
import { BONUSES, BUY_NOW_URL } from '../data/bundleData';
import { BonusItem } from '../types';
import { ShoppingCart } from 'lucide-react';

interface BonusesSectionProps {
  onOpenCheckout: () => void;
}

export function BonusesSection({ onOpenCheckout }: BonusesSectionProps) {
  // Synchronized countdown timer for the Hurry Up offer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 48,
    seconds: 45,
  });

  useEffect(() => {
    const update = () => {
      const savedEndTime = localStorage.getItem('crova_offer_end_time');
      const now = Date.now();
      if (savedEndTime) {
        const remaining = Math.max(0, parseInt(savedEndTime, 10) - now);
        const totalSeconds = Math.floor(remaining / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* 6 Bonus Cards in 2-col (mobile) and 3-col (desktop) matching Screenshot 3 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 mb-8 sm:mb-10">
        {BONUSES.map((bonus, idx) => {
          // Alternating warm cream and soft mint background colors matching Screenshot 3
          const isMint = idx % 2 === 1;
          return (
            <BonusCard
              key={bonus.id}
              bonus={bonus}
              bgColor={isMint ? 'bg-[#f0fdf4]' : 'bg-[#fefbf6]'}
            />
          );
        })}
      </div>

      {/* Hurry Up Banner & Yellow SHOP NOW Button matching Screenshot 4 and 5 */}
      <div className="text-center max-w-md mx-auto">
        {/* Alarm clock text */}
        <p className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-wide mb-3 flex items-center justify-center gap-1.5">
          <span>⏰</span>
          <span>HURRY UP LIMITED TIME OFFER</span>
          <span>⏰</span>
        </p>

        {/* Golden Yellow SHOP NOW Button matching Screenshot 5 */}
        <a
          href={BUY_NOW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenCheckout}
          className="w-full bg-[#fbb000] hover:bg-[#e6a100] active:bg-[#d09100] text-white text-lg sm:text-2xl font-black py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2.5 cursor-pointer no-underline"
        >
          <ShoppingCart className="w-6 h-6 fill-white text-white" />
          <span>SHOP NOW</span>
        </a>

        {/* Deep Green Timer Boxes matching Screenshot 5 */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 font-sans mt-4">
          {/* Hour */}
          <div className="w-16 sm:w-18 py-1.5 sm:py-2 bg-[#1b533b] text-white rounded-lg flex flex-col items-center justify-center shadow-xs">
            <span className="text-base sm:text-xl font-black leading-tight">
              {format2(timeLeft.hours)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-100">
              Hour
            </span>
          </div>

          <span className="text-lg font-black text-stone-800">:</span>

          {/* Min */}
          <div className="w-16 sm:w-18 py-1.5 sm:py-2 bg-[#1b533b] text-white rounded-lg flex flex-col items-center justify-center shadow-xs">
            <span className="text-base sm:text-xl font-black leading-tight">
              {format2(timeLeft.minutes)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-100">
              Min
            </span>
          </div>

          <span className="text-lg font-black text-stone-800">:</span>

          {/* Sec */}
          <div className="w-16 sm:w-18 py-1.5 sm:py-2 bg-[#1b533b] text-white rounded-lg flex flex-col items-center justify-center shadow-xs">
            <span className="text-base sm:text-xl font-black leading-tight">
              {format2(timeLeft.seconds)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-100">
              Sec
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BonusCard({ 
  bonus, 
  bgColor 
}: { 
  bonus: BonusItem; 
  bgColor: string;
  key?: number | string;
}) {
  return (
    <div className={`${bgColor} rounded-2xl border-2 border-dashed border-stone-800 p-3 sm:p-5 flex flex-col justify-between text-center shadow-xs transition-transform hover:-translate-y-0.5`}>
      <div>
        {/* Red Title: Bonus 1, Bonus 2, etc. */}
        <div className="mb-1.5">
          <span className="text-sm sm:text-base font-black text-[#b91c1c] tracking-wide">
            {bonus.bonusNumber}
          </span>
        </div>

        {/* 3D Product Box Image */}
        <div className="my-2.5 flex items-center justify-center min-h-[170px] sm:min-h-[200px]">
          <img
            src={bonus.coverImage}
            alt={`${bonus.bonusNumber} - ${bonus.title}`}
            className="w-36 sm:w-44 md:w-48 h-auto max-h-48 sm:max-h-56 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 select-none"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              const localFallback = `/assets/bonuses/bonus-${bonus.id}.png`;
              if (target.src !== localFallback && !target.src.endsWith(localFallback)) {
                target.src = localFallback;
              }
            }}
          />
        </div>

        {/* Title below 3D Box Image */}
        <h4 className="text-xs sm:text-sm md:text-[15px] font-black text-stone-950 leading-snug mb-1 mt-2">
          {bonus.title}
        </h4>
      </div>

      {/* Value in Red Bold */}
      <div className="pt-2">
        <span className="text-xs sm:text-sm font-black text-[#b91c1c]">
          Value: ₹{bonus.value.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
