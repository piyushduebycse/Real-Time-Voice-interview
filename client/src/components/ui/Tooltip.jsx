import { useState } from 'react';

export const Tooltip = ({ content, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}>
            {children}
            {isVisible && (
                <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-xs text-white shadow-sm z-50">
                    {content}
                    <div className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
                </div>
            )}
        </div>
    );
};
