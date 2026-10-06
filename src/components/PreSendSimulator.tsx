import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, ArrowRight, RotateCcw, Check, Zap } from 'lucide-react';

interface PreSendSimulatorProps {
  titles: string[];
  setTitles: (titles: string[]) => void;
  selectedCohort: string;
  setSelectedCohort: (cohort: string) => void;
  sampleSize: number;
  setSampleSize: (size: number) => void;
  isLoading: boolean;
  onRunSimulation: () => void;
  onGenerateAlternatives: (draftTitle: string) => void;
  isGeneratingAlts: boolean;
  alternativeSuggestions: string[];
  onApplyAlternative: (index: number, text: string) => void;
}

const PRESETS = [
  {
    label: 'Tuesday Growth Issue',
    cohort: 'bootstrapped_founders',
    titles: [
      'How I got my first 100 paying users',
      'Some thoughts on growth this week',
      'Steal our onboarding email sequence (42% conversion)'
    ]
  },
  {
    label: 'DevTool / Architecture',
    cohort: 'technical_founders',
    titles: [
      'Why we switched back to Postgres (and saved $2,400/mo)',
      'Infrastructure updates and database musings',
      'The 3 bugs that almost killed our launch'
    ]
  },
  {
    label: 'Pricing & Monetization',
    cohort: 'bootstrapped_founders',
    titles: [
      'Double your prices: the exact script that closed $14k',
      'Newsletter #18: Thoughts on value and pricing'
    ]
  }
];

export const PreSendSimulator: React.FC<PreSendSimulatorProps> = ({
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
  onApplyAlternative
}) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const handleTitleChange = (index: number, value: string) => {
    const updated = [...titles];
    updated[index] = value;
    setTitles(updated);
  };

  const handleAddOption = () => {
    if (titles.length < 3) {
      setTitles([...titles, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (titles.length > 2) {
      const updated = titles.filter((_, i) => i !== index);
      setTitles(updated);
    }
  };

  const handleSelectPreset = (idx: number) => {
    setActivePresetIndex(idx);
    setTitles(PRESETS[idx].titles);
    setSelectedCohort(PRESETS[idx].cohort);
  };

  return (
    <div className="w-full bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6 sm:p-8">
      {/* Editorial Title & Kicker */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e0e0e0]/70 pb-5">
        <div>
          <div className="text-[13px] font-semibold tracking-wider uppercase text-[#0066cc] mb-1">
            Pre-Send Decision Matrix
          </div>
          <h2 className="text-[26px] font-semibold text-[#1b1b1d] tracking-tight">
            Compare 2 or 3 Subject Lines
          </h2>
          <p className="text-[15px] text-[#7a7a7a] mt-1">
            Simulate your subscriber inbox in the minute before you hit send.
          </p>
        </div>

        {/* Presets switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f5f5f7] rounded-full border border-[#e0e0e0]/60">
          {PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1 text-[13px] font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activePresetIndex === idx
                  ? 'bg-[#ffffff] text-[#1b1b1d] shadow-sm font-semibold'
                  : 'text-[#7a7a7a] hover:text-[#1b1b1d]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title Options Inputs */}
      <div className="space-y-4 mb-6">
        {titles.map((title, index) => {
          const letter = String.fromCharCode(65 + index);
          const charCount = title.length;
          const isWarningLength = charCount > 42; // Mobile fold threshold

          return (
            <div key={index} className="group relative">
              <div className="flex items-center justify-between mb-1.5 px-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1b1b1d] text-[11px] font-bold text-white">
                    {letter}
                  </span>
                  <label className="text-[14px] font-semibold text-[#1b1b1d]">
                    Title Option {letter}
                  </label>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-[#7a7a7a]">
                  <span className={isWarningLength ? 'text-[#883700] font-medium' : ''}>
                    {charCount} chars {isWarningLength ? '(may clip on mobile)' : ''}
                  </span>
                  {titles.length > 2 && (
                    <button
                      onClick={() => handleRemoveOption(index)}
                      className="text-[#ba1a1a] hover:opacity-80 transition-opacity p-0.5 cursor-pointer"
                      title="Remove title option"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  placeholder={`e.g. ${index === 0 ? 'How I got my first 100 paying users' : 'Some thoughts on growth this week'}`}
                  className="w-full h-[48px] rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] px-4 text-[16px] text-[#1b1b1d] placeholder-[#7a7a7a]/60 focus:bg-[#ffffff] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all outline-none"
                />
              </div>
            </div>
          );
        })}

        {titles.length < 3 && (
          <button
            onClick={handleAddOption}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0066cc] hover:text-[#004e9f] transition-colors cursor-pointer py-1 px-1"
          >
            <Plus className="h-4 w-4" />
            Add Title Option C (Max 3)
          </button>
        )}
      </div>

      {/* Cohort & Sample Size Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#e0e0e0]/70 mb-6">
        <div>
          <label className="block text-[13px] font-semibold text-[#1b1b1d] mb-1.5">
            Subscriber Audience Cohort
          </label>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="w-full h-[44px] rounded-[10px] bg-[#fafafc] border border-[#e0e0e0] px-3.5 text-[14px] text-[#1b1b1d] focus:bg-[#ffffff] focus:border-[#0071e3] outline-none cursor-pointer"
          >
            <option value="bootstrapped_founders">
              Bootstrapped Founders (Solo / Micro-SaaS, $0–$50k MRR)
            </option>
            <option value="technical_founders">
              Technical Founders & DevTool Builders (Skeptical of fluff)
            </option>
            <option value="creator_educators">
              Creator-Educators & Solo Operators (Newsletter / Course)
            </option>
            <option value="b2b_saas">
              Early-Stage B2B SaaS Founders (Outbound & Pipeline)
            </option>
          </select>
          <p className="text-[12px] text-[#7a7a7a] mt-1">
            Calibrated on high-skepticism readers who delete 85% of cold newsletters.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[13px] font-semibold text-[#1b1b1d]">
              Persona Panel Size
            </label>
            <span className="text-[12px] font-semibold text-[#0066cc] tabular-nums">
              {sampleSize} Founder Personas
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[10, 40, 100].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSampleSize(size)}
                className={`flex-1 h-[44px] rounded-[10px] border text-[13px] font-semibold transition-all cursor-pointer ${
                  sampleSize === size
                    ? 'border-[#0066cc] bg-[#0066cc]/5 text-[#0066cc]'
                    : 'border-[#e0e0e0] bg-[#fafafc] text-[#414753] hover:border-[#7a7a7a]'
                }`}
              >
                {size} {size === 40 ? '(Weekend Panel)' : size === 10 ? '(Fast Calib)' : '(Deep Panel)'}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-[#7a7a7a] mt-1">
            Weekend standard: 40 founder personas reacting simultaneously.
          </p>
        </div>
      </div>

      {/* Smart Alternative Generator Prompt */}
      {alternativeSuggestions.length > 0 && (
        <div className="mb-6 rounded-[12px] border border-[#0066cc]/20 bg-[#0066cc]/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-[#0066cc] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              High-Converting AI Suggestions
            </span>
            <span className="text-[11px] text-[#7a7a7a]">Click to replace Title</span>
          </div>
          <div className="space-y-1.5">
            {alternativeSuggestions.map((alt, aIdx) => (
              <div key={aIdx} className="flex items-center justify-between gap-3 text-[13px] bg-white rounded-lg p-2.5 border border-[#e0e0e0]/70">
                <span className="text-[#1b1b1d] font-medium">{alt}</span>
                <div className="flex items-center gap-1 shrink-0">
                  {titles.map((_, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => onApplyAlternative(tIdx, alt)}
                      className="text-[11px] font-semibold px-2 py-1 rounded bg-[#f5f5f7] hover:bg-[#0066cc] hover:text-white transition-colors text-[#414753] cursor-pointer"
                    >
                      Use as {String.fromCharCode(65 + tIdx)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Action Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => onGenerateAlternatives(titles[0] || 'Tuesday growth insights')}
          disabled={isGeneratingAlts}
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#414753] hover:text-[#0066cc] transition-colors cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-[#0066cc]" />
          {isGeneratingAlts ? 'Synthesizing...' : 'Generate 3 high-converting variations'}
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onRunSimulation}
            disabled={isLoading || titles.some(t => !t.trim())}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] px-7 py-3 text-[16px] font-semibold text-white transition-all hover:bg-[#004e9f] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-none"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Simulating {sampleSize} Personas...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 fill-white" />
                Run Pre-Send Decision (15s)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
