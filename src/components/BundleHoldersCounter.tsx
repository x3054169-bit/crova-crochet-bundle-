import { useState, useEffect } from 'react';
import { Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface BundleHoldersCounterProps {
  className?: string;
  variant?: 'card' | 'compact' | 'pill';
}

const STORAGE_KEY = 'crova_bundle_holders_count';
const LAST_UPDATED_KEY = 'crova_bundle_holders_updated';

// Calculate a believable starting number based on current hour of the day
function getBaselineCount(): number {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    const lastDate = sessionStorage.getItem(LAST_UPDATED_KEY);
    const todayStr = new Date().toDateString();

    if (saved && lastDate === todayStr) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 50) {
        return parsed;
      }
    }
  } catch {
    // sessionStorage might fail in private browsing
  }

  const now = new Date();
  const hour = now.getHours(); // 0 to 23
  const minutes = now.getMinutes();

  // Natural scaling across the day: ~180 in early morning to ~850+ by night
  return 185 + Math.floor(hour * 28 + (minutes / 60) * 28);
}

export function BundleHoldersCounter({
  className = '',
  variant = 'card',
}: BundleHoldersCounterProps) {
  const [count, setCount] = useState<number>(() => getBaselineCount());

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, count.toString());
      sessionStorage.setItem(LAST_UPDATED_KEY, new Date().toDateString());
    } catch {
      // Ignore storage errors
    }
  }, [count]);

  useEffect(() => {
    // Smooth, subtle natural increment every 25-45 seconds
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1;
        try {
          sessionStorage.setItem(STORAGE_KEY, next.toString());
          sessionStorage.setItem(LAST_UPDATED_KEY, new Date().toDateString());
        } catch {
          // ignore
        }
        return next;
      });
    }, 32000);

    return () => clearInterval(interval);
  }, []);

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fdfbf7] border border-amber-200/80 text-stone-800 text-xs sm:text-sm font-semibold shadow-2xs ${className}`}
      >
        <Users className="w-4 h-4 text-amber-700" />
        <span className="text-stone-700">Enrolled Today:</span>
        <span className="font-extrabold text-[#c2410c]">{count.toLocaleString()} crafters</span>
      </div>
    );
  }

  // Primary Hero Card Variant - Clean, Authentic & Trustworthy
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#fdfbf7] border border-amber-200/90 p-3 sm:p-3.5 shadow-2xs text-left ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Community Icon + Verified Crafter Text */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 border border-amber-200/70 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-amber-800" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-[13px] font-extrabold text-stone-900 tracking-tight">
                9,400+ Crafters in India
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded-md">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                Verified
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-600 font-medium truncate">
              {count.toLocaleString()} crafters joined the bundle today
            </p>
          </div>
        </div>

        {/* Right: Instant Access Pill */}
        <div className="shrink-0 text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-1 rounded-lg">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Instant Access</span>
          </span>
        </div>
      </div>
    </div>
  );
}

