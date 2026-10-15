import { useState, useEffect } from 'react';

interface ScrollProgressBarProps {
  className?: string;
  color?: string;
  height?: string;
  showPercentBadge?: boolean;
}

export function ScrollProgressBar({
  className = '',
  height = 'h-1 sm:h-1.5',
  showPercentBadge = false,
}: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const calculateScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScrollable = scrollHeight - clientHeight;

      if (totalScrollable <= 0) {
        setScrollProgress(0);
        setIsVisible(false);
        return;
      }

      const currentProgress = (scrollTop / totalScrollable) * 100;
      const clamped = Math.min(100, Math.max(0, currentProgress));
      setScrollProgress(clamped);

      // Only show after user starts scrolling down a tiny bit (e.g. > 1%)
      setIsVisible(scrollTop > 20);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    calculateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      {/* Subtle track background */}
      <div className="w-full bg-stone-900/10 dark:bg-black/20 backdrop-blur-xs">
        {/* Progress fill bar */}
        <div
          className={`${height} bg-gradient-to-r from-amber-500 via-[#ea580c] to-[#dc2626] relative transition-[width] duration-100 ease-out shadow-[0_1px_8px_rgba(234,88,12,0.4)]`}
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Subtle glowing lead point */}
          {scrollProgress > 0 && scrollProgress < 100 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] opacity-90 -mr-1" />
          )}

          {/* Optional Percentage Badge */}
          {showPercentBadge && scrollProgress > 5 && (
            <div className="absolute right-0 top-2 -translate-x-1/2 bg-stone-900/90 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              {Math.round(scrollProgress)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
