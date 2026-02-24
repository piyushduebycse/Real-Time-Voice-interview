import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MockFeedbackCard({ triggerAnimation }) {
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (triggerAnimation) {
            let current = 0;
            const interval = setInterval(() => {
                if (current < 8) {
                    current++;
                    setScore(current);
                } else {
                    clearInterval(interval);
                }
            }, 70);
            return () => clearInterval(interval);
        } else {
            setScore(0);
        }
    }, [triggerAnimation]);

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = triggerAnimation ? circumference - (80 / 100) * circumference : circumference;

    return (
        <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-neutral-100 p-4 text-left w-full mt-6" aria-hidden="true">

            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="transform -rotate-90 w-14 h-14">
                        <circle
                            cx="28" cy="28" r={radius}
                            stroke="currentColor" strokeWidth="4" fill="transparent"
                            className="text-neutral-100"
                        />
                        <motion.circle
                            cx="28" cy="28" r={radius}
                            stroke="currentColor" strokeWidth="4" fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-[#43D9AD]"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col mt-0.5">
                        <span className="font-bold text-neutral-900 leading-none text-lg">
                            {score}<span className="text-[9px] text-neutral-400 font-medium">/10</span>
                        </span>
                    </div>
                </div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Score</div>
            </div>

            <div className="space-y-1.5 mb-4">
                {[
                    { icon: '✅', text: 'Clear explanation' },
                    { icon: '✅', text: 'Good use of examples' },
                    { icon: '🔧', text: 'Add edge case handling' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="text-[11px] text-neutral-700 flex gap-2 items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={triggerAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: triggerAnimation ? 0.8 + (i * 0.1) : 0 }}
                    >
                        <span>{item.icon}</span> {item.text}
                    </motion.div>
                ))}
            </div>

            <div className="flex gap-2 pt-3 border-t border-neutral-100">
                <span className="text-[9px] font-semibold text-[#43D9AD] bg-[#43D9AD]/10 px-1.5 py-0.5 rounded">Clarity: Good</span>
                <span className="text-[9px] font-semibold text-[#43D9AD] bg-[#43D9AD]/10 px-1.5 py-0.5 rounded">Conf: High</span>
            </div>

        </div>
    );
}
