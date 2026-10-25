import { useState, useEffect, useCallback, useRef, type MouseEvent } from 'react';
import { X, Copy, Check, ShieldCheck, Download, Gift, Sparkles } from 'lucide-react';
import { OFFER_2200_CONFIG } from '../data/offer2200';

interface ExitIntentModalProps {
  discountCode?: string;
  discountPercent?: number;
  originalPrice?: number;
  discountedPrice?: number;
  checkoutUrl?: string;
  onOpenCheckout?: (customUrl?: string, customValue?: number, coupon?: string) => void;
}

const STORAGE_SHOWN_KEY = 'crova_exit_intent_shown_v3';
const STORAGE_DISMISSED_KEY = 'crova_exit_intent_dismissed_v3';

export function ExitIntentModal({
  discountCode = 'SAVE10',
  discountPercent = 10,
  originalPrice = 199,
  discountedPrice = 179,
  checkoutUrl = OFFER_2200_CONFIG.checkoutUrl,
  onOpenCheckout,
}: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const maxScrollDepth = useRef<number>(0);
  const historyPushed = useRef<boolean>(false);
  const triggeredRef = useRef<boolean>(false);

  // Target checkout URL with auto-applied coupon parameters
  const couponCheckoutUrl = checkoutUrl.includes('?') 
    ? `${checkoutUrl}&coupon=${discountCode}&code=${discountCode}`
    : `${checkoutUrl}?coupon=${discountCode}&code=${discountCode}`;

  const triggerModal = useCallback(() => {
    if (triggeredRef.current || isOpen) return;
    triggeredRef.current = true;
    setIsOpen(true);
    setShowFloatingPill(false);
    try {
      sessionStorage.setItem(STORAGE_SHOWN_KEY, 'true');
    } catch {
      // Storage unavailable
    }
  }, [isOpen]);

  // Check initial storage and setup listeners
  useEffect(() => {
    let alreadyShown = false;
    let alreadyDismissed = false;

    try {
      alreadyShown = sessionStorage.getItem(STORAGE_SHOWN_KEY) === 'true';
      alreadyDismissed = sessionStorage.getItem(STORAGE_DISMISSED_KEY) === 'true';
    } catch {
      // Storage unavailable
    }

    if (alreadyDismissed || alreadyShown) {
      triggeredRef.current = true;
      setShowFloatingPill(true);
      return;
    }

    // 1. Engagement delay (1.5 seconds)
    let isEligible = false;
    const eligibilityTimer = setTimeout(() => {
      isEligible = true;
    }, 1500);

    // 2. Desktop mouseleave and rapid upward mouse movement detection
    const handleMouseLeave = (e: globalThis.MouseEvent) => {
      if (!isEligible) return;
      if (e.clientY <= 20) {
        triggerModal();
      }
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isEligible) return;
      if (e.clientY <= 12) {
        triggerModal();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    // 3. Mobile Back-Button Exit Intercept via History API
    const setupHistoryInterceptor = () => {
      try {
        if (!historyPushed.current && window.history && window.history.pushState) {
          window.history.pushState({ crova_view: 'crochet_checkout_intent' }, '', window.location.href);
          historyPushed.current = true;
        }
      } catch {
        // History not available
      }
    };

    const historyTimer = setTimeout(setupHistoryInterceptor, 1200);

    const handlePopState = () => {
      if (isEligible && !triggeredRef.current) {
        triggerModal();
        try {
          window.history.pushState({ crova_view: 'crochet_checkout_intent' }, '', window.location.href);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // 4. Scroll depth and rapid scroll-up detection (common mobile exit gesture)
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const currentPercentage = (scrollPos / docHeight) * 100;
        if (currentPercentage > maxScrollDepth.current) {
          maxScrollDepth.current = currentPercentage;
        }

        // If user scrolled down past 35% of page, and then rapidly scrolled back to top
        if (isEligible && maxScrollDepth.current > 35 && scrollPos < 80) {
          triggerModal();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 5. Inactivity fallback trigger: 45s
    const idleTimer = setTimeout(() => {
      if (isEligible && !triggeredRef.current) {
        triggerModal();
      }
    }, 45000);

    return () => {
      clearTimeout(eligibilityTimer);
      clearTimeout(historyTimer);
      clearTimeout(idleTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerModal]);

  // Handle ESC key to close and lock body scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleCopyCode = useCallback(async (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(discountCode);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 3000);
    } catch {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 3000);
    }
  }, [discountCode]);

  const handleClaim = () => {
    // Auto-copy discount code to clipboard for seamless checkout paste
    try {
      navigator.clipboard.writeText(discountCode);
    } catch {
      // ignore
    }

    // Push GTM dataLayer event
    try {
      if (typeof window !== 'undefined') {
        const win = window as unknown as { 
          dataLayer?: Record<string, unknown>[]; 
          fbq?: (...args: unknown[]) => void 
        };
        if (win.dataLayer) {
          win.dataLayer.push({
            event: 'InitiateCheckout',
            content_id: OFFER_2200_CONFIG.contentId,
            content_name: `${OFFER_2200_CONFIG.contentName} (Exit Intent 10% OFF)`,
            currency: 'INR',
            value: discountedPrice,
            coupon: discountCode,
            discount_percent: discountPercent,
          });
        }
        if (win.fbq) {
          win.fbq('track', 'InitiateCheckout', {
            content_id: OFFER_2200_CONFIG.contentId,
            content_name: `${OFFER_2200_CONFIG.contentName} (Exit Intent 10% OFF)`,
            currency: 'INR',
            value: discountedPrice,
          });
        }
      }
    } catch {
      // Ignore analytics tracking errors
    }

    setIsOpen(false);
    if (onOpenCheckout) {
      onOpenCheckout(couponCheckoutUrl, discountedPrice, discountCode);
    } else {
      window.location.href = couponCheckoutUrl;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowFloatingPill(true);
    try {
      sessionStorage.setItem(STORAGE_DISMISSED_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const handleReopen = () => {
    setIsOpen(true);
    setShowFloatingPill(false);
  };

  return (
    <>
      {/* Floating Reopen Pill (appears if modal is closed, allowing user to retrieve their 10% coupon) */}
      {showFloatingPill && !isOpen && (
        <aside
          aria-label="Exclusive 10% Discount Offer"
          className="fixed bottom-24 left-3 sm:bottom-6 sm:left-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <button
            type="button"
            onClick={handleReopen}
            className="group flex items-center gap-2 bg-[#1c1917] hover:bg-stone-900 text-white pl-3 pr-3.5 py-2.5 rounded-full shadow-2xl border border-amber-300/80 active:scale-95 transition-all cursor-pointer font-bold text-xs sm:text-sm tracking-wide"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-white">
              <Gift className="w-3.5 h-3.5 text-amber-100" />
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-stone-200">Reserved:</span>
              <span className="text-amber-400 font-mono font-black">{discountCode}</span>
              <span className="bg-[#ea580c] text-white px-1.5 py-0.5 rounded font-black text-[11px]">
                ₹{discountedPrice}
              </span>
            </span>
          </button>
        </aside>
      )}

      {/* Main Emotionally Persuasive Checkout Retention Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Exclusive 10% Checkout Retention Offer"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] bg-[#fdfbf7] rounded-3xl shadow-2xl border border-amber-200/90 overflow-hidden transform animate-in zoom-in-95 duration-200 text-center"
          >
            {/* TOP BAR */}
            <div className="bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#c2410c] text-white px-4 py-2.5 sm:py-3 flex items-center justify-center relative">
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase flex items-center gap-1 text-amber-100 font-sans">
                ✨ WAIT — BEFORE YOU GO ✨
              </span>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close retention popup"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white hover:bg-black/20 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7">
              {/* MAIN HEADLINE */}
              <h3 className="text-2xl sm:text-[27px] font-black text-stone-900 leading-tight mb-2.5 font-sans tracking-tight">
                You’re Really Going to{' '}
                <span className="text-[#ea580c] underline decoration-[#ea580c]/30 decoration-3">
                  Leave It Behind?
                </span>
              </h3>

              {/* SUBHEAD with subtle emotional emphasis */}
              <p className="text-stone-700 text-xs sm:text-[13.5px] leading-relaxed max-w-sm mx-auto mb-4 font-normal">
                You came looking for crochet patterns for a reason.
                <br />
                Don’t let <strong className="text-stone-950 font-black bg-amber-100/90 px-1 py-0.5 rounded text-stone-900">₹20</strong> be the reason you leave without the complete library.
              </p>

              {/* OFFER CALLOUT BOX */}
              <div className="bg-[#fff9f2] border border-amber-200/90 rounded-2xl p-3.5 sm:p-4 mb-3.5 text-left shadow-2xs">
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                  Get 2,200+ Crochet Patterns + 6 Exclusive Bonuses + Video Tutorials today for just{' '}
                  <span className="text-[#ea580c] font-black text-base sm:text-lg">₹{discountedPrice}</span>.
                </p>

                {/* VOUCHER & PRICE TRANSITION */}
                <div className="mt-3 pt-3 border-t border-amber-200/70 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    {/* DISCOUNT LABEL */}
                    <span className="block text-[10px] sm:text-[11px] font-black tracking-wider text-amber-900/90 uppercase font-sans">
                      YOUR 10% OFF IS RESERVED FOR YOU
                    </span>
                    
                    {/* COUPON CODE */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-[#ea580c]">
                        {discountCode}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                          hasCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300'
                        }`}
                      >
                        {hasCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* PRICE TRANSITION: "₹199" crossed out → "₹179" */}
                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 font-bold block uppercase tracking-wider">
                      Price Today
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base text-stone-400 font-bold line-through">
                        ₹{originalPrice}
                      </span>
                      <span className="text-stone-400 text-xs font-bold">→</span>
                      <span className="text-2xl sm:text-3xl font-black text-[#dc2626] font-sans">
                        ₹{discountedPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BENEFITS LIST */}
                <div className="mt-3 pt-3 border-t border-amber-200/70 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>2,200+ Patterns Included</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>6 Exclusive Bonuses</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Video Tutorials Included</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Instant Lifetime Access</span>
                  </div>
                </div>
              </div>

              {/* PRIMARY CTA */}
              <button
                type="button"
                onClick={handleClaim}
                className="w-full bg-[#ea580c] text-white text-base sm:text-[17px] font-black min-h-[50px] py-3 px-5 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer btn-high-converting shadow-lg hover:shadow-orange-500/25 active:scale-[0.99] transition-all"
              >
                <span>CLAIM MY 10% OFF — ₹{discountedPrice} →</span>
              </button>

              {/* SECONDARY EXIT LINK */}
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 text-xs sm:text-[13px] text-stone-400 hover:text-stone-600 font-semibold underline underline-offset-4 transition-colors cursor-pointer block mx-auto"
              >
                No thanks, I’ll pay ₹{originalPrice} later
              </button>

              {/* BOTTOM EMOTIONAL LINE */}
              <p className="mt-4 text-xs text-stone-600 italic font-medium leading-relaxed max-w-sm mx-auto">
                “One small decision today could give you hundreds of ideas to create tomorrow.”
              </p>

              {/* FOOTER */}
              <div className="mt-3.5 pt-3 border-t border-stone-200/70 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-stone-500 font-semibold">
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  Instant Google Drive Access
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  UPI, Cards &amp; Net Banking
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
