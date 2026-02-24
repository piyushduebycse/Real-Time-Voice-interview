import { forwardRef, createContext, useContext } from 'react';
import { cn } from './Button';

const CardContext = createContext({ size: 'default' });

export const Card = forwardRef(({ className, size = 'default', children, ...props }, ref) => (
    <CardContext.Provider value={{ size }}>
        <div
            ref={ref}
            className={cn(
                'rounded-2xl bg-white border border-neutral-200 shadow-sm text-neutral-900 overflow-hidden',
                className
            )}
            {...props}
        >
            {children}
        </div>
    </CardContext.Provider>
));
Card.displayName = 'Card';

export const CardHeader = forwardRef(({ className, ...props }, ref) => {
    const { size } = useContext(CardContext);
    return (
        <div ref={ref} className={cn('flex flex-col space-y-1.5', size === 'sm' ? 'p-4' : 'p-6', className)} {...props} />
    );
});
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef(({ className, ...props }, ref) => {
    const { size } = useContext(CardContext);
    return (
        <h3 ref={ref} className={cn('font-display font-semibold leading-none tracking-tight', size === 'sm' ? 'text-lg' : 'text-2xl', className)} {...props} />
    );
});
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef(({ className, ...props }, ref) => {
    const { size } = useContext(CardContext);
    return (
        <p ref={ref} className={cn('text-sm text-neutral-500', size === 'sm' ? 'text-xs' : 'text-sm', className)} {...props} />
    );
});
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef(({ className, ...props }, ref) => {
    const { size } = useContext(CardContext);
    return (
        <div ref={ref} className={cn(size === 'sm' ? 'p-4 pt-0' : 'p-6 pt-0', className)} {...props} />
    );
});
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef(({ className, ...props }, ref) => {
    const { size } = useContext(CardContext);
    return (
        <div ref={ref} className={cn('flex items-center', size === 'sm' ? 'p-4 pt-0' : 'p-6 pt-0', className)} {...props} />
    );
});
CardFooter.displayName = 'CardFooter';
