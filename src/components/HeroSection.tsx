import { Star, Zap } from 'lucide-react';
import { BUY_NOW_URL } from '../data/bundleData';

interface HeroSectionProps {
  onOpenCheckout: () => void;
  onOpenPreview: () => void;
}

export function HeroSection({ onOpenCheckout, onOpenPreview }: HeroSectionProps) {
  return (
    <section className="pt-2 sm:pt-4 pb-4 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* 1. Orange-Red Uppercase Eyebrow from Screenshot 1 */}
      <div className="mb-2">
        <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#ff5500]">
          CROCHET MAKING COURSE AND 1200+ CROCHET PATTERNS BUNDLE
        </span>
      </div>

      {/* 2. Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-[44px] font-black text-stone-900 tracking-tight leading-tight max-w-3xl mx-auto mb-4 font-sans">
        The Ultimate Premium Crochet Bundle!
      </h1>

      {/* 3. Dashed Border Social Proof Box from Screenshot 1 */}
      <div className="inline-block mb-6 sm:mb-8 w-full max-w-2xl">
        <div className="border-2 border-dashed border-stone-400/90 rounded-md py-2 px-6 sm:px-10 bg-transparent">
          <span className="text-sm sm:text-lg font-bold text-[#ff5500] tracking-wide">
            Loved by 15,000+ Crafters!
          </span>
        </div>
      </div>

      {/* 4. Warm Peach Hero Offer Card Box matching Screenshot 1 */}
      <div className="bg-[#fff8f2] rounded-2xl border border-stone-200/90 shadow-lg p-5 sm:p-8 md:p-10 max-w-4xl mx-auto text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left Column: Woven Basket with Yarn Balls, Hooks & 3D Book */}
          <div className="md:col-span-6 flex flex-col items-center justify-center py-2">
            <div className="relative w-full group transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center">
              <img
                src="https://i.ibb.co/TqWK8z20/Chat-GPT-Image-Sep-16-2026-12-04-10-PM-50.png"
                alt="CROVA Crochet Bundle - 1200+ Patterns and Video Course"
                className="w-full max-w-[380px] sm:max-w-[430px] md:max-w-[460px] h-auto object-contain drop-shadow-xl select-none"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  const localFallback = '/assets/hero-front.png';
                  if (target.src !== localFallback && !target.src.endsWith(localFallback)) {
                    target.src = localFallback;
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column: Pricing, Trustscore, Bullets, Large CTA */}
          <div className="md:col-span-6 flex flex-col justify-center">
            {/* Price block: Rs. 199.00 Rs. 3999.00/- */}
            <div className="flex flex-wrap items-baseline gap-2.5 mb-2">
              <span className="text-3xl sm:text-4xl font-black text-[#b91c1c] tracking-tight">
                Rs. 199.00
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#475569] line-through decoration-[#475569] decoration-2">
                Rs. 3999.00/-
              </span>
            </div>

            {/* Rating and Trustscore in deep red */}
            <div className="flex items-center gap-1.5 mb-5 pb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#991b1b]">
                Trustscore 4.9 | 8,540 reviews
              </span>
            </div>

            {/* Benefit Bullets matching Screenshot 1 */}
            <ul className="space-y-1.5 mb-6 text-sm sm:text-base text-stone-800 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0" />
                <span>1200+ Crochet Patterns</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0" />
                <span>Easy to Understand</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0" />
                <span>Crochet Mastery Course</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0" />
                <span>06 Amazing bonuses</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0" />
                <span>Lifetime Access &amp; Update</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0" />
                <span>Free customer support</span>
              </li>
            </ul>

            {/* Primary Orange-Red CTA Button from Screenshot 1 */}
            <a
              href={BUY_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onOpenCheckout}
              className="w-full bg-[#f95721] hover:bg-[#e04511] active:bg-[#c93b0b] text-white text-xl sm:text-2xl font-black py-4 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group no-underline"
            >
              <Zap className="w-7 h-7 fill-white text-white group-hover:scale-110 transition-transform" />
              <span>Get Everything at ₹199</span>
            </a>
          </div>
        </div>
      </div>

      {/* 5. Exact Black Callout Pill from Screenshot 1 */}
      <div className="mt-8 mb-6">
        <div className="inline-block bg-[#161616] text-white text-xs sm:text-sm px-6 py-2.5 rounded-md shadow-md">
          <span className="font-extrabold">Note:</span> This is not a Physical Material. It is a digital product.
        </div>
      </div>
    </section>
  );
}
