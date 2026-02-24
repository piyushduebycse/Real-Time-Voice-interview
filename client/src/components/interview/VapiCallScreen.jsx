import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Phone } from 'lucide-react';

export default function VapiCallScreen({ messages, liveTranscript, isSpeaking, onEndCall }) {
    const bottomRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, liveTranscript]);

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-white shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-neutral-700">Interview in progress</span>
                </div>
                <button
                    onClick={onEndCall}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                    <Phone size={14} className="rotate-[135deg]" />
                    End Interview
                </button>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === 'user'
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm'
                                }`}
                            >
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Live partial transcript */}
                {liveTranscript && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end"
                    >
                        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed bg-primary/20 text-primary border border-primary/20 italic">
                            {liveTranscript}
                        </div>
                    </motion.div>
                )}

                {/* Empty state */}
                {messages.length === 0 && !liveTranscript && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-neutral-400 py-16 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                            <Mic size={20} className="text-neutral-400" />
                        </div>
                        <p className="text-sm">Connecting to your AI interviewer...</p>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Mic status footer */}
            <div className="shrink-0 px-4 pb-4 pt-2 bg-neutral-50 border-t border-neutral-200">
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                    {isSpeaking ? (
                        <>
                            <motion.div
                                className="flex gap-0.5"
                                initial={false}
                            >
                                {[0, 1, 2, 3].map(i => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-primary rounded-full"
                                        animate={{ height: ['6px', '16px', '6px'] }}
                                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                    />
                                ))}
                            </motion.div>
                            <span className="text-primary font-medium">AI is speaking...</span>
                        </>
                    ) : (
                        <>
                            <Mic size={14} className="text-green-500" />
                            <span>Your microphone is active — speak your answer</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
