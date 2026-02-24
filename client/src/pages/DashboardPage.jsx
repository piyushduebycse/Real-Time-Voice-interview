import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useSessions } from '../hooks/useSessions';
import { getScoreColor } from '../utils/formatScore';
import InterviewSetupModal from '../components/dashboard/InterviewSetupModal';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Label, Tooltip, ResponsiveContainer } from 'recharts';

// Mock chart data for now since we have no sessions
const mockChartData = [
    { name: 'Mon', score: 4 },
    { name: 'Tue', score: 6 },
    { name: 'Wed', score: 5 },
    { name: 'Thu', score: 8 },
    { name: 'Fri', score: 7 },
    { name: 'Sat', score: 9 },
];

export default function DashboardPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { sessions, fetchSessions, loading } = useSessions();

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const avgScore = sessions.length ? (sessions.reduce((sum, s) => sum + (s.averageScore || 0), 0) / sessions.length).toFixed(1) : '0';
    const totalQuestions = sessions.reduce((sum, s) => sum + (s.answeredCount || 0), 0);
    const bestSession = sessions.length ? Math.max(...sessions.map(s => s.averageScore || 0)).toFixed(1) : '0';

    const chartData = sessions.length ? sessions.slice(-7).map(s => ({
        name: new Date(s.startedAt).toLocaleDateString('en', { weekday: 'short' }),
        score: s.averageScore || 0
    })) : mockChartData;

    return (
        <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Sessions', value: sessions.length || 0 },
                    { label: 'Avg Score', value: `${avgScore}/10` },
                    { label: 'Questions Answered', value: totalQuestions },
                    { label: 'Best Session', value: bestSession }
                ].map((stat, i) => (
                    <Card key={i} size="sm" className="border-l-4 border-l-primary flex flex-col items-center justify-center text-center bg-white py-2">
                        <CardHeader className="pb-0 pt-4">
                            <CardTitle className="text-3xl font-display font-bold text-primary">{stat.value}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <CardDescription className="text-xs uppercase tracking-wider font-semibold">{stat.label}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid md:grid-cols-3 gap-8 items-start">

                {/* Left Column (Chart + History) */}
                <div className="md:col-span-2 space-y-8">

                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-display font-semibold text-xl">Your Progress</h3>
                            <Badge variant="neutral">Last 30 days</Badge>
                        </div>
                        <div className="h-64 w-full relative">
                            {sessions.length === 0 && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-xl">
                                    <span className="bg-white px-4 py-2 rounded-lg shadow-sm font-medium text-neutral-600 text-sm">No sessions yet</span>
                                </div>
                            )}
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={chartData}
                                    margin={{ left: -16, right: 0, top: 12, bottom: 18 }}
                                    className="text-neutral-500 [&_.recharts-text]:text-xs"
                                >
                                    <CartesianGrid vertical={false} stroke="currentColor" className="text-neutral-200" />

                                    <XAxis
                                        dataKey="name"
                                        fill="currentColor"
                                        axisLine={false}
                                        tickLine={false}
                                        tickMargin={12}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    >
                                        <Label value="Day" fill="currentColor" className="!text-xs font-medium text-neutral-400" position="bottom" />
                                    </XAxis>

                                    <YAxis
                                        fill="currentColor"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    >
                                        <Label
                                            value="Average Score"
                                            fill="currentColor"
                                            className="!text-xs font-medium text-neutral-400"
                                            style={{ textAnchor: "middle" }}
                                            angle={-90}
                                            position="insideLeft"
                                        />
                                    </YAxis>

                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                                        itemStyle={{ color: '#1E40AF', fontWeight: 'bold' }}
                                        cursor={{ fill: '#f1f5f9' }}
                                    />

                                    <Bar
                                        isAnimationActive={true}
                                        className="fill-primary"
                                        name="Score"
                                        dataKey="score"
                                        maxBarSize={32}
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Line
                                        isAnimationActive={true}
                                        className="stroke-primary"
                                        dataKey="score"
                                        name="Trend"
                                        type="monotone"
                                        strokeWidth={2}
                                        strokeDasharray="0.1 8"
                                        strokeLinecap="round"
                                        activeDot={false}
                                        dot={false}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="font-display font-semibold text-xl">Recent Sessions</h3>
                        {loading ? (
                            <p className="text-neutral-500">Loading sessions...</p>
                        ) : sessions.length === 0 ? (
                            <Card className="p-8 text-center bg-transparent border-dashed">
                                <p className="text-neutral-500 mb-4">No sessions yet — start your first one!</p>
                                <Button onClick={() => setModalOpen(true)}>Start Practicing</Button>
                            </Card>
                        ) : (
                            sessions.slice(0, 3).map(session => (
                                <Card key={session._id} size="sm" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <CardHeader className="pb-3 sm:pb-4 w-full sm:w-auto">
                                        <CardDescription className="flex items-center gap-3 mb-1">
                                            <Badge variant="success" className="capitalize">{session.category}</Badge>
                                            <span className="text-xs text-neutral-500">{new Date(session.createdAt).toLocaleDateString()}</span>
                                        </CardDescription>
                                        <CardTitle className="text-base sm:text-lg font-medium text-neutral-900">{session.title || 'Untitled Session'}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 sm:pt-4 sm:pb-4 w-full sm:w-auto flex items-center justify-end gap-4 border-none">
                                        <div className="text-right hidden sm:block">
                                            <div className="text-xs text-neutral-500">Avg Score</div>
                                            <div className={`font-bold text-${getScoreColor(session.averageScore || 0)}`}>{session.averageScore?.toFixed(1) || '-'} / 10</div>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => { }}>Review</Button>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column (CTA) */}
                <div>
                    <Card size="sm" className="border-dashed border-2 border-primary-light bg-primary/5 text-center flex flex-col items-center justify-center sticky top-24 min-h-[300px]">
                        <CardHeader className="flex flex-col items-center justify-center pb-2">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-card mb-3 text-2xl text-primary font-bold">+</div>
                            <CardTitle className="font-semibold text-xl text-neutral-900">Start New Session</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm mb-6">Choose your category and jump right into a mock interview.</CardDescription>
                            <Button size="lg" className="w-full" onClick={() => setModalOpen(true)}>Configure Interview</Button>

                            <div className="flex flex-wrap justify-center gap-2 mt-6">
                                <Badge variant="outline">Technical</Badge>
                                <Badge variant="outline">Behavioral</Badge>
                                <Badge variant="outline">HR</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>

            <InterviewSetupModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}
