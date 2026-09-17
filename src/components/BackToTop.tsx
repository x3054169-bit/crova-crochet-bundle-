import { useState, useEffect } from 'react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end group">
      {/* Tooltip on hover */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-stone-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-md shadow-lg mb-1.5 whitespace-nowrap pointer-events-none border border-stone-700/50">
        Back to top
      </span>

      <button
        id="back-to-top-btn"
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-stone-900/90 hover:bg-[#f95721] text-white flex items-center justify-center shadow-xl hover:shadow-2xl border border-stone-700/60 hover:border-orange-500 transition-all duration-200 transform hover:-translate-y-1 active:scale-95 cursor-pointer backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-[#f95721] focus:ring-offset-2"
      >
        {/* Back to top SVG icon */}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 stroke-current transition-transform group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
