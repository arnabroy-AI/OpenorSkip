import React from 'react';
import { cn } from '../lib/utils.ts';
import { Marquee } from './ui/marquee.tsx';
import { CheckCircle2, TrendingUp, Sparkles, Star } from 'lucide-react';

export interface SaaSReview {
  name: string;
  username: string;
  role: string;
  subscribers: string;
  body: string;
  img: string;
  metric: string;
  stars?: number;
}

export const SAAS_REVIEWS: SaaSReview[] = [
  {
    name: 'Liam Vance',
    username: '@liamvance',
    role: 'Micro-SaaS Weekly',
    subscribers: '840 subs',
    body: 'Option A hit a 51.2% open rate vs our typical 29%. Testing 3 titles before sending took under 15 seconds. No more 20-minute Tuesday morning paralysis.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    metric: '+74% Lift',
    stars: 5,
  },
  {
    name: 'Sarah Al-Mansoor',
    username: '@sarahmansoor',
    role: 'The Solo Operator',
    subscribers: '1,120 subs',
    body: 'With under 1,000 readers, standard A/B split-tests fail mathematically from tiny sample sizes. Getting 40 founder reactions in 15 seconds solved it completely.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    metric: '+54% Open Rate',
    stars: 5,
  },
  {
    name: 'Marcus Chen',
    username: '@marcusdev',
    role: 'DevTool Digest',
    subscribers: '650 subs',
    body: 'The trigger word heatmap flagged that "musings on Postgres" was skipped by developers. Changed it to exact dollar savings and opens skyrocketed.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    metric: '+69% Lift',
    stars: 5,
  },
  {
    name: 'Elena Rostova',
    username: '@elenarostova',
    role: 'AI Bootstrapper',
    subscribers: '920 subs',
    body: 'Ran the backtest on my last 5 Beehiiv issues. The top-scored simulated title was my actual highest open rate of the month. $9/mo is the easiest ROI in my stack.',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    metric: '+58% Lift',
    stars: 5,
  },
  {
    name: 'Tariq Haddad',
    username: '@tariqhaddad',
    role: 'Marketplace Teardowns',
    subscribers: '740 subs',
    body: 'No pages of fluffy subjective advice. Just exact counts: 28 opens vs 10 skips across real founder personas. The decision takes literally 15 seconds.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    metric: '28 Opens / 10 Skips',
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    username: '@priyagrowth',
    role: 'No-Code Growth',
    subscribers: '980 subs',
    body: 'The mobile truncation preview caught that my key conversion hook was clipped at 40 characters on iOS Mail. Saved our Tuesday newsletter launch.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    metric: '<40 Char Mobile Pass',
    stars: 5,
  },
  {
    name: 'David Park',
    username: '@davidparkdev',
    role: 'Indie Widget Hub',
    subscribers: '530 subs',
    body: 'Priced under NowKnow’s $15 tier, but 10x faster because the simulation fits into the single minute right before hitting Send in ConvertKit.',
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    metric: '+81% Lift',
    stars: 5,
  },
  {
    name: 'Zoe Katsaros',
    username: '@zoekatsaros',
    role: 'Sponsorship Playbook',
    subscribers: '1,300 subs',
    body: 'Sponsors pay based on sustained open rates. OpenOrSkip paid for an entire year subscription within our first two tested email campaigns.',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
    metric: '+65% Lift',
    stars: 5,
  },
  {
    name: 'Alex Rivera',
    username: '@alexbuilds',
    role: 'SaaS Architecture',
    subscribers: '1,050 subs',
    body: 'The alternative generator is wicked smart. Took my boring draft "Newsletter #14" and generated 3 high-impact variants with hard numbers in 2 seconds.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    metric: '+62% Lift',
    stars: 5,
  },
  {
    name: 'Kenji Sato',
    username: '@kenjisato',
    role: 'FullStack Indie',
    subscribers: '710 subs',
    body: 'Having 40 specific profiles from pre-revenue to $50k MRR vote on my title gives me total peace of mind every single Tuesday morning.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    metric: '+51% Lift',
    stars: 5,
  }
];

const firstRow = SAAS_REVIEWS.slice(0, Math.ceil(SAAS_REVIEWS.length / 2));
const secondRow = SAAS_REVIEWS.slice(Math.ceil(SAAS_REVIEWS.length / 2));

export const ReviewCard = ({
  img,
  name,
  username,
  role,
  subscribers,
  body,
  metric,
  stars = 5
}: SaaSReview) => {
  return (
    <figure
      className={cn(
        "relative h-full w-[290px] sm:w-[340px] cursor-pointer overflow-hidden rounded-[16px] border p-4.5 transition-all select-none",
        // Editorial Precision styling matching MagicUI card specs
        "border-[#e0e0e0] bg-white hover:border-[#0066cc]/40 hover:shadow-sm",
        "flex flex-col justify-between"
      )}
    >
      <div>
        {/* Header: Avatar, Name, Handle, Lift Tag */}
        <div className="flex flex-row items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                className="rounded-full object-cover h-9 w-9 border border-[#e0e0e0] bg-[#f5f5f7]"
                alt={name}
                src={img}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to avatar.vercel.sh
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('avatar.vercel.sh')) {
                    target.src = `https://avatar.vercel.sh/${encodeURIComponent(username)}`;
                  }
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0066cc] text-white">
                <CheckCircle2 className="h-2.5 w-2.5" />
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <figcaption className="text-[13px] font-semibold text-[#1b1b1d] leading-snug truncate">
                {name}
              </figcaption>
              <p className="text-[11px] text-[#7a7a7a] truncate">{username}</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-2.5 py-0.5 rounded-full shrink-0 tabular-nums">
            <TrendingUp className="h-3 w-3" />
            {metric}
          </span>
        </div>

        {/* Newsletter context */}
        <div className="text-[11px] font-medium text-[#414753] mb-2 truncate flex items-center gap-1.5">
          <span className="text-[#1b1b1d] font-semibold">{role}</span>
          <span className="text-[#a0a0a0]">·</span>
          <span className="text-[#7a7a7a]">{subscribers}</span>
        </div>

        {/* Review body */}
        <blockquote className="text-[13px] text-[#1b1b1d] leading-relaxed">
          &ldquo;{body}&rdquo;
        </blockquote>
      </div>

      {/* Footer stars & verified badge */}
      <div className="mt-3.5 pt-2.5 border-t border-[#f0f0f2] flex items-center justify-between text-[11px] text-[#7a7a7a]">
        <div className="flex items-center gap-0.5 text-[#ff9900]">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-[#ff9900]" />
          ))}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0066cc]">
          Verified Tuesday Send
        </span>
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-3.5 py-4">
      {/* First Row */}
      <Marquee pauseOnHover className="[--duration:26s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Second Row (Reverse) */}
      <Marquee reverse pauseOnHover className="[--duration:26s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Soft gradient masks matching the background for seamless fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-[#fafafc] via-[#fafafc]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-[#fafafc] via-[#fafafc]/80 to-transparent z-20" />
    </div>
  );
}

export const FounderReviewsMarquee: React.FC = () => {
  return (
    <section className="relative w-full border-b border-[#e0e0e0] bg-[#fafafc] py-16 sm:py-20 overflow-hidden">
      
      {/* Section Header */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 mb-8 text-center">
        <h2 className="text-[28px] sm:text-[36px] font-semibold text-[#1b1b1d] tracking-tight">
          Tested Every Tuesday Morning
        </h2>
        <p className="text-[15px] text-[#7a7a7a] mt-1.5 max-w-xl mx-auto">
          See how newsletter writers with under 1,000 readers use 40 structured founder decisions to eliminate guessing.
        </p>
      </div>

      {/* Customized 2-Row Marquee Demo */}
      <MarqueeDemo />

      {/* Bottom Proof Metric Pill */}
      <div className="mx-auto max-w-[1280px] px-4 mt-8 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[12px] text-[#7a7a7a]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <strong className="text-[#1b1b1d]">Average +61.4%</strong> lift over 4 weeks
          </span>
          <span className="text-[#d0d0d0]">·</span>
          <span className="flex items-center gap-1.5">
            <strong className="text-[#1b1b1d]">15-second</strong> decision speed
          </span>
          <span className="text-[#d0d0d0]">·</span>
          <span className="flex items-center gap-1.5">
            <strong className="text-[#1b1b1d]">Zero</strong> list burn
          </span>
        </div>
      </div>

    </section>
  );
};
