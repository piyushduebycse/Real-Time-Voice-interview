import { motion } from 'framer-motion';

export default function CallAnalyzingScreen() {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-8 h-full w-full px-6">
            <div className="flex gap-2">
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                    className="w-4 h-4 bg-primary rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    className="w-4 h-4 bg-primary rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    className="w-4 h-4 bg-primary rounded-full"
                />
            </div>
            <div className="space-y-2">
                <p className="text-lg font-semibold text-neutral-800">Analyzing your interview...</p>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                    Generating per-question feedback. This usually takes 5–10 seconds.
                </p>
            </div>
        </div>
    );
}
