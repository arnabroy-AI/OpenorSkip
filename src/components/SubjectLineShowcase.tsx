import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Check, X } from 'lucide-react';

interface ShowcaseItem {
  category: string;
  beforeTitle: string;
  beforeOpens: number;
  beforeRate: string;
  beforeProblem: string;
  afterTitle: string;
  afterOpens: number;
  afterRate: string;
  afterAdvantage: string;
  lift: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    category: 'Tuesday Growth Issue',
    beforeTitle: 'Some thoughts on growth this week',
    beforeOpens: 9,
    beforeRate: '22.5%',
    beforeProblem: 'Passive and low-urgency. Sounds like a private diary entry.',
    afterTitle: 'How I got my first 100 paying users',
    afterOpens: 28,
    afterRate: '70.0%',
    afterAdvantage: 'Specific proof milestone. Triggers immediate founder curiosity.',
    lift: '+211% Lift'
  },
  {
    category: 'Onboarding Teardown',
    beforeTitle: 'Newsletter #14: Onboarding advice',
    beforeOpens: 12,
    beforeRate: '30.0%',
    beforeProblem: 'Issue numbering wastes prime 20 characters before mobile fold.',
    afterTitle: 'Steal our onboarding email sequence (42% conversion)',
    afterOpens: 27,
    afterRate: '67.5%',
    afterAdvantage: 'Actionable swipe-file promise with hard conversion benchmark.',
    lift: '+125% Lift'
  },
  {
    category: 'Architecture / DevTool',
    beforeTitle: 'Database updates and tech stack changes',
    beforeOpens: 11,
    beforeRate: '27.5%',
    beforeProblem: 'Sounds like a company changelog rather than founder value.',
    afterTitle: 'Why we switched back to Postgres (and saved $2,400/mo)',
    afterOpens: 30,
    afterRate: '75.0%',
    afterAdvantage: 'Contrarian technical decision with exact monthly dollar savings.',
    lift: '+172% Lift'
  }
];

interface SubjectLineShowcaseProps {
  onLoadExample: (titles: string[]) => void;
}

export const SubjectLineShowcase: React.FC<SubjectLineShowcaseProps> = ({
  onLoadExample
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const item = SHOWCASE_ITEMS[selectedIdx];

  const handleApply = (idx: number) => {
    setSelectedIdx(idx);
    const sel = SHOWCASE_ITEMS[idx];
    onLoadExample([sel.afterTitle, sel.beforeTitle]);
  };

  return (
    <section className="w-full bg-[#fcf8fb] border-b border-[#e0e0e0] py-16 px-4 sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e0e0e0]/70 pb-6 mb-8">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] mb-1">
              Before & After Teardowns
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1b1b1d] tracking-tight">
              Real Title Shifts That Doubled Open Rates
            </h2>
            <p className="text-[15px] text-[#7a7a7a] mt-1">
              See what happens when you replace passive musings with concrete founder leverage.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f5f5f7] rounded-full border border-[#e0e0e0]/60">
            {SHOWCASE_ITEMS.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => handleApply(idx)}
                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                  selectedIdx === idx
                    ? 'bg-white text-[#1b1b1d] font-semibold shadow-sm'
                    : 'text-[#7a7a7a] hover:text-[#1b1b1d]'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Showcase Card */}
        <div className="rounded-[22px] bg-white border border-[#e0e0e0] p-6 sm:p-9 shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Before (The Gut-Feel Title) */}
            <div className="rounded-[16px] bg-[#fafafc] border border-[#e0e0e0] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a] flex items-center gap-1">
                    <X className="h-3.5 w-3.5" /> Gut-Feel Version (Skipped)
                  </span>
                  <span className="text-[12px] text-[#7a7a7a]">
                    {item.beforeOpens}/40 Opens
                  </span>
                </div>

                <div className="text-[18px] font-semibold text-[#1b1b1d] mb-2 leading-snug">
                  &ldquo;{item.beforeTitle}&rdquo;
                </div>

                <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
                  {item.beforeProblem}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e0e0e0]/70 flex items-baseline justify-between">
                <span className="text-[12px] text-[#7a7a7a]">Predicted Open Rate</span>
                <span className="text-[26px] font-bold text-[#ba1a1a] tabular-nums">
                  {item.beforeRate}
                </span>
              </div>
            </div>

            {/* After (The Decision-Engine Winner) */}
            <div className="rounded-[16px] bg-[#0066cc]/5 border-2 border-[#0066cc] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066cc] flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> OpenOrSkip Winner
                  </span>
                  <span className="text-[12px] font-bold text-[#0066cc]">
                    {item.afterOpens}/40 Opens
                  </span>
                </div>

                <div className="text-[18px] font-semibold text-[#1b1b1d] mb-2 leading-snug">
                  &ldquo;{item.afterTitle}&rdquo;
                </div>

                <p className="text-[13px] text-[#414753] leading-relaxed">
                  {item.afterAdvantage}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0066cc]/20 flex items-baseline justify-between">
                <div>
                  <span className="text-[12px] text-[#0066cc] font-semibold">Predicted Open Rate</span>
                  <div className="text-[11px] text-[#004e9f] font-bold">{item.lift}</div>
                </div>
                <span className="text-[26px] font-bold text-[#0066cc] tabular-nums">
                  {item.afterRate}
                </span>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-[#e0e0e0]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[13px] text-[#7a7a7a]">
              Want to see how your own newsletter headlines hold up against 40 founders?
            </span>

            <button
              onClick={() => handleApply(selectedIdx)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0066cc] px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-[#004e9f] transition-all cursor-pointer"
            >
              Load into Decision Engine
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
