import { motion } from 'framer-motion';

export default function StepCard({ number, icon, title, description, children, delay }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
            }}
            className="bg-white rounded-[20px] px-6 py-8 shadow-[0_4px_32px_rgba(108,99,255,0.08),0_1px_4px_rgba(0,0,0,0.04)] border border-[#EAECF5] flex flex-col items-center text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(108,99,255,0.14),0_2px_8px_rgba(0,0,0,0.06)] relative w-full lg:w-[320px] z-10"
        >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold font-sans text-sm mb-6 absolute -top-4 shadow-sm">
                {number}
            </div>

            <div className="h-16 flex items-center justify-center mb-5 shrink-0">
                {icon}
            </div>

            <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2">
                {title}
            </h3>

            <p className="text-[15px] text-neutral-700 leading-[1.6] mb-2 max-w-[280px]">
                {description}
            </p>

            {children}
        </motion.div>
    );
}
