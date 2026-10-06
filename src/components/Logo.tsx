import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-7 w-7', size = 28 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      width={size}
      height={size}
    >
      <rect width="120" height="120" rx="28" fill="#1d1d1f" />
      <path d="M30 60 L86 32 L62 88 L52 66 L30 60Z" fill="#ffffff" fillOpacity="0.95" />
      <path d="M52 66 L86 32 L60 62 L52 66Z" fill="#0066cc" />
      <circle cx="90" cy="30" r="4" fill="#0066cc" />
      <path d="M74 20 C82 22 88 28 90 36" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 3" />
      <path d="M80 14 C92 18 100 28 102 40" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};
