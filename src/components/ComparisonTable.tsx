import { Check, X, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { OFFER_2200_CONFIG } from '../data/offer2200';

interface ComparisonFeature {
  name: string;
  description?: string;
  crova: {
    text: string;
    highlight?: boolean;
    available: boolean;
  };
  competitors: {
    text: string;
    available: boolean;
  };
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    name: 'Total Patterns Library',
    description: 'Volume and diversity of designs',
    crova: {
      text: '2,200+ Complete Patterns (Amigurumi, Blankets, Bags, Toys, Festive & More)',
      highlight: true,
      available: true,
    },
    competitors: {
      text: 'Only 15–50 random patterns (often sold separately)',
      available: false,
    },
  },
  {
    name: 'Video Tutorials & Masterclass',
    description: 'Visual step-by-step guidance',
    crova: {
      text: 'Full HD Video Tutorials + Stitch Guides included for all skill levels',
      highlight: true,
      available: true,
    },
    competitors: {
      text: 'Text-only or confusing abbreviations with no video support',
      available: false,
    },
  },
  {
    name: 'Access Duration & Updates',
    description: 'Longevity of download links',
    crova: {
      text: 'Lifetime Access + Free Future Updates & Unlimited Re-downloads',
      highlight: true,
      available: true,
    },
    competitors: {
      text: 'Expiring links (24–48 hrs) or monthly recurring subscription',
      available: false,
    },
  },
  {
    name: 'Skill Level Progression',
    description: 'From day 1 stitches to advanced',
    crova: {
      text: 'Complete Beginner to Pro roadmap with stitch chart glossary',
      highlight: false,
      available: true,
    },
    competitors: {
      text: 'Mostly advanced patterns with no beginner assistance',
      available: false,
    },
  },
  {
    name: 'Format & Print Quality',
    description: 'Clarity of pattern files',
    crova: {
      text: 'Crystal-clear High-Res vector PDFs formatted for tablets, phones & print',
      highlight: false,
      available: true,
    },
    competitors: {
      text: 'Low-res scans, messy watermarks, or difficult-to-read screenshots',
      available: false,
    },
  },
  {
    name: 'Free Bonus Pack',
    description: 'Extra resources included',
    crova: {
      text: '6 Premium Bonuses worth ₹3,999 (Yarn Calculator, Selling Guide, Charts)',
      highlight: true,
      available: true,
    },
    competitors: {
      text: 'Zero bonuses or costly add-on charges',
      available: false,
    },
  },
  {
    name: 'Customer Support',
    description: 'Help when you get stuck',
    crova: {
      text: 'Dedicated 24/7 WhatsApp & Email VIP assistance',
      highlight: false,
      available: true,
    },
    competitors: {
      text: 'No support or unresponsive automated forms',
      available: false,
    },
  },
  {
    name: 'Effective Pricing',
    description: 'Cost per pattern value',
    crova: {
      text: 'Just ₹199 One-Time (Less than 9 paise per pattern!)',
      highlight: true,
      available: true,
    },
    competitors: {
      text: '₹2,500 – ₹5,000+ or ₹499/mo ongoing fee',
      available: false,
    },
  },
];

interface ComparisonTableProps {
  onOpenCheckout?: () => void;
  checkoutUrl?: string;
  className?: string;
}

export function ComparisonTable({
  onOpenCheckout,
  checkoutUrl = OFFER_2200_CONFIG.checkoutUrl,
  className = '',
}: ComparisonTableProps) {
  return (
    <section className={`w-full my-10 sm:my-14 ${className}`} aria-labelledby="comparison-heading">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>UNBEATABLE VALUE COMPARISON</span>
        </div>
        <h3 id="comparison-heading" className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-sans">
          Crova vs Other Crochet Patterns
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-lg mx-auto">
          See why over 14,000+ crafters choose Crova over overpriced and incomplete single-pattern sellers.
        </p>
      </div>

      {/* Comparison Container */}
      <div className="bg-white rounded-3xl border-2 border-stone-200/90 shadow-lg overflow-hidden max-w-4xl mx-auto">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-stone-900 text-white border-b border-stone-800">
          <div className="col-span-4 sm:col-span-5 p-3 sm:p-5 flex items-center">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-300">
              Feature / Benefit
            </span>
          </div>

          {/* Crova Column Header (Highlighted) */}
          <div className="col-span-4 sm:col-span-4 p-3 sm:p-5 bg-gradient-to-b from-[#ea580c] to-[#c2410c] text-center relative shadow-md">
            <div className="inline-block bg-amber-300 text-stone-950 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 shadow-2xs">
              ★ BEST VALUE
            </div>
            <div className="text-sm sm:text-lg font-black tracking-tight text-white leading-tight">
              Crova Bundle
            </div>
            <div className="text-[10px] sm:text-xs text-amber-100 font-bold mt-0.5">
              2200+ Patterns @ ₹199
            </div>
          </div>

          {/* Competitors Header */}
          <div className="col-span-4 sm:col-span-3 p-3 sm:p-5 bg-stone-800 text-center flex flex-col justify-center">
            <div className="text-xs sm:text-sm font-bold text-stone-300 leading-tight">
              Other Patterns
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              Individual & Etsy Sellers
            </div>
          </div>
        </div>

        {/* Feature Rows */}
        <div className="divide-y divide-stone-100">
          {COMPARISON_FEATURES.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={feature.name}
                className={`grid grid-cols-12 items-center transition-colors ${
                  isEven ? 'bg-white' : 'bg-[#faf8f5]/60'
                }`}
              >
                {/* Feature Name & Description */}
                <div className="col-span-4 sm:col-span-5 p-3 sm:p-4 pr-1 sm:pr-4">
                  <span className="block font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                    {feature.name}
                  </span>
                  {feature.description && (
                    <span className="hidden sm:block text-[11px] text-stone-500 mt-0.5 font-medium">
                      {feature.description}
                    </span>
                  )}
                </div>

                {/* Crova Column Row */}
                <div className="col-span-4 sm:col-span-4 p-2.5 sm:p-4 bg-amber-50/50 border-x border-amber-200/60 text-center flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="text-[10px] sm:text-xs font-black text-emerald-800 uppercase tracking-wider">
                      Included
                    </span>
                  </div>
                  <p
                    className={`text-[11px] sm:text-xs leading-tight ${
                      feature.crova.highlight
                        ? 'font-extrabold text-[#c2410c]'
                        : 'font-semibold text-stone-800'
                    }`}
                  >
                    {feature.crova.text}
                  </p>
                </div>

                {/* Competitors Column Row */}
                <div className="col-span-4 sm:col-span-3 p-2.5 sm:p-4 text-center flex flex-col items-center justify-center bg-stone-50/40">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase">
                      Missing / Limited
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-stone-500 leading-tight line-through decoration-red-400 decoration-1">
                    {feature.competitors.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout & CTA inside Table */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white text-center border-t border-stone-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                The Verdict Is Clear
              </p>
              <h4 className="text-lg sm:text-xl font-black text-white font-sans mt-0.5">
                Get 2,200+ Patterns, Video Guides &amp; Lifetime Access
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Backed by 100% Satisfaction Guarantee • Instant Download
              </p>
            </div>

            <a
              href={checkoutUrl}
              onClick={onOpenCheckout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.98] text-white font-black py-3 px-6 rounded-xl shadow-lg hover:shadow-orange-500/30 text-sm sm:text-base tracking-wide uppercase transition-all shrink-0 cursor-pointer no-underline"
            >
              <span>Get Crova for ₹199</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
