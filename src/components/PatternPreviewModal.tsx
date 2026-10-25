import { useState, useEffect } from 'react';
import { X, Check, Download, BookOpen, Video, ShieldCheck, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { OFFER_2200_CONFIG } from '../data/offer2200';

interface PatternPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export function PatternPreviewModal({ isOpen, onClose, onOpenCheckout }: PatternPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'sample' | 'checklist' | 'video'>('sample');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sample Pattern & Video Guide Preview"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] text-left animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-orange-600/30 text-[#ea580c]">
              <Eye className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Sample Pattern &amp; Guide Preview
              </h3>
              <p className="text-[11px] text-stone-400">
                Inspect the high-resolution format included across all 2,200+ patterns
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2.5 gap-2 text-xs sm:text-sm font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('sample')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sample'
                ? 'border-[#ea580c] text-[#ea580c]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>PDF Layout Sample</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'checklist'
                ? 'border-[#ea580c] text-[#ea580c]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>What&apos;s Inside Every Pattern</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'video'
                ? 'border-[#ea580c] text-[#ea580c]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Tutorial Modules</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-stone-800 text-sm">
          {activeTab === 'sample' && (
            <div className="space-y-4">
              <div className="bg-[#faf7f2] border border-amber-200/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-amber-100 text-amber-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Pattern Sample #042
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    Beginner to Intermediate Friendly
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-stone-900">
                  Sweet Dream Amigurumi Bunny &amp; Bonnet
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Format: High-Definition Print-Ready PDF with row-by-row stitch counters, color swatches, and assembly guides.
                </p>
              </div>

              {/* Sample PDF Sheet Preview Mockup */}
              <div className="border border-stone-200 rounded-2xl p-4 bg-white shadow-xs space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2 font-sans font-bold text-stone-700">
                  <span>Materials &amp; Gauge:</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    Standard DK / 3.0mm Hook
                  </span>
                </div>
                <div className="space-y-1.5 text-stone-700">
                  <p><span className="text-[#ea580c] font-bold">Rnd 1:</span> 6 sc in magic ring [6 sts]</p>
                  <p><span className="text-[#ea580c] font-bold">Rnd 2:</span> 2 sc in each st around [12 sts]</p>
                  <p><span className="text-[#ea580c] font-bold">Rnd 3:</span> *1 sc in next st, 2 sc in next st* rep 6 times [18 sts]</p>
                  <p><span className="text-[#ea580c] font-bold">Rnd 4-8:</span> Sc in each st around with visual photo checkpoints [18 sts]</p>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 font-sans text-xs text-stone-600">
                  💡 <em>Includes both US &amp; UK crochet terminology abbreviations chart + Hindi/English subtitles guide.</em>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
                Every Single One of the 2,200+ Patterns Includes:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2 bg-[#fcfaf7] p-3 rounded-xl border border-stone-200/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="block text-stone-900">Step-by-Step Stitch Count</strong>
                    <span className="text-stone-600 text-xs">Clear row-by-row instructions so you never lose count.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#fcfaf7] p-3 rounded-xl border border-stone-200/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="block text-stone-900">HD Color Photo Checkpoints</strong>
                    <span className="text-stone-600 text-xs">High-res photos showing each step and assembly.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#fcfaf7] p-3 rounded-xl border border-stone-200/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="block text-stone-900">Yarn &amp; Hook Sizing Chart</strong>
                    <span className="text-stone-600 text-xs">Exact gram weights and recommended hook sizes.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#fcfaf7] p-3 rounded-xl border border-stone-200/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <strong className="block text-stone-900">Commercial Resell License</strong>
                    <span className="text-stone-600 text-xs">Sell the physical items you make at craft fairs or online.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
                Included Video Tutorial Series (Hindi + English)
              </h4>
              <p className="text-xs text-stone-600">
                Stuck on a tricky stitch? Simply click the direct video links inside the bundle to watch slow-motion demonstrations.
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800">Module 1: Basic Stitches (Slip knot, Chain, Single, Double)</span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Beginner</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800">Module 2: Magic Ring &amp; Amigurumi Shaping</span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">All Levels</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800">Module 3: Invisible Decreases &amp; Color Switching</span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Pro Tips</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800">Module 4: Professional Blocking &amp; Assembling</span>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Finishing</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with High-Conversion Action Button */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="text-xs text-stone-500 font-semibold block">Total Package Value: ₹2,999</span>
              <span className="text-lg font-black text-stone-900">Special Launch Price: <span className="text-[#ea580c]">₹199</span></span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full sm:w-auto bg-[#ea580c] text-white font-extrabold py-3 px-6 rounded-xl text-sm sm:text-base tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer no-underline btn-high-converting min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>Get Instant Access to All 2,200+ Patterns</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
