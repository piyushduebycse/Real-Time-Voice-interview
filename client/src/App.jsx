import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InterviewPage from './pages/InterviewPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import PageWrapper from './components/layout/PageWrapper.jsx';

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading...</div>;
    if (!isSignedIn) return <Navigate to="/" />;

    return children;
};
const TokenSetter = () => {
    const { getToken } = useAuth();

    React.useEffect(() => {
        window.__clerk_token_getter = getToken;
    }, [getToken]);

    return null;
};

function App() {
    return (
        <BrowserRouter>
            <TokenSetter />
            <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <PageWrapper>
                            <DashboardPage />
                        </PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/interview/:sessionId" element={
                    <ProtectedRoute>
                        <InterviewPage />
                    </ProtectedRoute>
                } />
                <Route path="/history" element={
                    <ProtectedRoute>
                        <PageWrapper>
                            <HistoryPage />
                        </PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <PageWrapper>
                            <ProfilePage />
                        </PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/session/:sessionId/complete" element={
                    <ProtectedRoute>
                        <PageWrapper>
                            <ResultsPage />
                        </PageWrapper>
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
