import React, { createContext, useContext, useState } from 'react';

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
    const [phase, setPhase] = useState('idle'); // idle | recording | processing | feedback
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState(null);

    const resetInterviewState = () => {
        setPhase('idle');
        setTranscript('');
        setFeedback(null);
    };

    return (
        <InterviewContext.Provider value={{
            phase, setPhase,
            transcript, setTranscript,
            feedback, setFeedback,
            resetInterviewState
        }}>
            {children}
        </InterviewContext.Provider>
    );
}

export function useInterviewContext() {
    return useContext(InterviewContext);
}
