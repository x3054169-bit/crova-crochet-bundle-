import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Check, Zap } from 'lucide-react';
import { BOOK_SAMPLE_PAGES, BUY_NOW_URL } from '../data/bundleData';

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export function BookPreviewModal({ isOpen, onClose, onOpenCheckout }: BookPreviewModalProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (!isOpen) return null;

  const page = BOOK_SAMPLE_PAGES[currentPageIndex];
  const totalPages = BOOK_SAMPLE_PAGES.length;

  const next = () => setCurrentPageIndex((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
  const prev = () => setCurrentPageIndex((prev) => (prev - 1 >= 0 ? prev - 1 : totalPages - 1));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
      <div className="bg-[#fcfaf7] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-stone-300">
        {/* Header */}
        <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold">Crova Crochet Guide — Free Look Inside Sample</span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Page Viewer Simulation */}
        <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
          <div>
            {/* Top Page Header */}
            <div className="flex items-center justify-between text-xs text-stone-700 pb-3 border-b border-stone-200 mb-4">
              <span className="uppercase font-semibold tracking-wider text-amber-700 font-serif">
                {page.chapter}
              </span>
              <span className="font-mono">
                Sample Page {page.pageNumber} of {totalPages}
              </span>
            </div>

            {/* Page Title & Subtitle */}
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mb-1 leading-snug font-serif">
              {page.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 font-medium mb-4 italic">
              {page.subtitle}
            </p>

            {/* Visual Mini Diagram Box */}
            <div className="my-4 p-4 rounded-xl bg-amber-500/5 border border-amber-200/80">
              <div className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line font-sans">
                {page.content}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 mt-4">
              <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                Key Takeaways:
              </span>
              <div className="flex flex-wrap gap-2">
                {page.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-white border border-stone-200 text-stone-700 px-2.5 py-1 rounded-full shadow-2xs font-medium"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>
              <button
                onClick={next}
                className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 cursor-pointer shadow-2xs"
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={BUY_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="bg-[#f95721] hover:bg-[#e04511] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow-md inline-flex items-center gap-1.5 cursor-pointer no-underline"
            >
              <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>Get Full Book &amp; 1200+ Patterns @ ₹199</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
