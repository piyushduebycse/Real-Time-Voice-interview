import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';

export default function MicButton({ phase, onStart, onStop }) {
    return (
        <div className="relative flex items-center justify-center">
            {phase === 'recording' && (
                <>
                    <div className="sonar-ring ring-1" />
                    <div className="sonar-ring ring-2" />
                    <div className="sonar-ring ring-3" />
                </>
            )}
            <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={phase === 'idle' ? onStart : onStop}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(108,99,255,0.25)] z-10 transition-colors duration-300
          ${phase === 'recording' ? 'bg-danger shadow-[0_8px_32px_rgba(255,107,107,0.35)]' : 'bg-primary'}`}
            >
                {phase === 'recording' ? (
                    <Square className="w-8 h-8 text-white fill-white" />
                ) : (
                    <Mic className="w-10 h-10 text-white" />
                )}
            </motion.button>
        </div>
    );
}
