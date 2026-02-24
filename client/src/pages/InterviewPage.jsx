import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useVapiInterview } from '../hooks/useVapiInterview';
import VapiCallScreen from '../components/interview/VapiCallScreen';
import CallAnalyzingScreen from '../components/interview/CallAnalyzingScreen';
import { Badge } from '../components/ui/Badge';

export default function InterviewPage() {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        callPhase,
        messages,
        liveTranscript,
        isSpeaking,
        analysisError,
        startCall,
        endCall,
        resetCall,
    } = useVapiInterview(navigate);

    useEffect(() => {
        const initSession = async () => {
            try {
                const { data: sessionData } = await api.get(`/sessions/${sessionId}`);
                setSession(sessionData.session);

                const { data: qData } = await api.get(
                    `/questions/random?category=${sessionData.session.category}&limit=${sessionData.session.totalQuestions}`
                );
                setQuestions(qData.questions || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (sessionId) initSession();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-neutral-500">
                Loading your interview...
            </div>
        );
    }

    if (!session || questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-neutral-500">
                Session not found or no questions available.
            </div>
        );
    }

    const isActive = callPhase === 'active';
    const isAnalyzing = callPhase === 'analyzing';

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row max-w-[1100px] mx-auto overflow-hidden sm:shadow-2xl md:my-6 md:rounded-3xl border border-neutral-200">

            {/* Left Panel — collapses during active call */}
            <div
                className={`bg-white flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 relative z-10 transition-all duration-300 ${
                    isActive || isAnalyzing
                        ? 'w-full md:w-3/12 p-4 md:p-6'
                        : 'w-full md:w-5/12 p-6 md:p-10'
                }`}
            >
                <div className="flex items-center gap-3 mb-4">
                    <Badge variant="neutral" className="capitalize text-xs">{session.category} Round</Badge>
                    <span className="text-sm font-semibold text-neutral-400">
                        {questions.length} question{questions.length !== 1 ? 's' : ''}
                    </span>
                    {isActive && (
                        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Live
                        </span>
                    )}
                </div>

                {/* Show questions list only before call starts */}
                {!isActive && !isAnalyzing && (
                    <>
                        <div className="flex-1 space-y-3 mt-4">
                            {questions.map((q, i) => (
                                <div key={q._id} className="flex gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <span className="text-xs font-bold text-neutral-400 mt-0.5 shrink-0">Q{i + 1}</span>
                                    <p className="text-sm text-neutral-700 leading-snug line-clamp-2">{q.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <p className="text-sm text-amber-800 italic">
                                💡 Tip: Speak naturally. The AI will ask follow-up questions if needed.
                            </p>
                        </div>
                    </>
                )}

                {/* During active/analyzing — show compact question list */}
                {(isActive || isAnalyzing) && (
                    <div className="space-y-2 mt-2">
                        {questions.map((q, i) => (
                            <div key={q._id} className="flex gap-2 items-start py-1">
                                <span className="text-xs font-bold text-neutral-300 mt-0.5 shrink-0">Q{i + 1}</span>
                                <p className="text-xs text-neutral-400 leading-snug line-clamp-2">{q.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Panel */}
            <div
                className={`bg-neutral-50 flex items-stretch min-h-[500px] relative transition-all duration-300 ${
                    isActive || isAnalyzing ? 'w-full md:w-9/12' : 'w-full md:w-7/12'
                }`}
            >
                <AnimatePresence mode="wait">

                    {/* Idle — start interview */}
                    {callPhase === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center text-center space-y-6 p-8 w-full"
                        >
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                <Mic size={32} className="text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-neutral-900">Ready to start your interview?</h3>
                                <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                                    An AI interviewer will speak your questions and listen to your answers in real-time.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
                                <button
                                    onClick={() => startCall(sessionId, questions, session.category)}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                                >
                                    Start Voice Interview
                                </button>
                                <p className="text-xs text-neutral-400">
                                    Your browser will ask for microphone access
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Active — live conversation */}
                    {callPhase === 'active' && (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex flex-col"
                        >
                            <VapiCallScreen
                                messages={messages}
                                liveTranscript={liveTranscript}
                                isSpeaking={isSpeaking}
                                onEndCall={endCall}
                            />
                        </motion.div>
                    )}

                    {/* Analyzing — processing feedback */}
                    {callPhase === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex items-center justify-center"
                        >
                            <CallAnalyzingScreen />
                        </motion.div>
                    )}

                    {/* Error */}
                    {callPhase === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center text-center space-y-5 p-8 w-full"
                        >
                            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                                <AlertCircle size={28} className="text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-neutral-900">Something went wrong</h3>
                                <p className="text-sm text-red-600 max-w-sm mx-auto bg-red-50 px-4 py-2 rounded-lg">
                                    {analysisError}
                                </p>
                            </div>
                            <button
                                onClick={resetCall}
                                className="bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

        </div>
    );
}
