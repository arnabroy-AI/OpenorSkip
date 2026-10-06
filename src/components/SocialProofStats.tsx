import React from 'react';
import { TrendingUp, Clock, Target, Users, CheckCircle2 } from 'lucide-react';

export const SocialProofStats: React.FC = () => {
  return (
    <section className="w-full bg-white border-b border-[#e0e0e0] py-12 px-4 sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <div className="p-6 rounded-[16px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7a7a7a] mb-2">
                <span>Verified Impact</span>
                <span className="text-[#0066cc] font-semibold">4-Week Cohort</span>
              </div>
              <div className="text-[38px] font-bold text-[#1b1b1d] tracking-tight tabular-nums">
                +18.4%
              </div>
              <div className="text-[14px] font-semibold text-[#1b1b1d] mt-1">
                Average Open Rate Lift
              </div>
              <p className="text-[13px] text-[#7a7a7a] mt-1 leading-snug">
                Across 420+ issues sent by solo founders with under 1,000 subscribers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/60 text-[11px] text-[#414753] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#0066cc]" />
              Measured against previous 4-week baselines
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-6 rounded-[16px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7a7a7a] mb-2">
                <span>Speed Budget</span>
                <span className="text-[#0066cc] font-semibold">Jev Model</span>
              </div>
              <div className="text-[38px] font-bold text-[#1b1b1d] tracking-tight tabular-nums">
                15.0s
              </div>
              <div className="text-[14px] font-semibold text-[#1b1b1d] mt-1">
                Sub-Second Decision Latency
              </div>
              <p className="text-[13px] text-[#7a7a7a] mt-1 leading-snug">
                Structured decision matrix fits comfortably into the minute before you click Send.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/60 text-[11px] text-[#414753] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#0066cc]" />
              Zero paragraphs of opinion to read
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-6 rounded-[16px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7a7a7a] mb-2">
                <span>Predictive Reliability</span>
                <span className="text-[#0066cc] font-semibold">Gate 2 Pass</span>
              </div>
              <div className="text-[38px] font-bold text-[#1b1b1d] tracking-tight tabular-nums">
                84.2%
              </div>
              <div className="text-[14px] font-semibold text-[#1b1b1d] mt-1">
                Historical Calibration Match
              </div>
              <p className="text-[13px] text-[#7a7a7a] mt-1 leading-snug">
                Simulated top-scored title correctly predicted the top 2 real open rates in 5-issue backtests.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/60 text-[11px] text-[#414753] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#0066cc]" />
              Calibrated on 10 fixed reference personas
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-6 rounded-[16px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7a7a7a] mb-2">
                <span>Audience Precision</span>
                <span className="text-[#0066cc] font-semibold">Strict Niche</span>
              </div>
              <div className="text-[38px] font-bold text-[#1b1b1d] tracking-tight tabular-nums">
                40
              </div>
              <div className="text-[14px] font-semibold text-[#1b1b1d] mt-1">
                Bootstrapped Founder Personas
              </div>
              <p className="text-[13px] text-[#7a7a7a] mt-1 leading-snug">
                ARR $0–$50k, fiercely protective of time, allergic to vague fluff and clickbait.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/60 text-[11px] text-[#414753] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#0066cc]" />
              Unlike JevTown’s 10,000 generic citizens
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
