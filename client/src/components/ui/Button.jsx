import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 hover:shadow-card',
    outline: 'border-2 border-primary text-primary hover:bg-primary-light',
    ghost: 'text-primary hover:bg-primary-light',
    danger: 'bg-danger text-white hover:bg-danger/90',
    success: 'bg-success text-white hover:bg-success/90',
};

const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg font-semibold',
    icon: 'h-11 w-11 flex justify-center',
};

export const Button = forwardRef(({
    className, variant = 'primary', size = 'md', children, ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 ring-offset-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';
