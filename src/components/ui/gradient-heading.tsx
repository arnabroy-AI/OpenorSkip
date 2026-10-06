import React from "react";
import { cn } from "../../lib/utils.ts";

export interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "accent" | "pink" | "light";
  size?: "default" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  weight?: "default" | "thin" | "base" | "semi" | "bold" | "extrabold" | "black";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

const variantStyles: Record<string, string> = {
  default: "bg-gradient-to-r from-[#1b1b1d] via-[#3f3f46] to-[#18181b]",
  secondary: "bg-gradient-to-r from-[#52525b] via-[#0066cc] to-[#71717a]",
  accent: "bg-gradient-to-r from-[#0066cc] via-[#2563eb] to-[#004e9f]",
  pink: "bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500",
  light: "bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400",
};

const sizeStyles: Record<string, string> = {
  default: "text-2xl sm:text-3xl",
  sm: "text-sm sm:text-base tracking-wide uppercase font-semibold",
  md: "text-base sm:text-lg tracking-normal font-medium",
  lg: "text-2xl sm:text-3xl md:text-4xl",
  xl: "text-3xl sm:text-4xl md:text-5xl",
  xxl: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]",
  xxxl: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02]",
};

const weightStyles: Record<string, string> = {
  default: "font-bold",
  thin: "font-normal",
  base: "font-normal",
  semi: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

export const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  weight = "default",
  as: Component = "h2",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent inline-block tracking-tight text-balance",
        variantStyles[variant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.default,
        weightStyles[weight] || weightStyles.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
