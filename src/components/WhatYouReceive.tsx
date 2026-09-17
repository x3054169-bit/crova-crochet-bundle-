import { Zap } from 'lucide-react';
import { BUY_NOW_URL } from '../data/bundleData';

interface WhatYouReceiveProps {
  onOpenCheckout: () => void;
  onOpenPreview?: () => void;
}

export function WhatYouReceive({ onOpenCheckout }: WhatYouReceiveProps) {

  const items = [
    'Crochet Mastery Course in English and Hindi',
    '50 Home Decor Crochet Patterns',
    '150 Stuffed Toys & Dolls Patterns',
    '150 Superheroes Patterns',
    '120 Baby Patterns',
    '200 Zoo Amigurumi Patterns',
    '100 Cartoon Crochet Patterns',
    '100 Holidays & Festivals Patterns',
    '06 Free Bonuses',
  ];

  return (
    <section className="py-6 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* 1. Header matching Screenshot 2: "What Will I Receive" (I Receive in red) */}
      <div className="text-center mb-6">
        <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-normal">
          What Will <span className="text-[#b91c1c]">I Receive</span>
        </h2>
      </div>

      {/* 2. Main Content Card Box from Screenshot 2 */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xl p-6 sm:p-8 md:p-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Detailed Items List & Orange Buy Now Button */}
          <div className="md:col-span-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 mb-5 tracking-tight">
                Included in the Crochet Bundle
              </h3>

              <ul className="space-y-3.5 mb-8 text-sm sm:text-base text-stone-800 font-medium">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Orange CTA Button from Screenshot 2 */}
            <div className="pt-2 w-full">
              <a
                href={BUY_NOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onOpenCheckout}
                className="w-full bg-[#f95721] hover:bg-[#e04511] active:bg-[#c93b0b] text-white text-xl sm:text-2xl font-black py-4 px-8 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group no-underline"
              >
                <Zap className="w-7 h-7 fill-white text-white group-hover:scale-110 transition-transform" />
                <span>Buy Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded YouTube Shorts Video Player with Big Vertical Frame */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[360px] sm:max-w-[390px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-900 bg-black relative ring-1 ring-stone-900/10">
              <iframe
                title="YouTube Shorts video player"
                src="https://www.youtube.com/embed/jOistNqzuao?rel=0&modestbranding=1&playsinline=1"
                className="w-full h-full"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-stone-500 font-semibold mt-3.5 flex items-center gap-1.5 text-center">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Watch Course Quick Reel • Dual Audio (English &amp; Hindi)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
