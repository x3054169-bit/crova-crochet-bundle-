import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { BUY_NOW_URL } from '../data/bundleData';

interface MidUrgencyBannerProps {
  onOpenCheckout: () => void;
}

export function MidUrgencyBanner({ onOpenCheckout }: MidUrgencyBannerProps) {
  // Sync countdown with header / storage
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 9,
    minutes: 25,
    seconds: 21,
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
    <section className="py-8 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* 1. "All of this in less than the price of a Pizza." */}
      <div className="mb-5 sm:mb-6">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-stone-900">
          <span>All of this in less than the </span>
          <span className="text-[#b91c1c] font-black">price of a Pizza.</span>
        </h3>
      </div>

      {/* 2. Primary CTA Button matching Screenshot 2: ⚡ Get Everything at ₹199 */}
      <div className="max-w-md mx-auto mb-6 sm:mb-8">
        <a
          href={BUY_NOW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenCheckout}
          className="w-full bg-[#f9570c] hover:bg-[#ea4f07] active:bg-[#d84403] text-white text-lg sm:text-2xl font-black py-3.5 sm:py-4 px-6 rounded-xl shadow-md hover:shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2.5 group cursor-pointer no-underline"
        >
          <Zap className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
          <span>Get Everything at ₹199</span>
        </a>
      </div>

      {/* 3. Three Pale Yellow Countdown Timer Boxes matching Screenshot 2 */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 font-sans mb-8 sm:mb-10">
        {/* Hours */}
        <div className="w-18 sm:w-22 py-2 sm:py-2.5 bg-[#fef9c3] border border-amber-200/90 rounded-2xl flex flex-col items-center justify-center shadow-xs">
          <span className="text-2xl sm:text-3xl font-black text-[#991b1b] leading-tight">
            {format2(timeLeft.hours)}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-stone-800 tracking-tight">
            Hours
          </span>
        </div>

        <span className="text-xl sm:text-2xl font-black text-stone-800">:</span>

        {/* Minutes */}
        <div className="w-18 sm:w-22 py-2 sm:py-2.5 bg-[#fef9c3] border border-amber-200/90 rounded-2xl flex flex-col items-center justify-center shadow-xs">
          <span className="text-2xl sm:text-3xl font-black text-[#991b1b] leading-tight">
            {format2(timeLeft.minutes)}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-stone-800 tracking-tight">
            Minutes
          </span>
        </div>

        <span className="text-xl sm:text-2xl font-black text-stone-800">:</span>

        {/* Seconds */}
        <div className="w-18 sm:w-22 py-2 sm:py-2.5 bg-[#fef9c3] border border-amber-200/90 rounded-2xl flex flex-col items-center justify-center shadow-xs">
          <span className="text-2xl sm:text-3xl font-black text-[#991b1b] leading-tight">
            {format2(timeLeft.seconds)}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-stone-800 tracking-tight">
            Seconds
          </span>
        </div>
      </div>

      {/* 4. Dashed Border Pill Box from Screenshot 2: Unlock Bonuses Worth ₹5,094 If You Enroll Today! */}
      <div className="inline-block w-full max-w-2xl border-2 border-dashed border-stone-800 rounded-xl px-4 sm:px-8 py-3 sm:py-3.5 bg-transparent">
        <p className="text-xs sm:text-sm md:text-base font-semibold text-stone-900">
          <span>Unlock Bonuses </span>
          <span className="text-[#b91c1c] font-black">Worth ₹5,094</span>
          <span> If You Enroll Today!</span>
        </p>
      </div>
    </section>
  );
}
