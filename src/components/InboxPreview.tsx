import React, { useState } from 'react';
import { Smartphone, Monitor, AlertCircle, CheckCircle, Mail } from 'lucide-react';

interface InboxPreviewProps {
  titles: string[];
  winnerIndex: number;
}

export const InboxPreview: React.FC<InboxPreviewProps> = ({
  titles,
  winnerIndex
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [clientType, setClientType] = useState<'apple' | 'superhuman'>('apple');

  const senderName = 'Liam Vance';
  const newsletterLabel = 'The Bootstrapped Letter';
  const preheaderText = 'Hey everyone, Tuesday morning issue. Here is the teardown of our customer metrics this week...';

  return (
    <div className="w-full space-y-6">
      
      {/* Header Card */}
      <div className="rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e0e0e0]/70 pb-5">
          <div>
            <div className="text-[13px] font-semibold tracking-wider uppercase text-[#0066cc] mb-1">
              Real-World Rendering
            </div>
            <h2 className="text-[26px] font-semibold text-[#1b1b1d] tracking-tight">
              Inbox Client Preview & Truncation Check
            </h2>
            <p className="text-[15px] text-[#7a7a7a] mt-1 max-w-2xl">
              68% of founders read newsletters on mobile while commuting or between deploys. See exactly where your subject lines get cut off.
            </p>
          </div>

          {/* Device & Client Toggles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-[#f5f5f7] rounded-full border border-[#e0e0e0]/60">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 text-[13px] font-medium rounded-full cursor-pointer transition-all ${
                  deviceMode === 'mobile' ? 'bg-white text-[#1b1b1d] font-semibold shadow-sm' : 'text-[#7a7a7a]'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                Mobile (iPhone)
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 text-[13px] font-medium rounded-full cursor-pointer transition-all ${
                  deviceMode === 'desktop' ? 'bg-white text-[#1b1b1d] font-semibold shadow-sm' : 'text-[#7a7a7a]'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                Desktop
              </button>
            </div>
          </div>
        </div>

        {/* Truncation Rule explanation */}
        <div className="pt-4 flex flex-wrap items-center gap-4 text-[13px] text-[#414753]">
          <span className="flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 text-[#883700]" />
            Mobile inbox cutoff threshold: ~40 characters
          </span>
          <span>·</span>
          <span>Golden range: 28–38 characters with hook in first 3 words</span>
        </div>
      </div>

      {/* Simulator Device Frame */}
      <div className="flex justify-center">
        {deviceMode === 'mobile' ? (
          /* Mobile Frame Mockup */
          <div className="w-full max-w-sm rounded-[32px] border-[6px] border-[#272729] bg-[#ffffff] p-4 shadow-xl overflow-hidden">
            {/* iOS Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#1b1b1d] px-3 pt-1 pb-3 border-b border-[#e0e0e0]/50">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span className="inline-block h-2.5 w-4 rounded-xs border border-[#1b1b1d]">
                  <span className="block h-full w-2.5 bg-[#1b1b1d]" />
                </span>
              </div>
            </div>

            {/* Mail Navigation */}
            <div className="py-2.5 px-1 border-b border-[#e0e0e0]/40 flex items-center justify-between">
              <span className="text-[17px] font-bold text-[#1b1b1d]">Inbox</span>
              <span className="text-[12px] text-[#0066cc] font-medium">Edit</span>
            </div>

            {/* Email Rows Comparison */}
            <div className="divide-y divide-[#e0e0e0]/60">
              {titles.map((title, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isWinner = idx === winnerIndex;
                const isTruncated = title.length > 40;

                return (
                  <div
                    key={idx}
                    className={`py-3 px-2 transition-colors ${
                      isWinner ? 'bg-[#0066cc]/5 rounded-[10px] my-1' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between text-[13px] mb-0.5">
                      <div className="flex items-center gap-1.5 font-semibold text-[#1b1b1d]">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                            isWinner ? 'bg-[#0066cc] text-white' : 'bg-[#7a7a7a] text-white'
                          }`}
                        >
                          {letter}
                        </span>
                        <span>{newsletterLabel}</span>
                      </div>
                      <span className="text-[11px] text-[#7a7a7a]">8:30 AM</span>
                    </div>

                    {/* Subject Line in Inbox */}
                    <div className="text-[13px] font-medium text-[#1b1b1d] truncate">
                      {title || '(Draft subject line)'}
                    </div>

                    {/* Preheader */}
                    <div className="text-[12px] text-[#7a7a7a] truncate mt-0.5">
                      {preheaderText}
                    </div>

                    {/* Truncation warning indicator */}
                    {isTruncated && (
                      <div className="mt-1 text-[10px] text-[#883700] flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3 w-3" />
                        First 40 chars shown: &ldquo;{title.slice(0, 40)}...&rdquo;
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Simulated bottom bar */}
            <div className="mt-4 pt-2 border-t border-[#e0e0e0]/40 text-center text-[10px] text-[#7a7a7a]">
              Updated Just Now · 12 Unread
            </div>
          </div>
        ) : (
          /* Desktop Inbox View */
          <div className="w-full max-w-3xl rounded-[18px] border border-[#e0e0e0] bg-[#ffffff] p-6">
            <div className="text-[15px] font-semibold text-[#1b1b1d] mb-4 pb-3 border-b border-[#e0e0e0]">
              Desktop Inbox Preview (Superhuman / Fastmail Style)
            </div>

            <div className="divide-y divide-[#e0e0e0]">
              {titles.map((title, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isWinner = idx === winnerIndex;

                return (
                  <div
                    key={idx}
                    className={`py-3.5 px-3 flex items-center justify-between gap-4 ${
                      isWinner ? 'bg-[#0066cc]/5 rounded-[10px]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 w-1/4">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                          isWinner ? 'bg-[#0066cc] text-white' : 'bg-[#7a7a7a] text-white'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-[13px] font-semibold text-[#1b1b1d] truncate">
                        {newsletterLabel}
                      </span>
                    </div>

                    <div className="flex-1 flex items-baseline gap-2 truncate">
                      <span className="text-[14px] font-medium text-[#1b1b1d] truncate">
                        {title}
                      </span>
                      <span className="text-[13px] text-[#7a7a7a] truncate">
                        — {preheaderText}
                      </span>
                    </div>

                    <span className="text-[12px] text-[#7a7a7a] shrink-0 font-mono">
                      8:30 AM
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
