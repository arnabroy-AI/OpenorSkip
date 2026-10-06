import React from 'react';
import { Logo } from './Logo.tsx';
import { ModernDarkHero } from './ModernDarkHero.tsx';
import { NewsletterStackSection } from './NewsletterStackSection.tsx';
import { MacbookScrollSection } from './MacbookScrollSection.tsx';
import { FounderReviewsMarquee } from './FounderReviewsMarquee.tsx';
import { PricingSection } from './PricingSection.tsx';
import { Footer } from './Footer.tsx';

interface LandingPageProps {
  onOpenDashboard: (tab?: 'simulator' | 'personas' | 'inbox' | 'validation' | 'pricing') => void;
  onOpenTour: () => void;
  onOpenPricing: () => void;
  titles: string[];
  setTitles: (titles: string[]) => void;
  onQuickRun: (customTitles?: string[]) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenDashboard,
  onOpenTour,
  onOpenPricing,
}) => {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1b1b1d] flex flex-col">
      
      {/* PREBUILTUI DARK HERO SECTION WITH DASHBOARD SHOWCASE & BACKDROP NAVBAR */}
      <ModernDarkHero
        onOpenDashboard={onOpenDashboard}
        onOpenTour={onOpenTour}
        onOpenPricing={onOpenPricing}
      />

      {/* 3. NEW CULT UI LOGO CAROUSEL WITH GRADIENT HEADING (CUSTOMIZED FOR MICROSaaS) */}
      <NewsletterStackSection onOpenDashboard={onOpenDashboard} />

      {/* 5. MACBOOK SCROLL (DASHBOARD PREVIEW) */}
      <div id="preview">
        <MacbookScrollSection />
      </div>

      {/* 6. TESTIMONY / REVIEWS (MAGICUI MARQUEE WALL OF LOVE) */}
      <div id="wall-of-love">
        <FounderReviewsMarquee />
      </div>

      {/* 7. PRICING SECTION */}
      <div id="pricing">
        <PricingSection onOpenCheckout={onOpenPricing} />
      </div>

      {/* 8. MODERN CURVED WATERMARK FOOTER */}
      <Footer
        onOpenDashboard={onOpenDashboard}
        onOpenTour={onOpenTour}
        onOpenPricing={onOpenPricing}
      />

    </div>
  );
};
