import { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

interface LimitedTimeCountdownProps {
  className?: string;
  variant?: 'hero' | 'pill' | 'compact' | 'card';
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  externalTimeLeft?: { hours: number; minutes: number; seconds: number };
  prefixText?: string;
  showIcon?: boolean;
  showUrgencyPill?: boolean;
}

export function LimitedTimeCountdown({
  className = '',
  variant = 'hero',
  initialHours = 14,
  initialMinutes = 21,
  initialSeconds = 15,
  externalTimeLeft,
  prefixText = 'Offer ends in',
  showIcon = true,
  showUrgencyPill = true,
}: LimitedTimeCountdownProps) {
  const [internalTime, setInternalTime] = useState(() => {
    // Attempt to persist countdown state so page refresh doesn't jump wildly
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('crova_limited_countdown_target');
        if (stored) {
          const targetTime = parseInt(stored, 10);
          const now = Date.now();
          const diffSec = Math.max(0, Math.floor((targetTime - now) / 1000));
          if (diffSec > 0) {
            const h = Math.floor(diffSec / 3600);
            const m = Math.floor((diffSec % 3600) / 60);
            const s = diffSec % 60;
            return { hours: h, minutes: m, seconds: s };
          }
        }
      } catch {
        // Fallback to initial
      }
    }
    return {
      hours: initialHours,
      minutes: initialMinutes,
      seconds: initialSeconds,
    };
  });

  useEffect(() => {
    // If externalTimeLeft is controlled, do not tick internal time
    if (externalTimeLeft) return;

    // Set target timestamp in session if not yet stored
    if (typeof window !== 'undefined') {
      try {
        if (!sessionStorage.getItem('crova_limited_countdown_target')) {
          const totalSec = initialHours * 3600 + initialMinutes * 60 + initialSeconds;
          sessionStorage.setItem('crova_limited_countdown_target', String(Date.now() + totalSec * 1000));
        }
      } catch {
        // ignore
      }
    }

    const timer = setInterval(() => {
      setInternalTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [externalTimeLeft, initialHours, initialMinutes, initialSeconds]);

  const time = externalTimeLeft || internalTime;
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formattedHHMMSS = `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-[#ea580c] to-amber-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse ${className}`}
      >
        {showIcon && <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-bounce" />}
        <span>
          {prefixText} <span className="font-mono tracking-wider font-black text-amber-200">[{formattedHHMMSS}]</span>
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-amber-900 bg-amber-50/90 border border-amber-300/80 px-3 py-1 rounded-lg shadow-2xs ${className}`}
      >
        <Clock className="w-3.5 h-3.5 text-[#c2410c] shrink-0" />
        <span>
          {prefixText}{' '}
          <span className="font-mono font-black text-[#dc2626] tracking-wider">[{formattedHHMMSS}]</span>
        </span>
      </div>
    );
  }

  // Primary Prominent Hero Section Variant - Clean, Authentic & Premium
  return (
    <div
      className={`w-full bg-[#fdfbf7] border border-amber-200/90 rounded-2xl p-3 sm:p-4 shadow-xs text-center my-3.5 transition-all ${className}`}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-[#ea580c] shrink-0" />
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-stone-800 font-sans">
          Limited-Time Special Price
        </span>
      </div>

      {/* Prominent "Offer ends in [HH:MM:SS]" Display */}
      <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-stone-900 text-white px-3.5 sm:px-4 py-2 rounded-xl shadow-xs border border-stone-800">
        <span className="text-stone-300 font-bold text-xs sm:text-sm tracking-wide">
          {prefixText}
        </span>
        <span className="font-mono text-base sm:text-lg font-black text-amber-300 tracking-wider">
          [{formattedHHMMSS}]
        </span>
      </div>

      {/* Honest value & trust reinforcement without fake scarcity */}
      <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-stone-600">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Instant Download • Lifetime Access • 24/7 Support</span>
      </div>
    </div>
  );
}
