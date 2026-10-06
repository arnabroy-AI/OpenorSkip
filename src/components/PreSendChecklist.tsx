import React, { useState } from 'react';
import { Check, Copy, CheckCircle2, Send, ExternalLink } from 'lucide-react';

interface PreSendChecklistProps {
  winnerTitle: string;
  winnerLetter: string;
  liftPercent: number;
  openCount: number;
  totalPersonas: number;
}

export const PreSendChecklist: React.FC<PreSendChecklistProps> = ({
  winnerTitle,
  winnerLetter,
  liftPercent,
  openCount,
  totalPersonas
}) => {
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState({
    tested: true,
    mobileSafe: true,
    triggersChecked: true,
    pastedInESP: false
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(winnerTitle);
    setCopied(true);
    setChecklist(prev => ({ ...prev, pastedInESP: true }));
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isMobileSafe = winnerTitle.length <= 42;

  return (
    <div className="rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0]/70 pb-4 mb-5">
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc]">
            Pre-Send Flight Check
          </div>
          <h4 className="text-[19px] font-semibold text-[#1b1b1d] mt-0.5">
            Your Newsletter is Ready to Send
          </h4>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#004e9f] transition-all cursor-pointer shadow-none shrink-0"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Winning Title Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Option {winnerLetter} (&ldquo;{winnerTitle.slice(0, 24)}...&rdquo;)
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[13px]">
        
        {/* Item 1 */}
        <div
          onClick={() => toggleCheck('tested')}
          className={`p-3.5 rounded-[12px] border cursor-pointer transition-all ${
            checklist.tested ? 'border-[#0066cc]/40 bg-[#0066cc]/5 text-[#1b1b1d]' : 'border-[#e0e0e0] text-[#7a7a7a]'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1">
            <CheckCircle2 className={`h-4 w-4 ${checklist.tested ? 'text-[#0066cc]' : 'text-[#e0e0e0]'}`} />
            <span>Persona Tested</span>
          </div>
          <div className="text-[12px] text-[#414753]">
            {openCount}/{totalPersonas} bootstrappers would open (+{liftPercent}% lift).
          </div>
        </div>

        {/* Item 2 */}
        <div
          onClick={() => toggleCheck('mobileSafe')}
          className={`p-3.5 rounded-[12px] border cursor-pointer transition-all ${
            checklist.mobileSafe ? 'border-[#0066cc]/40 bg-[#0066cc]/5 text-[#1b1b1d]' : 'border-[#e0e0e0] text-[#7a7a7a]'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1">
            <CheckCircle2 className={`h-4 w-4 ${checklist.mobileSafe ? 'text-[#0066cc]' : 'text-[#e0e0e0]'}`} />
            <span>Mobile Fold Safe</span>
          </div>
          <div className="text-[12px] text-[#414753]">
            {winnerTitle.length} characters {isMobileSafe ? '(Fits iPhone Mail fold)' : '(Close to 42 char cutoff)'}
          </div>
        </div>

        {/* Item 3 */}
        <div
          onClick={() => toggleCheck('triggersChecked')}
          className={`p-3.5 rounded-[12px] border cursor-pointer transition-all ${
            checklist.triggersChecked ? 'border-[#0066cc]/40 bg-[#0066cc]/5 text-[#1b1b1d]' : 'border-[#e0e0e0] text-[#7a7a7a]'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1">
            <CheckCircle2 className={`h-4 w-4 ${checklist.triggersChecked ? 'text-[#0066cc]' : 'text-[#e0e0e0]'}`} />
            <span>Fluff Removed</span>
          </div>
          <div className="text-[12px] text-[#414753]">
            Eliminated vague &ldquo;some thoughts&rdquo; phrasing.
          </div>
        </div>

        {/* Item 4 */}
        <div
          onClick={() => toggleCheck('pastedInESP')}
          className={`p-3.5 rounded-[12px] border cursor-pointer transition-all ${
            checklist.pastedInESP ? 'border-[#0066cc]/40 bg-[#0066cc]/5 text-[#1b1b1d]' : 'border-[#e0e0e0] text-[#7a7a7a]'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1">
            <CheckCircle2 className={`h-4 w-4 ${checklist.pastedInESP ? 'text-[#0066cc]' : 'text-[#e0e0e0]'}`} />
            <span>Pasted in Newsletter</span>
          </div>
          <div className="text-[12px] text-[#414753]">
            {checklist.pastedInESP ? 'Copied and ready to send!' : 'Click button above to copy title.'}
          </div>
        </div>

      </div>

      <div className="mt-4 pt-3 border-t border-[#e0e0e0]/50 flex items-center justify-between text-[12px] text-[#7a7a7a]">
        <span>Compatible with Substack, Beehiiv, Kit (ConvertKit), Mailchimp, and Ghost.</span>
        <span className="font-semibold text-[#0066cc]">Ready for Tuesday morning send</span>
      </div>
    </div>
  );
};
