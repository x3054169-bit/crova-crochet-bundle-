/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { HeroSection } from './components/HeroSection';
import { WhatYouReceive } from './components/WhatYouReceive';
import { PatternCategories } from './components/PatternCategories';
import { MidUrgencyBanner } from './components/MidUrgencyBanner';
import { BonusesSection } from './components/BonusesSection';
import { BrandStory } from './components/BrandStory';
import { ReviewsSection } from './components/ReviewsSection';
import { LaunchDiscountBanner } from './components/LaunchDiscountBanner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { BookPreviewModal } from './components/BookPreviewModal';
import { StickyBottomBar } from './components/StickyBottomBar';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { PolicyPage } from './components/PolicyPage';
import { BackToTop } from './components/BackToTop';
import { BUY_NOW_URL } from './data/bundleData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | PolicyType>('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; policy: PolicyType }>({
    isOpen: false,
    policy: 'privacy',
  });

  const handleOpenCheckout = () => {
    try {
      if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'InitiateCheckout', {
          content_name: 'Crova - The Ultimate Premium Crochet Bundle',
          currency: 'INR',
          value: 199
        });
      }
    } catch {
      // Ignore analytics tracking errors
    }
    window.open(BUY_NOW_URL, '_blank', 'noopener,noreferrer');
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const clearHash = () => {
    try {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      window.location.hash = '';
    }
  };

  const handleOpenPolicy = (policy: PolicyType) => {
    setCurrentView(policy);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (destination: PolicyType | 'home') => {
    setCurrentView(destination);
    if (destination === 'home') {
      clearHash();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ensure fresh page loads and reloads always land cleanly on the Home sales page
  useEffect(() => {
    clearHash();
    setCurrentView('home');
  }, []);

  // If a dedicated policy page is selected, render the dedicated PolicyPage view
  if (currentView !== 'home') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <PolicyPage 
          policy={currentView} 
          onNavigate={handleNavigate} 
          onOpenCheckout={handleOpenCheckout} 
        />

        {/* Back to Top Smooth Scroll Button */}
        <BackToTop />

        {/* Instant Checkout Modal */}
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-stone-800 flex flex-col font-sans">
      {/* 1. Top Offer Countdown Bar & Crova WordPress Navbar */}
      <HeaderBar 
        onOpenCheckout={handleOpenCheckout} 
        onOpenPreview={handleOpenPreview} 
      />

      <main className="flex-grow">
        {/* 2. Page 1: Hero Section with 3D Book Mockup, Pricing, Bullets, CTA & Digital Note */}
        <HeroSection 
          onOpenCheckout={handleOpenCheckout} 
          onOpenPreview={handleOpenPreview} 
        />

        {/* 3. Page 1: What Will I Receive (Left List + Right Tablet/Mobile Player Mockup) */}
        <WhatYouReceive 
          onOpenCheckout={handleOpenCheckout} 
          onOpenPreview={handleOpenPreview} 
        />

        {/* 4. Page 1 & 2: Included in the 1000+ Crochet Patterns (7 Category Cards with Gallery) */}
        <PatternCategories />

        {/* 5. Page 2: Mid-page Urgency ("All of this in less than the price of a Pizza" + Big Countdown) */}
        <MidUrgencyBanner 
          onOpenCheckout={handleOpenCheckout} 
        />

        {/* 6. Page 2: Bonuses Section (6 Dashed Cards with Values + Hurry Up CTA) */}
        <div id="bonuses">
          <BonusesSection 
            onOpenCheckout={handleOpenCheckout} 
          />
        </div>

        {/* 7. Page 2: Handcrafted with Care by Crova */}
        <BrandStory />

        {/* 8. Page 2 & 3: What Our Customers Say About This Bundle (5 Reviews with Thumbs Up) */}
        <div id="reviews">
          <ReviewsSection />
        </div>

        {/* 9. Page 3: Launch Discount Banner (Re-anchor 3D Mockup + Pricing + CTA) */}
        <LaunchDiscountBanner 
          onOpenCheckout={handleOpenCheckout} 
        />

        {/* 10. Page 3 & 4: Frequently Asked Questions */}
        <div id="faq">
          <FaqSection />
        </div>
      </main>

      {/* 11. Custom Footer matching Screenshot with Guarantee Seal, Green Note Pill, Black Disclaimers & Working Policy Buttons */}
      <Footer onOpenPolicy={handleOpenPolicy} />

      {/* 12. Floating Mobile/Tablet Sticky Quick-Buy Bar */}
      <StickyBottomBar 
        onOpenCheckout={handleOpenCheckout} 
      />

      {/* 13. Floating Back to Top Smooth Scroll Button with SVG Icon */}
      <BackToTop />

      {/* 14. High-Converting Instant Checkout Modal (UPI/GPay/PhonePe + Download Center) */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />

      {/* 15. "Look Inside Book" Free Sample Flipbook Modal */}
      <BookPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        onOpenCheckout={handleOpenCheckout} 
      />

      {/* 16. Dedicated Policy Pages Modal with Working Tabs for All 5 Policies */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        initialPolicy={policyModal.policy}
        onClose={() => setPolicyModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
