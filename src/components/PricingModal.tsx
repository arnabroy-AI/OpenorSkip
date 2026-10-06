import React, { useState } from 'react';
import { Check, X, Shield, Zap, HelpCircle } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-[24px] bg-[#ffffff] border border-[#e0e0e0] p-6 sm:p-9 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-[#7a7a7a] hover:text-[#1b1b1d] transition-colors p-1 rounded-full cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] mb-1">
            Founder Pricing
          </div>
          <h3 className="text-[28px] font-semibold text-[#1b1b1d] tracking-tight">
            $9 / Month Per Channel
          </h3>
          <p className="text-[15px] text-[#7a7a7a] mt-1.5">
            Priced under NowKnow’s $15 Basic plan. Designed specifically for founders under 1,000 readers in the minute before they send.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#f5f5f7] rounded-full border border-[#e0e0e0] mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-white text-[#1b1b1d] font-semibold shadow-sm' : 'text-[#7a7a7a]'
              }`}
            >
              $9 / month
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                billingCycle === 'annual' ? 'bg-white text-[#1b1b1d] font-semibold shadow-sm' : 'text-[#7a7a7a]'
              }`}
            >
              $79 / year (Save 27%)
            </button>
          </div>
        </div>

        {/* Main Plan Card */}
        <div className="rounded-[18px] border-2 border-[#0066cc] bg-[#fafafc] p-6 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="text-[18px] font-semibold text-[#1b1b1d]">The Tuesday Founder Pass</div>
              <div className="text-[13px] text-[#7a7a7a]">Unlimited pre-send runs on 1 newsletter list</div>
            </div>
            <div className="text-right">
              <span className="text-[32px] font-bold text-[#1b1b1d] tabular-nums">
                {billingCycle === 'monthly' ? '$9' : '$79'}
              </span>
              <span className="text-[13px] text-[#7a7a7a] font-medium">
                {billingCycle === 'monthly' ? '/mo' : '/yr'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[13px] text-[#414753] pt-2 border-t border-[#e0e0e0]">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
              <span>40 bootstrapped founder personas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
              <span>15-second sub-second decision latency</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
              <span>Exact open/skip counts (not text opinions)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
              <span>Word-level attention heatmap</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
              <span>Mobile email client truncation warnings</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#0066cc] shrink-0" />
              <span>5-issue historical benchmark tool</span>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={() => setSubscribed(true)}
              className="w-full rounded-full bg-[#0066cc] py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#004e9f] active:scale-98 cursor-pointer shadow-none"
            >
              {subscribed ? 'Active Subscription (Founder Pass)' : 'Start 14-Day Free Trial ($9/mo thereafter)'}
            </button>
            <div className="text-center text-[11px] text-[#7a7a7a] mt-2">
              Cancel anytime with 1 click · No questions asked
            </div>
          </div>
        </div>

        {/* Why Not JevTown or NowKnow? Comparison Table */}
        <div>
          <h4 className="text-[14px] font-semibold text-[#1b1b1d] mb-3">
            Why It Beats Broad Persona Tools:
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-[#e0e0e0] text-[#7a7a7a]">
                  <th className="py-2">Dimension</th>
                  <th className="py-2 font-semibold text-[#0066cc]">OpenOrSkip</th>
                  <th className="py-2">JevTown</th>
                  <th className="py-2">NowKnow Basic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e0e0]/60 text-[#414753]">
                <tr>
                  <td className="py-2 font-medium text-[#1b1b1d]">Audience</td>
                  <td className="py-2 text-[#0066cc] font-semibold">Strict founder niche only</td>
                  <td className="py-2">10,000 generic internet personas</td>
                  <td className="py-2">Broad web visitors</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-[#1b1b1d]">Output</td>
                  <td className="py-2 text-[#0066cc] font-semibold">Hard counts (opens/skips)</td>
                  <td className="py-2">Paragraphs of opinion</td>
                  <td className="py-2">Ad review commentary</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-[#1b1b1d]">Speed</td>
                  <td className="py-2 text-[#0066cc] font-semibold">15 seconds (pre-send fit)</td>
                  <td className="py-2">2-3 minutes</td>
                  <td className="py-2">Minutes</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-[#1b1b1d]">Price</td>
                  <td className="py-2 text-[#0066cc] font-semibold">$9 / month</td>
                  <td className="py-2">Free demo</td>
                  <td className="py-2">$15 / month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
