import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RotateCcw, Truck, Mail, CheckCircle2, Phone, Clock, ExternalLink } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'shipping' | 'contact';

interface PolicyModalProps {
  isOpen: boolean;
  initialPolicy?: PolicyType;
  offerType?: '1200' | '2200';
  onClose: () => void;
}

export function PolicyModal({ isOpen, initialPolicy = 'privacy', offerType = '2200', onClose }: PolicyModalProps) {
  const is2200 = offerType === '2200';
  const patternCount = is2200 ? '2200+ Crochet Patterns' : '1200+ Crochet Patterns';
  const bundleTitle = is2200 
    ? 'Crochet Making Course and 2200+ Crochet Patterns Mega Bundle' 
    : 'Crochet Making Course and 1200+ Crochet Patterns Bundle';
  const bundlePrice = is2200 ? '₹99' : '₹199';
  const bonusCount = is2200 ? '9 Exclusive Artisan Bonuses' : '6 Bonus materials';
  const [activeTab, setActiveTab] = useState<PolicyType>(initialPolicy);

  // Update tab if initialPolicy changes
  React.useEffect(() => {
    if (initialPolicy) {
      setActiveTab(initialPolicy);
    }
  }, [initialPolicy]);

  if (!isOpen) return null;

  const tabs: { id: PolicyType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'refund', label: 'Refund and Returns Policy', icon: RotateCcw },
    { id: 'shipping', label: 'Shipping Policy', icon: Truck },
    { id: 'contact', label: 'Contact us', icon: Mail },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-stone-200 my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Tabs */}
        <div className="bg-[#111111] text-white px-5 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#f95721]" />
            <span className="font-bold text-sm sm:text-base tracking-wide text-stone-100">
              Crova • Official Policy Center
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation Navigation Row */}
        <div className="bg-stone-100 px-3 py-2 border-b border-stone-200 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-300'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#f95721]' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dedicated Page Content Container */}
        <div className="p-5 sm:p-8 overflow-y-auto text-stone-800 text-sm leading-relaxed space-y-6">
          {/* 1. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold text-[#f95721] uppercase tracking-wider">Legal Document</span>
                <h2 className="text-2xl font-black text-stone-950 mt-1">Privacy Policy</h2>
                <p className="text-xs text-stone-500 mt-0.5">Last updated: January 2026 • Crova</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">1. Information We Collect</h3>
                <p className="text-stone-600">
                  When you purchase the <strong>{bundleTitle}</strong> from Crova, we collect basic contact details including your name, email address, and phone number (for WhatsApp customer support and download access delivery). We do NOT store credit card or debit card numbers on our servers. All transactions are securely encrypted and processed by RBI-authorized payment gateways (Razorpay, PhonePe, UPI, and Stripe).
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">2. How We Use Your Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li>Instant delivery of download links to your email and resource dashboard.</li>
                  <li>Customer service assistance and pattern troubleshooting via WhatsApp.</li>
                  <li>Important updates regarding newly added bonus patterns or video classes.</li>
                  <li>Fraud prevention, account security, and payment dispute verification.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">3. Data Security &amp; Protection</h3>
                <p className="text-stone-600">
                  We use military-grade 256-bit SSL encryption across all purchase and delivery portals. Your personal data is never sold, rented, leased, or disclosed to third-party marketing companies under any circumstances.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">4. Cookies &amp; Tracking</h3>
                <p className="text-stone-600">
                  We use standard temporary session cookies to facilitate shopping cart management and anonymized traffic metrics to optimize mobile page loading speeds.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">5. Your Privacy Rights</h3>
                <p className="text-stone-600">
                  You have the right to request a copy of your purchase records or ask for the deletion of your contact data from our marketing mailing lists at any time by emailing <span className="font-semibold text-stone-900">support.crova@gmail.com</span> or contacting us on WhatsApp (+91 8871694891).
                </p>
              </div>
            </div>
          )}

          {/* 2. TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold text-[#f95721] uppercase tracking-wider">User Agreement</span>
                <h2 className="text-2xl font-black text-stone-950 mt-1">Terms &amp; Conditions</h2>
                <p className="text-xs text-stone-500 mt-0.5">Effective Date: January 1, 2026 • Crova</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">1. Acceptance of Terms</h3>
                <p className="text-stone-600">
                  By accessing, browsing, or purchasing from Crova, you agree to be bound by these Terms &amp; Conditions and all applicable digital commerce laws.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">2. Digital Product License</h3>
                <p className="text-stone-600">
                  The Crochet Mastery Course, {patternCount}, and {bonusCount} are delivered as digital downloadable goods (PDF files, video streams, and digital planners). You are granted a <strong>single-user, personal, and commercial crafting license</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-stone-600">
                  <li><strong>You CAN:</strong> Crochet physical items using these patterns and sell your finished handmade products at craft fairs, exhibitions, and online stores.</li>
                  <li><strong>You CANNOT:</strong> Re-upload, resell, share, redistribute, or trade the raw digital pattern PDFs, planners, or video lessons to third parties or on public file-sharing networks.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">3. Lifetime Access</h3>
                <p className="text-stone-600">
                  Your one-time payment of {bundlePrice} grants you lifetime access to the resource dashboard, including all future pattern additions and curriculum updates without recurring monthly subscription fees.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">4. Disclaimer of Earnings</h3>
                <p className="text-stone-600">
                  While many students launch successful handmade craft businesses, individual crafting proficiency and sales revenues vary based on individual practice, dedication, and market conditions. Crova makes no guarantees of specific income.
                </p>
              </div>
            </div>
          )}

          {/* 3. REFUND AND RETURNS POLICY */}
          {activeTab === 'refund' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">100% Satisfaction Guarantee</span>
                <h2 className="text-2xl font-black text-stone-950 mt-1">Refund and Returns Policy</h2>
                <p className="text-xs text-stone-500 mt-0.5">Confidence Guarantee • Crova</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-950">
                  <span className="font-bold">Our 100% Customer Satisfaction Promise: </span>
                  We stand firmly behind the quality of our {patternCount} collection, stitch blueprints, and video masterclass.
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">1. Digital Nature &amp; Return Exceptions</h3>
                <p className="text-stone-600">
                  Because Crova products are digital downloads that are delivered immediately upon purchase, physical returns are not applicable. However, we honor refunds under the following clear circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2 text-stone-600">
                  <li><strong>Corrupted or Inaccessible Files:</strong> If any file cannot be opened or accessed and our support team cannot resolve it within 24 hours.</li>
                  <li><strong>Duplicate Transactions:</strong> If your bank or UPI app inadvertently debited your account twice for the same purchase.</li>
                  <li><strong>Genuine Quality Dissatisfaction:</strong> If you review the bundle within 7 days and find the patterns are incomplete or materially misaligned with our descriptions.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">2. How to Request a Refund</h3>
                <p className="text-stone-600">
                  Simply send an email to <span className="font-semibold text-stone-900">support.crova@gmail.com</span> or message our dedicated WhatsApp support (+91 8871694891) with your Order ID and payment transaction reference. Our team typically processes approvals within 24 hours.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">3. Refund Processing Timeline</h3>
                <p className="text-stone-600">
                  Approved refunds are credited directly back to your original payment method (Bank Account, UPI, or Card) within 3 to 5 business days per RBI banking standards.
                </p>
              </div>
            </div>
          )}

          {/* 4. SHIPPING POLICY */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Instant Digital Fulfillment</span>
                <h2 className="text-2xl font-black text-stone-950 mt-1">Shipping Policy</h2>
                <p className="text-xs text-stone-500 mt-0.5">Instant Online Access • Zero Shipping Fees</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-blue-950">
                  <span className="font-bold">Zero Shipping Waiting Time: </span>
                  This is a 100% digital goods product. You will NOT wait for courier delivery.
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">1. Delivery Method &amp; Timeline</h3>
                <p className="text-stone-600">
                  Immediately upon successful payment confirmation (within 5 seconds), you are automatically redirected to our <strong>Secure Digital Resource Dashboard</strong> where you can instantly download:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2 text-stone-600">
                  <li>All {patternCount} High-Definition PDF Pattern Blueprints.</li>
                  <li>Video Mastery Course streaming links and downloadable lessons.</li>
                  <li>Digital Crochet Planner &amp; {bonusCount}.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">2. Email Confirmation</h3>
                <p className="text-stone-600">
                  A backup copy containing your direct lifetime access link is automatically dispatched to the email address provided during checkout. Please verify your spam/promotions folder if you don't see it in your primary inbox.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">3. Lost Link or Download Assistance</h3>
                <p className="text-stone-600">
                  If you ever change phones, lose your files, or need your download link re-sent, simply message our WhatsApp support or contact us via email. We will re-generate your personal download link free of charge at any time.
                </p>
              </div>
            </div>
          )}

          {/* 5. CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold text-[#f95721] uppercase tracking-wider">Help &amp; Support</span>
                <h2 className="text-2xl font-black text-stone-950 mt-1">Contact Us</h2>
                <p className="text-xs text-stone-500 mt-0.5">We are here to help you every step of the way!</p>
              </div>

              {/* Direct channels grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">WhatsApp Fast Support</h4>
                      <p className="text-xs text-stone-600 mt-0.5">+91 8871694891</p>
                      <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        Avg. Response: Under 15 minutes
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/918871694891?text=Hi!%20I%20need%20assistance%20with%20the%20Crova%20Crochet%20Bundle."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Email Support</h4>
                      <p className="text-xs text-stone-600 mt-0.5">support.crova@gmail.com</p>
                      <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Avg. Response: Under 2 hours
                      </p>
                    </div>
                  </div>
                  <a 
                    href="mailto:support.crova@gmail.com?subject=Crova%20Crochet%20Bundle%20Support%20Request"
                    className="mt-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 px-3.5 rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    <span>Send Email</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Instant Help & Order Queries */}
              <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 space-y-3">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Instant Help &amp; Order Queries</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-600">
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <strong className="block text-stone-900 mb-0.5">Didn&apos;t receive email link?</strong>
                    <span>Check spam/promotions or send your payment screenshot to our WhatsApp support for instant re-delivery.</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                    <strong className="block text-stone-900 mb-0.5">Need pattern assistance?</strong>
                    <span>Our team is available 7 days a week on WhatsApp to assist with PDF downloads and video course links.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>Crova Customer Care • Registered Digital Publisher</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
