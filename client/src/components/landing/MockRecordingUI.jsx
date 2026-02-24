import { motion } from 'framer-motion';

export function WaveformBars() {
    const bars = [12, 22, 16, 28, 10, 20, 18, 14];

    return (
        <div className="flex items-center gap-[3px] h-8 justify-center" aria-hidden="true">
            {bars.map((height, i) => (
                <motion.div
                    key={i}
                    className="w-1 rounded-full bg-primary"
                    style={{ height }}
                    animate={{ scaleY: [1, 0.4, 1] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                        delay: [0, 0.1, 0.2, 0.15, 0.3, 0.05, 0.25, 0.1][i]
                    }}
                />
            ))}
        </div>
    );
}

export default function MockRecordingUI() {
    return (
        <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-neutral-100 p-4 w-full mt-6 flex flex-col items-center gap-4" aria-hidden="true">
            <div className="flex items-center gap-2 text-danger font-mono font-bold text-xs bg-danger/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" /> Recording... 0:18
            </div>

            <WaveformBars />

            <div className="w-full bg-danger/10 text-danger text-xs font-semibold py-2 rounded-lg mt-2 cursor-default">
                🔴 Tap to stop
            </div>
        </div>
    );
}
