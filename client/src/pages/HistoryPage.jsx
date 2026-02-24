import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useSessions } from '../hooks/useSessions';
import { getScoreColor } from '../utils/formatScore';

export default function HistoryPage() {
    const { sessions, fetchSessions, loading } = useSessions();
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const filtered = sessions.filter(s => filter === 'All' || (s.category && s.category.toLowerCase() === filter.toLowerCase()));

    return (
        <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-8">Interview History</h1>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
                {['All', 'Technical', 'Behavioral', 'HR', 'System Design'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${filter === f ? 'bg-primary text-white shadow-md' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary/50'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {loading && <p className="text-neutral-500 font-medium">Loading your history...</p>}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-12 text-neutral-500 bg-white rounded-xl border border-neutral-200 border-dashed">
                        No sessions found for this category.
                    </div>
                )}
                {!loading && filtered.map(session => (
                    <Card key={session._id} size="sm" className="flex flex-col sm:flex-row gap-0 sm:gap-5 items-start sm:items-center justify-between hover:shadow-md transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: session.averageScore >= 8 ? '#43D9AD' : session.averageScore >= 5 ? '#FFB347' : '#FF6B6B' }}>
                        <CardHeader className="flex-1 pb-2 sm:pb-4 w-full">
                            <CardDescription className="flex items-center gap-3 mb-2">
                                <Badge variant="neutral" className="capitalize">{session.category}</Badge>
                                <span className="text-sm font-medium text-neutral-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                                    {session.totalQuestions} Questions
                                </span>
                                <span className="text-sm font-medium text-neutral-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                                    {new Date(session.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </CardDescription>
                            <CardTitle className="font-semibold text-lg text-neutral-900">{session.title || 'Practice Interview'}</CardTitle>
                        </CardHeader>

                        <CardContent className="flex items-center gap-6 w-full sm:w-auto sm:mt-0 pt-0 sm:pt-4">
                            <div className="flex flex-col sm:items-end w-full sm:w-auto">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Avg Score</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className={`h-full bg-${getScoreColor(session.averageScore || 0)}`}
                                            style={{ width: `${(session.averageScore || 0) * 10}%` }}
                                        />
                                    </div>
                                    <span className={`font-bold text-lg leading-none text-${getScoreColor(session.averageScore || 0)} w-12 text-right`}>
                                        {(session.averageScore || 0).toFixed(1)}<span className="text-xs text-neutral-400 font-medium">/10</span>
                                    </span>
                                </div>
                            </div>
                            <div className="text-primary font-medium text-sm hidden sm:block bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors whitespace-nowrap">Review →</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
