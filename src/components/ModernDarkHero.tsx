import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

interface ModernDarkHeroProps {
  onOpenDashboard: (tab?: 'simulator' | 'personas' | 'inbox' | 'validation' | 'pricing') => void;
  onOpenTour: () => void;
  onOpenPricing: () => void;
}

export const ModernDarkHero: React.FC<ModernDarkHeroProps> = ({
  onOpenDashboard,
  onOpenTour,
  onOpenPricing,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative font-['Poppins',sans-serif] bg-gradient-to-b from-[#fbfbfe] via-white to-[#fafafc] text-[#1b1b1d] overflow-hidden pb-16 sm:pb-24 border-b border-[#e0e0e0]">
      
      {/* 1. TOP NAVBAR (LIGHT MOTION BACKDROP) */}
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 bg-white/85 backdrop-blur-md text-[#1b1b1d] text-sm border-b border-[#e0e0e0] transition-colors shadow-2xs">
        
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left font-semibold text-[19px] tracking-tight hover:text-purple-600 transition cursor-pointer group"
        >
          <Logo className="h-7 w-7 transition-transform group-hover:scale-105" size={28} />
          <span className="font-semibold text-[#1b1b1d] tracking-tight group-hover:text-purple-600 transition">
            OpenOrSkip
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 transition duration-500 text-neutral-600 text-sm font-medium">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-purple-600 transition cursor-pointer"
          >
            Home
          </a>
          <a
            href="#preview"
            className="hover:text-purple-600 transition cursor-pointer"
          >
            Simulator
          </a>
          <a
            href="#wall-of-love"
            className="hover:text-purple-600 transition cursor-pointer"
          >
            Stories
          </a>
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); onOpenPricing(); }}
            className="hover:text-purple-600 transition cursor-pointer"
          >
            Pricing
          </a>
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onOpenDashboard('simulator')}
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all rounded-full font-medium text-white shadow-md shadow-purple-600/25 cursor-pointer"
          >
            <span>Start free trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden active:scale-90 transition p-1 text-neutral-800 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Light Motion) */}
      <div
        className={`fixed inset-0 z-[100] bg-white/95 text-[#1b1b1d] backdrop-blur-md flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-purple-600 font-medium transition"
        >
          Home
        </a>
        <a
          href="#preview"
          onClick={() => setMobileMenuOpen(false)}
          className="hover:text-purple-600 font-medium transition"
        >
          Simulator
        </a>
        <a
          href="#wall-of-love"
          onClick={() => setMobileMenuOpen(false)}
          className="hover:text-purple-600 font-medium transition"
        >
          Stories
        </a>
        <a
          href="#pricing"
          onClick={() => { setMobileMenuOpen(false); onOpenPricing(); }}
          className="hover:text-purple-600 font-medium transition"
        >
          Pricing
        </a>

        <button
          onClick={() => { setMobileMenuOpen(false); onOpenDashboard('simulator'); }}
          className="px-7 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium shadow-md shadow-purple-600/30"
        >
          Start free trial
        </button>

        <button
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
          className="active:ring-2 active:ring-purple-400 aspect-square size-10 p-1 items-center justify-center bg-neutral-100 hover:bg-neutral-200 transition text-neutral-800 rounded-full flex mt-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* 2. HERO CONTENT (LIGHT MOTION CANVAS) */}
      <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-32">
        
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-28 -z-10 left-1/4 size-80 bg-purple-200/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-44 -z-10 right-1/4 size-80 bg-blue-100/60 rounded-full blur-[140px] pointer-events-none" />

        {/* User Avatars & 5-Star Rating */}
        <div className="flex items-center mt-32 sm:mt-40 flex-wrap justify-center gap-3">
          <div className="flex -space-x-2 pr-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="User"
              className="size-7 rounded-full border-2 border-white shadow-xs hover:-translate-y-0.5 transition z-10"
            />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="User"
              className="size-7 rounded-full border-2 border-white shadow-xs hover:-translate-y-0.5 transition z-20"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
              alt="User"
              className="size-7 rounded-full border-2 border-white shadow-xs hover:-translate-y-0.5 transition z-30"
            />
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User"
              className="size-7 rounded-full border-2 border-white shadow-xs hover:-translate-y-0.5 transition z-40"
            />
          </div>

          <div className="flex items-center gap-2">
            <svg width="79" height="16" viewBox="0 0 79 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.06923 1.47645C7.21819 1.0143 7.87205 1.0143 8.02101 1.47645L9.12739 4.90897C9.19397 5.11555 9.38623 5.25558 9.60328 5.25558H13.1921C13.6755 5.25558 13.8775 5.87334 13.4875 6.15896L10.5772 8.29045C10.4034 8.41777 10.3307 8.64213 10.3968 8.84722L11.5068 12.291C11.6555 12.7523 11.1265 13.1342 10.7354 12.8477L7.84056 10.7275C7.66466 10.5987 7.42558 10.5987 7.24968 10.7275L4.3548 12.8477C3.96374 13.1342 3.43477 12.7523 3.58348 12.291L4.69347 8.84722C4.75958 8.64213 4.68686 8.41777 4.51302 8.29045L1.60274 6.15896C1.21276 5.87334 1.41479 5.25558 1.89818 5.25558H5.48696C5.70401 5.25558 5.89627 5.11555 5.96285 4.90897L7.06923 1.47645Z" fill="#9810FA"/>
              <path d="M23.0536 1.47645C23.2026 1.0143 23.8564 1.0143 24.0054 1.47645L25.1118 4.90897C25.1783 5.11555 25.3706 5.25558 25.5877 5.25558H29.1764C29.6598 5.25558 29.8619 5.87334 29.4719 6.15896L26.5616 8.29045C26.3878 8.41777 26.315 8.64213 26.3811 8.84722L27.4911 12.291C27.6398 12.7523 27.1109 13.1342 26.7198 12.8477L23.8249 10.7275C23.649 10.5987 23.41 10.5987 23.2341 10.7275L20.3392 12.8477C19.9481 13.1342 19.4191 12.7523 19.5679 12.291L20.6778 8.84722C20.744 8.64213 20.6712 8.41777 20.4974 8.29045L17.5871 6.15896C17.1971 5.87334 17.3992 5.25558 17.8826 5.25558H21.4713C21.6884 5.25558 21.8806 5.11555 21.9472 4.90897L23.0536 1.47645Z" fill="#9810FA"/>
              <path d="M39.0224 1.47645C39.1713 1.0143 39.8252 1.0143 39.9741 1.47645L41.0805 4.90897C41.1471 5.11555 41.3394 5.25558 41.5564 5.25558H45.1452C45.6286 5.25558 45.8306 5.87334 45.4406 6.15896L42.5303 8.29045C42.3565 8.41777 42.2838 8.64213 42.3499 8.84722L43.4599 12.291C43.6086 12.7523 43.0796 13.1342 42.6886 12.8477L39.7937 10.7275C39.6178 10.5987 39.3787 10.5987 39.2028 10.7275L36.3079 12.8477C35.9169 13.1342 35.3879 12.7523 35.5366 12.291L36.6466 8.84722C36.7127 8.64213 36.64 8.41777 36.4661 8.29045L33.5559 6.15896C33.1659 5.87334 33.3679 5.25558 33.8513 5.25558H37.4401C37.6571 5.25558 37.8494 5.11555 37.916 4.90897L39.0224 1.47645Z" fill="#9810FA"/>
              <path d="M55.0067 1.47645C55.1557 1.0143 55.8096 1.0143 55.9585 1.47645L57.0649 4.90897C57.1315 5.11555 57.3237 5.25558 57.5408 5.25558H61.1296C61.613 5.25558 61.815 5.87334 61.425 6.15896L58.5147 8.29045C58.3409 8.41777 58.2682 8.64213 58.3343 8.84722L59.4443 12.291C59.593 12.7523 59.064 13.1342 58.6729 12.8477L55.7781 10.7275C55.6022 10.5987 55.3631 10.5987 55.1872 10.7275L52.2923 12.8477C51.9012 13.1342 51.3723 12.7523 51.521 12.291L52.631 8.84722C52.6971 8.64213 52.6244 8.41777 52.4505 8.29045L49.5402 6.15896C49.1503 5.87334 49.3523 5.25558 49.8357 5.25558H53.4245C53.6415 5.25558 53.8338 5.11555 53.9004 4.90897L55.0067 1.47645Z" fill="#9810FA"/>
              <path d="M70.9794 1.47645C71.1283 1.0143 71.7822 1.0143 71.9312 1.47645L73.0375 4.90897C73.1041 5.11555 73.2964 5.25558 73.5134 5.25558H77.1022C77.5856 5.25558 77.7876 5.87334 77.3977 6.15896L74.4874 8.29045C74.3135 8.41777 74.2408 8.64213 74.3069 8.84722L75.4169 12.291C75.5656 12.7523 75.0367 13.1342 74.6456 12.8477L71.7507 10.7275C71.5748 10.5987 71.3357 10.5987 71.1598 10.7275L68.265 12.8477C67.8739 13.1342 67.3449 12.7523 67.4936 12.291L68.6036 8.84722C68.6697 8.64213 68.597 8.41777 68.4232 8.29045L65.5129 6.15896C65.1229 5.87334 65.3249 5.25558 65.8083 5.25558H69.3971C69.6142 5.25558 69.8064 5.11555 69.873 4.90897L70.9794 1.47645Z" fill="#9810FA"/>
            </svg>
            <p className="text-sm text-neutral-600">
              Used by <span className="font-semibold text-neutral-900">100,000+</span> users
            </p>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#1b1b1d] max-w-3xl text-center mt-6 leading-[1.2] sm:leading-[1.12]">
          Automation designed to make life easier
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-center text-[#52525b] max-w-xl mt-4 leading-relaxed font-normal">
          No complexity. No noise. Just clean, reliable automation to boost your team’s efficiency.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onOpenDashboard('simulator')}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-7 h-11 font-medium transition active:scale-95 shadow-md shadow-purple-600/25 flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Get started</span>
          </button>

          <button
            onClick={onOpenTour}
            className="flex items-center gap-2 border border-purple-200 bg-white hover:bg-purple-50/70 transition rounded-full px-6 h-11 text-purple-950 font-medium shadow-2xs cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
            </svg>
            <span>Watch demo</span>
          </button>
        </div>

        {/* 3. LIGHT MOTION DASHBOARD SHOWCASE */}
        <div className="w-full max-w-5xl mt-14 sm:mt-16 rounded-[18px] border border-neutral-200/90 bg-white shadow-2xl shadow-purple-500/10 overflow-hidden relative group">
          
          {/* Subtle Top Accent Hairline */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

          {/* macOS Window Title Bar (Light) */}
          <div className="h-10 bg-[#fafafc] border-b border-neutral-200 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="flex items-center gap-2 ml-4 pl-3 border-l border-neutral-200">
                <Logo className="h-3.5 w-3.5" size={14} />
                <span className="text-[12px] font-semibold text-neutral-800">OpenOrSkip Decision Engine</span>
                <span className="text-[10px] text-neutral-400 hidden sm:inline">v2.4 Pro</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>40 Founders Live</span>
              </span>
              <span className="text-neutral-500 hidden sm:inline">15s Latency</span>
            </div>
          </div>

          {/* Main Dashboard Canvas Body (Light Mode) */}
          <div className="p-4 sm:p-6 bg-[#ffffff] text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Decision Matrix (8 cols) */}
              <div className="lg:col-span-8 space-y-3.5">
                
                {/* Winner Title Option */}
                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 relative shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200">
                      ★ Recommended Winner
                    </span>
                    <span className="text-[20px] font-bold text-neutral-900 tabular-nums flex items-center gap-1.5">
                      <span className="text-emerald-600 text-sm font-semibold">+78.4%</span> 51.2%
                    </span>
                  </div>
                  <div className="text-[15px] sm:text-[16px] font-semibold text-neutral-900 tracking-tight">
                    Steal our onboarding email sequence (42% conversion)
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-neutral-600">
                    <span className="bg-white border border-neutral-200 px-2 py-0.5 rounded text-neutral-700 font-medium">48 chars (Mobile Safe)</span>
                    <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-medium">High Curated Interest</span>
                    <span className="bg-white border border-neutral-200 px-2 py-0.5 rounded text-neutral-700">19/40 Open Certain</span>
                  </div>
                </div>

                {/* Option B */}
                <div className="p-3.5 rounded-xl border border-neutral-200 bg-[#fafafc] hover:bg-white transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-neutral-500">Option B</span>
                    <span className="text-[14px] font-semibold text-neutral-800 tabular-nums">34.1% Open Rate</span>
                  </div>
                  <div className="text-[13px] sm:text-[14px] font-medium text-neutral-800">
                    How I got my first 100 paying users
                  </div>
                </div>

                {/* Option C */}
                <div className="p-3.5 rounded-xl border border-neutral-200 bg-[#fafafc] hover:bg-white transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-neutral-500">Option C</span>
                    <span className="text-[14px] font-semibold text-neutral-600 tabular-nums">28.0% (High Skip)</span>
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-neutral-600">
                    Some thoughts on growth this week
                  </div>
                </div>

              </div>

              {/* Right Column: Persona Reactions & Speed Matrix (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
                <div className="p-4 rounded-xl border border-neutral-200 bg-[#fafafc] space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Live Micro-Reactions
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2 text-[12px] bg-white p-2.5 rounded-lg border border-neutral-200/80 shadow-2xs">
                      <span className="size-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-neutral-900">SaaS Founder ($12k MRR):</span>
                        <span className="text-neutral-600 ml-1">"Numbers in parentheses always stand out in my morning triage."</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-[12px] bg-white p-2.5 rounded-lg border border-neutral-200/80 shadow-2xs">
                      <span className="size-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-neutral-900">Newsletter Writer (3k subs):</span>
                        <span className="text-neutral-600 ml-1">"'Steal' creates immediate tactical curiosity."</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Launch CTA Button */}
                <button
                  onClick={() => onOpenDashboard('simulator')}
                  className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-purple-600/20 active:scale-98"
                >
                  <span>Launch Live Decision Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ModernDarkHero;
