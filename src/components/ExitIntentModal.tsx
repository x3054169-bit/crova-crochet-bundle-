import { useState, useEffect, useCallback, useRef, type MouseEvent } from 'react';
import { X, Sparkles, Copy, Check, Clock, ShieldCheck, ArrowRight, Tag, Gift, Download } from 'lucide-react';
import { OFFER_2200_CONFIG } from '../data/offer2200';

interface ExitIntentModalProps {
  discountCode?: string;
  discountPercent?: number;
  originalPrice?: number;
  discountedPrice?: number;
  checkoutUrl?: string;
  onOpenCheckout?: (customUrl?: string, customValue?: number, coupon?: string) => void;
}

const STORAGE_SHOWN_KEY = 'crova_exit_intent_shown_v2';
const STORAGE_DISMISSED_KEY = 'crova_exit_intent_dismissed_v2';

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
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const maxScrollDepth = useRef<number>(0);
  const historyPushed = useRef<boolean>(false);
  const triggeredRef = useRef<boolean>(false);

  // Construct target checkout URL with coupon query parameter
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

    // 2. Desktop Mouseleave and rapid upward mouse movement detection
    const handleMouseLeave = (e: globalThis.MouseEvent) => {
      if (!isEligible) return;
      if (e.clientY <= 20) {
        triggerModal();
      }
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isEligible) return;
      // If cursor is within top 12px of viewport
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
          window.history.pushState({ crova_view: 'crochet_patterns' }, '', window.location.href);
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
        // Re-push so forward/back stays inside the page
        try {
          window.history.pushState({ crova_view: 'crochet_patterns' }, '', window.location.href);
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

    // 5. Inactivity fallback trigger: if user stays on page for 45s without taking action
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

  // Countdown timer for urgency
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

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
    // Automatically copy discount code to clipboard for seamless checkout
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

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      {/* Floating Re-openable Coupon Pill (shows when modal has been closed/dismissed) */}
      {showFloatingPill && !isOpen && (
        <aside
          aria-label="Exclusive Discount Offer"
          className="fixed bottom-20 left-3 sm:bottom-6 sm:left-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <button
            type="button"
            onClick={handleReopen}
            className="group flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-[#ea580c] to-amber-600 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl hover:shadow-orange-500/40 border-2 border-amber-200 active:scale-95 transition-all cursor-pointer font-bold text-xs sm:text-sm tracking-wide"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white animate-pulse">
              <Gift className="w-3.5 h-3.5 text-amber-100" />
            </span>
            <span className="flex items-center gap-1.5">
              <span>Claim Extra 10% OFF</span>
              <span className="bg-white text-[#ea580c] px-2 py-0.5 rounded-md font-mono font-black text-xs">
                ₹{discountedPrice}
              </span>
            </span>
          </button>
        </aside>
      )}

      {/* Main Exit Intent Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Exclusive 10% Exit Discount Offer"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden transform animate-in zoom-in-95 duration-200 text-center"
          >
            {/* Urgency Ribbon Header */}
            <div className="bg-gradient-to-r from-red-600 via-[#ea580c] to-amber-600 text-white px-4 py-2.5 sm:py-3 flex items-center justify-center gap-2 relative">
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300 animate-spin" />
                Wait! Special Exit Privilege
                <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300 animate-spin" />
              </span>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close discount popup"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white hover:bg-black/20 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-2.5">
                <Tag className="w-3.5 h-3.5" />
                <span>10% Extra Off Voucher Code</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight mb-2 font-sans">
                Take An Extra{' '}
                <span className="text-[#ea580c] underline decoration-[#ea580c]/30 decoration-4">
                  {discountPercent}% OFF
                </span>{' '}
                Right Now!
              </h3>

              <p className="text-stone-600 text-sm sm:text-base font-medium max-w-md mx-auto mb-4">
                We don’t want price to hold you back. Get the complete 2,200+ Pattern Mega Library for just{' '}
                <strong className="text-stone-950 font-black text-lg sm:text-xl">
                  ₹{discountedPrice}
                </strong>{' '}
                <span className="text-stone-400 line-through text-sm">
                  ₹{originalPrice}
                </span>{' '}
                <span className="text-stone-400 line-through text-xs hidden sm:inline">
                  (₹2,499)
                </span>
                .
              </p>

              {/* Coupon Code Voucher Ticket Box */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50/80 border-2 border-dashed border-amber-400 rounded-2xl p-4 mb-4 shadow-xs">
                <div className="flex items-center justify-between flex-wrap gap-2.5">
                  <div className="text-left">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Voucher Code:
                    </span>
                    <span className="text-2xl font-black font-mono tracking-widest text-[#ea580c]">
                      {discountCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                      hasCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300'
                    }`}
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Micro Benefits in Coupon Box */}
                <div className="mt-3 pt-2.5 border-t border-amber-200/80 grid grid-cols-2 gap-2 text-left text-xs text-stone-700">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>All 2,200+ Patterns Included</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>6 Free Exclusive Bonuses</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Video Tutorials Included</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Instant Lifetime Access</span>
                  </div>
                </div>

                {/* Timer countdown line */}
                <div className="mt-3 pt-2 border-t border-amber-200/80 flex items-center justify-center gap-1.5 text-xs text-amber-900 font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>Coupon reserved for next: </span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-300 text-[#ea580c] font-black">
                    {formattedTime}
                  </span>
                </div>
              </div>

              {/* Main Action Claim CTA */}
              <button
                type="button"
                onClick={handleClaim}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white text-base sm:text-lg font-black py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
              >
                <span>Claim 10% Discount @ ₹{discountedPrice}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Dismiss Option */}
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 text-xs sm:text-sm text-stone-400 hover:text-stone-600 font-semibold underline underline-offset-4 transition-colors cursor-pointer"
              >
                No thanks, I will pay ₹{originalPrice} later
              </button>

              {/* Trust Guarantees */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center flex-wrap gap-x-4 gap-y-1 text-[11px] text-stone-500 font-semibold">
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  Instant Google Drive Access
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  UPI, Cards &amp; NetBanking
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
