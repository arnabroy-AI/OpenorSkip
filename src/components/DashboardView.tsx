import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { UserJourneyBar } from './UserJourneyBar.tsx';
import { PreSendSimulator } from './PreSendSimulator.tsx';
import { ResultsDisplay } from './ResultsDisplay.tsx';
import { PreSendChecklist } from './PreSendChecklist.tsx';
import { PersonaPanel } from './PersonaPanel.tsx';
import { InboxPreview } from './InboxPreview.tsx';
import { ValidationSuite } from './ValidationSuite.tsx';
import { PricingSection } from './PricingSection.tsx';
import { SimulationResponse, Persona } from '../types.ts';
import { 
  ArrowLeft, 
  HelpCircle, 
  Zap, 
  Users, 
  Inbox, 
  CheckCircle2, 
  Sliders, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export type DashboardTab = 'simulator' | 'personas' | 'inbox' | 'validation' | 'pricing';

interface DashboardViewProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  onBackToLanding: () => void;
  onOpenTour: () => void;
  onOpenPricing: () => void;
  titles: string[];
  setTitles: (titles: string[]) => void;
  selectedCohort: string;
  setSelectedCohort: (c: string) => void;
  sampleSize: number;
  setSampleSize: (s: number) => void;
  isLoading: boolean;
  onRunSimulation: (customTitles?: string[]) => void;
  onGenerateAlternatives: (draftTitle: string) => void;
  isGeneratingAlts: boolean;
  alternativeSuggestions: string[];
  onApplyAlternative: (index: number, text: string) => void;
  simulationResult: SimulationResponse | null;
  allPersonas: Persona[];
  onDrilldownPersona: (personaId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeTab,
  setActiveTab,
  onBackToLanding,
  onOpenTour,
  onOpenPricing,
  titles,
  setTitles,
  selectedCohort,
  setSelectedCohort,
  sampleSize,
  setSampleSize,
  isLoading,
  onRunSimulation,
  onGenerateAlternatives,
  isGeneratingAlts,
  alternativeSuggestions,
  onApplyAlternative,
  simulationResult,
  allPersonas,
  onDrilldownPersona
}) => {
  const [hasDismissedQuickBanner, setHasDismissedQuickBanner] = useState(false);

  // Calculate current stage for the user journey progress bar
  const currentStage: 1 | 2 | 3 | 4 = isLoading
    ? 3
    : simulationResult
    ? 4
    : titles.filter(t => t.trim().length > 0).length >= 2
    ? 2
    : 1;

  return (
    <div className="min-h-screen bg-[#fafafc] text-[#1b1b1d] flex flex-col">
      
      {/* DASHBOARD TOP BAR */}
      <header className="sticky top-0 z-40 w-full border-b border-[#e0e0e0] bg-[#ffffff]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[56px] max-w-[1360px] items-center justify-between px-4 sm:px-8">
          
          {/* Left: Brand + Breadcrumb + Back Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#7a7a7a] hover:text-[#0066cc] transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-[#f0f0f2]"
              title="Return to marketing landing page"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Marketing Site</span>
            </button>

            <span className="text-[#d0d0d0] hidden sm:inline">/</span>

            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6" size={24} />
              <span className="font-semibold text-[17px] text-[#1b1b1d] tracking-tight">
                OpenOrSkip
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full ml-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                40 Personas Ready
              </span>
            </div>
          </div>

          {/* Center: Dashboard Workspace Tabs */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-[#414753] bg-[#f5f5f7] p-1 rounded-xl border border-[#e0e0e0]">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-white text-[#0066cc] font-semibold shadow-xs'
                  : 'hover:text-[#1b1b1d]'
              }`}
            >
              Pre-Send Simulator
            </button>

            <button
              onClick={() => setActiveTab('personas')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'personas'
                  ? 'bg-white text-[#0066cc] font-semibold shadow-xs'
                  : 'hover:text-[#1b1b1d]'
              }`}
            >
              <span>40 Founder Personas</span>
              <span className="text-[10px] bg-[#0066cc]/10 text-[#0066cc] px-1.5 py-0.2 rounded-full font-bold">
                40
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'inbox'
                  ? 'bg-white text-[#0066cc] font-semibold shadow-xs'
                  : 'hover:text-[#1b1b1d]'
              }`}
            >
              Inbox Preview
            </button>

            <button
              onClick={() => setActiveTab('validation')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'validation'
                  ? 'bg-white text-[#0066cc] font-semibold shadow-xs'
                  : 'hover:text-[#1b1b1d]'
              }`}
            >
              Validation Gates
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'pricing'
                  ? 'bg-white text-[#0066cc] font-semibold shadow-xs'
                  : 'hover:text-[#1b1b1d]'
              }`}
            >
              Plan ($9/mo)
            </button>
          </nav>

          {/* Right Header Tools */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenTour}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#414753] hover:text-[#0066cc] transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-[#f0f0f2]"
              title="Open step-by-step product tour"
            >
              <HelpCircle className="h-4 w-4 text-[#0066cc]" />
              <span className="hidden sm:inline">Tour</span>
            </button>

            <button
              onClick={onOpenPricing}
              className="hidden sm:inline-flex items-center gap-1 text-[12px] font-semibold text-[#0066cc] bg-[#0066cc]/10 hover:bg-[#0066cc]/15 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Pro Plan ($9)</span>
            </button>

            <button
              onClick={() => onRunSimulation()}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0066cc] px-4 py-1.5 text-[13px] font-semibold text-white transition-all hover:bg-[#004e9f] active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span>{isLoading ? 'Simulating...' : 'Run (15s)'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto border-t border-[#e0e0e0] px-4 py-1.5 gap-2 bg-[#fcf8fb] text-[13px]">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-[#0066cc] text-white font-semibold' : 'text-[#414753]'
            }`}
          >
            Simulator
          </button>
          <button
            onClick={() => setActiveTab('personas')}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              activeTab === 'personas' ? 'bg-[#0066cc] text-white font-semibold' : 'text-[#414753]'
            }`}
          >
            40 Personas
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              activeTab === 'inbox' ? 'bg-[#0066cc] text-white font-semibold' : 'text-[#414753]'
            }`}
          >
            Inbox Preview
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              activeTab === 'validation' ? 'bg-[#0066cc] text-white font-semibold' : 'text-[#414753]'
            }`}
          >
            Validation
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              activeTab === 'pricing' ? 'bg-[#0066cc] text-white font-semibold' : 'text-[#414753]'
            }`}
          >
            Pricing
          </button>
        </div>
      </header>

      {/* WORKSPACE CONTENT AREA */}
      <main className="flex-1 mx-auto max-w-[1360px] w-full px-4 sm:px-8 py-8">
        
        {/* TAB 1: PRE-SEND DECISION ENGINE SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-8">
            
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e0e0e0] pb-4">
              <div>
                <h1 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight">
                  Tuesday Pre-Send Workspace
                </h1>
                <p className="text-[13px] text-[#7a7a7a]">
                  Test 2–3 subject lines against 40 niche bootstrapped founders in 15 seconds.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[12px] text-[#7a7a7a] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#0066cc]" />
                  Zero list burn · Real statistical signal
                </span>
              </div>
            </div>

            {/* User Journey Stepper Bar */}
            <UserJourneyBar
              currentStage={currentStage}
              onStartTour={onOpenTour}
              onLoadPreset={() => {}}
            />

            {/* Quick Onboarding Explainer Card (Dismissible) */}
            {!hasDismissedQuickBanner && (
              <div className="rounded-[16px] bg-[#ffffff] border border-[#e0e0e0] p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0066cc]/10 text-[#0066cc] font-bold text-[13px] shrink-0 mt-0.5">
                    ?
                  </span>
                  <div>
                    <div className="text-[13px] font-semibold text-[#1b1b1d]">
                      How the 15-second simulation works:
                    </div>
                    <div className="text-[12px] text-[#414753] mt-0.5 space-x-1">
                      <span>1. Paste your 2–3 title variants.</span>
                      <span>·</span>
                      <span>2. 40 bootstrapped founders decide whether to open or delete.</span>
                      <span>·</span>
                      <span>3. Send the winning subject line with absolute confidence.</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={onOpenTour}
                    className="text-[12px] font-semibold text-[#0066cc] hover:underline cursor-pointer"
                  >
                    Take tour →
                  </button>
                  <button
                    onClick={() => setHasDismissedQuickBanner(true)}
                    className="text-[12px] text-[#7a7a7a] hover:text-[#1b1b1d] ml-2 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Pre-Send Simulator Form */}
            <PreSendSimulator
              titles={titles}
              setTitles={setTitles}
              selectedCohort={selectedCohort}
              setSelectedCohort={setSelectedCohort}
              sampleSize={sampleSize}
              setSampleSize={setSampleSize}
              isLoading={isLoading}
              onRunSimulation={() => onRunSimulation()}
              onGenerateAlternatives={onGenerateAlternatives}
              isGeneratingAlts={isGeneratingAlts}
              alternativeSuggestions={alternativeSuggestions}
              onApplyAlternative={onApplyAlternative}
            />

            {/* Results Display */}
            {simulationResult && (
              <div id="results-view" className="space-y-6">
                <ResultsDisplay
                  simulation={simulationResult}
                  onDrilldownPersona={onDrilldownPersona}
                />

                {/* Pre-Send Flight Checklist */}
                <PreSendChecklist
                  winnerTitle={simulationResult.titleResults[simulationResult.winnerIndex]?.titleText || ''}
                  winnerLetter={String.fromCharCode(65 + simulationResult.winnerIndex)}
                  liftPercent={simulationResult.expectedLiftPercent}
                  openCount={simulationResult.titleResults[simulationResult.winnerIndex]?.opens || 0}
                  totalPersonas={simulationResult.sampleSize}
                />
              </div>
            )}

          </div>
        )}

        {/* TAB 2: 40 FOUNDER PERSONAS DIRECTORY */}
        {activeTab === 'personas' && (
          <div className="space-y-6">
            <div className="border-b border-[#e0e0e0] pb-4">
              <h1 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight">
                40 Bootstrapped Founder Personas
              </h1>
              <p className="text-[13px] text-[#7a7a7a]">
                Inspect the calibrated profiles, revenue brackets ($0 to $50k MRR), and gut reactions to your titles.
              </p>
            </div>

            <PersonaPanel
              personas={allPersonas}
              titles={titles}
              titleResults={simulationResult?.titleResults || []}
              winnerIndex={simulationResult?.winnerIndex || 0}
            />
          </div>
        )}

        {/* TAB 3: INBOX PREVIEW & FOLD TRUNCATION */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            <div className="border-b border-[#e0e0e0] pb-4">
              <h1 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight">
                Inbox Preview & Mobile Cutoff Fold
              </h1>
              <p className="text-[13px] text-[#7a7a7a]">
                Preview how your subject lines look on iPhone Mail, Gmail, and Superhuman before sending.
              </p>
            </div>

            <InboxPreview
              titles={titles}
              winnerIndex={simulationResult?.winnerIndex || 0}
            />
          </div>
        )}

        {/* TAB 4: 5 EMPIRICAL VALIDATION GATES */}
        {activeTab === 'validation' && (
          <div className="space-y-6">
            <div className="border-b border-[#e0e0e0] pb-4">
              <h1 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight">
                Empirical Validation Gates
              </h1>
              <p className="text-[13px] text-[#7a7a7a]">
                Track the 5 validation tests and run historical backtests on your past 5 newsletter issues.
              </p>
            </div>

            <ValidationSuite />
          </div>
        )}

        {/* TAB 5: PRICING & SUBSCRIPTION */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="border-b border-[#e0e0e0] pb-4">
              <h1 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight">
                Subscription & Pricing
              </h1>
              <p className="text-[13px] text-[#7a7a7a]">
                $9/month flat pricing. Unlimited pre-send simulations. No per-seat or subscriber-tier gouging.
              </p>
            </div>

            <PricingSection onOpenCheckout={onOpenPricing} />
          </div>
        )}

      </main>

      {/* DASHBOARD BOTTOM BAR */}
      <footer className="border-t border-[#e0e0e0] bg-white py-4 px-4 sm:px-8 text-[12px] text-[#7a7a7a]">
        <div className="mx-auto max-w-[1360px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="text-[#0066cc] font-medium hover:underline cursor-pointer"
            >
              ← Marketing Landing Page
            </button>
            <span>·</span>
            <span>OpenOrSkip v2.4 (Fast Decision Engine)</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenTour} className="hover:text-[#1b1b1d] cursor-pointer">
              Interactive Tour
            </button>
            <button onClick={onOpenPricing} className="hover:text-[#1b1b1d] cursor-pointer">
              $9/mo Plan
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
