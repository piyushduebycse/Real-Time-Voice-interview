import { useState, useCallback } from 'react';
import api from '../services/api';

export const useSessions = () => {
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState([]);

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/sessions');
            setSessions(data.sessions || []);
        } catch (error) {
            console.error('Failed to fetch sessions', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createSession = async (sessionData) => {
        try {
            const { data } = await api.post('/sessions', sessionData);
            return data.session;
        } catch (error) {
            console.error('Failed to create session', error);
            throw error;
        }
    };

    const updateSession = async (sessionId, updateData) => {
        try {
            const { data } = await api.patch(`/sessions/${sessionId}`, updateData);
            return data.session;
        } catch (error) {
            console.error('Failed to update session', error);
            throw error;
        }
    };

    return { sessions, loading, fetchSessions, createSession, updateSession };
};
