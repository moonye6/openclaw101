import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-brand text-white hover:bg-brand-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/25 active:translate-y-0': variant === 'default',
            'bg-surface-elevated text-text-secondary hover:bg-surface-elevated/80 hover:text-white': variant === 'secondary',
            'border border-white/10 bg-transparent text-text-secondary hover:bg-white/5 hover:text-white hover:border-white/20': variant === 'outline',
            'text-text-secondary hover:bg-white/5 hover:text-white': variant === 'ghost',
            'text-brand hover:text-brand-light underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3 text-xs': size === 'sm',
            'h-12 rounded-xl px-8 text-base': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
