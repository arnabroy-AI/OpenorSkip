import React from "react";
import { GradientHeading } from "./ui/gradient-heading.tsx";
import LogoCarousel from "./ui/logo-carousel.tsx";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface NewsletterStackSectionProps {
  onOpenDashboard?: (tab?: 'simulator' | 'personas' | 'inbox' | 'validation' | 'pricing') => void;
}

export const NewsletterStackSection: React.FC<NewsletterStackSectionProps> = ({
  onOpenDashboard,
}) => {
  return (
    <section className="relative w-full border-b border-[#e0e0e0] bg-[#fafafc] py-20 px-4 sm:px-8 overflow-hidden">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
        
        {/* Header with Gradient Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="block">
            <GradientHeading variant="secondary" size="md" className="block mb-1">
              The best solo newsletters are already tested here
            </GradientHeading>
          </div>

          <button
            onClick={() => onOpenDashboard ? onOpenDashboard('simulator') : undefined}
            className="group block mx-auto cursor-pointer focus:outline-hidden"
          >
            <GradientHeading
              size="xxl"
              className="group-hover:opacity-90 transition-opacity"
            >
              Compatible with your stack
            </GradientHeading>
          </button>

          <p className="text-[16px] text-[#414753] leading-relaxed max-w-xl mx-auto pt-1">
            Whether you publish on Beehiiv, Substack, Kit, Loops, or Ghost—simply copy 
            and paste your draft subject lines before sending. No API keys or integrations required.
          </p>
        </div>

        {/* Multi-Column Animated Logo Carousel */}
        <LogoCarousel columnCount={3} />

        {/* Feature Badges below carousel */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[13px] text-[#414753]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#0066cc]" />
            <span>15-second simulation response</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#0066cc]" />
            <span>40 bootstrapped founder personas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#0066cc]" />
            <span>Word-by-word sentiment & trigger tags</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsletterStackSection;
