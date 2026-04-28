import * as React from 'react';
import { cn } from '@xplaza/utils';

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide transition-colors focus:outline-none',
        {
          'border-transparent bg-primary text-primary-foreground':
            variant === 'default',
          'border-transparent bg-secondary text-secondary-foreground':
            variant === 'secondary',
          'border-transparent bg-destructive text-destructive-foreground':
            variant === 'destructive',
          'text-foreground border-foreground': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
