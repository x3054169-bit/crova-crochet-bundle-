import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  review: string;
  projectImage: string;
  projectAlt: string;
  handle: string;
}

const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Kiara',
    location: 'Delhi',
    review: 'I bought this bundle to make handmade gifts for my friends and family. The step-by-step videos made it so easy!',
    projectImage: 'https://i.ibb.co/LdYKW9Gh/kiara.webp',
    projectAlt: 'Kiara handmade crochet project',
    handle: 'crova_crochet',
  },
  {
    id: 'rev-2',
    name: 'Ananya',
    location: 'Mumbai',
    review: 'The amigurumi patterns are so adorable! As a complete beginner, I crocheted 3 plushies in my very first week.',
    projectImage: 'https://i.ibb.co/fdCd72jw/ananya.jpg',
    projectAlt: 'Ananya handmade crochet plushie',
    handle: 'crova_crochet',
  },
  {
    id: 'rev-3',
    name: 'Pooja',
    location: 'Bengaluru',
    review: 'Started selling handmade tote bags and coasters on Instagram using these patterns. Best ₹199 investment ever!',
    projectImage: 'https://i.ibb.co/3yC2jGmw/pooja.jpg',
    projectAlt: 'Pooja handmade crochet craft',
    handle: 'crova_crochet',
  },
  {
    id: 'rev-4',
    name: 'Sneha',
    location: 'Pune',
    review: 'The Hindi and English video masterclass cleared all my confusion with the magic circle and stitch tension.',
    projectImage: 'https://i.ibb.co/C3Q6V7hL/sneha.jpg',
    projectAlt: 'Sneha handmade crochet craft',
    handle: 'crova_crochet',
  },
  {
    id: 'rev-5',
    name: 'Meena',
    location: 'Jaipur',
    review: 'The festival and home decor patterns are massive! Instant download access worked within seconds of payment.',
    projectImage: 'https://i.ibb.co/nqsXsyWS/meena.jpg',
    projectAlt: 'Meena handmade crochet home decor',
    handle: 'crova_crochet',
  },
  {
    id: 'rev-6',
    name: 'Ananya R.',
    location: 'Kolkata',
    review: 'Detailed PDF charts with clear stitch counts. Crocheting baby booties and blankets has become my favorite hobby!',
    projectImage: 'https://i.ibb.co/V09DcfQg/ananya-review.avif',
    projectAlt: 'Ananya R. customer crochet review',
    handle: 'crova_crochet',
  },
];

export function ReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CUSTOMER_REVIEWS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CUSTOMER_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const current = CUSTOMER_REVIEWS[currentIndex];

  return (
    <section className="mt-10 mb-10 w-full text-left">
      <div className="text-center mb-4">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#00838f] bg-[#e0f7fa] px-3 py-1 rounded-full border border-[#00bcd4]/30">
          Real Crafter Feedback
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 tracking-wide mt-2">
          Loved by 50,000+ Crafters
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          See what our crafters are making and sharing on Instagram
        </p>
      </div>

      {/* Main Review Card Slider matching screenshot style */}
      <div
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#e0f7fa]/70 via-[#f0fdfa]/50 to-white border-2 border-[#80deea]/70 shadow-md p-4 sm:p-6 transition-all">
          {/* Decorative Corner: Yarn Ball (Bottom-Left) */}
          <div className="absolute -bottom-2 -left-2 w-16 h-16 pointer-events-none select-none z-10 opacity-90">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
              <circle cx="45" cy="55" r="30" fill="#26c6da" />
              <path
                d="M 25 45 Q 45 35 65 50 Q 55 70 35 65 Q 25 55 45 50"
                fill="none"
                stroke="#00838f"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 30 65 Q 50 60 60 40 Q 40 30 25 50"
                fill="none"
                stroke="#80deea"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Wandering Yarn Thread */}
              <path
                d="M 68 62 C 80 75 90 70 105 85"
                fill="none"
                stroke="#00bcd4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Decorative Corner: Crocheted Flower (Bottom-Right) */}
          <div className="absolute -bottom-2 -right-2 w-16 h-16 pointer-events-none select-none z-10 opacity-95">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
              {/* Cyan Petals */}
              <circle cx="50" cy="22" r="14" fill="#26c6da" />
              <circle cx="70" cy="30" r="14" fill="#26c6da" />
              <circle cx="78" cy="50" r="14" fill="#26c6da" />
              <circle cx="70" cy="70" r="14" fill="#26c6da" />
              <circle cx="50" cy="78" r="14" fill="#26c6da" />
              <circle cx="30" cy="70" r="14" fill="#26c6da" />
              <circle cx="22" cy="50" r="14" fill="#26c6da" />
              <circle cx="30" cy="30" r="14" fill="#26c6da" />
              {/* White Inner Petals Ring */}
              <circle cx="50" cy="50" r="22" fill="#ffffff" stroke="#b2ebf2" strokeWidth="1.5" />
              {/* Yellow Button Center with Stitch Pattern */}
              <circle cx="50" cy="50" r="11" fill="#fbc02d" />
              <circle cx="50" cy="50" r="5" fill="#f57f17" />
            </svg>
          </div>

          {/* 2-Column Content Layout matching screenshot */}
          <div className="grid grid-cols-12 gap-3 sm:gap-5 items-center relative z-20">
            {/* Left Column: Customer Creation Photo */}
            <div className="col-span-5 sm:col-span-5">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white border-2 border-white shadow-md ring-1 ring-stone-200">
                <img
                  src={current.projectImage}
                  alt={current.projectAlt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Quote, Name, Review, Divider & Social Proof */}
            <div className="col-span-7 sm:col-span-7 flex flex-col justify-between pl-1">
              <div>
                {/* Top Quotation Mark */}
                <div className="text-[#00838f] text-2xl sm:text-3xl font-serif font-black leading-none select-none">
                  “
                </div>

                {/* Reviewer Name and Location in warm gold/amber */}
                <h4 className="text-[#d97706] font-bold text-sm sm:text-base font-sans tracking-tight mt-0.5">
                  {current.name}, {current.location}
                </h4>

                {/* Review Paragraph */}
                <p className="text-stone-800 text-[11px] sm:text-xs font-semibold leading-relaxed my-1 sm:my-1.5 font-sans">
                  {current.review}
                </p>

                {/* Bottom Quotation Mark */}
                <div className="text-[#00838f] text-2xl sm:text-3xl font-serif font-black leading-none text-right select-none -mt-2">
                  ”
                </div>
              </div>

              {/* Heart Divider Line */}
              <div className="flex items-center gap-1.5 justify-center my-1.5 text-[#00bcd4]">
                <div className="h-[1.5px] bg-[#4dd0e1] flex-1 rounded-full" />
                <span className="text-[10px] leading-none text-[#00838f] select-none">♥</span>
                <div className="h-[1.5px] bg-[#4dd0e1] flex-1 rounded-full" />
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

                <span className="text-xs font-bold text-stone-900 tracking-tight">
                  {current.handle}
                </span>

                {/* Verified Blue Checkmark Badge */}
                <span className="w-3.5 h-3.5 rounded-full bg-[#00bcd4] text-white flex items-center justify-center shadow-2xs shrink-0">
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
            className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-[#00838f] hover:border-[#00bcd4] flex items-center justify-center shadow-xs transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {CUSTOMER_REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === i
                    ? 'w-6 bg-[#00acc1]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next review"
            className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-[#00838f] hover:border-[#00bcd4] flex items-center justify-center shadow-xs transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
