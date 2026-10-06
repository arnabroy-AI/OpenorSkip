import React from 'react';
import { ArrowRight, Check, Zap, Smartphone, Users, TrendingUp, Sparkles } from 'lucide-react';

interface ModernCtaSectionProps {
  onQuickRun: () => void;
  onOpenPricing: () => void;
}

export const ModernCtaSection: React.FC<ModernCtaSectionProps> = ({
  onQuickRun,
  onOpenPricing
}) => {
  return (
    <section className="relative w-full bg-[#09090b] text-white py-20 lg:py-28 px-4 sm:px-8 overflow-hidden border-t border-white/10">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0066cc]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#2997ff]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Proposition, and CTA Button (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[12px] font-semibold tracking-wide uppercase text-[#2997ff]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#2997ff]" />
              The Pre-Send Decision Engine
            </div>

            <h2 className="text-[38px] sm:text-[48px] lg:text-[52px] font-semibold tracking-tight text-white leading-[1.08] text-balance">
              Send your next issue with absolute confidence.
            </h2>

            <p className="text-[17px] sm:text-[18px] text-[#a1a1aa] leading-relaxed max-w-lg">
              Stop agonizing over Tuesday subject lines in the minute before you hit send.
              Run 40 bootstrapped founder personas in 15 seconds, turn the choice into hard counts, and protect your list.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onQuickRun}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white px-7 py-3.5 text-[16px] font-semibold transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#0066cc]/25"
              >
                <span>Run Decision Test (15s)</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenPricing}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 text-[15px] font-semibold transition-all cursor-pointer"
              >
                $9 / Month Plan
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-5 text-[13px] text-[#71717a]">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#2997ff]" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#2997ff]" />
                <span>No API keys needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#2997ff]" />
                <span>Cancel anytime</span>
              </div>
            </div>

          </div>

          {/* Right Column: Cascading UI Blocks Mosaic (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            
            {/* Column 1 of UI Blocks */}
            <div className="space-y-4">
              
              {/* Block 1: The Decision Scorecard Block */}
              <div className="rounded-[18px] border border-white/15 bg-[#141417]/90 backdrop-blur-md p-5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between text-[11px] text-[#a1a1aa] uppercase font-semibold pb-3 border-b border-white/10">
                  <span className="flex items-center gap-1.5 text-[#2997ff]">
                    <Zap className="h-3.5 w-3.5 fill-[#2997ff]" />
                    DECISION SCORECARD
                  </span>
                  <span>15.2s Run</span>
                </div>

                <div className="mt-3.5">
                  <div className="text-[14px] font-semibold text-white leading-snug">
                    &ldquo;How I got my first 100 paying users&rdquo;
                  </div>
                  
                  <div className="flex items-baseline justify-between mt-3">
                    <div>
                      <div className="text-[28px] font-bold text-white tabular-nums tracking-tight">
                        70.0%
                      </div>
                      <div className="text-[11px] text-[#a1a1aa]">Predicted Open Rate</div>
                    </div>
                    <span className="text-[12px] font-bold text-[#2997ff] bg-[#0066cc]/20 border border-[#0066cc]/40 px-2.5 py-1 rounded-full">
                      +211% Lift
                    </span>
                  </div>

                  <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="w-[70%] bg-[#0066cc]" />
                    <div className="w-[25%] bg-[#52525b]" />
                    <div className="w-[5%] bg-[#71717a]" />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-[#71717a] font-mono">
                    <span>28 Opens</span>
                    <span>10 Skips</span>
                    <span>2 Confused</span>
                  </div>
                </div>
              </div>

              {/* Block 2: Word-Level Trigger Analysis */}
              <div className="rounded-[18px] border border-white/15 bg-[#141417]/90 backdrop-blur-md p-5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2.5">
                  Linguistic Attention Heatmap
                </div>
                <div className="space-y-2 text-[12px]">
                  <div className="p-2 rounded-[10px] bg-[#0066cc]/15 border border-[#0066cc]/30 flex items-center justify-between text-white">
                    <span className="font-semibold text-[#2997ff]">+&ldquo;first 100 paying users&rdquo;</span>
                    <span className="text-[11px] text-[#a1a1aa]">High Proof (+18 opens)</span>
                  </div>
                  <div className="p-2 rounded-[10px] bg-red-500/10 border border-red-500/25 flex items-center justify-between text-white">
                    <span className="font-semibold text-red-400">-&ldquo;some thoughts on&rdquo;</span>
                    <span className="text-[11px] text-[#a1a1aa]">Diary Tone (-14 skips)</span>
                  </div>
                </div>
              </div>

              {/* Block 3: Simple Transparent Pricing */}
              <div className="rounded-[18px] border border-white/15 bg-[#141417]/90 backdrop-blur-md p-5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-white">The Solo Founder Pass</div>
                    <div className="text-[11px] text-[#a1a1aa]">Under NowKnow’s $15 plan</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[26px] font-bold text-white tabular-nums">$9</span>
                    <span className="text-[12px] text-[#a1a1aa]">/mo</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#a1a1aa]">
                  <span>40 founder personas</span>
                  <span>·</span>
                  <span>Unlimited runs</span>
                </div>
              </div>

            </div>

            {/* Column 2 of UI Blocks */}
            <div className="space-y-4 sm:pt-6">
              
              {/* Block 4: Persona Reaction Bubbles */}
              <div className="rounded-[18px] border border-white/15 bg-[#141417]/90 backdrop-blur-md p-5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-3">
                  Live Persona Gut Reactions
                </div>

                <div className="space-y-2.5 text-[12px]">
                  {/* Bubble 1 */}
                  <div className="flex items-start gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                      alt="Liam"
                      className="h-7 w-7 rounded-full object-cover shrink-0 border border-white/20"
                    />
                    <div className="bg-white/10 rounded-2xl rounded-tl-xs p-2.5 text-[#e4e4e7] leading-snug">
                      <div className="font-semibold text-white text-[11px]">Liam Vance ($4.2k MRR)</div>
                      &ldquo;I need early user tactics today. Definite open.&rdquo;
                    </div>
                  </div>

                  {/* Bubble 2 */}
                  <div className="flex items-start gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
                      alt="Elena"
                      className="h-7 w-7 rounded-full object-cover shrink-0 border border-white/20"
                    />
                    <div className="bg-white/10 rounded-2xl rounded-tl-xs p-2.5 text-[#e4e4e7] leading-snug">
                      <div className="font-semibold text-white text-[11px]">Elena Rostova ($12k MRR)</div>
                      &ldquo;Skip vague 'thoughts'. Give me the onboarding script.&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              {/* Block 5: Mobile Fold Truncation Guard */}
              <div className="rounded-[18px] border border-white/15 bg-[#141417]/90 backdrop-blur-md p-5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between text-[11px] text-[#a1a1aa] uppercase font-semibold mb-2">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5 text-[#2997ff]" />
                    Mobile Fold Guard
                  </span>
                  <span className="text-[#2997ff]">Safe: 38 Chars</span>
                </div>

                <div className="bg-black/50 p-3 rounded-[12px] border border-white/10 text-[12px]">
                  <div className="text-[10px] text-[#71717a] mb-0.5">iPhone Mail · 8:30 AM</div>
                  <div className="text-white font-medium truncate">
                    How I got my first 100 paying users
                  </div>
                  <div className="text-[#a1a1aa] text-[11px] truncate mt-0.5">
                    Hey everyone, Tuesday morning teardown...
                  </div>
                </div>
              </div>

              {/* Block 6: Gate 2 Empirical Verification */}
              <div className="rounded-[18px] border border-white/15 bg-[#141417]/90 backdrop-blur-md p-5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#2997ff] uppercase">
                    5-Issue Calibration Passed
                  </span>
                  <span className="text-[10px] text-[#a1a1aa] font-mono">Rank #1 Match</span>
                </div>
                <p className="text-[12px] text-[#d4d4d8] mt-1.5 leading-snug">
                  Predicted top-scored title matched the #1 real open rate (54.2%) in historical backtests.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
