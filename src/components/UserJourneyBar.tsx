import React from 'react';
import { HelpCircle, Sparkles, CheckCircle2, ArrowRight, Play } from 'lucide-react';

interface UserJourneyBarProps {
  currentStage: 1 | 2 | 3 | 4;
  onStartTour: () => void;
  onLoadPreset: (presetIndex: number) => void;
}

export const UserJourneyBar: React.FC<UserJourneyBarProps> = ({
  currentStage,
  onStartTour,
  onLoadPreset
}) => {
  const steps = [
    { num: 1, label: 'Paste 2–3 Titles', hint: 'Draft options before send' },
    { num: 2, label: 'Select Audience', hint: '40 Founder Personas' },
    { num: 3, label: '15s Decision Run', hint: 'Structured open/skip counts' },
    { num: 4, label: 'Send with Confidence', hint: 'Verified mobile fold' },
  ];

  return (
    <div className="w-full bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Step progression */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 lg:pb-0">
          {steps.map((s, idx) => {
            const isCompleted = currentStage > s.num;
            const isCurrent = currentStage === s.num;

            return (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2.5 shrink-0">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-all ${
                      isCompleted
                        ? 'bg-[#0066cc] text-white'
                        : isCurrent
                        ? 'border-2 border-[#0066cc] text-[#0066cc] bg-[#0066cc]/10'
                        : 'border border-[#e0e0e0] text-[#7a7a7a] bg-[#fafafc]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                  </div>
                  <div>
                    <div
                      className={`text-[13px] font-semibold whitespace-nowrap ${
                        isCurrent ? 'text-[#0066cc]' : isCompleted ? 'text-[#1b1b1d]' : 'text-[#7a7a7a]'
                      }`}
                    >
                      {s.label}
                    </div>
                    <div className="text-[11px] text-[#7a7a7a] hidden sm:block whitespace-nowrap">
                      {s.hint}
                    </div>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <span className="text-[#e0e0e0] shrink-0 font-light hidden sm:inline">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Guided Tour Trigger & Quick presets */}
        <div className="flex items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#e0e0e0]/70 shrink-0">
          <button
            onClick={onStartTour}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e0e0e0] bg-[#fafafc] px-3.5 py-1.5 text-[12px] font-semibold text-[#1b1b1d] hover:bg-[#ffffff] hover:border-[#0066cc] hover:text-[#0066cc] transition-all cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#0066cc]" />
            Take 60s Guided Tour
          </button>
        </div>

      </div>
    </div>
  );
};
