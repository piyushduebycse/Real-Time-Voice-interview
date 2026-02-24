import { motion } from 'framer-motion';

export default function ConnectorArrow({ triggerDraw }) {
    return (
        <div className="hidden lg:flex absolute top-[140px] -right-[44px] w-12 z-0 pointer-events-none" aria-hidden="true" style={{ transform: 'translateY(-50%)' }}>
            <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line
                    x1="0" y1="6" x2="40" y2="6"
                    stroke="#C7C9E0"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    animate={triggerDraw ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.path
                    d="M40 2L46 6L40 10"
                    stroke="#C7C9E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={triggerDraw ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: triggerDraw ? 0.5 : 0, duration: 0.2 }}
                />
            </svg>
        </div>
    );
}
