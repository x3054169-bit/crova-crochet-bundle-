/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Offer2200Placeholder } from './components/Offer2200Placeholder';
import { PolicyPage } from './components/PolicyPage';
import { PolicyType } from './components/PolicyModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ExitIntentModal } from './components/ExitIntentModal';
import { BackToTop } from './components/BackToTop';
import { OFFER_2200_CONFIG } from './data/offer2200';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | PolicyType>('home');

  // Sync document title
  useEffect(() => {
    document.title = 'Crova - 2200+ Crochet Patterns The Ultimate Bundle | Just ₹199';
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

  const handleOpenCheckout = () => {
    try {
      if (typeof window !== 'undefined') {
        const win = window as unknown as { dataLayer?: Record<string, unknown>[]; fbq?: (...args: unknown[]) => void };
        if (win.dataLayer) {
          win.dataLayer.push({
            event: 'InitiateCheckout',
            content_name: OFFER_2200_CONFIG.contentName,
            currency: 'INR',
            value: 199,
          });
        }
        if (win.fbq) {
          win.fbq('track', 'InitiateCheckout', {
            content_name: OFFER_2200_CONFIG.contentName,
            currency: 'INR',
            value: 199,
          });
        }
      }
    } catch {
      // Ignore analytics tracking errors
    }
    window.location.href = OFFER_2200_CONFIG.checkoutUrl;
  };

  const handleNavigate = (destination: PolicyType | 'home') => {
    setCurrentView(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a dedicated policy page is selected, render the dedicated PolicyPage view
  if (currentView !== 'home') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <ScrollProgressBar />
        <PolicyPage 
          policy={currentView} 
          onNavigate={handleNavigate} 
          onOpenCheckout={handleOpenCheckout} 
        />
        <ExitIntentModal
          discountCode="SAVE10"
          discountPercent={10}
          originalPrice={199}
          discountedPrice={179}
          checkoutUrl={OFFER_2200_CONFIG.checkoutUrl}
          onOpenCheckout={handleOpenCheckout}
        />
        <BackToTop />
      </div>
    );
  }

  // Primary High-Converting 2200+ Crochet Mastery Bundle Landing Page
  return <Offer2200Placeholder />;
}
