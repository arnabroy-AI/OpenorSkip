import React, { useState } from 'react';
import { TitleResult, SimulationResponse, TriggerWord } from '../types.ts';
import { Check, Copy, TrendingUp, AlertTriangle, HelpCircle, ArrowUpRight, BarChart2 } from 'lucide-react';

interface ResultsDisplayProps {
  simulation: SimulationResponse;
  onDrilldownPersona: (decisionFilter: 'all' | 'open' | 'skip' | 'confused') => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  simulation,
  onDrilldownPersona
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedWordTrigger, setSelectedWordTrigger] = useState<TriggerWord | null>(null);

  const winner = simulation.titleResults[simulation.winnerIndex];
  const winnerLetter = String.fromCharCode(65 + simulation.winnerIndex);

  const handleCopyTitle = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Definitive Decision Header Banner */}
      <div className="rounded-[18px] border border-[#0066cc]/30 bg-[#ffffff] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e0e0e0]/70 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-full bg-[#0066cc] px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                Definitive Pick: Option {winnerLetter}
              </span>
              <span className="text-[13px] text-[#7a7a7a]">
                · {simulation.sampleSize} Founders Evaluated · {simulation.latencyMs}ms decision latency
              </span>
            </div>
            <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#1b1b1d] tracking-tight">
              &ldquo;{winner.titleText}&rdquo;
            </h3>
            <p className="text-[15px] text-[#414753] mt-1.5 font-normal">
              {simulation.recommendationSummary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="bg-[#f5f5f7] rounded-[12px] p-3 text-right pr-4 border border-[#e0e0e0]/60">
              <div className="text-[11px] font-semibold uppercase text-[#7a7a7a]">Expected Lift</div>
              <div className="text-[24px] font-bold text-[#0066cc] tabular-nums">
                +{simulation.expectedLiftPercent}%
              </div>
            </div>

            <button
              onClick={() => handleCopyTitle(simulation.winnerIndex, winner.titleText)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] px-5 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#004e9f] active:scale-95 cursor-pointer shadow-none"
            >
              {copiedIndex === simulation.winnerIndex ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Winning Title
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Decision Philosophy Quote from Brief */}
        <div className="pt-4 flex items-center justify-between text-[13px] text-[#7a7a7a]">
          <span>
            Counts per title turn the choice into a hard number, not a 3-page opinion memo.
          </span>
          <span className="font-mono text-[11px] text-[#414753]">
            Engine: {simulation.engine}
          </span>
        </div>
      </div>

      {/* Counts per Title: 2 or 3 Column Matrix */}
      <div className={`grid grid-cols-1 ${simulation.titleResults.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
        {simulation.titleResults.map((result, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isWinner = idx === simulation.winnerIndex;

          return (
            <div
              key={idx}
              className={`rounded-[18px] bg-[#ffffff] p-6 transition-all border ${
                isWinner
                  ? 'border-2 border-[#0066cc] bg-[#ffffff]'
                  : 'border border-[#e0e0e0]'
              }`}
            >
              {/* Option Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold ${
                      isWinner ? 'bg-[#0066cc] text-white' : 'bg-[#1b1b1d] text-white'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-[13px] font-semibold uppercase text-[#7a7a7a]">
                    Option {letter} {isWinner ? '· Winner' : ''}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyTitle(idx, result.titleText)}
                  className="text-[12px] text-[#7a7a7a] hover:text-[#0066cc] transition-colors p-1 cursor-pointer flex items-center gap-1"
                  title="Copy this title"
                >
                  {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-[#0066cc]" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Title Text */}
              <div className="min-h-[50px] mb-4">
                <h4 className="text-[17px] font-semibold text-[#1b1b1d] leading-snug">
                  &ldquo;{result.titleText}&rdquo;
                </h4>
              </div>

              {/* Primary Metric: Large Open Rate */}
              <div className="flex items-baseline justify-between border-t border-[#e0e0e0]/70 pt-4 mb-4">
                <div>
                  <div className="text-[12px] font-medium text-[#7a7a7a]">Predicted Open Rate</div>
                  <div className="text-[34px] font-bold tracking-tight text-[#1b1b1d] tabular-nums">
                    {result.openRate}%
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[12px] font-medium text-[#7a7a7a]">Verdict</div>
                  <div
                    className={`text-[13px] font-semibold mt-1 ${
                      isWinner ? 'text-[#0066cc]' : result.openRate < 35 ? 'text-[#ba1a1a]' : 'text-[#414753]'
                    }`}
                  >
                    {result.verdict}
                  </div>
                </div>
              </div>

              {/* Distribution Count Bar */}
              <div className="space-y-2 mb-4">
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#f0edef]">
                  <div
                    style={{ width: `${(result.opens / simulation.sampleSize) * 100}%` }}
                    className="bg-[#0066cc] transition-all duration-500"
                    title={`Opens: ${result.opens}`}
                  />
                  <div
                    style={{ width: `${(result.skips / simulation.sampleSize) * 100}%` }}
                    className="bg-[#7a7a7a] transition-all duration-500"
                    title={`Skips: ${result.skips}`}
                  />
                  <div
                    style={{ width: `${(result.confused / simulation.sampleSize) * 100}%` }}
                    className="bg-[#dcd9dc] transition-all duration-500"
                    title={`Confused: ${result.confused}`}
                  />
                </div>

                {/* Micro Counts breakdown */}
                <div className="grid grid-cols-3 text-center text-[12px] pt-1">
                  <div>
                    <span className="font-bold text-[#0066cc] tabular-nums">{result.opens}</span>
                    <span className="text-[#7a7a7a] block text-[11px]">Opens</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1b1b1d] tabular-nums">{result.skips}</span>
                    <span className="text-[#7a7a7a] block text-[11px]">Skips</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#7a7a7a] tabular-nums">{result.confused}</span>
                    <span className="text-[#7a7a7a] block text-[11px]">Confused</span>
                  </div>
                </div>
              </div>

              {/* Trigger Words Section */}
              <div className="border-t border-[#e0e0e0]/70 pt-3 space-y-2 text-[12px]">
                <div className="text-[11px] font-semibold uppercase text-[#7a7a7a]">
                  Words That Caused It
                </div>

                {result.triggerWordsPositive.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-[#0066cc]">Opened for:</span>
                    {result.triggerWordsPositive.map((tw, twIdx) => (
                      <button
                        key={twIdx}
                        onClick={() => setSelectedWordTrigger(tw)}
                        className="rounded bg-[#0066cc]/10 px-2 py-0.5 font-medium text-[#004e9f] hover:bg-[#0066cc]/20 transition-colors cursor-pointer"
                      >
                        +{tw.word}
                      </button>
                    ))}
                  </div>
                )}

                {result.triggerWordsNegative.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-[#ba1a1a]">Skipped for:</span>
                    {result.triggerWordsNegative.map((tw, twIdx) => (
                      <button
                        key={twIdx}
                        onClick={() => setSelectedWordTrigger(tw)}
                        className="rounded bg-[#ba1a1a]/10 px-2 py-0.5 font-medium text-[#ba1a1a] hover:bg-[#ba1a1a]/20 transition-colors cursor-pointer"
                      >
                        -{tw.word}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Word-Level Trigger Inspector Detail if clicked */}
      {selectedWordTrigger && (
        <div className="rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] p-4 flex items-center justify-between text-[13px]">
          <div>
            <span className="font-semibold text-[#1b1b1d]">
              Linguistic Trigger: &ldquo;{selectedWordTrigger.word}&rdquo;
            </span>
            <span className="text-[#414753] ml-2">
              — {selectedWordTrigger.impact}
            </span>
            {selectedWordTrigger.personaQuote && (
              <span className="italic text-[#7a7a7a] block mt-0.5">
                Founder quote: &ldquo;{selectedWordTrigger.personaQuote}&rdquo;
              </span>
            )}
          </div>
          <button
            onClick={() => setSelectedWordTrigger(null)}
            className="text-[12px] font-medium text-[#7a7a7a] hover:text-[#1b1b1d] cursor-pointer"
          >
            Close
          </button>
        </div>
      )}

      {/* Call to Persona Exploration */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-[18px] bg-[#fafafc] border border-[#e0e0e0]">
        <div>
          <div className="text-[15px] font-semibold text-[#1b1b1d]">
            Inspect Individual Founder Reactions
          </div>
          <div className="text-[13px] text-[#7a7a7a]">
            Read the 1-second gut reactions of all {simulation.sampleSize} bootstrappers in your panel.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDrilldownPersona('open')}
            className="rounded-full border border-[#0066cc] bg-white px-4 py-2 text-[13px] font-semibold text-[#0066cc] hover:bg-[#0066cc]/5 transition-colors cursor-pointer"
          >
            Who Opened Option {winnerLetter}? ({winner.opens})
          </button>
          <button
            onClick={() => onDrilldownPersona('all')}
            className="rounded-full bg-[#1b1b1d] px-4 py-2 text-[13px] font-semibold text-white hover:bg-black transition-colors cursor-pointer"
          >
            View All {simulation.sampleSize} Personas
          </button>
        </div>
      </div>

    </div>
  );
};
