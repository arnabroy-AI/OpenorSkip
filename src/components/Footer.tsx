import React from 'react';
import { Logo } from './Logo.tsx';

interface FooterProps {
  onOpenDashboard?: (tab?: 'simulator' | 'personas' | 'inbox' | 'validation' | 'pricing') => void;
  onOpenTour?: () => void;
  onOpenPricing?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDashboard,
  onOpenTour,
  onOpenPricing,
}) => {
  return (
    <div className="bg-[#fafafc] border-t border-[#e0e0e0] pt-12 sm:pt-16 px-3 sm:px-4">
      <footer className="bg-white w-full max-w-[1350px] mx-auto text-black pt-10 sm:pt-14 lg:pt-16 px-4 sm:px-8 md:px-14 lg:px-20 rounded-tl-3xl rounded-tr-3xl overflow-hidden shadow-xl border border-neutral-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-10 md:gap-14">
          
          {/* Brand Info & Socials */}
          <div className="lg:col-span-3 space-y-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <Logo className="h-8 w-8 text-[#1b1b1d] group-hover:text-[#0066cc] transition-colors" size={32} />
              <span className="text-xl font-bold tracking-tight text-[#1b1b1d] group-hover:text-[#0066cc] transition-colors">
                OpenOrSkip
              </span>
            </button>

            <p className="text-sm/6 text-neutral-600 max-w-md">
              The 60-second pre-send decision engine for solo founders. Test 2–3 draft subject lines 
              against a calibrated panel of 40 subscriber personas before clicking Send.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 sm:gap-5 items-center">
              {/* X (Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="text-neutral-500 hover:text-black transition-colors"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

              {/* Github */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-neutral-500 hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>

              {/* Linkedin */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-neutral-500 hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-neutral-500 hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <path d="m10 15 5-3-5-3z"/>
                </svg>
              </a>

              {/* Substack / Newsletter Icon */}
              <a
                href="https://substack.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Substack"
                className="text-neutral-500 hover:text-black transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 items-start">
            
            {/* Products / Decision Tools */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-neutral-900 tracking-tight">Tools</h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li>
                  <button
                    onClick={() => onOpenDashboard ? onOpenDashboard('simulator') : undefined}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Pre-Send Simulator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenDashboard ? onOpenDashboard('personas') : undefined}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    40 Founder Personas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenDashboard ? onOpenDashboard('inbox') : undefined}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Mobile Inbox Preview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenDashboard ? onOpenDashboard('validation') : undefined}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    5 Validation Tests
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-neutral-900 tracking-tight">Resources</h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li>
                  <button
                    onClick={onOpenTour}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Interactive 60s Tour
                  </button>
                </li>
                <li>
                  <a href="#preview" className="hover:text-black transition-colors">
                    Hardware Preview
                  </a>
                </li>
                <li>
                  <a href="#wall-of-love" className="hover:text-black transition-colors">
                    Founder Reviews
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-black transition-colors">
                    Pricing Breakdown
                  </a>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1.5 text-neutral-500">
                    <span>Zero API Key</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Platform / Company */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold text-sm mb-4 text-neutral-900 tracking-tight">Platform</h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li>
                  <button
                    onClick={onOpenPricing}
                    className="hover:text-black transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span>$9/mo Pass</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 border border-blue-200 text-[#0066cc] font-semibold">PRO</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenDashboard ? onOpenDashboard('simulator') : undefined}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Launch App
                  </button>
                </li>
                <li>
                  <a href="#wall-of-love" className="hover:text-black transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="max-w-7xl mx-auto mt-12 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} OpenOrSkip · Built for solo founders
          </p>
          <p className="text-sm text-neutral-500">
            All rights reserved. Zero audience list burn.
          </p>
        </div>

        {/* Giant Stroke Brand Text watermark */}
        <div className="relative mt-2">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-56 bg-slate-100 rounded-full blur-[100px] pointer-events-none" />
          <h1
            className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(2.5rem,13vw,12rem)] [-webkit-text-stroke:1px_#D4D4D4] mt-6 select-none tracking-tight pointer-events-none"
          >
            OpenOrSkip
          </h1>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
