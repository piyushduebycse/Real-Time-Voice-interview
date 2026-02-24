import { useState, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import api from '../services/api';

const buildSystemPrompt = (questions, category) => {
    const questionsList = questions.map((q, i) => `${i + 1}. ${q.text}`).join('\n');
    return `You are a professional ${category} interview coach conducting a structured voice interview practice session.
Your tone is encouraging, professional, and conversational.

You have exactly ${questions.length} questions to ask, in this exact order:
${questionsList}

RULES:
- Ask questions in the exact order listed above. Do not deviate.
- After the candidate answers a question, you may ask ONE natural follow-up to probe deeper (e.g., "Can you give a specific example?" or "What was the outcome?"). Do not ask more than one follow-up per question.
- After the follow-up (or if no follow-up is needed), move to the next question with a brief natural transition.
- Keep your own speaking turns brief (under 30 words for transitions).
- After the candidate answers question ${questions.length}, say: "That was the last question — you did a great job. I'll end the call now." Then end the call.
- Do NOT provide scores, ratings, or detailed feedback during the interview.
- Keep the conversation natural and encouraging throughout.`;
};

const buildAssistantConfig = (questions, category) => ({
    model: {
        provider: 'openai',
        model: 'gpt-4o-mini',
        systemPrompt: buildSystemPrompt(questions, category),
        temperature: 0.7,
    },
    voice: {
        provider: 'openai',
        voiceId: 'alloy',
    },
    transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en',
    },
    firstMessage: `Hi! I'm your AI interviewer today. We'll be going through ${questions.length} ${category} practice question${questions.length !== 1 ? 's' : ''}. Just speak naturally and take your time. Let's get started — ${questions[0]?.text}`,
    endCallMessage: 'Thank you for completing the interview. Your responses are being analyzed now.',
    silenceTimeoutSeconds: 30,
    maxDurationSeconds: questions.length * 180, // 3 minutes per question max
});

export function useVapiInterview(navigate) {
    const [callPhase, setCallPhase] = useState('idle'); // idle | active | analyzing | done | error
    const [messages, setMessages] = useState([]);
    const [liveTranscript, setLiveTranscript] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [analysisError, setAnalysisError] = useState(null);

    // Use refs to avoid stale closures in event handlers
    const vapiRef = useRef(null);
    const messagesRef = useRef([]);
    const sessionIdRef = useRef(null);
    const questionIdsRef = useRef([]);
    const isActiveRef = useRef(false);
    const hasEndedRef = useRef(false);
    const isStartingRef = useRef(false);

    const runAnalysis = useCallback(async () => {
        setCallPhase('analyzing');

        try {
            if (messagesRef.current.length === 0) {
                setCallPhase('error');
                setAnalysisError('The call ended before any conversation was recorded.');
                return;
            }

            const { data } = await api.post('/vapi/analyze', {
                sessionId: sessionIdRef.current,
                questionIds: questionIdsRef.current,
                transcript: messagesRef.current,
            });

            if (data.status === 'success') {
                setCallPhase('done');
                navigate(`/session/${sessionIdRef.current}/complete`);
            } else {
                setCallPhase('error');
                setAnalysisError('Unexpected response from server. Please try again.');
            }
        } catch (err) {
            console.error('Vapi analysis failed:', err);
            setCallPhase('error');
            setAnalysisError(err?.response?.data?.message || 'Failed to analyze interview. Please try again.');
        }
    }, [navigate]);

    const startCall = useCallback((sessionId, questions, category) => {
        if (!import.meta.env.VITE_VAPI_PUBLIC_KEY || import.meta.env.VITE_VAPI_PUBLIC_KEY === 'your_vapi_public_key_here') {
            setCallPhase('error');
            setAnalysisError('Vapi public key not configured. Please add VITE_VAPI_PUBLIC_KEY to your .env.local file.');
            return;
        }

        sessionIdRef.current = sessionId;
        questionIdsRef.current = questions.map(q => q._id);

        // Reset state
        setMessages([]);
        setLiveTranscript('');
        setAnalysisError(null);
        messagesRef.current = [];
        isActiveRef.current = false;
        hasEndedRef.current = false;
        isStartingRef.current = true;

        const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
        vapiRef.current = vapi;

        vapi.on('call-start', () => {
            isActiveRef.current = true;
            isStartingRef.current = false;
            setCallPhase('active');
        });

        vapi.on('speech-start', () => {
            setIsSpeaking(true);
        });

        vapi.on('speech-end', () => {
            setIsSpeaking(false);
        });

        vapi.on('message', (msg) => {
            // Capture all conversation messages from Vapi's message event
            if (msg.type === 'transcript' && msg.transcriptType === 'final' && msg.transcript) {
                const newMsg = {
                    role: msg.role, // 'assistant' or 'user'
                    content: msg.transcript,
                    timestamp: new Date().toISOString(),
                };
                messagesRef.current = [...messagesRef.current, newMsg];
                setMessages(prev => [...prev, newMsg]);
                setLiveTranscript('');
            } else if (msg.type === 'transcript' && msg.transcriptType === 'partial') {
                setLiveTranscript(msg.transcript || '');
            }
        });

        vapi.on('call-end', () => {
            // Guard against duplicate processing
            if (hasEndedRef.current) return;
            hasEndedRef.current = true;
            isActiveRef.current = false;
            isStartingRef.current = false;
            setIsSpeaking(false);

            // Run analysis
            runAnalysis();
        });

        vapi.on('error', (err) => {
            console.error('Vapi error:', err?.message || err);

            // Only show error UI if the call hasn't started yet AND we're not in the middle of starting.
            // During an active call or after the call has ended, ignore non-fatal errors
            // (WebSocket reconnections, transient network issues, etc.)
            if (!isActiveRef.current && !hasEndedRef.current && !isStartingRef.current) {
                setCallPhase('error');
                setAnalysisError(err?.message || (typeof err === 'string' ? err : 'Call failed unexpectedly. Please try again.'));
                setIsSpeaking(false);
            }
        });

        // Set callPhase to indicate we're connecting (still idle visually, but prevents error from showing)
        setCallPhase('idle');
        vapi.start(buildAssistantConfig(questions, category)).catch((err) => {
            console.error('Vapi start failed:', err);
            if (!isActiveRef.current && !hasEndedRef.current) {
                isStartingRef.current = false;
                setCallPhase('error');
                setAnalysisError(err?.message || 'Failed to start the interview call. Please check your microphone permissions and try again.');
            }
        });
    }, [navigate, runAnalysis]);

    const endCall = useCallback(() => {
        if (vapiRef.current) {
            try {
                vapiRef.current.stop();
            } catch (err) {
                console.error('Error stopping Vapi call:', err);
                // If stop() fails, manually trigger analysis if we had an active call
                if (isActiveRef.current && !hasEndedRef.current) {
                    hasEndedRef.current = true;
                    isActiveRef.current = false;
                    setIsSpeaking(false);
                    runAnalysis();
                }
            }
        }
    }, [runAnalysis]);

    const resetCall = useCallback(() => {
        // Clean up existing Vapi instance
        if (vapiRef.current) {
            try {
                vapiRef.current.stop();
            } catch (_) {
                // Ignore — we're resetting anyway
            }
        }
        setCallPhase('idle');
        setMessages([]);
        setLiveTranscript('');
        setIsSpeaking(false);
        setAnalysisError(null);
        messagesRef.current = [];
        vapiRef.current = null;
        isActiveRef.current = false;
        hasEndedRef.current = false;
        isStartingRef.current = false;
    }, []);

    return {
        callPhase,
        messages,
        liveTranscript,
        isSpeaking,
        analysisError,
        startCall,
        endCall,
        resetCall,
    };
}
