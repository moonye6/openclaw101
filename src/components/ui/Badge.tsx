import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'brand';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-brand/15 text-brand-light': variant === 'default',
          'bg-white/5 text-text-secondary': variant === 'secondary',
          'border border-white/10 text-text-secondary': variant === 'outline',
          'bg-success/15 text-success': variant === 'success',
          'bg-warning/15 text-warning': variant === 'warning',
          'bg-brand/20 text-brand-light border border-brand/30': variant === 'brand',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
