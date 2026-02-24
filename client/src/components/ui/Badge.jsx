import { forwardRef } from 'react';
import { cn } from './Button';

const badgeVariants = {
    default: 'bg-primary-light text-primary',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    danger: 'bg-danger/15 text-danger',
    neutral: 'bg-neutral-200 text-neutral-700',
    outline: 'border border-neutral-200 text-neutral-700'
};

export const Badge = forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                badgeVariants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Badge.displayName = 'Badge';
