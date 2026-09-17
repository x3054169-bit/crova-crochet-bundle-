import { useState, useEffect } from 'react';
import { Zap, Clock, ShieldCheck } from 'lucide-react';
import { BUY_NOW_URL } from '../data/bundleData';

interface StickyBottomBarProps {
  onOpenCheckout: () => void;
}

export function StickyBottomBar({ onOpenCheckout }: StickyBottomBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 52 });

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 400px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const savedEndTime = localStorage.getItem('crova_offer_end_time');
      const now = Date.now();
      if (savedEndTime) {
        const remaining = Math.max(0, parseInt(savedEndTime, 10) - now);
        const totalSeconds = Math.floor(remaining / 1000);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        setTimeLeft({ minutes, seconds });
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 text-white p-3 shadow-2xl transition-transform animate-slideUp">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Left price & timer reminder */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-amber-400">₹199</span>
              <span className="text-xs text-stone-400 line-through">₹3,999</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold bg-emerald-700 text-white px-1.5 py-0.5 rounded">
                95% OFF
              </span>
            </div>
            <p className="text-[10px] text-stone-400 hidden xs:block">
              1200+ Patterns + Video Course + 6 Free Bonuses
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-xs text-amber-300 font-mono font-bold bg-stone-800 px-2.5 py-1.5 rounded border border-stone-700">
            <Clock className="w-3.5 h-3.5" />
            <span>Ends in {format2(timeLeft.minutes)}:{format2(timeLeft.seconds)}</span>
          </div>

          <a
            href={BUY_NOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onOpenCheckout}
            className="bg-[#f95721] hover:bg-[#e04511] text-white text-sm sm:text-base font-black px-5 sm:px-7 py-2.5 rounded-lg shadow-lg inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer whitespace-nowrap no-underline"
          >
            <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span>Get Everything ₹199</span>
          </a>
        </div>
      </div>
    </div>
  );
}
