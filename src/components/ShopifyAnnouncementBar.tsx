import { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Star, Sparkles, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: Sparkles,
    iconColor: 'text-amber-300',
    text: 'MEGA LAUNCH SALE: 2,200+ Crochet Patterns & Video Guides @ Just ₹199 (93% OFF)',
    badge: 'Limited Time',
  },
  {
    icon: Zap,
    iconColor: 'text-amber-300',
    text: '⚡ Instant Lifetime Access via Google Drive + 6 Exclusive Free Bonuses',
    badge: 'Instant Delivery',
  },
  {
    icon: Star,
    iconColor: 'text-amber-300',
    text: 'Rated 4.9/5 by 9,430+ Happy Crafters across India',
    badge: 'Verified Bestseller',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-emerald-400',
    text: '100% Risk-Free Purchase • UPI, GPay, PhonePe, Paytm & Card Secure',
    badge: 'Encrypted',
  },
];

export function ShopifyAnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="w-full bg-gradient-to-r from-stone-950 via-[#1c1917] to-stone-950 text-white text-[11px] sm:text-xs py-2 px-3 border-b border-stone-800/80 overflow-hidden relative select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden text-center transition-all duration-300">
          <Icon className={`w-3.5 h-3.5 ${current.iconColor} shrink-0 animate-pulse`} />
          <span className="font-bold tracking-wide truncate max-w-[280px] sm:max-w-none">
            {current.text}
          </span>
          <span className="hidden md:inline-flex items-center text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded-full shrink-0">
            {current.badge}
          </span>
        </div>

        {/* Subtle Next Indicator */}
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
          aria-label="Next announcement"
          className="text-stone-400 hover:text-white shrink-0 p-1 rounded transition-colors cursor-pointer hidden sm:block"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
