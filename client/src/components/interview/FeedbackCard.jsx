import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressRing } from '../ui/ProgressRing';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Check, AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FeedbackCard({ feedback, transcript, onNext, isLast }) {
    const [showIdeal, setShowIdeal] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);

    if (!feedback) return null;

    const getMetricIcon = (value) => {
        if (['excellent', 'good', 'highly-relevant', 'relevant', 'high'].includes(value?.toLowerCase())) return <Check className="w-4 h-4 text-success" />;
        if (['fair', 'partial', 'moderate'].includes(value?.toLowerCase())) return <AlertTriangle className="w-4 h-4 text-warning" />;
        return <AlertCircle className="w-4 h-4 text-danger" />;
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full flex flex-col gap-6 p-1 pb-20"
        >
            <div className="flex flex-col items-center pt-8 pb-4">
                <ProgressRing score={feedback.score} size={140} />
            </div>

            <div className="bg-primary-light/50 p-5 rounded-2xl border border-primary/10 text-neutral-900 italic text-center text-lg leading-relaxed shadow-sm">
                "{feedback.summary}"
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <Badge variant={['excellent', 'good'].includes(feedback.clarity?.toLowerCase()) ? 'success' : 'warning'} className="px-3 py-1.5 text-sm gap-1.5">
                    Clarity: <span className="capitalize">{feedback.clarity}</span> {getMetricIcon(feedback.clarity)}
                </Badge>
                <Badge variant={['highly-relevant', 'relevant'].includes(feedback.relevance?.toLowerCase()) ? 'success' : 'warning'} className="px-3 py-1.5 text-sm gap-1.5">
                    Relevance: <span className="capitalize">{feedback.relevance}</span> {getMetricIcon(feedback.relevance)}
                </Badge>
                <Badge variant={['high'].includes(feedback.confidence?.toLowerCase()) ? 'success' : 'warning'} className="px-3 py-1.5 text-sm gap-1.5">
                    Confidence: <span className="capitalize">{feedback.confidence}</span> {getMetricIcon(feedback.confidence)}
                </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-success/5 border border-success/20 rounded-2xl p-5">
                    <h4 className="flex items-center gap-2 font-display font-semibold text-neutral-900 mb-3">
                        <Check className="text-success w-5 h-5" /> Strengths
                    </h4>
                    <ul className="space-y-2">
                        {feedback.strengths?.map((s, i) => (
                            <li key={i} className="flex gap-2 text-sm text-neutral-800">
                                <span className="text-success mt-0.5">•</span> {s}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-warning/5 border border-warning/20 rounded-2xl p-5">
                    <h4 className="flex items-center gap-2 font-display font-semibold text-neutral-900 mb-3">
                        <AlertTriangle className="text-warning w-5 h-5" /> Areas to Improve
                    </h4>
                    <ul className="space-y-2">
                        {feedback.improvements?.map((s, i) => (
                            <li key={i} className="flex gap-2 text-sm text-neutral-800">
                                <span className="text-warning mt-0.5">•</span> {s}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={() => setShowIdeal(!showIdeal)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl hover:border-primary/30 transition-colors"
                >
                    <span className="font-semibold text-sm uppercase tracking-wider text-neutral-700 flex items-center gap-2">
                        💡 View Suggested Answer
                    </span>
                    {showIdeal ? <ChevronUp className="w-5 h-5 text-neutral-400" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
                </button>
                <AnimatePresence>
                    {showIdeal && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="p-5 bg-primary-light border-l-4 border-l-primary rounded-r-xl text-neutral-800 text-sm leading-relaxed">
                                {feedback.suggestedAnswer}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors"
                >
                    <span className="font-semibold text-sm uppercase tracking-wider text-neutral-700 flex items-center gap-2">
                        📝 Your Transcript
                    </span>
                    {showTranscript ? <ChevronUp className="w-5 h-5 text-neutral-400" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
                </button>
                <AnimatePresence>
                    {showTranscript && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="p-5 bg-neutral-100 rounded-xl font-mono text-xs text-neutral-600 leading-relaxed max-h-60 overflow-y-auto">
                                {transcript || 'No transcript available.'}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex gap-4 pt-6">
                <Button onClick={onNext} size="lg" className="w-full shadow-card hover:shadow-lg transition-all" variant={isLast ? 'success' : 'primary'}>
                    {isLast ? 'Finish Session' : 'Next Question →'}
                </Button>
            </div>
        </motion.div>
    );
}
