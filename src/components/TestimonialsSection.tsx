import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Star, TrendingUp, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  newsletter: string;
  subscribers: string;
  avatar: string;
  quote: string;
  beforeRate: string;
  afterRate: string;
  lift: string;
  winningTitle: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Liam Vance',
    role: 'Solo Bootstrapper ($4.2k MRR)',
    newsletter: 'Micro-SaaS Weekly',
    subscribers: '840 readers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    quote: 'I used to stare at two titles for 25 minutes every Tuesday morning, totally paralyzed. OpenOrSkip showed that "How I got my first 100 users" triggered 28 opens while "Thoughts on growth" triggered 10 skips. The choice became a hard number in 15 seconds.',
    beforeRate: '29.4%',
    afterRate: '51.2%',
    lift: '+74.1%',
    winningTitle: 'How I got my first 100 paying users'
  },
  {
    id: 't2',
    name: 'Sarah Al-Mansoor',
    role: 'Creator-Educator',
    newsletter: 'The Solo Operator',
    subscribers: '1,120 readers',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    quote: 'When your newsletter has under 1,000 readers, standard A/B testing is mathematically broken because neither split has enough volume. Getting 40 founder reactions in 15 seconds is like having a focused editorial committee before clicking Send.',
    beforeRate: '31.5%',
    afterRate: '48.7%',
    lift: '+54.6%',
    winningTitle: 'Steal our onboarding email sequence (42% conversion)'
  },
  {
    id: 't3',
    name: 'Marcus Chen',
    role: 'DevTool Builder',
    newsletter: 'DevTool Digest',
    subscribers: '650 readers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    quote: 'The word-level trigger heatmap is the real game-changer. It immediately flagged that my technical audience deleted emails with words like "musings" or "updates". Now every title leads with hard numbers and concrete benchmarks.',
    beforeRate: '26.8%',
    afterRate: '45.3%',
    lift: '+69.0%',
    winningTitle: 'Why we switched back to Postgres (and saved $2,400/mo)'
  },
  {
    id: 't4',
    name: 'Elena Rostova',
    role: 'AI Tool Founder ($12k MRR)',
    newsletter: 'The Bootstrapped AI',
    subscribers: '920 readers',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    quote: 'I ran the 5-issue benchmark test against my past Beehiiv analytics. The top-scored simulated title was my highest real open rate of the entire month. Subscribed to the $9/mo plan immediately.',
    beforeRate: '33.1%',
    afterRate: '52.4%',
    lift: '+58.3%',
    winningTitle: 'The 3 bugs that almost killed our launch'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="w-full bg-[#fcf8fb] border-b border-[#e0e0e0] py-16 px-4 sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e0e0e0]/70 pb-6 mb-10">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc] mb-1">
              Founder Proof & Attribution
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1b1b1d] tracking-tight">
              What Founders Send After Their First 15 Seconds
            </h2>
            <p className="text-[15px] text-[#7a7a7a] mt-1 max-w-xl">
              Concrete before-and-after open rate improvements from solo newsletter writers.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#1b1b1d] hover:border-[#0066cc] hover:text-[#0066cc] transition-colors cursor-pointer"
              title="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#1b1b1d] hover:border-[#0066cc] hover:text-[#0066cc] transition-colors cursor-pointer"
              title="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="rounded-[22px] bg-white border border-[#e0e0e0] p-7 sm:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Quote & Author (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <Quote className="h-8 w-8 text-[#0066cc]/30" />
              <blockquote className="text-[18px] sm:text-[22px] font-normal text-[#1b1b1d] leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3.5 pt-2 border-t border-[#e0e0e0]/60">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-full object-cover border border-[#e0e0e0]"
                />
                <div>
                  <div className="font-semibold text-[16px] text-[#1b1b1d]">
                    {current.name}
                  </div>
                  <div className="text-[13px] text-[#7a7a7a]">
                    {current.role} · <span className="font-medium text-[#1b1b1d]">{current.newsletter}</span> ({current.subscribers})
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Metrics Impact Card (4 cols) */}
            <div className="lg:col-span-4 rounded-[16px] bg-[#fafafc] border border-[#e0e0e0] p-6 space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7a7a7a]">
                Verified Issue Lift
              </div>

              <div className="flex items-baseline justify-between border-b border-[#e0e0e0]/70 pb-3">
                <span className="text-[13px] text-[#7a7a7a]">Previous Baseline:</span>
                <span className="text-[17px] font-semibold text-[#7a7a7a] tabular-nums line-through">
                  {current.beforeRate}
                </span>
              </div>

              <div className="flex items-baseline justify-between border-b border-[#e0e0e0]/70 pb-3">
                <span className="text-[13px] text-[#1b1b1d] font-medium">After OpenOrSkip:</span>
                <span className="text-[24px] font-bold text-[#0066cc] tabular-nums">
                  {current.afterRate}
                </span>
              </div>

              <div className="rounded-[10px] bg-[#0066cc]/10 p-3 text-center">
                <span className="text-[12px] font-bold text-[#004e9f]">
                  {current.lift} Measured Open Rate Lift
                </span>
              </div>

              <div className="text-[11px] text-[#7a7a7a] italic truncate">
                Winning title: &ldquo;{current.winningTitle}&rdquo;
              </div>
            </div>

          </div>
        </div>

        {/* Mini cards for other testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TESTIMONIALS.filter((_, idx) => idx !== activeIndex).map((item, i) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(TESTIMONIALS.findIndex(t => t.id === item.id))}
              className="p-5 rounded-[14px] bg-white border border-[#e0e0e0] hover:border-[#0066cc] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-[14px] text-[#1b1b1d]">{item.name}</div>
                <div className="text-[12px] font-bold text-[#0066cc]">{item.lift}</div>
              </div>
              <p className="text-[13px] text-[#414753] line-clamp-2 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="text-[11px] text-[#7a7a7a] mt-2">
                {item.newsletter} · {item.subscribers}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
