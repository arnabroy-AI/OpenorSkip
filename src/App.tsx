import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage.tsx';
import { DashboardView, DashboardTab } from './components/DashboardView.tsx';
import { OnboardingTour } from './components/OnboardingTour.tsx';
import { PricingModal } from './components/PricingModal.tsx';
import { SmoothCursor } from './components/ui/smooth-cursor.tsx';
import { SimulationResponse, Persona } from './types.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('dashboard')) {
      return 'dashboard';
    }
    return 'landing';
  });

  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('simulator');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Simulation Form State
  const [titles, setTitles] = useState<string[]>([
    'How I got my first 100 paying users',
    'Some thoughts on growth this week',
    'Steal our onboarding email sequence (42% conversion)'
  ]);
  const [selectedCohort, setSelectedCohort] = useState<string>('bootstrapped_founders');
  const [sampleSize, setSampleSize] = useState<number>(40);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingAlts, setIsGeneratingAlts] = useState<boolean>(false);
  const [alternativeSuggestions, setAlternativeSuggestions] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResponse | null>(null);
  const [allPersonas, setAllPersonas] = useState<Persona[]>([]);

  // Hash change synchronization
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('dashboard')) {
        setCurrentView('dashboard');
      } else if (window.location.hash === '' || window.location.hash === '#') {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch initial personas & run baseline simulation on mount
  useEffect(() => {
    fetch('/api/personas')
      .then(res => res.json())
      .then(data => {
        if (data.personas) {
          setAllPersonas(data.personas);
        }
      })
      .catch(err => console.warn('Could not fetch personas:', err));

    // Run baseline simulation for immediate interactive results
    handleRunSimulation();

    // Check if user has seen tour before
    const seenTour = localStorage.getItem('openorskip_tour_seen');
    if (!seenTour) {
      const timer = setTimeout(() => {
        setIsTourOpen(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('openorskip_tour_seen', 'true');
  };

  const handleOpenDashboard = (tab?: DashboardTab) => {
    if (tab) {
      setDashboardTab(tab);
    }
    setCurrentView('dashboard');
    window.location.hash = 'dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunSimulation = async (customTitles?: string[]) => {
    const titlesToRun = customTitles || titles;
    setIsLoading(true);
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titles: titlesToRun,
          cohort: selectedCohort,
          sampleSize,
          newsletterContext: 'Tuesday morning founder newsletter'
        })
      });

      if (!res.ok) {
        throw new Error(`Simulation failed: ${res.statusText}`);
      }

      const data: SimulationResponse = await res.json();
      setSimulationResult(data);
      if (data.personas) {
        setAllPersonas(data.personas);
      }
    } catch (err) {
      console.error('Failed to run simulation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAlternatives = async (draftTitle: string) => {
    setIsGeneratingAlts(true);
    try {
      const res = await fetch('/api/generate-alternatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftTitle,
          issueTopic: 'Founder lessons and growth tactics'
        })
      });
      const data = await res.json();
      if (Array.isArray(data.suggestions)) {
        setAlternativeSuggestions(data.suggestions);
      }
    } catch (err) {
      console.warn('Could not generate alternatives:', err);
    } finally {
      setIsGeneratingAlts(false);
    }
  };

  const handleApplyAlternative = (index: number, text: string) => {
    const updated = [...titles];
    updated[index] = text;
    setTitles(updated);
  };

  const handleDrilldownPersona = (personaId: string) => {
    setDashboardTab('personas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTourRunSample = () => {
    handleCloseTour();
    setDashboardTab('simulator');
    setCurrentView('dashboard');
    window.location.hash = 'dashboard';
    const sample = [
      'How I got my first 100 paying users',
      'Some thoughts on growth this week',
      'Steal our onboarding email sequence (42% conversion)'
    ];
    setTitles(sample);
    handleRunSimulation(sample);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* MagicUI Physics-based Smooth Cursor */}
      <SmoothCursor />
      
      {/* RENDER EITHER LANDING PAGE OR DASHBOARD */}
      {currentView === 'landing' ? (
        <LandingPage
          onOpenDashboard={handleOpenDashboard}
          onOpenTour={() => setIsTourOpen(true)}
          onOpenPricing={() => setIsPricingOpen(true)}
          titles={titles}
          setTitles={setTitles}
          onQuickRun={(customTitles) => {
            handleRunSimulation(customTitles);
          }}
        />
      ) : (
        <DashboardView
          activeTab={dashboardTab}
          setActiveTab={setDashboardTab}
          onBackToLanding={handleBackToLanding}
          onOpenTour={() => setIsTourOpen(true)}
          onOpenPricing={() => setIsPricingOpen(true)}
          titles={titles}
          setTitles={setTitles}
          selectedCohort={selectedCohort}
          setSelectedCohort={setSelectedCohort}
          sampleSize={sampleSize}
          setSampleSize={setSampleSize}
          isLoading={isLoading}
          onRunSimulation={handleRunSimulation}
          onGenerateAlternatives={handleGenerateAlternatives}
          isGeneratingAlts={isGeneratingAlts}
          alternativeSuggestions={alternativeSuggestions}
          onApplyAlternative={handleApplyAlternative}
          simulationResult={simulationResult}
          allPersonas={allPersonas}
          onDrilldownPersona={handleDrilldownPersona}
        />
      )}

      {/* Interactive 5-Step Onboarding Walkthrough Tour */}
      <OnboardingTour
        isOpen={isTourOpen}
        onClose={handleCloseTour}
        onSelectSampleAndRun={handleTourRunSample}
      />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

    </div>
  );
}
