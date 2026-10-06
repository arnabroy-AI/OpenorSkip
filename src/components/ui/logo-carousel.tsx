import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils.ts";

export interface LogoItem {
  id: string | number;
  name: string;
  category?: string;
  badge?: string;
  icon: React.ReactNode;
}

export interface LogoCarouselProps {
  columnCount?: number;
  className?: string;
  logos?: LogoItem[];
}

// Curated list of creator & SaaS email stack logos
const DEFAULT_LOGOS: LogoItem[] = [
  {
    id: "beehiiv",
    name: "Beehiiv",
    category: "Creator Growth Engine",
    badge: "Top ESP",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.5 3.6L12 11.4 5.5 7.8 12 4.2zM5 9.4l6 3.3v6.7l-6-3.3V9.4zm8 10v-6.7l6-3.3v6.7l-6 3.3z" />
      </svg>
    ),
  },
  {
    id: "substack",
    name: "Substack",
    category: "Independent Writers",
    badge: "Direct Paste",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    id: "kit",
    name: "Kit",
    category: "ConvertKit Broadcasts",
    badge: "Creator Stack",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
  {
    id: "loops",
    name: "Loops",
    category: "Modern SaaS Newsletters",
    badge: "MicroSaaS",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
      </svg>
    ),
  },
  {
    id: "ghost",
    name: "Ghost",
    category: "Open Source Publishing",
    badge: "Verified",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.73 2.05 6.98 5.1 8.68V19c0-.55.45-1 1-1h7.8c.55 0 1 .45 1 1v1.68C20 18.98 22 15.73 22 12c0-5.52-4.48-10-10-10zm-3 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </svg>
    ),
  },
  {
    id: "buttondown",
    name: "Buttondown",
    category: "Developer Digests",
    badge: "Markdown",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-2h2zm0-4h-2V7h2z" />
      </svg>
    ),
  },
  {
    id: "resend",
    name: "Resend",
    category: "Modern Email for Devs",
    badge: "Fast Send",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1 3.5v9.5h16V7.5l-8 5-8-5zM12 11l7.8-4.9H4.2L12 11z" />
      </svg>
    ),
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "Classic Broadcasts",
    badge: "Tested",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path fill="#ffffff" d="M12 6a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.2V16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.2c1.79-1.04 3-2.98 3-5.2a6 6 0 0 0-6-6z" />
      </svg>
    ),
  },
  {
    id: "postmark",
    name: "Postmark",
    category: "High Deliverability",
    badge: "Reliable",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-1.4 3L12 12.3 4.4 7h15.2zM3 17.6V8.2l9 6.2 9-6.2v9.4H3z" />
      </svg>
    ),
  },
  {
    id: "brevo",
    name: "Brevo",
    category: "Multichannel Campaigns",
    badge: "Supported",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H9V9h4v7z" />
      </svg>
    ),
  },
  {
    id: "activecampaign",
    name: "ActiveCampaign",
    category: "Customer Journeys",
    badge: "Audience",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13l6.5-13z" />
      </svg>
    ),
  },
  {
    id: "drip",
    name: "Drip",
    category: "E-Commerce Founders",
    badge: "Compatible",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
];

export const LogoCarousel: React.FC<LogoCarouselProps> = ({
  columnCount = 3,
  className,
  logos = DEFAULT_LOGOS,
}) => {
  // Distribute logos evenly across the requested column count
  const columns = useMemo(() => {
    const cols: LogoItem[][] = Array.from({ length: columnCount }, () => []);
    logos.forEach((logo, idx) => {
      cols[idx % columnCount].push(logo);
    });
    return cols;
  }, [logos, columnCount]);

  return (
    <div
      className={cn(
        "relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-[#e0e0e0] bg-white p-4 sm:p-6 shadow-xs",
        className
      )}
    >
      {/* Top and Bottom Gradient Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

      {/* Columns Grid */}
      <div
        className={cn(
          "grid gap-4 sm:gap-6",
          columnCount === 2 && "grid-cols-2",
          columnCount === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          columnCount === 4 && "grid-cols-2 md:grid-cols-4",
          columnCount > 4 && `grid-cols-2 md:grid-cols-${columnCount}`
        )}
      >
        {columns.map((columnLogos, colIndex) => {
          // Stagger speed and direction for natural organic motion
          const duration = 18 + colIndex * 3;
          const isReverse = colIndex % 2 === 1;

          // Duplicate items for continuous seamless loop
          const loopItems = [...columnLogos, ...columnLogos, ...columnLogos];

          return (
            <div
              key={`col-${colIndex}`}
              className="relative h-[320px] overflow-hidden flex flex-col items-center"
            >
              <motion.div
                className="flex flex-col gap-3 w-full"
                animate={{
                  y: isReverse ? ["-50%", "0%"] : ["0%", "-50%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: duration,
                  ease: "linear",
                }}
                whileHover={{ animationPlayState: "paused" }}
              >
                {loopItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-[#e0e0e0] bg-[#fafafc] hover:bg-white hover:border-[#0066cc]/40 hover:shadow-xs transition-all duration-200 cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-[#e0e0e0] text-[#1b1b1d] group-hover:text-[#0066cc] group-hover:border-[#0066cc]/30 transition-colors shadow-2xs">
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-[14px] font-semibold text-[#1b1b1d] group-hover:text-[#0066cc] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#7a7a7a] line-clamp-1">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-medium text-[#414753] bg-white border border-[#e0e0e0] px-2 py-0.5 rounded-full group-hover:border-[#0066cc]/30 group-hover:text-[#0066cc] transition-colors shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default LogoCarousel;
