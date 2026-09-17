import { useState } from 'react';
import { PATTERN_CATEGORIES } from '../data/bundleData';
import { PatternCategory } from '../types';
import { ZoomIn, X } from 'lucide-react';
import { YarnFrame } from './YarnFrame';

export function PatternCategories() {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; tag: string } | null>(null);

  const firstSixCategories = PATTERN_CATEGORIES.slice(0, 6);
  const holidayCategory = PATTERN_CATEGORIES[6]; // 100 Holidays & Festivals Patterns

  return (
    <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Red & Dark Section Title matching Screenshot 1 */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
          <span className="text-[#d32f2f]">Included in the </span>
          <span className="text-stone-950 font-black">1200+ Crochet Patterns</span>
        </h2>
      </div>

      {/* Grid of the first 6 Categories with alternating Image & Text layout matching Screenshot 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {firstSixCategories.map((category, index) => {
          // Alternating pattern from Screenshot 1:
          // Row 0: index 0 (Home Decor): Text Left, Image Right | index 1 (Stuffed Toys): Image Left, Text Right
          // Row 1: index 2 (Superheroes): Image Left, Text Right | index 3 (Baby): Text Left, Image Right
          // Row 2: index 4 (Zoo): Text Left, Image Right | index 5 (Cartoon): Image Left, Text Right
          const isImageLeft = index === 1 || index === 2 || index === 5;

          return (
            <CategoryCard
              key={category.id}
              category={category}
              isImageLeft={isImageLeft}
              onZoomImage={setSelectedImage}
            />
          );
        })}
      </div>

      {/* 7th Category: Full width centered card for Holidays & Festivals matching Screenshot 2 */}
      {holidayCategory && (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
            {/* Title on the left */}
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-black text-[#f95721] tracking-tight">
                {holidayCategory.title}
              </h3>
            </div>

            {/* Centered Image with Yarn Doodle Frame */}
            <div 
              className="w-full md:w-auto flex justify-center cursor-pointer group shrink-0"
              onClick={() => setSelectedImage(holidayCategory.sampleImages[0])}
            >
              <div className="w-48 sm:w-56">
                <YarnFrame>
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={holidayCategory.sampleImages[0].url}
                      alt={holidayCategory.sampleImages[0].title}
                      className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ZoomIn className="w-5 h-5 drop-shadow-md" />
                    </div>
                  </div>
                </YarnFrame>
              </div>
            </div>

            {/* Bullets on the right */}
            <div className="w-full md:w-1/2">
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-normal leading-relaxed">
                {holidayCategory.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-stone-400 mt-0.5 text-base leading-none">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-contain bg-white"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                  {selectedImage.tag}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {selectedImage.title}
                </h4>
              </div>
              <span className="text-xs text-stone-400 bg-stone-800 px-2.5 py-1 rounded">
                Included in ₹199 Pack
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CategoryCard({ 
  category, 
  isImageLeft,
  onZoomImage 
}: { 
  category: PatternCategory; 
  isImageLeft: boolean;
  onZoomImage: (img: { url: string; title: string; tag: string }) => void;
  key?: string | number;
}) {
  const featuredImage = category.sampleImages[0];

  const textBlock = (
    <div className="flex-1 flex flex-col justify-center">
      {/* Orange Category Title matching Screenshot */}
      <h3 className="text-base sm:text-lg md:text-xl font-black text-[#f95721] mb-3 tracking-tight">
        {category.title}
      </h3>

      {/* Bullet points with circular dots */}
      <ul className="space-y-2 text-xs sm:text-sm text-stone-700 font-normal leading-relaxed">
        {category.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-stone-400 mt-0.5 text-base leading-none">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageBlock = (
    <div 
      className="cursor-pointer w-36 sm:w-44 shrink-0 mx-auto group"
      onClick={() => onZoomImage(featuredImage)}
    >
      <YarnFrame>
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          <img
            src={featuredImage.url}
            alt={featuredImage.title}
            className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
            <ZoomIn className="w-5 h-5 drop-shadow-md" />
          </div>
        </div>
      </YarnFrame>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 transition-all h-full">
      {isImageLeft ? (
        <>
          <div className="order-2 sm:order-1">{imageBlock}</div>
          <div className="order-1 sm:order-2 flex-1">{textBlock}</div>
        </>
      ) : (
        <>
          <div className="order-1 flex-1">{textBlock}</div>
          <div className="order-2">{imageBlock}</div>
        </>
      )}
    </div>
  );
}
