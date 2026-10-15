import { useState, useEffect, useCallback, type MouseEvent } from 'react';
import { X, Sparkles, Copy, Check, Clock, ShieldCheck, ArrowRight, Tag } from 'lucide-react';
import { OFFER_2200_CONFIG } from '../data/offer2200';

interface ExitIntentModalProps {
  discountCode?: string;
  discountPercent?: number;
  originalPrice?: number;
  discountedPrice?: number;
  checkoutUrl?: string;
  onOpenCheckout?: () => void;
}

const STORAGE_KEY = 'crova_exit_intent_shown';

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

  // Exit intent detection logic
  useEffect(() => {
    // Check if already shown in this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      // storage unavailable
    }

    let isEligible = false;
    // Don't trigger instantly upon page load; require user to engage for at least 5 seconds
    const engagementTimer = setTimeout(() => {
      isEligible = true;
    }, 4500);

    const handleMouseLeave = (e: globalThis.MouseEvent) => {
      if (!isEligible) return;

      // Trigger if cursor moves out near the top of viewport (towards tabs/close button)
      if (e.clientY <= 15 && (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === 'HTML')) {
        setIsOpen(true);
        try {
          sessionStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          // ignore
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(engagementTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Countdown timer for urgency
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
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

  const handleCopyCode = useCallback(async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(discountCode);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      // Fallback
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    }
  }, [discountCode]);

  const handleClaim = () => {
    setIsOpen(false);
    if (onOpenCheckout) {
      onOpenCheckout();
    } else if (checkoutUrl) {
      // If direct checkout URL, redirect (appending coupon if possible)
      window.location.href = checkoutUrl;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Exclusive 10% Discount Coupon"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden transform animate-in zoom-in-95 duration-300 text-center"
      >
        {/* Top Urgency Header Bar */}
        <div className="bg-gradient-to-r from-red-600 via-[#ea580c] to-amber-600 text-white px-4 py-2.5 sm:py-3 flex items-center justify-center gap-2 relative">
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300 animate-spin" />
            Wait! Don&apos;t Miss Out
            <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300 animate-spin" />
          </span>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white hover:bg-black/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>One-Time Exit Privilege</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight mb-2 font-sans">
            Take An Extra{' '}
            <span className="text-[#ea580c] underline decoration-[#ea580c]/40 decoration-4">
              {discountPercent}% OFF
            </span>{' '}
            Today!
          </h3>

          <p className="text-stone-600 text-sm sm:text-base font-medium max-w-md mx-auto mb-4">
            Before you leave, grab the complete Crochet Mastery Bundle for just{' '}
            <strong className="text-stone-950 font-black text-lg">
              ₹{discountedPrice}
            </strong>{' '}
            <span className="text-stone-400 line-through text-sm">
              ₹{originalPrice}
            </span>
            .
          </p>

          {/* Coupon Code Voucher Ticket Box */}
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50/70 border-2 border-dashed border-amber-400 rounded-2xl p-4 mb-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2.5">
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Use Coupon Code at Checkout:
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono tracking-widest text-amber-900">
                  {discountCode}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  hasCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300'
                }`}
              >
                {hasCopied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Timer countdown line */}
            <div className="mt-3 pt-2.5 border-t border-amber-200/80 flex items-center justify-center gap-1.5 text-xs text-amber-900 font-bold">
              <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Coupon reserved for you: </span>
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
            <span>Claim My 10% Discount @ ₹{discountedPrice}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* No Thanks Subtle Dismiss */}
          <button
            type="button"
            onClick={handleClose}
            className="mt-3 text-xs sm:text-sm text-stone-400 hover:text-stone-600 font-semibold underline underline-offset-4 transition-colors"
          >
            No thanks, I will pay full price later
          </button>

          {/* Trust Guarantees */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-4 text-[11px] text-stone-500 font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Instant PDF Download
            </span>
            <span>•</span>
            <span>Lifetime Access</span>
            <span>•</span>
            <span>UPI &amp; Card Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
