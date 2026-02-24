import React, { createContext, useContext, useReducer } from 'react';

const SessionContext = createContext();

const initialState = {
    activeSession: null,
    questions: [],
    currentIndex: 0,
    answers: [],
};

function sessionReducer(state, action) {
    switch (action.type) {
        case 'START_SESSION':
            return { ...state, activeSession: action.payload.session, questions: action.payload.questions, currentIndex: 0, answers: [] };
        case 'NEXT_QUESTION':
            return { ...state, currentIndex: state.currentIndex + 1 };
        case 'SAVE_ANSWER':
            return { ...state, answers: [...state.answers, action.payload] };
        case 'END_SESSION':
            return { ...state, activeSession: { ...state.activeSession, status: 'completed' } };
        default:
            return state;
    }
}

export function SessionProvider({ children }) {
    const [state, dispatch] = useReducer(sessionReducer, initialState);
    return (
        <SessionContext.Provider value={{ state, dispatch }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSessionContext() {
    return useContext(SessionContext);
}
