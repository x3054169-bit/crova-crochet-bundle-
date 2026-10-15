import { useState, useEffect, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, Check, Star } from 'lucide-react';

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  review: string;
  projectImage: string;
  projectAlt: string;
  handle: string;
  craftedItem: string;
}

const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Kiara',
    location: 'Delhi',
    review: 'I bought this bundle to make handmade gifts for my friends and family. The step-by-step videos made it so easy!',
    projectImage: 'https://i.ibb.co/LdYKW9Gh/kiara.webp',
    projectAlt: 'Kiara handmade crochet project',
    handle: 'crova.co',
    craftedItem: 'Festive Gift Set',
  },
  {
    id: 'rev-2',
    name: 'Ananya',
    location: 'Mumbai',
    review: 'The amigurumi patterns are so adorable! As a complete beginner, I crocheted 3 plushies in my very first week.',
    projectImage: 'https://i.ibb.co/V09DcfQg/ananya-review.avif',
    projectAlt: 'Ananya customer crochet review',
    handle: 'crova.co',
    craftedItem: '3 Amigurumi Plushies',
  },
  {
    id: 'rev-3',
    name: 'Pooja',
    location: 'Bengaluru',
    review: 'Started selling handmade tote bags and coasters on Instagram using these patterns. Best ₹199 investment ever!',
    projectImage: 'https://i.ibb.co/3yC2jGmw/pooja.jpg',
    projectAlt: 'Pooja handmade crochet craft',
    handle: 'crova.co',
    craftedItem: 'Tote & Coaster Sets',
  },
  {
    id: 'rev-4',
    name: 'Sneha',
    location: 'Pune',
    review: 'The Hindi and English video masterclass cleared all my confusion with the magic circle and stitch tension.',
    projectImage: 'https://i.ibb.co/C3Q6V7hL/sneha.jpg',
    projectAlt: 'Sneha handmade crochet craft',
    handle: 'crova.co',
    craftedItem: 'First Magic Loop Blanket',
  },
  {
    id: 'rev-5',
    name: 'Meena',
    location: 'Jaipur',
    review: 'The festival and home decor patterns are massive! Instant download access worked within seconds of payment.',
    projectImage: 'https://i.ibb.co/nqsXsyWS/meena.jpg',
    projectAlt: 'Meena handmade crochet home decor',
    handle: 'crova.co',
    craftedItem: 'Festival Wall Decor',
  },
  {
    id: 'rev-6',
    name: 'Ananya R.',
    location: 'Kolkata',
    review: 'Detailed PDF charts with clear stitch counts. Crocheting baby booties and blankets has become my favorite hobby!',
    projectImage: 'https://i.ibb.co/fdCd72jw/ananya.jpg',
    projectAlt: 'Ananya R. customer crochet plushie review',
    handle: 'crova.co',
    craftedItem: 'Baby Booties & Blanket',
  },
];

export function ReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);

  const goToSlide = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 180);
  };

  const prevSlide = () => {
    const nextIdx = currentIndex === 0 ? CUSTOMER_REVIEWS.length - 1 : currentIndex - 1;
    goToSlide(nextIdx);
  };

  const nextSlide = () => {
    const nextIdx = currentIndex === CUSTOMER_REVIEWS.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIdx);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      if (diff > 45) {
        nextSlide();
      } else if (diff < -45) {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    setIsAutoPlaying(true);
  };

  const current = CUSTOMER_REVIEWS[currentIndex];

  return (
    <section className="mt-10 mb-10 w-full text-left">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold mb-2 shadow-2xs">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>REAL CRAFTER EXPERIENCES</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 tracking-tight">
          Loved by 14,000+ Crafters
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Real reviews and finished projects from crafters across India
        </p>
      </div>

      {/* Main Review Card Slider Container */}
      <div
        className="relative select-none"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/90 shadow-md p-4 sm:p-6 transition-all duration-300">
          {/* 2-Column Content Layout with Smooth Transition */}
          <div
            className={`grid grid-cols-12 gap-3.5 sm:gap-5 items-center relative z-20 transition-all duration-200 ${
              isFading ? 'opacity-30 scale-[0.99] blur-[0.5px]' : 'opacity-100 scale-100 blur-none'
            }`}
          >
            {/* Left Column: Customer Creation Photo with Badge */}
            <div className="col-span-5 sm:col-span-5">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-xs ring-1 ring-stone-200/60 group">
                <img
                  src={current.projectImage}
                  alt={current.projectAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Mini Item Tag */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-stone-900/85 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold py-0.5 px-1.5 rounded-md text-center truncate shadow-xs">
                  {current.craftedItem}
                </div>
              </div>
            </div>

            {/* Right Column: Rating, Name, Review, Divider & Social Proof */}
            <div className="col-span-7 sm:col-span-7 flex flex-col justify-between pl-0.5">
              <div>
                {/* Top Row: 5 Star Rating & Verified Crafter Tag */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60 inline-flex items-center gap-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Reviewer Name and Location */}
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <h4 className="text-stone-950 font-black text-sm sm:text-base font-sans tracking-tight">
                    {current.name}
                  </h4>
                  <span className="text-[11px] font-bold text-[#c2410c]">
                    • {current.location}
                  </span>
                </div>

                {/* Review Paragraph */}
                <p className="text-stone-800 text-xs sm:text-[13px] font-medium leading-snug sm:leading-relaxed my-1.5 font-sans">
                  &ldquo;{current.review}&rdquo;
                </p>
              </div>

              {/* Artisan Divider Line */}
              <div className="flex items-center gap-2 justify-center my-1 text-amber-600">
                <div className="h-px bg-stone-200 flex-1 rounded-full" />
                <span className="text-[10px] leading-none text-amber-700 select-none">♥</span>
                <div className="h-px bg-stone-200 flex-1 rounded-full" />
              </div>

              {/* Social Proof Handle matching screenshot */}
              <div className="flex items-center gap-1.5 mt-0.5">
                {/* Instagram Gradient Logo */}
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center p-1 shadow-xs shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>

                <span className="text-xs font-bold text-stone-900 tracking-tight truncate">
                  @{current.handle}
                </span>

                {/* Verified Blue Checkmark Badge */}
                <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-2xs shrink-0" title="Verified Instagram Crafter">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Chevrons & Pagination Controls */}
        <div className="flex items-center justify-between mt-3 px-1">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous review"
            className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-[#ea580c] hover:border-[#ea580c] active:scale-95 flex items-center justify-center shadow-xs transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator with slide numbers */}
          <div className="flex items-center gap-1.5">
            {CUSTOMER_REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i
                    ? 'w-6 bg-[#00838f]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next review"
            className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-[#00838f] hover:border-[#00bcd4] active:scale-95 flex items-center justify-center shadow-xs transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle swipe hint for mobile */}
        <p className="text-[10px] text-stone-400 text-center font-medium mt-1 select-none">
          Swipe or tap dots to view all {CUSTOMER_REVIEWS.length} crafter stories
        </p>
      </div>
    </section>
  );
}
