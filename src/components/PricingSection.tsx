import React, { useState } from 'react';
import { Check, X, Shield, HelpCircle, ArrowRight, Zap } from 'lucide-react';

interface PricingSectionProps {
  onOpenCheckout: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCheckout }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why can’t I just run a normal A/B test in Beehiiv or Mailchimp?',
      a: 'Statistical split-testing requires at least 3,000 to 5,000 subscribers. If you have under 1,000 readers, splitting your list into 500-person cohorts means random noise dominates and your newsletter delivery gets starved. OpenOrSkip tests with 40 simulated personas before you send, so 100% of your real list receives the highest-converting title.'
    },
    {
      q: 'Why 40 personas instead of 10,000 like JevTown?',
      a: 'JevTown polls 10,000 broad internet generalists who do not read software or business newsletters. OpenOrSkip specializes in one audience at a time: bootstrapped founders and developers ($0–$50k MRR) with overflowing inboxes who delete fluff. 40 specialized readers give you exact actionable open/skip counts in 15 seconds instead of 10,000 vague opinions.'
    },
    {
      q: 'How does this compare to NowKnow?',
      a: 'NowKnow starts at $15/month for general AI feedback on ads and websites. OpenOrSkip starts at $9/month per channel and is laser-focused on email subject lines in the minute before you hit send.'
    },
    {
      q: 'Can I test historical past issues to verify the engine?',
      a: 'Yes. Use our Gate 2 calibration benchmark to score your previous 5 sent issues with 10 fixed personas. You can compare the simulated rankings against your real historical open rates directly.'
    },
    {
      q: 'What is the refund and cancellation policy?',
      a: 'Zero contracts. Cancel anytime with 1 click from your dashboard. If your open rate does not improve within 30 days, we issue an immediate full refund.'
    }
  ];

  return (
    <section id="pricing-section" className="w-full bg-white border-b border-[#e0e0e0] py-16 px-4 sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] mb-1">
            Predictable Economics
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#1b1b1d] tracking-tight">
            Built for Solo Founders at $9 / Month
          </h2>
          <p className="text-[16px] text-[#7a7a7a] mt-2">
            Priced under NowKnow’s $15 Basic plan. Ready in the minute before you click Send.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#f5f5f7] rounded-full border border-[#e0e0e0] mt-5">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-white text-[#1b1b1d] font-semibold shadow-sm' : 'text-[#7a7a7a]'
              }`}
            >
              $9 / Month
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                billingCycle === 'annual' ? 'bg-white text-[#1b1b1d] font-semibold shadow-sm' : 'text-[#7a7a7a]'
              }`}
            >
              $79 / Year (Save 27%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          
          {/* Card 1: The Tuesday Founder Pass (Primary) */}
          <div className="rounded-[22px] border-2 border-[#0066cc] bg-white p-8 flex flex-col justify-between relative shadow-none">
            <div className="absolute -top-3 left-8 bg-[#0066cc] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              Most Popular · Solo Founders
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <h3 className="text-[20px] font-bold text-[#1b1b1d]">The Tuesday Founder</h3>
                  <p className="text-[13px] text-[#7a7a7a]">For newsletters under 1,000 readers</p>
                </div>
                <div className="text-right">
                  <span className="text-[38px] font-bold text-[#1b1b1d] tabular-nums">
                    {billingCycle === 'monthly' ? '$9' : '$79'}
                  </span>
                  <span className="text-[14px] text-[#7a7a7a] font-medium">
                    {billingCycle === 'monthly' ? '/mo' : '/yr'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#e0e0e0] text-[13px] text-[#414753]">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>Unlimited pre-send runs on 1 newsletter</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>40 bootstrapped founder personas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>Exact open, skip, and confusion counts</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>Word-level attention heatmap (+/- triggers)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>iPhone Mail mobile cutoff inspection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>5-issue historical benchmark backtester</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onOpenCheckout}
                className="w-full rounded-full bg-[#0066cc] py-3 text-[15px] font-semibold text-white hover:bg-[#004e9f] transition-all cursor-pointer shadow-none"
              >
                Start 14-Day Free Trial
              </button>
              <div className="text-center text-[11px] text-[#7a7a7a] mt-2">
                14 days free · No credit card required to test
              </div>
            </div>
          </div>

          {/* Card 2: Pro Growth (Multiple Publications) */}
          <div className="rounded-[22px] border border-[#e0e0e0] bg-[#fafafc] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <h3 className="text-[20px] font-bold text-[#1b1b1d]">Growth Studio</h3>
                  <p className="text-[13px] text-[#7a7a7a]">For agencies & multi-channel creators</p>
                </div>
                <div className="text-right">
                  <span className="text-[38px] font-bold text-[#1b1b1d] tabular-nums">
                    {billingCycle === 'monthly' ? '$19' : '$179'}
                  </span>
                  <span className="text-[14px] text-[#7a7a7a] font-medium">
                    {billingCycle === 'monthly' ? '/mo' : '/yr'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#e0e0e0] text-[13px] text-[#414753]">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>Up to 5 newsletter publications</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>Custom cohort calibrations (Devs, D2C, B2B)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>100-persona deep statistical panel</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>Automated title suggestion engine</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
                  <span>Team sharing & CSV test exports</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onOpenCheckout}
                className="w-full rounded-full border border-[#0066cc] bg-white py-3 text-[15px] font-semibold text-[#0066cc] hover:bg-[#0066cc]/5 transition-all cursor-pointer"
              >
                Start Growth Trial
              </button>
              <div className="text-center text-[11px] text-[#7a7a7a] mt-2">
                Priority support included
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-[#e0e0e0]">
          <h3 className="text-[24px] font-semibold text-[#1b1b1d] text-center mb-8">
            Frequently Answered Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[14px] border border-[#e0e0e0] bg-[#fafafc] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-[15px] font-semibold text-[#1b1b1d] cursor-pointer hover:bg-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#0066cc] text-[18px] ml-4 font-mono">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-[14px] text-[#414753] leading-relaxed bg-white border-t border-[#e0e0e0]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
