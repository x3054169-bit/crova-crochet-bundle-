import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

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

  return (
    <div
      className={`fixed bottom-44 sm:bottom-32 right-4 sm:right-6 z-40 flex flex-col items-end group transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
      }`}
    >
      {/* Tooltip on hover for desktop */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 bg-stone-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-xl mb-1.5 whitespace-nowrap pointer-events-none border border-stone-700/60 translate-y-1 group-hover:translate-y-0">
        Back to top
      </span>

      <button
        id="back-to-top-btn"
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-stone-900/90 hover:bg-[#ea580c] active:bg-[#c2410c] text-white flex items-center justify-center shadow-xl hover:shadow-orange-500/30 border border-stone-700/50 hover:border-orange-400/60 transition-all duration-200 transform hover:-translate-y-1 active:scale-95 cursor-pointer backdrop-blur-md focus:outline-hidden focus:ring-2 focus:ring-[#ea580c] focus:ring-offset-2"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
