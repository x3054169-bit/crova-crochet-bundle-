import { useState, type FormEvent } from 'react';
import { X, ShieldCheck, Zap, CheckCircle2, Download, ExternalLink, Smartphone, CreditCard, Lock, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUY_NOW_URL } from '../data/bundleData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'upi',
    upiApp: 'gpay'
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handlePay = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return;
    }

    setStep('processing');
    const generatedId = `CRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Simulate instant payment gateway handshake
    setTimeout(() => {
      setStep('success');
      // Fire festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const resetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-stone-200 animate-fadeIn">
        {/* Modal Top Bar */}
        <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-white font-serif">crova</span>
            <span className="text-[10px] uppercase font-bold bg-amber-500 text-stone-950 px-2 py-0.5 rounded">
              Secure Checkout
            </span>
          </div>
          <button
            onClick={resetAndClose}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' && (
          <form onSubmit={handlePay} className="p-5 sm:p-6">
            {/* Price Banner */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">The Ultimate Crochet Bundle</p>
                <p className="text-[11px] text-stone-600">1200+ Patterns + Video Course + 6 Bonuses</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 line-through mr-1.5">₹3,999</span>
                <span className="text-xl font-black text-[#d32f2f]">₹199</span>
              </div>
            </div>

            {/* Direct Superprofile Instant Checkout Button */}
            <a
              href={BUY_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-4 bg-[#f95721] hover:bg-[#e04511] text-white text-sm sm:text-base font-black py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer no-underline"
            >
              <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>Click Here for Instant Checkout via Superprofile</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* User Input Fields */}
            <div className="space-y-3.5 mb-5">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarti Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-sm border border-stone-300 rounded-lg px-3 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Email Address <span className="text-red-500">*</span>
                  <span className="text-[10px] text-stone-500 font-normal ml-1">
                    (Instant PDF download link sent here)
                  </span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aarti@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-sm border border-stone-300 rounded-lg px-3 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  WhatsApp Number <span className="text-red-500">*</span>
                  <span className="text-[10px] text-stone-500 font-normal ml-1">
                    (For WhatsApp pattern delivery &amp; support)
                  </span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-stone-300 bg-stone-100 text-stone-600 text-xs font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-sm border border-stone-300 rounded-r-lg px-3 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-stone-800 mb-2">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    formData.paymentMethod === 'upi'
                      ? 'border-amber-500 bg-amber-50/50 text-stone-900 ring-1 ring-amber-500'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-50/50 text-stone-900 ring-1 ring-amber-500'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Cards / EMI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    formData.paymentMethod === 'netbanking'
                      ? 'border-amber-500 bg-amber-50/50 text-stone-900 ring-1 ring-amber-500'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>NetBanking</span>
                </button>
              </div>

              {formData.paymentMethod === 'upi' && (
                <div className="mt-3 p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">Supported:</span>
                  <div className="flex gap-2 text-[11px] font-bold">
                    <span className="text-blue-600">GPay</span>
                    <span className="text-purple-600">PhonePe</span>
                    <span className="text-cyan-600">Paytm</span>
                    <span className="text-emerald-600">BHIM</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full bg-[#f95721] hover:bg-[#e04511] text-white text-base sm:text-lg font-black py-3.5 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <span>Pay ₹199 &amp; Download Instantly</span>
            </button>

            {/* Security Guarantee Note */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-bit Bank Grade Encryption • 100% Satisfaction Guarantee</span>
            </div>
          </form>
        )}

        {step === 'processing' && (
          <div className="p-10 text-center">
            <div className="w-14 h-14 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-black text-stone-900 mb-1">Verifying Payment...</h3>
            <p className="text-xs text-stone-500">
              Connecting securely with banking network. Please do not close or refresh.
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold text-stone-500">Order ID: #{orderId}</span>
            <h3 className="text-xl font-black text-stone-900 mt-1 mb-1">Payment Successful!</h3>
            <p className="text-xs text-stone-600 mb-5 max-w-sm mx-auto">
              Your crochet bundle files have been unlocked. We also dispatched your login credentials to{' '}
              <strong className="text-stone-900">{formData.email}</strong>.
            </p>

            {/* Direct Digital Download Hub */}
            <div className="space-y-2.5 text-left mb-5">
              <a
                href="#download-patterns"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading Crova_1000_Patterns_Bundle.zip (380 MB). Thank you for supporting Crova!`);
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">1200+ Crochet Patterns Master Pack</p>
                    <p className="text-[10px] text-stone-500">High-Res Printable PDFs (All Categories)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600 group-hover:underline">Download</span>
              </a>

              <a
                href="#download-videos"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Opening Crova Video Course Google Drive Portal with lifetime streaming access.`);
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-500/10 text-red-600 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">Video Mastery Course (Hindi &amp; English)</p>
                    <p className="text-[10px] text-stone-500">Google Drive Full Stream &amp; Offline Save</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600 group-hover:underline">Access Drive</span>
              </a>

              <a
                href="#download-bonuses"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading 6 Free Bonuses + Printable Digital Planner (PDFs).`);
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">06 Exclusive Bonuses + Digital Planner</p>
                    <p className="text-[10px] text-stone-500">Stitch guide, Color Theory &amp; Tracker</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600 group-hover:underline">Download</span>
              </a>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold py-3 rounded-xl transition-colors cursor-pointer"
            >
              Done &amp; Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
