import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';

export interface RecentSale {
  id: string;
  name: string;
  city: string;
  timeAgo: string;
  thumbnail?: string;
}

const DEFAULT_SALES: RecentSale[] = [
  { id: '1', name: 'Pooja', city: 'Pune', timeAgo: '2 minutes ago' },
  { id: '2', name: 'Ananya', city: 'Bengaluru', timeAgo: 'Just now' },
  { id: '3', name: 'Sneha', city: 'New Delhi', timeAgo: '3 minutes ago' },
  { id: '4', name: 'Priya', city: 'Mumbai', timeAgo: '1 minute ago' },
  { id: '5', name: 'Kavita', city: 'Hyderabad', timeAgo: '4 minutes ago' },
  { id: '6', name: 'Ritu', city: 'Jaipur', timeAgo: 'Just now' },
  { id: '7', name: 'Meera', city: 'Chennai', timeAgo: '5 minutes ago' },
  { id: '8', name: 'Tanvi', city: 'Kolkata', timeAgo: '2 minutes ago' },
  { id: '9', name: 'Aditi', city: 'Ahmedabad', timeAgo: '6 minutes ago' },
  { id: '10', name: 'Divya', city: 'Chandigarh', timeAgo: '1 minute ago' },
  { id: '11', name: 'Aarti', city: 'Lucknow', timeAgo: '3 minutes ago' },
  { id: '12', name: 'Deepika', city: 'Kochi', timeAgo: 'Just now' },
  { id: '13', name: 'Swati', city: 'Indore', timeAgo: '4 minutes ago' },
  { id: '14', name: 'Simran', city: 'Surat', timeAgo: '2 minutes ago' },
  { id: '15', name: 'Harini', city: 'Coimbatore', timeAgo: '5 minutes ago' },
];

interface RecentSalesTickerProps {
  bundleName?: string;
  thumbnailUrl?: string;
  initialDelayMs?: number;
  displayDurationMs?: number;
  intervalMs?: number;
  customSales?: RecentSale[];
  onOpenCheckout?: () => void;
}

export function RecentSalesTicker({
  bundleName = 'the bundle',
  thumbnailUrl = 'https://i.ibb.co/Wv96sZTf/2200middle.jpg',
  initialDelayMs = 3500,
  displayDurationMs = 5000,
  intervalMs = 7000,
  customSales,
  onOpenCheckout,
}: RecentSalesTickerProps) {
  const sales = customSales || DEFAULT_SALES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isDismissed) return;

    let isMounted = true;

    // Initial wait before first notification
    const startTimeout = setTimeout(() => {
      if (!isMounted) return;
      setIsVisible(true);
    }, initialDelayMs);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [initialDelayMs, isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    if (isVisible) {
      if (isHovered) {
        // Pause timer while hovered
        if (timerRef.current) clearTimeout(timerRef.current);
        return;
      }

      // Hide after displayDurationMs
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, displayDurationMs);
    } else {
      // After hiding, schedule next item after intervalMs
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sales.length);
        setIsVisible(true);
      }, intervalMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, isHovered, isDismissed, displayDurationMs, intervalMs, sales.length]);

  if (isDismissed) return null;

  const current = sales[currentIndex];

  const handleDismiss = (e: MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Snooze for 45 seconds before showing again
    setTimeout(() => {
      setIsDismissed(false);
    }, 45000);
    setIsDismissed(true);
  };

  const handleClick = () => {
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`fixed z-50 transition-all duration-500 ease-out select-none ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      } bottom-20 left-3 max-w-[calc(100%-4.5rem)] sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-[340px]`}
    >
      <div className="relative flex items-center gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-amber-200/90 shadow-xl shadow-stone-900/10 hover:shadow-2xl hover:border-amber-400/90 transition-all cursor-pointer group">
        {/* Thumbnail / Bundle cover badge */}
        <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-amber-50 border border-amber-200/80 shadow-xs flex items-center justify-center">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="Crochet bundle preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <ShoppingBag className="w-6 h-6 text-amber-600" />
          )}

          {/* Tiny pulsing green verified live dot */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
          </span>
        </div>

        {/* Content copy */}
        <div className="flex-1 min-w-0 pr-5">
          <p className="text-[13px] leading-snug text-stone-900 font-semibold truncate">
            <span className="font-bold text-stone-950">{current.name}</span> from{' '}
            <span className="text-[#ea580c] font-bold">{current.city}</span>
          </p>
          <p className="text-[12px] leading-tight text-stone-700 truncate mt-0.5">
            just bought {bundleName}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] text-stone-400 font-medium">
              {current.timeAgo}
            </span>
            <span className="text-[10px] text-stone-300">•</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
              Verified
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
