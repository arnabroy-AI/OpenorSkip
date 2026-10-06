import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface HeaderProps {
  activeTab: 'simulator' | 'personas' | 'inbox' | 'validation' | 'pricing';
  setActiveTab: (tab: 'simulator' | 'personas' | 'inbox' | 'validation' | 'pricing') => void;
  onOpenPricing: () => void;
  onQuickRun: () => void;
  onOpenTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPricing,
  onQuickRun,
  onOpenTour
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e0e0e0] bg-[#ffffff]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[52px] max-w-[1280px] items-center justify-between px-4 sm:px-8">
        
        {/* Zone 1: Brand Wordmark with Logo Icon */}
        <button
          onClick={() => setActiveTab('simulator')}
          className="flex items-center gap-2.5 text-left font-semibold text-[19px] tracking-tight text-[#1b1b1d] hover:text-[#0066cc] transition-colors cursor-pointer group"
        >
          <Logo className="h-7 w-7 transition-transform group-hover:scale-105" size={28} />
          <span>OpenOrSkip</span>
        </button>

        {/* Zone 2: Clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#414753]">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'simulator'
                ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold'
                : 'hover:text-[#1b1b1d]'
            }`}
          >
            Decision Engine
          </button>
          
          <button
            onClick={() => setActiveTab('personas')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'personas'
                ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold'
                : 'hover:text-[#1b1b1d]'
            }`}
          >
            40 Founder Personas
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'inbox'
                ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold'
                : 'hover:text-[#1b1b1d]'
            }`}
          >
            Inbox Preview
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'validation'
                ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold'
                : 'hover:text-[#1b1b1d]'
            }`}
          >
            Validation Gates
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'pricing'
                ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold'
                : 'hover:text-[#1b1b1d]'
            }`}
          >
            Pricing ($9/mo)
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#414753] hover:text-[#0066cc] transition-colors cursor-pointer px-2 py-1"
            title="Start interactive product tour"
          >
            <HelpCircle className="h-4 w-4 text-[#0066cc]" />
            <span className="hidden sm:inline">Tour</span>
          </button>
          
          <button
            onClick={onOpenPricing}
            className="hidden sm:inline-flex text-[14px] font-medium text-[#0066cc] hover:text-[#004e9f] transition-colors cursor-pointer px-2 py-1"
          >
            $9/mo Plan
          </button>

          <button
            onClick={onQuickRun}
            className="inline-flex items-center justify-center rounded-full bg-[#0066cc] px-5 py-2 text-[14px] font-semibold text-white transition-all hover:bg-[#004e9f] active:scale-95 cursor-pointer shadow-none"
          >
            Test Tuesday Title
          </button>
        </div>

      </div>
    </header>
  );
};
