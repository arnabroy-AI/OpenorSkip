import React, { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils.ts';

export interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:35s] [--gap:1rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 justify-around [gap:var(--gap)]',
            vertical ? 'flex-col animate-marquee-vertical' : reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
};
