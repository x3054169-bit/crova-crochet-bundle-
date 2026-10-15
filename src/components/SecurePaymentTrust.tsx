import { ShieldCheck, Lock, Zap, CreditCard } from 'lucide-react';

interface SecurePaymentTrustProps {
  variant?: 'card' | 'compact' | 'inline';
  className?: string;
  showGuarantees?: boolean;
}

export function SecurePaymentTrust({
  variant = 'card',
  className = '',
  showGuarantees = true,
}: SecurePaymentTrustProps) {
  const renderBadges = (compact = false) => (
    <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
      {/* UPI */}
      <div
        className={`inline-flex items-center gap-1.5 bg-white ${
          compact ? 'px-2 py-0.5' : 'px-2.5 py-1'
        } rounded-lg border border-stone-200 shadow-2xs hover:border-emerald-400 transition-colors`}
      >
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="UPI Logo">
          <rect width="24" height="24" rx="4" fill="#097939" />
          <path d="M7 6l5 12 5-12h-3l-2 5-2-5H7z" fill="#FFFFFF" />
        </svg>
        <span className="font-extrabold text-[11px] sm:text-xs text-stone-800 tracking-tight">
          UPI
        </span>
      </div>

      {/* Google Pay */}
      <div
        className={`inline-flex items-center gap-1.5 bg-white ${
          compact ? 'px-2 py-0.5' : 'px-2.5 py-1'
        } rounded-lg border border-stone-200 shadow-2xs hover:border-blue-400 transition-colors`}
      >
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" aria-label="Google Pay">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.07.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.12C3.3 21.44 7.37 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.59H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.41l4-3.12z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.3 2.56 1.28 6.59l4 3.12c.95-2.83 3.6-4.96 6.72-4.96z"
          />
        </svg>
        <span className="font-extrabold text-[11px] sm:text-xs text-stone-800 tracking-tight">
          GPay
        </span>
      </div>

      {/* PhonePe */}
      <div
        className={`inline-flex items-center gap-1.5 bg-white ${
          compact ? 'px-2 py-0.5' : 'px-2.5 py-1'
        } rounded-lg border border-stone-200 shadow-2xs hover:border-purple-400 transition-colors`}
      >
        <div className="w-3.5 h-3.5 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-black text-[8px] leading-none shrink-0">
          पे
        </div>
        <span className="font-extrabold text-[11px] sm:text-xs text-[#5f259f] tracking-tight">
          PhonePe
        </span>
      </div>

      {/* Paytm */}
      <div
        className={`inline-flex items-center gap-1 bg-white ${
          compact ? 'px-2 py-0.5' : 'px-2.5 py-1'
        } rounded-lg border border-stone-200 shadow-2xs hover:border-sky-400 transition-colors`}
      >
        <span className="font-black text-[11px] sm:text-xs text-[#002e6e] tracking-tight">
          Pay<span className="text-[#00b9f5]">tm</span>
        </span>
      </div>

      {/* Cards & NetBanking */}
      <div
        className={`inline-flex items-center gap-1.5 bg-white ${
          compact ? 'px-2 py-0.5' : 'px-2.5 py-1'
        } rounded-lg border border-stone-200 shadow-2xs hover:border-stone-400 transition-colors`}
      >
        <CreditCard className="w-3.5 h-3.5 text-stone-600 shrink-0" />
        <span className="font-bold text-[11px] sm:text-xs text-stone-700 tracking-tight">
          Cards / NetBanking
        </span>
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div
        className={`mt-3 py-2.5 px-3 bg-[#fdfbf7] rounded-xl border border-stone-200/90 text-center ${className}`}
      >
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-stone-800 mb-2">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Guaranteed 100% Safe &amp; Secure Checkout</span>
        </div>
        {renderBadges(true)}
      </div>
    );
  }

  return (
    <div
      className={`mt-3.5 bg-[#fdfbf7] rounded-2xl border border-stone-200/90 p-3 sm:p-3.5 shadow-2xs text-center ${className}`}
    >
      {/* Header with Lock & Trust Title */}
      <div className="flex items-center justify-center gap-1.5 mb-2.5">
        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="text-xs sm:text-[13px] font-extrabold text-stone-900 font-sans tracking-tight">
          Guaranteed 100% Safe &amp; Secure Checkout
        </span>
      </div>

      {/* Verified Payment Badges */}
      {renderBadges(false)}

      {/* Trust Guarantees Row */}
      {showGuarantees && (
        <div className="mt-2.5 pt-2 border-t border-stone-200/70 flex items-center justify-center flex-wrap gap-x-3.5 gap-y-1 text-[11px] text-stone-600 font-medium">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            256-Bit SSL Encryption
          </span>
          <span className="text-stone-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-stone-700 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
            Instant Download via Email &amp; WhatsApp
          </span>
        </div>
      )}
    </div>
  );
}
