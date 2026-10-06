import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Logo } from "../Logo.tsx";
import { Check, ArrowRight, Zap, Users, Sparkles, Filter, Smartphone } from "lucide-react";

export interface MacbookScrollProps {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

export const MacbookScroll: React.FC<MacbookScrollProps> = ({
  src,
  showGradient = false,
  title,
  badge,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth cinematic elevation as user scrolls past
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.85, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* Title Header */}
      {title && (
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {title}
        </div>
      )}

      {/* Hardware Staging Canvas */}
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformPerspective: 1200,
        }}
        className="w-full max-w-[1020px] mx-auto flex flex-col items-center transition-all duration-300"
      >
        {/* ================= MACBOOK DISPLAY (LID) ================= */}
        <div className="w-full rounded-t-[24px] sm:rounded-t-[28px] border-[10px] sm:border-[12px] border-[#1d1d1f] bg-[#0a0a0c] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.35)] relative overflow-hidden">
          
          {/* Top Bezel Notch with Camera */}
          <div className="absolute top-0 inset-x-0 mx-auto w-24 sm:w-28 h-4 sm:h-4.5 bg-[#1d1d1f] rounded-b-[10px] z-30 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] ring-1 ring-black/80" />
            <span className="w-1 h-1 rounded-full bg-[#0a4a28]/60" />
          </div>

          {/* Screen Glass Surface */}
          <div className="w-full aspect-[16/10] bg-[#fcf8fb] overflow-hidden relative flex flex-col select-none">
            {children ? (
              children
            ) : src ? (
              <img
                src={src}
                alt="Dashboard Screen"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <RealisticDashboardView />
            )}

            {/* In case custom image is provided but fails, fallback renders */}
            {src && (
              <div className="absolute inset-0 -z-10">
                <RealisticDashboardView />
              </div>
            )}
          </div>
        </div>

        {/* ================= MACBOOK HINGE & BOTTOM CHASSIS ================= */}
        {/* Aluminum Hinge Bar */}
        <div className="w-[72%] sm:w-[68%] h-3 bg-gradient-to-b from-[#141416] via-[#242426] to-[#1a1a1c] border-x border-[#1d1d1f] relative z-20 shadow-md" />

        {/* Aluminum Bottom Lip (Chassis Base) */}
        <div className="w-[104%] sm:w-[103%] h-4 sm:h-5 bg-gradient-to-b from-[#e5e5ea] dark:from-[#2c2c2e] to-[#d1d1d6] dark:to-[#1c1c1e] rounded-b-[20px] sm:rounded-b-[24px] border-t border-black/20 relative shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex items-start justify-center">
          {/* Display Opening Thumb Notch */}
          <div className="w-20 sm:w-24 h-1.5 bg-[#a1a1aa] dark:bg-[#141416] rounded-b-md shadow-inner" />
        </div>

        {/* Floating Hardware Badge */}
        {badge && (
          <div className="mt-6 flex justify-center">
            {badge}
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* High-fidelity OpenOrSkip Dashboard Display Mockup */
export const RealisticDashboardView = () => {
  const [activeTab, setActiveTab] = React.useState<"decision" | "personas">("decision");

  return (
    <div className="w-full h-full flex flex-col bg-[#fcf8fb] text-[#1b1b1d] font-sans text-left">
      
      {/* Top Browser / macOS Window Header */}
      <div className="h-9 sm:h-10 bg-white border-b border-[#e0e0e0] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#e0e0e0]">
            <Logo className="h-4 w-4" size={16} />
            <span className="text-[12px] font-bold tracking-tight text-[#1b1b1d]">OpenOrSkip</span>
            <span className="text-[10px] text-[#7a7a7a] hidden sm:inline">· Pre-Send Decision Matrix</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
          <span className="text-[#0066cc] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] animate-pulse" />
            40 Bootstrappers Online
          </span>
          <span className="text-[#7a7a7a] hidden sm:inline">· 15s Latency</span>
        </div>
      </div>

      {/* Main Dashboard Canvas */}
      <div className="flex-1 p-3.5 sm:p-5 overflow-hidden grid grid-cols-12 gap-3 sm:gap-4">
        
        {/* Left Column: Decision Matrix (8 cols) */}
        <div className="col-span-12 sm:col-span-8 flex flex-col justify-between space-y-2.5">
          
          {/* Winner Card: Title A */}
          <div className="p-3.5 sm:p-4 rounded-[14px] bg-white border-2 border-[#0066cc] shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#0066cc] px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Check className="h-3 w-3" /> Option A (Winner)
              </span>
              <span className="text-[12px] font-bold text-[#0066cc] tabular-nums">
                +211% Open Lift
              </span>
            </div>

            <h4 className="text-[14px] sm:text-[16px] font-semibold text-[#1b1b1d] leading-snug">
              &ldquo;How I got my first 100 paying users&rdquo;
            </h4>

            {/* Counts & Meter */}
            <div className="mt-2.5 pt-2 border-t border-[#e0e0e0]/70 flex items-baseline justify-between">
              <div>
                <span className="text-[20px] sm:text-[24px] font-bold text-[#0066cc] tabular-nums">
                  70.0%
                </span>
                <span className="text-[11px] text-[#7a7a7a] ml-1.5">Open Rate</span>
              </div>

              <div className="flex items-center gap-2.5 text-[11px] font-mono text-[#414753]">
                <span className="font-semibold text-[#0066cc]">28 Opens</span>
                <span>·</span>
                <span>10 Skips</span>
                <span>·</span>
                <span className="text-[#7a7a7a]">2 Confused</span>
              </div>
            </div>

            <div className="mt-1.5 flex h-2 w-full rounded-full bg-[#f0edef] overflow-hidden">
              <div className="w-[70%] bg-[#0066cc]" />
              <div className="w-[25%] bg-[#7a7a7a]" />
              <div className="w-[5%] bg-[#dcd9dc]" />
            </div>
          </div>

          {/* Option B: Skipped Title */}
          <div className="p-3 rounded-[12px] bg-white border border-[#e0e0e0] flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase text-[#ba1a1a]">
                Option B (High Skip Risk)
              </div>
              <div className="text-[12px] font-medium text-[#7a7a7a] truncate">
                &ldquo;Some thoughts on growth this week&rdquo;
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[13px] font-bold text-[#7a7a7a] tabular-nums">22.5%</div>
              <div className="text-[10px] text-[#ba1a1a] font-medium">-18 Skips</div>
            </div>
          </div>

          {/* Linguistic Trigger Tags */}
          <div className="p-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#7a7a7a] font-medium">Triggers:</span>
              <span className="font-semibold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded">
                +first 100 paying users
              </span>
              <span className="font-semibold text-[#ba1a1a] bg-[#ba1a1a]/10 px-2 py-0.5 rounded">
                -some thoughts on
              </span>
            </div>
            <span className="text-[10px] text-[#7a7a7a] font-mono">Mobile fold: 38/40 Chars</span>
          </div>

        </div>

        {/* Right Column: 40-Persona Panel Mini Inspector (4 cols) */}
        <div className="hidden sm:flex col-span-4 rounded-[14px] bg-white border border-[#e0e0e0] p-3 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-2 mb-2">
              <span className="text-[11px] font-bold text-[#1b1b1d] uppercase tracking-wider">
                Founder Feed (40)
              </span>
              <span className="text-[10px] text-[#0066cc] font-semibold">Active</span>
            </div>

            {/* Persona Rows */}
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#fafafc] border border-[#e0e0e0]/60">
                <div className="truncate pr-2">
                  <div className="font-semibold text-[#1b1b1d] truncate">Liam Vance</div>
                  <div className="text-[10px] text-[#7a7a7a]">Micro-SaaS ($4.2k MRR)</div>
                </div>
                <span className="text-[10px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-1.5 py-0.5 rounded shrink-0">
                  OPEN
                </span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#fafafc] border border-[#e0e0e0]/60">
                <div className="truncate pr-2">
                  <div className="font-semibold text-[#1b1b1d]">Elena Rostova</div>
                  <div className="text-[10px] text-[#7a7a7a]">AI Tool ($12k MRR)</div>
                </div>
                <span className="text-[10px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-1.5 py-0.5 rounded shrink-0">
                  OPEN
                </span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#fafafc] border border-[#e0e0e0]/60">
                <div className="truncate pr-2">
                  <div className="font-semibold text-[#7a7a7a] truncate">Marcus Chen</div>
                  <div className="text-[10px] text-[#7a7a7a]">DevTool ($850 MRR)</div>
                </div>
                <span className="text-[10px] font-bold text-[#7a7a7a] bg-[#7a7a7a]/10 px-1.5 py-0.5 rounded shrink-0">
                  SKIP
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#e0e0e0] text-center">
            <span className="text-[11px] font-semibold text-[#0066cc]">
              Send Title A with Confidence →
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
