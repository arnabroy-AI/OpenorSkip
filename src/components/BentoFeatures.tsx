import React from 'react';
import { Users, BarChart3, Flame, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  return (
    <section className="w-full bg-white border-b border-[#e0e0e0] py-16 px-4 sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] mb-1">
            Engine Architecture
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#1b1b1d] tracking-tight">
            How OpenOrSkip Solves the Pre-Send Dilemma
          </h2>
          <p className="text-[16px] text-[#7a7a7a] mt-2">
            Built deliberately for newsletters with under 1,000 subscribers who cannot sacrifice issues to split testing.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Bento Card 1: 8 Cols (Marquee Feature) */}
          <div className="md:col-span-7 rounded-[20px] bg-[#fafafc] border border-[#e0e0e0] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-mono text-[#0066cc] font-semibold">01. AUDIENCE COHORT</span>
                <span className="text-[11px] font-bold text-[#7a7a7a] uppercase">Zero Generalists</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight mb-3">
                One Niche Audience at a Time
              </h3>
              <p className="text-[15px] text-[#414753] leading-relaxed mb-6">
                Unlike JevTown’s 10,000 generic citizens, your panel consists exclusively of verified bootstrapped founders ($0–$50k MRR). They read emails while checking CI/CD pipelines, deleting anything that sounds like a personal diary or vague thought piece.
              </p>
            </div>

            {/* Visual Persona Mockup Inset */}
            <div className="p-4 rounded-[14px] bg-white border border-[#e0e0e0] space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-[#7a7a7a] text-[11px] pb-1 border-b border-[#e0e0e0]/50 font-semibold">
                <span>SIMULATED BOOTSTRAPPER PROFILE</span>
                <span className="text-[#0066cc]">CALIBRATED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1b1b1d]">Liam Vance · $4.2k MRR</span>
                <span className="text-[#883700] font-mono text-[11px] uppercase">Extreme time-sensitivity</span>
              </div>
              <p className="text-[#414753] text-[12px] italic">
                &ldquo;I have 140 unread emails. If your Tuesday title does not promise an exact tactic, I hit archive.&rdquo;
              </p>
            </div>
          </div>

          {/* Bento Card 2: 5 Cols */}
          <div className="md:col-span-5 rounded-[20px] bg-[#fafafc] border border-[#e0e0e0] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-mono text-[#0066cc] font-semibold">02. STRUCTURED COUNTS</span>
                <span className="text-[11px] font-bold text-[#7a7a7a] uppercase">No Essays</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight mb-3">
                Decisions Become Numbers
              </h3>
              <p className="text-[15px] text-[#414753] leading-relaxed mb-6">
                You never get a 3-page opinion memo. You get hard counts: 28 would open Title A, 10 would skip, and 2 got confused.
              </p>
            </div>

            <div className="p-4 rounded-[14px] bg-white border border-[#e0e0e0] text-center">
              <div className="text-[32px] font-bold text-[#0066cc] tabular-nums">28 vs 10</div>
              <div className="text-[11px] font-semibold uppercase text-[#7a7a7a]">
                Title A Opens vs Title B Opens
              </div>
            </div>
          </div>

          {/* Bento Card 3: 5 Cols */}
          <div className="md:col-span-5 rounded-[20px] bg-[#fafafc] border border-[#e0e0e0] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-mono text-[#0066cc] font-semibold">03. WORD TRIGGERS</span>
                <span className="text-[11px] font-bold text-[#7a7a7a] uppercase">Linguistic Heatmap</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight mb-3">
                See Which Words Caused It
              </h3>
              <p className="text-[15px] text-[#414753] leading-relaxed mb-4">
                Identify the exact phrases that triggered open clicks or instant skips.
              </p>
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white border border-[#0066cc]/30">
                <span className="font-semibold text-[#0066cc]">+&ldquo;first 100 paying users&rdquo;</span>
                <span className="text-[#7a7a7a]">Clear milestone</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white border border-[#ba1a1a]/30">
                <span className="font-semibold text-[#ba1a1a]">-&ldquo;some thoughts on&rdquo;</span>
                <span className="text-[#7a7a7a]">Passive & low-urgency</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: 7 Cols */}
          <div className="md:col-span-7 rounded-[20px] bg-[#fafafc] border border-[#e0e0e0] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-mono text-[#0066cc] font-semibold">04. MOBILE FOLD VERIFICATION</span>
                <span className="text-[11px] font-bold text-[#7a7a7a] uppercase">Screen Math</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#1b1b1d] tracking-tight mb-3">
                Never Get Cut Off on iPhone Mail
              </h3>
              <p className="text-[15px] text-[#414753] leading-relaxed mb-4">
                68% of founders read newsletters on phone screens that truncate subject lines after ~40 characters. Our client preview reveals the exact cutoff point before you send.
              </p>
            </div>

            <div className="p-3.5 rounded-[12px] bg-white border border-[#e0e0e0] text-[13px] flex items-center justify-between">
              <div className="font-mono text-[#1b1b1d] truncate pr-4">
                How I got my first 100 paying users <span className="text-[#883700] font-bold">| (Cutoff Fold)</span>
              </div>
              <span className="text-[11px] font-bold text-[#0066cc] shrink-0 bg-[#0066cc]/10 px-2 py-0.5 rounded-full">
                38 Chars: Safe
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
