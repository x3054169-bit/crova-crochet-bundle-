import React from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  Truck, 
  Mail, 
  CheckCircle2, 
  Phone, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';
import { PolicyType } from './PolicyModal';
import { BUY_NOW_URL } from '../data/bundleData';

interface PolicyPageProps {
  policy: PolicyType;
  onNavigate: (policy: PolicyType | 'home') => void;
  onOpenCheckout: () => void;
}

export function PolicyPage({ policy, onNavigate, onOpenCheckout }: PolicyPageProps) {
  const tabs: { id: PolicyType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'refund', label: 'Refund & Returns Policy', icon: RotateCcw },
    { id: 'shipping', label: 'Shipping Policy', icon: Truck },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  const getPageMeta = (currentPolicy: PolicyType) => {
    switch (currentPolicy) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          category: 'Legal & Data Protection',
          description: 'Learn how Crova protects your data, transactions, and privacy when accessing our crochet patterns and learning resources.',
          updated: 'January 2026'
        };
      case 'terms':
        return {
          title: 'Terms & Conditions',
          category: 'User Agreement & Licensing',
          description: 'Details on our single-user license, lifetime access rights, commercial crafting permissions, and digital resource usage.',
          updated: 'January 2026'
        };
      case 'refund':
        return {
          title: 'Refund & Returns Policy',
          category: '100% Satisfaction Guarantee',
          description: 'Our promise of quality and complete refund terms for the 1200+ Crochet Patterns and Video Course bundle.',
          updated: 'January 2026'
        };
      case 'shipping':
        return {
          title: 'Shipping & Delivery Policy',
          category: 'Instant Digital Fulfillment',
          description: 'Details on how instant digital access, automated download links, and lifetime backup deliveries work.',
          updated: 'January 2026'
        };
      case 'contact':
        return {
          title: 'Contact Customer Support',
          category: 'Help Center & Inquiries',
          description: 'Need help with your download, order access, or pattern queries? Our friendly artisan support team is available 24/7.',
          updated: 'Active 24/7'
        };
    }
  };

  const meta = getPageMeta(policy);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col font-sans">
      {/* Top Utility / Announcement Bar */}
      <div className="w-full bg-[#1b2720] text-stone-200 py-2.5 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Official Policy &amp; Customer Support Portal • Crova</span>
          </div>
          <button 
            onClick={() => onNavigate('home')}
            className="hidden sm:inline-flex items-center gap-1 text-emerald-300 hover:text-white font-semibold transition-colors cursor-pointer"
          >
            <span>Back to Store Offer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Header Navigation */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 -ml-2 rounded-xl text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors flex items-center gap-1.5 font-bold text-sm cursor-pointer"
              title="Return to Home"
            >
              <ArrowLeft className="w-5 h-5 text-stone-700" />
              <span className="hidden sm:inline">Back to Bundle</span>
            </button>
            <div className="h-6 w-px bg-stone-200 hidden sm:block" />
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f95721] text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                CR
              </div>
              <div>
                <span className="font-black text-stone-900 text-base sm:text-lg tracking-tight block leading-tight">
                  Crova
                </span>
                <span className="text-[10px] text-stone-500 font-medium block leading-none">
                  Craft Studio
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BUY_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onOpenCheckout}
              className="bg-[#24a04e] hover:bg-[#1f8c44] text-white text-xs sm:text-sm font-black py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer no-underline"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Get Bundle @ ₹199</span>
            </a>
          </div>
        </div>

        {/* Horizontal Navigation Tabs for All 5 Dedicated Pages */}
        <div className="border-t border-stone-100 bg-[#fbf9f6] px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <div className="max-w-6xl mx-auto flex items-center gap-1 sm:gap-2 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = policy === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-950 shadow-xs border border-stone-300/80 font-black'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#f95721]' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Page Hero Header */}
      <section className="bg-gradient-to-b from-white to-[#f5f2ed] border-b border-stone-200 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb trail */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-3">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-600">Policies &amp; Support</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#f95721] font-bold">{meta.title}</span>
          </nav>

          <span className="inline-block text-[11px] font-extrabold tracking-wider uppercase text-[#f95721] bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200/60 mb-2">
            {meta.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight mb-3">
            {meta.title}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            {meta.description}
          </p>
          <div className="mt-4 pt-4 border-t border-stone-200/70 flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span>Last reviewed: <strong className="text-stone-700">{meta.updated}</strong></span>
            <span>•</span>
            <span>Issuer: <strong className="text-stone-700">Crova Craft &amp; Publishing Co.</strong></span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Legally Verified Document
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
            
            {/* 1. PRIVACY POLICY DEDICATED PAGE CONTENT */}
            {policy === 'privacy' && (
              <div className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-stone-700">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    1. Information We Collect
                  </h2>
                  <p className="mb-3">
                    When you purchase the <strong>Crochet Making Course and 1200+ Crochet Patterns Bundle</strong> from Crova, we collect essential contact details to deliver your digital access and provide support:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                    <li><strong>Contact Details:</strong> Your full name, email address, and WhatsApp/mobile phone number for instant digital access delivery and support tickets.</li>
                    <li><strong>Order Identifiers:</strong> Automated transaction reference codes generated by authorized payment gateways.</li>
                    <li><strong>Payment Card / UPI Security:</strong> Crova <em>never</em> stores, sees, or retains your credit card numbers, debit card details, or UPI PINs. All financial payments are encrypted end-to-end via PCI-DSS compliant RBI-authorized gateways (Razorpay, PhonePe, UPI, and Stripe).</li>
                  </ul>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    2. Purpose of Data Processing
                  </h2>
                  <p className="mb-3">
                    We use your data strictly for legitimate business needs related directly to your purchase:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <strong className="block text-stone-900 mb-1">Instant Fulfillment</strong>
                      <span className="text-xs text-stone-600">Dispatching private download links to your email and persistent resource vault.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <strong className="block text-stone-900 mb-1">Customer Care &amp; Support</strong>
                      <span className="text-xs text-stone-600">Troubleshooting pattern questions, yarn conversions, and download recovery via WhatsApp.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <strong className="block text-stone-900 mb-1">Curriculum &amp; Bonus Updates</strong>
                      <span className="text-xs text-stone-600">Notifying you when complimentary seasonal crochet patterns or masterclasses are uploaded.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <strong className="block text-stone-900 mb-1">Fraud Prevention</strong>
                      <span className="text-xs text-stone-600">Safeguarding accounts against duplicate charge errors or unauthorized access.</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    3. No Third-Party Selling or Renting
                  </h2>
                  <p>
                    We hold user trust as our highest priority. Crova maintains an absolute zero-tolerance policy against selling, leasing, trading, or sharing your personal email or phone number with third-party advertisers or marketing aggregators.
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    4. 256-Bit SSL Encryption &amp; Security
                  </h2>
                  <p>
                    All communication between your browser and our servers is secured with industry-standard 256-bit TLS/SSL encryption certificates. Our cloud download nodes employ tamper-resistant authenticated tokens to guarantee file safety.
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    5. User Rights &amp; Data Deletion
                  </h2>
                  <p>
                    You retain complete authority over your personal information. If you wish to inspect your order logs, update your registered email address, or request permanent deletion of your data from our messaging systems, simply contact our Data Protection Officer at <span className="font-bold text-stone-900">facctymann@gmail.com</span> or message our WhatsApp desk (+91 8871694891).
                  </p>
                </div>
              </div>
            )}

            {/* 2. TERMS & CONDITIONS DEDICATED PAGE CONTENT */}
            {policy === 'terms' && (
              <div className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-stone-700">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    1. Agreement Overview &amp; Acceptance
                  </h2>
                  <p>
                    By visiting, browsing, or purchasing from this website, you confirm your acceptance of these Terms &amp; Conditions. This document constitutes a binding agreement between you and Crova, governing all digital materials provided in the Crochet Patterns &amp; Mastery Bundle.
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    2. Commercial Crafting License (You Can Sell What You Make!)
                  </h2>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5 mb-3">
                    <p className="font-bold text-emerald-950 mb-1">
                      ✅ Generous Commercial Finished-Product Rights Included:
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-900">
                      You are completely permitted and encouraged to use every pattern, stitch tutorial, and blueprint in this bundle to crochet finished physical goods (such as amigurumi dolls, sweaters, tops, blankets, bags, and baby clothes) and sell those finished physical creations for profit at exhibitions, craft fairs, Etsy, Instagram, and local boutiques!
                    </p>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5">
                    <p className="font-bold text-rose-950 mb-1">
                      ❌ Digital Redistribution Strictly Prohibited:
                    </p>
                    <p className="text-xs sm:text-sm text-rose-900">
                      You are strictly prohibited from reselling, redistributing, re-uploading, trading, or distributing the raw digital files (PDF pattern documents, video tutorials, digital planner sheets) directly to other individuals or on public file-sharing platforms.
                    </p>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    3. Lifetime Access Guarantee
                  </h2>
                  <p>
                    Your one-time payment of ₹199 provides permanent lifetime access to the resource dashboard. You will never be billed recurring monthly subscriptions or hidden maintenance charges. Even if your device is replaced or corrupted, our support desk will re-verify and reissue your download dashboard access free of charge.
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    4. Disclaimer of Earnings
                  </h2>
                  <p>
                    While many crafters and artisans successfully establish thriving micro-businesses selling their crochet items, individual financial outcomes depend entirely on personal technique, dedication, pricing strategies, and local consumer demand. Crova makes no express guarantee of specific sales figures.
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    5. Modifications to Curriculum
                  </h2>
                  <p>
                    Crova continuously refines and adds high-definition patterns, seasonal updates, and stitch masterclasses. All newly introduced bonus items are automatically unlocked for existing purchasers without additional fees.
                  </p>
                </div>
              </div>
            )}

            {/* 3. REFUND & RETURNS POLICY DEDICATED PAGE CONTENT */}
            {policy === 'refund' && (
              <div className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-stone-700">
                {/* 100% Satisfaction Banner */}
                <div className="bg-gradient-to-r from-emerald-600 to-[#1e3329] text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                    <CheckCircle2 className="w-9 h-9 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">
                      100% Customer Satisfaction Promise
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 mt-1 leading-relaxed">
                      We take immense pride in crafting the most thorough, easy-to-follow crochet bundle available. If you encounter legitimate issues, we stand by you with prompt assistance or full resolution.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    1. Digital Goods Return Policy
                  </h2>
                  <p className="mb-3">
                    Due to the instantaneous downloadable nature of digital goods (PDFs and video masterclasses), physical item returns do not apply. However, we ensure total fairness through our documented refund criteria:
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                      <strong className="text-stone-900 block mb-1">A. Inaccessible or Corrupted Files</strong>
                      <p className="text-xs sm:text-sm text-stone-600">
                        If any file cannot be opened on your mobile device, tablet, or PC and our support desk is unable to furnish an accessible replacement within 24 hours of notification.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                      <strong className="text-stone-900 block mb-1">B. Accidental Duplicate Transactions</strong>
                      <p className="text-xs sm:text-sm text-stone-600">
                        If your bank or UPI application charged you multiple times for the same order due to a network glitch, the extra duplicate charges are automatically reversed immediately upon request.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                      <strong className="text-stone-900 block mb-1">C. Material Misalignment</strong>
                      <p className="text-xs sm:text-sm text-stone-600">
                        If the delivered material fundamentally diverges from our advertised pattern catalog or curriculum description within 7 days of purchase.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    2. Easy 2-Step Refund Process
                  </h2>
                  <ol className="list-decimal pl-5 space-y-2 text-stone-600">
                    <li>
                      <strong>Send Message / Email:</strong> Contact us via WhatsApp (+91 8871694891) or email (<span className="text-stone-900 font-bold">facctymann@gmail.com</span>) with your Order ID or phone number.
                    </li>
                    <li>
                      <strong>Rapid Review:</strong> Our customer support desk verifies the transaction and approves eligible refunds within 12 to 24 hours.
                    </li>
                  </ol>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    3. Banking Settlement Window
                  </h2>
                  <p>
                    Once approved, refunds are credited directly back to the original source method (UPI, Bank Account, or Card) within 3 to 5 business days, in compliance with RBI banking clearing cycles.
                  </p>
                </div>
              </div>
            )}

            {/* 4. SHIPPING POLICY DEDICATED PAGE CONTENT */}
            {policy === 'shipping' && (
              <div className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-stone-700">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-blue-950 mb-1">
                      100% Instant Digital Delivery • ₹0 Shipping Costs
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                      All products sold on this store are digital resources. There are zero shipping fees, zero postal waiting periods, and zero risk of damaged physical parcel transit.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    1. Instant Delivery Timeline
                  </h2>
                  <p className="mb-3">
                    Immediately following your successful payment (within 5 seconds):
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-stone-600">
                    <li>
                      <strong>On-Screen Dashboard:</strong> Your browser automatically redirects to the high-speed download center containing all 1200+ Patterns, Video Courses, Stitch Guides, and Planners.
                    </li>
                    <li>
                      <strong>Automated Email Dispatch:</strong> A permanent access link and receipt are simultaneously dispatched to the email address entered during checkout.
                    </li>
                    <li>
                      <strong>WhatsApp Backup:</strong> You can also request a copy delivered right into your WhatsApp chat by tapping our WhatsApp support button.
                    </li>
                  </ul>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    2. Compatibility &amp; Devices
                  </h2>
                  <p className="mb-3">
                    All patterns and videos are prepared in universal, open formats compatible across every device without requiring paid proprietary software:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                      <span className="block font-bold text-stone-900 text-xs sm:text-sm">Android</span>
                      <span className="text-[11px] text-stone-500">PDFs &amp; Videos</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                      <span className="block font-bold text-stone-900 text-xs sm:text-sm">iPhone / iPad</span>
                      <span className="text-[11px] text-stone-500">Files &amp; GoodNotes</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                      <span className="block font-bold text-stone-900 text-xs sm:text-sm">Windows PC</span>
                      <span className="text-[11px] text-stone-500">Any Browser / Adobe</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                      <span className="block font-bold text-stone-900 text-xs sm:text-sm">Mac &amp; Linux</span>
                      <span className="text-[11px] text-stone-500">Full Retina Quality</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h2 className="text-lg sm:text-xl font-black text-stone-950 mb-2">
                    3. Lifetime Link Reissuance
                  </h2>
                  <p>
                    If you ever switch phones, clear your downloads, or lose the original email, our support team will regenerate your personalized link free of charge at any point in the future.
                  </p>
                </div>
              </div>
            )}

            {/* 5. CONTACT US DEDICATED PAGE CONTENT */}
            {policy === 'contact' && (
              <div className="space-y-8">
                {/* Channels Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
                        <Phone className="w-6 h-6" />
                      </div>
                      <h3 className="font-black text-stone-900 text-lg">
                        WhatsApp Fast Chat
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                        Direct connection to our dedicated crafting support specialist for rapid assistance with links, orders, and stitch queries.
                      </p>
                      <p className="text-sm font-bold text-emerald-800 mt-3">
                        +91 8871694891
                      </p>
                    </div>
                    <a
                      href="https://wa.me/918871694891?text=Hi!%20I%20need%20assistance%20with%20the%20Crova%20Crochet%20Bundle."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Open WhatsApp Chat</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-xs">
                        <Mail className="w-6 h-6" />
                      </div>
                      <h3 className="font-black text-stone-900 text-lg">
                        Direct Email Support
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                        For invoicing, institutional access, bulk orders, and formal payment verification inquiries.
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-amber-900 mt-3 break-all">
                        facctymann@gmail.com
                      </p>
                      <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Average reply time: Under 2 hours
                      </p>
                    </div>
                    <a
                      href="mailto:facctymann@gmail.com?subject=Inquiry%20Regarding%20Crova%20Crochet%20Bundle"
                      className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Send Direct Email</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Common FAQs */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="text-base font-black text-stone-900 mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#f95721]" />
                    Quick Answers to Frequent Inquiries
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-stone-600">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <strong className="text-stone-900 block mb-0.5">Where is my download link?</strong>
                      <span>Check your email inbox (including promotions/spam) for an email from Crova. You can also message our WhatsApp support with your payment screenshot for immediate access.</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <strong className="text-stone-900 block mb-0.5">Are these patterns suitable for absolute beginners?</strong>
                      <span>Yes! The bundle includes foundational 0-to-mastery video courses and 45 fundamental stitch blueprints before advancing to intricate designs.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Conversion Card */}
          <div className="mt-8 bg-gradient-to-br from-[#1e3329] to-[#12221a] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/60">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/50">
                <Sparkles className="w-3.5 h-3.5" />
                Special 93% OFF Launch Promotion
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready to Start Your Crochet Journey?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Get instant lifetime access to 1200+ Crochet Patterns, Video Course in English &amp; Hindi, 30 New Stitches, and 6 Free Bonuses today for just <strong className="text-emerald-300 font-black">₹199</strong> (Regular ₹3,999).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href={BUY_NOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onOpenCheckout}
                className="w-full sm:w-auto bg-[#f95721] hover:bg-[#e04511] text-white font-black text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Get Instant Access @ ₹199</span>
              </a>
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-3 px-4 rounded-xl border border-white/20 transition-colors text-center cursor-pointer"
              >
                View Full Bundle
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Dedicated Page Footer */}
      <footer className="bg-[#1e3329] text-white py-10 px-4 sm:px-6 border-t border-emerald-900 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <nav 
            className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-bold text-white"
            aria-label="Footer dedicated navigation"
          >
            <button
              onClick={() => onNavigate('privacy')}
              className={`hover:text-emerald-300 transition-colors cursor-pointer ${policy === 'privacy' ? 'text-emerald-300 underline underline-offset-4' : ''}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className={`hover:text-emerald-300 transition-colors cursor-pointer ${policy === 'terms' ? 'text-emerald-300 underline underline-offset-4' : ''}`}
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={() => onNavigate('refund')}
              className={`hover:text-emerald-300 transition-colors cursor-pointer ${policy === 'refund' ? 'text-emerald-300 underline underline-offset-4' : ''}`}
            >
              Refund &amp; Returns Policy
            </button>
            <button
              onClick={() => onNavigate('shipping')}
              className={`hover:text-emerald-300 transition-colors cursor-pointer ${policy === 'shipping' ? 'text-emerald-300 underline underline-offset-4' : ''}`}
            >
              Shipping Policy
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-emerald-300 transition-colors cursor-pointer ${policy === 'contact' ? 'text-emerald-300 underline underline-offset-4' : ''}`}
            >
              Contact Us
            </button>
          </nav>

          <p className="text-[11px] sm:text-xs text-stone-300/80 leading-relaxed max-w-2xl mx-auto font-normal">
            Crova • High Quality Handcrafted Crochet Patterns &amp; Artisan Learning Courses. All trademarks and rights reserved.
          </p>

          <div className="pt-4 border-t border-emerald-800/60 flex flex-wrap items-center justify-center gap-4 text-xs text-emerald-200/70">
            <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">
              ← Return to Main Page
            </button>
            <span>•</span>
            <span>Copyright © 2026 Crova. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
