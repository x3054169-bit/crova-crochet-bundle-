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
import { Offer2200Placeholder } from './components/Offer2200Placeholder';

const resolveInitialOffer = (): '2200' | '1000' => {
  if (typeof window === 'undefined') return '2200';

  // 1. Check path (/2200 or /2200/)
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/2200' || path.endsWith('/2200')) return '2200';
  if (path === '/1000' || path.endsWith('/1000')) return '1000';

  // 2. Check query string (?page=2200, ?offer=2200, ?bundle=2200, ?2200)
  const search = window.location.search.toLowerCase();
  if (search.includes('2200')) return '2200';
  if (search.includes('1000')) return '1000';

  // 3. Check hash (#2200, #/2200)
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('2200')) return '2200';
  if (hash.includes('1000')) return '1000';

  // 4. Check user's saved preference in localStorage
  try {
    const saved = localStorage.getItem('crova_active_bundle');
    if (saved === '1000') return '1000';
    if (saved === '2200') return '2200';
  } catch {
    // ignore
  }

  // 5. Default to '2200' so the user is guaranteed to see the 2200+ Mastery Bundle page immediately
  return '2200';
};

export default function App() {
  const [activeOffer, setActiveOffer] = useState<'2200' | '1000'>(resolveInitialOffer);

  const [currentView, setCurrentView] = useState<'home' | PolicyType>('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; policy: PolicyType }>({
    isOpen: false,
    policy: 'privacy',
  });

  const handleSwitchOffer = (offer: '2200' | '1000') => {
    setActiveOffer(offer);
    try {
      localStorage.setItem('crova_active_bundle', offer);
      if (offer === '2200') {
        window.history.pushState(null, '', '/2200');
      } else {
        window.history.pushState(null, '', '/');
      }
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/\/+$/, '');
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (path === '/2200' || hash.includes('2200') || search.includes('2200')) {
        setActiveOffer('2200');
      } else if (path === '/1000' || hash.includes('1000') || search.includes('1000')) {
        setActiveOffer('1000');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Security & protection: disable right-click context menu and inspect shortcuts (Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, F12, Ctrl+U)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (or Cmd on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        const key = e.key.toUpperCase();
        if (key === 'I' || key === 'J' || key === 'C') {
          e.preventDefault();
          return false;
        }
      }
      // Prevent Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Isolated route for the 2200+ Crochet Offer
  if (activeOffer === '2200') {
    return <Offer2200Placeholder onSwitchOffer={handleSwitchOffer} />;
  }

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

  // Ensure fresh page loads default cleanly to the main view
  useEffect(() => {
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
