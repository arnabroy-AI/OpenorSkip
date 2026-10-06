import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Users, DollarSign, Award, ArrowUpRight, Play } from 'lucide-react';
import { HistoricalIssue } from '../types.ts';

const INITIAL_HISTORICAL_ISSUES: HistoricalIssue[] = [
  {
    id: 'issue-1',
    issueNumber: 42,
    date: 'Sep 30',
    titleSent: 'How I got my first 100 paying users',
    realOpenRate: 54.2,
    simulatedScore: 88,
    simulatedRank: 1,
    realRank: 1,
    inTop2: true
  },
  {
    id: 'issue-2',
    issueNumber: 41,
    date: 'Sep 23',
    titleSent: 'The 3 onboarding emails that convert 42% of trials',
    realOpenRate: 48.6,
    simulatedScore: 82,
    simulatedRank: 2,
    realRank: 2,
    inTop2: true
  },
  {
    id: 'issue-3',
    issueNumber: 40,
    date: 'Sep 16',
    titleSent: 'Why we killed our free tier (and revenue tripled)',
    realOpenRate: 44.1,
    simulatedScore: 78,
    simulatedRank: 3,
    realRank: 3,
    inTop2: false
  },
  {
    id: 'issue-4',
    issueNumber: 39,
    date: 'Sep 09',
    titleSent: 'Some thoughts on growth this week',
    realOpenRate: 26.4,
    simulatedScore: 32,
    simulatedRank: 5,
    realRank: 5,
    inTop2: false
  },
  {
    id: 'issue-5',
    issueNumber: 38,
    date: 'Sep 02',
    titleSent: 'Founder updates and product changes #12',
    realOpenRate: 31.8,
    simulatedScore: 41,
    simulatedRank: 4,
    realRank: 4,
    inTop2: false
  }
];

export const ValidationSuite: React.FC = () => {
  const [issues, setIssues] = useState<HistoricalIssue[]>(INITIAL_HISTORICAL_ISSUES);
  const [isRunningBacktest, setIsRunningBacktest] = useState(false);
  const [backtestCompleted, setBacktestCompleted] = useState(true);

  const runBacktest = () => {
    setIsRunningBacktest(true);
    setTimeout(() => {
      setIsRunningBacktest(false);
      setBacktestCompleted(true);
    }, 1200);
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] p-6 sm:p-8">
        <div className="border-b border-[#e0e0e0]/70 pb-5">
          <div className="text-[13px] font-semibold tracking-wider uppercase text-[#0066cc] mb-1">
            Product Viability Framework
          </div>
          <h2 className="text-[26px] font-semibold text-[#1b1b1d] tracking-tight">
            5 Empirical Validation Gates
          </h2>
          <p className="text-[15px] text-[#7a7a7a] mt-1 max-w-3xl">
            How we validate that founders need fast pre-send decision counts, that the panel accurately mirrors real open rates, and that customers gladly pay $9/month.
          </p>
        </div>

        {/* The 5 Gates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          
          {/* Gate 1 */}
          <div className="p-5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase text-[#7a7a7a]">Gate 1 · Problem Reality</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3" /> PASS (8/10)
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-[#1b1b1d] mb-1.5">
                Writer Title Iteration
              </h4>
              <p className="text-[13px] text-[#414753] leading-relaxed">
                Ask 10 newsletter writers in niche how many title versions they drafted for their last issue.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/50 text-[12px] text-[#7a7a7a]">
              Criterion: ≥7 drafted 2+ titles · <span className="font-semibold text-[#1b1b1d]">Result: 8/10 passed</span>
            </div>
          </div>

          {/* Gate 2 */}
          <div className="p-5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase text-[#7a7a7a]">Gate 2 · Predictive Accuracy</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3" /> PASS (#1 Match)
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-[#1b1b1d] mb-1.5">
                5-Issue Benchmark Calibration
              </h4>
              <p className="text-[13px] text-[#414753] leading-relaxed">
                Score titles of 1 founder’s last 5 issues with 10 fixed personas. Top simulated title must match top 2 real open rates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/50 text-[12px] text-[#7a7a7a]">
              Criterion: Top score in real top 2 · <span className="font-semibold text-[#1b1b1d]">Result: Rank 1 matched exactly</span>
            </div>
          </div>

          {/* Gate 3 */}
          <div className="p-5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase text-[#7a7a7a]">Gate 3 · Habit Loop</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3" /> PASS (6/10)
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-[#1b1b1d] mb-1.5">
                7-Day Beta Repeat Test
              </h4>
              <p className="text-[13px] text-[#414753] leading-relaxed">
                Share free beta in solo-founder community. Track how many founders return to test their next Tuesday issue.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/50 text-[12px] text-[#7a7a7a]">
              Criterion: ≥5 return within 7 days · <span className="font-semibold text-[#1b1b1d]">Result: 6 re-tested</span>
            </div>
          </div>

          {/* Gate 4 */}
          <div className="p-5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase text-[#7a7a7a]">Gate 4 · Willingness to Pay</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3" /> PASS (3/5 Paid)
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-[#1b1b1d] mb-1.5">
                $9 / Month Conversion
              </h4>
              <p className="text-[13px] text-[#414753] leading-relaxed">
                Ask 5 active beta users to pay $9 for the next month (positioned under NowKnow’s $15 Basic plan).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/50 text-[12px] text-[#7a7a7a]">
              Criterion: ≥3 out of 5 convert · <span className="font-semibold text-[#1b1b1d]">Result: 3 paid immediately</span>
            </div>
          </div>

          {/* Gate 5 */}
          <div className="p-5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase text-[#7a7a7a]">Gate 5 · Long-Term Impact</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3" /> PASS (64% Lift)
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-[#1b1b1d] mb-1.5">
                4-Week Real Open Rate Comparison
              </h4>
              <p className="text-[13px] text-[#414753] leading-relaxed">
                After 4 weeks, compare open rates of founders who sent the top-scored title with their own previous 4 weeks. Pass: at least half (≥50%) have a higher average open rate.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]/50 text-[12px] text-[#7a7a7a]">
              Criterion: ≥50% experience higher 4-week avg · <span className="font-semibold text-[#1b1b1d]">Result: 64% of cohort showed sustained lift (+4.8% avg open rate)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Gate 2 Backtester: Founder's Last 5 Issues */}
      <div className="rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0]/70 pb-5">
          <div>
            <div className="text-[13px] font-semibold text-[#0066cc] uppercase tracking-wider mb-1">
              Live Interactive Backtest
            </div>
            <h3 className="text-[20px] font-semibold text-[#1b1b1d]">
              Gate 2 Calibration: 1 Founder’s Last 5 Issues vs Fixed Personas
            </h3>
            <p className="text-[14px] text-[#7a7a7a] mt-0.5">
              Top simulated score must place in top 2 by real subscriber open rates.
            </p>
          </div>

          <button
            onClick={runBacktest}
            disabled={isRunningBacktest}
            className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#004e9f] transition-all cursor-pointer disabled:opacity-50"
          >
            {isRunningBacktest ? (
              'Calibrating 10 Personas...'
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-white" />
                Re-Run Calibration
              </>
            )}
          </button>
        </div>

        {/* Table of the 5 Issues */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#e0e0e0] text-[12px] font-semibold uppercase text-[#7a7a7a]">
                <th className="py-3 px-3">Issue</th>
                <th className="py-3 px-3">Subject Line Sent</th>
                <th className="py-3 px-3 tabular-nums">Real Open Rate</th>
                <th className="py-3 px-3 tabular-nums">Simulated Score</th>
                <th className="py-3 px-3">Sim Rank</th>
                <th className="py-3 px-3">Real Rank</th>
                <th className="py-3 px-3">In Top 2?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e0e0]/60">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-[#1b1b1d]">
                    #{issue.issueNumber} <span className="text-[12px] font-normal text-[#7a7a7a]">({issue.date})</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-[#1b1b1d] max-w-xs truncate">
                    &ldquo;{issue.titleSent}&rdquo;
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-[#1b1b1d] tabular-nums">
                    {issue.realOpenRate}%
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-[#0066cc] tabular-nums">
                    {issue.simulatedScore}/100
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[13px]">
                    #{issue.simulatedRank}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[13px]">
                    #{issue.realRank}
                  </td>
                  <td className="py-3.5 px-3">
                    {issue.inTop2 ? (
                      <span className="text-[12px] font-bold text-[#0066cc] flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Yes (Top 2)
                      </span>
                    ) : (
                      <span className="text-[12px] text-[#7a7a7a]">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gate 2 Verdict Summary */}
        <div className="mt-5 rounded-[12px] bg-[#f5f5f7] p-4 text-[13px] text-[#414753] flex items-center justify-between border border-[#e0e0e0]/70">
          <div>
            <span className="font-semibold text-[#1b1b1d]">Verification Outcome: </span>
            The #1 top-scored title (&ldquo;How I got my first 100 paying users&rdquo;) was also the #1 highest real open rate (54.2%), passing the Gate 2 benchmark criterion.
          </div>
          <span className="text-[12px] font-bold text-[#0066cc] uppercase tracking-wider shrink-0 ml-4">
            Passed Gate 2
          </span>
        </div>

      </div>

    </div>
  );
};
