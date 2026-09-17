import { useState, useEffect } from 'react';
import { Star, ShoppingCart, ZoomIn, X, ChevronLeft, ChevronRight, Layers, Grid3X3 } from 'lucide-react';
import { BUY_NOW_URL } from '../data/bundleData';

interface LaunchDiscountBannerProps {
  onOpenCheckout: () => void;
}

const BUNDLE_BOOKS = [
  {
    id: 'zoo',
    title: '200 Zoo Amigurumi Patterns',
    category: 'Safari, Pets & Jungle Animals',
    count: '200 Patterns',
    tag: 'Bestseller',
    url: 'https://i.ibb.co/G38PFrx6/200-Zoo-Amigurumi-Patterns-21.png',
  },
  {
    id: 'superheroes',
    title: '150 Superheroes Patterns',
    category: 'Legendary Action Heroes & Dolls',
    count: '150 Patterns',
    tag: 'Fan Favorite',
    url: 'https://i.ibb.co/gMGJxXtg/150-Superheroes-Patterns.jpg',
  },
  {
    id: 'stuffed-toys',
    title: '150 Stuffed Toys & Dolls Patterns',
    category: 'Classic Teddy Bears & Plushies',
    count: '150 Patterns',
    tag: 'Popular',
    url: 'https://i.ibb.co/PvHXHj0P/150-Stuffed-Toys-Dolls-Patterns-21.png',
  },
  {
    id: 'cartoon',
    title: '100 Cartoon Crochet Patterns',
    category: 'Beloved Nostalgic Characters',
    count: '100 Patterns',
    tag: 'Trending',
    url: 'https://i.ibb.co/k2vmnv8p/100-Cartoon-Crochet-Patterns-21.png',
  },
  {
    id: 'baby',
    title: '120 Baby Patterns',
    category: 'Booties, Crib Blankets & Beanies',
    count: '120 Patterns',
    tag: 'Gentle',
    url: 'https://i.ibb.co/Z6WCw1kx/120-Baby-Patterns-21.png',
  },
  {
    id: 'home-decor',
    title: '50 Home Decor Patterns',
    category: 'Table Runners, Mandalas & Hangings',
    count: '50 Patterns',
    tag: 'Home & Living',
    url: 'https://i.ibb.co/BK4142ck/50-Home-Decor-Patterns-21.png',
  },
  {
    id: 'festivals',
    title: '100 Holidays & Festivals Patterns',
    category: 'Festive Diyas, Trees & Ornaments',
    count: '100 Patterns',
    tag: 'Celebrations',
    url: 'https://i.ibb.co/Y4Tmq2TC/100-Holidays-Festivals-Patterns-21.png',
  },
];

export function LaunchDiscountBanner({ onOpenCheckout }: LaunchDiscountBannerProps) {
  // Live countdown timer synced with offer
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 19,
    seconds: 38,
  });

  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [zoomedBook, setZoomedBook] = useState<typeof BUNDLE_BOOKS[0] | null>(null);
  const [viewMode, setViewMode] = useState<'featured' | 'grid'>('featured');

  useEffect(() => {
    const update = () => {
      const savedEndTime = localStorage.getItem('crova_offer_end_time');
      const now = Date.now();
      if (savedEndTime) {
        const remaining = Math.max(0, parseInt(savedEndTime, 10) - now);
        const totalSeconds = Math.floor(remaining / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="bg-[#def0fc] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Top Header matching user screenshot */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#dc2626] tracking-tight mb-4">
            Hurry! This Special Offer Ends Soon!
          </h2>

          {/* Top Divider */}
          <div className="w-full border-t border-stone-800/80 my-4" />

          {/* Subheading: 1200+ Crochet Patterns / The Ultimate Bundle / for Just ₹199 */}
          <div className="py-2 space-y-1">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0d9488] tracking-tight">
              1200+ Crochet Patterns
            </h3>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0d9488] tracking-tight">
              The Ultimate Bundle
            </h3>
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#7f1d1d] tracking-tight mt-1">
              for Just ₹199
            </p>
          </div>

          {/* Bottom Divider */}
          <div className="w-full border-t border-stone-800/80 my-4" />
        </div>

        {/* Main Card Container with Peach/Cream Background & Rounded Border matching screenshot */}
        <div className="bg-[#fff4e8] border-2 border-[#fed7aa] rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: Authentic 1200+ Patterns Bundle Showcase using Real Pattern Books Photos */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="w-full max-w-md bg-white rounded-3xl border-2 border-stone-200/90 p-4 sm:p-5 shadow-xl relative flex flex-col justify-between overflow-hidden">
                {/* Header Banner */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-[#0d9488] uppercase block">
                      CROVA • ALL-IN-ONE BUNDLE
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-stone-900 leading-tight">
                      7 Complete Pattern eBooks (1,200+)
                    </h4>
                  </div>
                  {/* View Mode Toggle: Featured Cover vs Grid */}
                  <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setViewMode('featured')}
                      className={`px-2 py-1 text-[10px] font-bold rounded flex items-center gap-1 transition-all cursor-pointer ${
                        viewMode === 'featured'
                          ? 'bg-white text-stone-900 shadow-2xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                      title="Featured Book Preview"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`px-2 py-1 text-[10px] font-bold rounded flex items-center gap-1 transition-all cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-white text-stone-900 shadow-2xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                      title="View All 7 Covers Grid"
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                      <span>All 7</span>
                    </button>
                  </div>
                </div>

                {/* Content based on viewMode */}
                {viewMode === 'featured' ? (
                  <div className="flex flex-col">
                    {/* Active Featured Book Display with Real Photo */}
                    <div 
                      className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[290px] rounded-2xl overflow-hidden bg-stone-50 border border-stone-200 shadow-sm flex items-center justify-center cursor-pointer group"
                      onClick={() => setZoomedBook(BUNDLE_BOOKS[selectedBookIndex])}
                    >
                      <img
                        src={BUNDLE_BOOKS[selectedBookIndex].url}
                        alt={BUNDLE_BOOKS[selectedBookIndex].title}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Floating Badge on Book */}
                      <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Book {selectedBookIndex + 1} of 7</span>
                      </div>

                      {/* Pattern Count Badge */}
                      <div className="absolute top-2.5 right-2.5 bg-[#f95721] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                        {BUNDLE_BOOKS[selectedBookIndex].count}
                      </div>

                      {/* Hover Zoom Prompt */}
                      <div className="absolute inset-0 bg-stone-900/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <div className="bg-stone-900/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-lg">
                          <ZoomIn className="w-4 h-4" />
                          <span>Tap to Expand</span>
                        </div>
                      </div>

                      {/* Previous / Next Arrows */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBookIndex((prev) => (prev === 0 ? BUNDLE_BOOKS.length - 1 : prev - 1));
                        }}
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
                        aria-label="Previous Book"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBookIndex((prev) => (prev === BUNDLE_BOOKS.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
                        aria-label="Next Book"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Book Details Row */}
                    <div className="mt-2.5 px-1 flex items-center justify-between text-left">
                      <div>
                        <h5 className="text-xs sm:text-sm font-black text-stone-900 leading-tight">
                          {BUNDLE_BOOKS[selectedBookIndex].title}
                        </h5>
                        <p className="text-[11px] text-stone-500 font-medium">
                          {BUNDLE_BOOKS[selectedBookIndex].category}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full shrink-0">
                        {BUNDLE_BOOKS[selectedBookIndex].tag}
                      </span>
                    </div>

                    {/* Quick Select Thumbnails for all 7 Books */}
                    <div className="mt-3 pt-2.5 border-t border-stone-100">
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span>Tap to preview any eBook:</span>
                        <span className="text-[#0d9488] font-black">7 Volumes Included</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                        {BUNDLE_BOOKS.map((book, idx) => {
                          const isSelected = idx === selectedBookIndex;
                          return (
                            <button
                              key={book.id}
                              type="button"
                              onClick={() => setSelectedBookIndex(idx)}
                              className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all cursor-pointer relative bg-white p-0.5 ${
                                isSelected
                                  ? 'border-[#0d9488] ring-2 ring-[#0d9488]/30 scale-105 shadow-sm'
                                  : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                              }`}
                              title={book.title}
                            >
                              <img
                                src={book.url}
                                alt={book.title}
                                className="w-full h-full object-contain"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Grid of all 7 real book covers */
                  <div className="flex flex-col">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[360px] overflow-y-auto pr-0.5">
                      {BUNDLE_BOOKS.map((book, idx) => (
                        <div
                          key={book.id}
                          onClick={() => setZoomedBook(book)}
                          className="bg-stone-50 rounded-xl p-1.5 border border-stone-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center"
                        >
                          <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-white mb-1 relative">
                            <img
                              src={book.url}
                              alt={book.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute top-1 right-1 bg-stone-900/80 text-white text-[8px] font-bold px-1 rounded">
                              #{idx + 1}
                            </span>
                          </div>
                          <span className="text-[9px] font-black text-stone-800 line-clamp-1 leading-tight">
                            {book.title}
                          </span>
                          <span className="text-[8px] font-bold text-teal-600">
                            {book.count}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-500 font-medium text-center mt-2">
                      Tap any cover to inspect high-resolution pattern details
                    </p>
                  </div>
                )}

                {/* Bottom Trust & Feature Bullets */}
                <div className="mt-3.5 pt-2.5 border-t border-stone-100 grid grid-cols-3 gap-1 text-[10px] font-bold text-stone-600 text-center">
                  <div className="bg-stone-50 py-1 px-1 rounded-md">
                    📚 7 PDF eBooks
                  </div>
                  <div className="bg-stone-50 py-1 px-1 rounded-md">
                    🎥 Video Course
                  </div>
                  <div className="bg-stone-50 py-1 px-1 rounded-md">
                    ⚡ Instant Access
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Details, Rating, Checklist, Timer & CTA Button matching screenshot */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  1200+ Crochet Patterns
                </h3>

                {/* Price in vibrant red */}
                <div className="text-2xl sm:text-3xl font-black text-[#dc2626] mt-1">
                  Just ₹199
                </div>

                {/* Star rating & Trust Score */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 ml-1">
                    Trust Score <strong className="text-stone-950 font-black">4.9</strong> | <strong className="text-stone-950 font-black">9430</strong> Review
                  </span>
                </div>

                {/* Thin divider line */}
                <div className="w-full border-t border-stone-300 my-4" />

                {/* Checklist with exact icons matching user screenshot */}
                <ul className="space-y-2 text-xs sm:text-sm text-stone-900 font-medium">
                  <li className="flex items-center gap-2 font-bold text-stone-950">
                    <span className="text-base select-none">🧶</span>
                    <span>All in one Crochet Bundle 2026 Edition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base text-emerald-600 select-none font-bold">✅</span>
                    <span>1200+ Crochet Patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base select-none">📁</span>
                    <span>Digital PDF Patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base select-none">💻</span>
                    <span>Instant Download Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base select-none">📘</span>
                    <span>Crochet Mastery Course</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base select-none">🎁</span>
                    <span>6 Free Bonuses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base select-none">♾️</span>
                    <span>Lifetime Access &amp; Updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base select-none">💬</span>
                    <span>24/7 Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base select-none">🔥</span>
                    <span className="font-bold text-[#b91c1c]">Limited-Time Offer!</span>
                  </li>
                </ul>
              </div>

              {/* Countdown Timer Blocks matching screenshot */}
              <div className="mt-6">
                <div className="flex items-center justify-start gap-3">
                  {/* Hours */}
                  <div className="w-18 sm:w-20 py-2 bg-[#20b2aa] text-white rounded-xl flex flex-col items-center justify-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black leading-tight">
                      {format2(timeLeft.hours)}
                    </span>
                    <span className="text-[11px] font-bold">
                      Hours
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="w-18 sm:w-20 py-2 bg-[#20b2aa] text-white rounded-xl flex flex-col items-center justify-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black leading-tight">
                      {format2(timeLeft.minutes)}
                    </span>
                    <span className="text-[11px] font-bold">
                      Minutes
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="w-18 sm:w-20 py-2 bg-[#20b2aa] text-white rounded-xl flex flex-col items-center justify-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black leading-tight">
                      {format2(timeLeft.seconds)}
                    </span>
                    <span className="text-[11px] font-bold">
                      Seconds
                    </span>
                  </div>
                </div>

                {/* Primary CTA Button: 🛒 GET THIS FULL BUNDLE matching screenshot */}
                <a
                  href={BUY_NOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onOpenCheckout}
                  className="w-full mt-5 bg-gradient-to-r from-[#20b2aa] to-[#0ea5e9] hover:from-[#1aa099] hover:to-[#0284c7] active:from-[#158983] active:to-[#0369a1] text-white font-black text-base sm:text-lg py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wide no-underline"
                >
                  <ShoppingCart className="w-5 h-5 fill-white text-white" />
                  <span>GET THIS FULL BUNDLE</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* High-res Book Cover Zoom Modal */}
      {zoomedBook && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setZoomedBook(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedBook(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="bg-stone-100 p-4 sm:p-6 flex items-center justify-center">
              <img 
                src={zoomedBook.url} 
                alt={zoomedBook.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-md bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-teal-400 font-bold">
                  {zoomedBook.tag} • {zoomedBook.count}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {zoomedBook.title}
                </h4>
                <p className="text-xs text-stone-400">
                  {zoomedBook.category}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full shrink-0">
                Included in ₹199 Bundle
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
