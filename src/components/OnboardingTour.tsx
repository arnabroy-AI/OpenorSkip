import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, HelpCircle, Inbox, Users, BarChart3, Smartphone } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSampleAndRun?: () => void;
}

interface TourStep {
  title: string;
  badge: string;
  description: string;
  detailPoints: string[];
  graphicType: 'dilemma' | 'input' | 'personas' | 'counts' | 'inbox';
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'The Tuesday Morning Dilemma',
    badge: 'Step 1 of 5 · The Problem',
    description: 'You finish writing your Tuesday newsletter at 8:40 AM and spend 20 minutes paralyzed between two titles.',
    detailPoints: [
      'Option A: "How I got my first 100 paying users"',
      'Option B: "Some thoughts on growth this week"',
      'If you have under 1,000 subscribers, a traditional A/B split-test starves your reach. You find out the open rate the next afternoon when it’s already too late.'
    ],
    graphicType: 'dilemma'
  },
  {
    title: 'Input 2 or 3 Competing Titles',
    badge: 'Step 2 of 5 · The Input',
    description: 'Paste your draft subject lines. The engine immediately flags mobile screen character limits.',
    detailPoints: [
      'Compare 2 or 3 options side-by-side.',
      'Mobile cutoff warning: iPhone Mail truncates around ~40 characters.',
      'One-click "Generate Variations" creates high-converting alternatives with specific proof and curiosity hooks.'
    ],
    graphicType: 'input'
  },
  {
    title: 'One Niche Audience, Not 10,000 Strangers',
    badge: 'Step 3 of 5 · The Panel',
    description: 'Unlike broad AI tools (like JevTown) that poll 10,000 generic users, OpenOrSkip calibrates to one exact niche.',
    detailPoints: [
      'Default panel: 40 real bootstrapped founder personas ($0–$50k MRR).',
      'High-skepticism profiles who delete 85% of generic marketing emails.',
      'Every persona has an explicit business bottleneck, inbox habit, and time-sensitivity rating.'
    ],
    graphicType: 'personas'
  },
  {
    title: 'Hard Counts Instead of Paragraphs',
    badge: 'Step 4 of 5 · The Decision',
    description: 'Your choice becomes an unequivocal number in 15 seconds, not a 3-page opinion memo.',
    detailPoints: [
      'Exact Open, Skip, and Confusion counts across the 40 personas.',
      'Word-Level Attention Heatmap reveals exact trigger words (e.g. +first 100 paying users vs -some thoughts on).',
      'Clear winner declaration with expected open rate lift percentage.'
    ],
    graphicType: 'counts'
  },
  {
    title: 'Inbox Truncation & Send with Confidence',
    badge: 'Step 5 of 5 · Ready to Send',
    description: 'Inspect your winning title in real mobile & desktop inboxes, copy it in 1 click, and hit Send.',
    detailPoints: [
      'Instant copy-to-clipboard for Substack, Beehiiv, Mailchimp, or ConvertKit.',
      'Verified mobile fold view so no punchline gets cut off on phone screens.',
      'Full validation suite to backtest your last 5 issues against real past open rates.'
    ],
    graphicType: 'inbox'
  }
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onSelectSampleAndRun
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentStepIndex < TOUR_STEPS.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex, onClose]);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      if (onSelectSampleAndRun) onSelectSampleAndRun();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-[24px] bg-[#ffffff] border border-[#e0e0e0] p-6 sm:p-9 shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#e0e0e0]/70 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" size={24} />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc]">
              {currentStep.badge}
            </span>
            <span className="text-[#7a7a7a]">·</span>
            <span className="text-[12px] text-[#7a7a7a]">Interactive Walkthrough</span>
          </div>

          <button
            onClick={onClose}
            className="text-[#7a7a7a] hover:text-[#1b1b1d] transition-colors p-1.5 rounded-full hover:bg-[#f5f5f7] cursor-pointer"
            title="Close walkthrough"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-5">
          <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#1b1b1d] tracking-tight leading-snug">
            {currentStep.title}
          </h3>

          <p className="text-[16px] text-[#414753] leading-relaxed">
            {currentStep.description}
          </p>

          {/* Graphical Concept Box */}
          <div className="rounded-[16px] bg-[#fafafc] border border-[#e0e0e0] p-5">
            {currentStep.graphicType === 'dilemma' && (
              <div className="space-y-2.5 text-[14px]">
                <div className="flex items-center justify-between p-3 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <span className="font-semibold text-[#1b1b1d]">Title A: &ldquo;How I got my first 100 paying users&rdquo;</span>
                  <span className="text-[12px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded-full">Specific & Proof</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <span className="font-semibold text-[#7a7a7a]">Title B: &ldquo;Some thoughts on growth this week&rdquo;</span>
                  <span className="text-[12px] font-bold text-[#ba1a1a] bg-[#ba1a1a]/10 px-2 py-0.5 rounded-full">Vague & Skipped</span>
                </div>
              </div>
            )}

            {currentStep.graphicType === 'input' && (
              <div className="space-y-2 text-[13px]">
                <div className="flex items-center justify-between text-[#7a7a7a] px-1">
                  <span>Input Field</span>
                  <span className="text-[#883700] font-medium">38 / 40 Chars (Optimal Mobile Range)</span>
                </div>
                <div className="p-3 bg-white rounded-[10px] border border-[#0066cc] font-mono text-[14px] text-[#1b1b1d]">
                  How I got my first 100 paying users
                </div>
              </div>
            )}

            {currentStep.graphicType === 'personas' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[12px]">
                <div className="p-2.5 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <div className="font-semibold text-[#1b1b1d]">Liam Vance</div>
                  <div className="text-[11px] text-[#0066cc]">$4.2k MRR</div>
                  <div className="text-[10px] text-[#7a7a7a] mt-0.5">Micro-SaaS</div>
                </div>
                <div className="p-2.5 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <div className="font-semibold text-[#1b1b1d]">Elena Rostova</div>
                  <div className="text-[11px] text-[#0066cc]">$12k MRR</div>
                  <div className="text-[10px] text-[#7a7a7a] mt-0.5">Solo AI Tool</div>
                </div>
                <div className="p-2.5 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <div className="font-semibold text-[#1b1b1d]">Marcus Chen</div>
                  <div className="text-[11px] text-[#0066cc]">$850 MRR</div>
                  <div className="text-[10px] text-[#7a7a7a] mt-0.5">DevTool</div>
                </div>
                <div className="p-2.5 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <div className="font-semibold text-[#1b1b1d]">+37 More</div>
                  <div className="text-[11px] text-[#7a7a7a]">Niche Cohort</div>
                  <div className="text-[10px] text-[#7a7a7a] mt-0.5">Total 40</div>
                </div>
              </div>
            )}

            {currentStep.graphicType === 'counts' && (
              <div className="flex items-center justify-around text-center py-1">
                <div>
                  <div className="text-[28px] font-bold text-[#0066cc] tabular-nums">28 / 40</div>
                  <div className="text-[11px] font-semibold uppercase text-[#7a7a7a]">Would Open Title A</div>
                </div>
                <div className="h-8 w-px bg-[#e0e0e0]" />
                <div>
                  <div className="text-[28px] font-bold text-[#1b1b1d] tabular-nums">10 / 40</div>
                  <div className="text-[11px] font-semibold uppercase text-[#7a7a7a]">Would Skip</div>
                </div>
                <div className="h-8 w-px bg-[#e0e0e0]" />
                <div>
                  <div className="text-[28px] font-bold text-[#0066cc] tabular-nums">+133%</div>
                  <div className="text-[11px] font-semibold uppercase text-[#7a7a7a]">Expected Lift</div>
                </div>
              </div>
            )}

            {currentStep.graphicType === 'inbox' && (
              <div className="p-3 bg-white rounded-[10px] border border-[#e0e0e0] flex items-center justify-between text-[13px]">
                <div className="truncate pr-4">
                  <span className="font-semibold text-[#1b1b1d]">The Bootstrapped Letter: </span>
                  <span className="font-medium text-[#0066cc]">How I got my first 100 paying users</span>
                </div>
                <span className="text-[11px] font-mono text-[#7a7a7a] shrink-0">8:30 AM</span>
              </div>
            )}

            {/* Bullet Points */}
            <ul className="mt-4 space-y-1.5 text-[13px] text-[#414753]">
              {currentStep.detailPoints.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <span className="text-[#0066cc] font-bold shrink-0">·</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Navigation & Controls */}
        <div className="mt-8 pt-5 border-t border-[#e0e0e0]/70 flex items-center justify-between">
          
          {/* Step Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentStepIndex === idx ? 'w-6 bg-[#0066cc]' : 'w-2 bg-[#e0e0e0] hover:bg-[#7a7a7a]'
                }`}
                title={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-1 rounded-full border border-[#e0e0e0] bg-white px-4 py-2 text-[14px] font-medium text-[#414753] hover:bg-[#f5f5f7] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0066cc] px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-[#004e9f] transition-all cursor-pointer shadow-none"
            >
              {isLastStep ? (
                <>
                  <Check className="h-4 w-4" />
                  Try Live Simulation Now
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
