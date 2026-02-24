import { AnimatePresence, motion } from 'framer-motion';

export const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-card"
                    >
                        {title && <h3 className="mb-4 text-xl font-display font-semibold">{title}</h3>}
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
