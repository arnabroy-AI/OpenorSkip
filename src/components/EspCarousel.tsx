import React from 'react';
import { Mail, Send, Inbox, Sparkles, CheckCircle2 } from 'lucide-react';

const ESP_LIST = [
  { name: 'Substack', desc: 'Direct paste support', badge: '100% Compatible' },
  { name: 'Beehiiv', desc: 'Optimized for 3D analytics', badge: 'Tested' },
  { name: 'Kit (ConvertKit)', desc: 'Broadcast titles', badge: 'Verified' },
  { name: 'Mailchimp', desc: 'Pre-send check', badge: 'Compatible' },
  { name: 'Ghost', desc: 'Newsletter cards', badge: 'Verified' },
  { name: 'Loops.so', desc: 'SaaS product newsletters', badge: 'Supported' },
  { name: 'Buttondown', desc: 'Markdown newsletters', badge: 'Verified' },
  { name: 'Postmark', desc: 'Broadcast delivery', badge: 'Supported' },
];

export const EspCarousel: React.FC = () => {
  return (
    <section className="w-full border-y border-[#e0e0e0] bg-[#fafafc] py-7 px-4 sm:px-8 overflow-hidden">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7a7a]">
              Compatible With Your Email Stack
            </span>
            <span className="text-[#e0e0e0]">·</span>
            <span className="text-[12px] text-[#414753]">
              Test before pasting into any email service provider
            </span>
          </div>

          <div className="text-[12px] text-[#7a7a7a] flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0066cc]" />
            Zero API connection required — paste & copy in 15 seconds
          </div>
        </div>

        {/* Carousel / Marquee Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {ESP_LIST.map((esp) => (
            <div
              key={esp.name}
              className="flex flex-col justify-center items-center p-3 rounded-[12px] bg-white border border-[#e0e0e0] text-center hover:border-[#0066cc]/40 transition-colors"
            >
              <div className="text-[14px] font-bold text-[#1b1b1d] tracking-tight">
                {esp.name}
              </div>
              <div className="text-[10px] text-[#7a7a7a] mt-0.5 truncate w-full">
                {esp.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
