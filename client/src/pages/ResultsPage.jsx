import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, YAxis } from 'recharts';
import confetti from 'canvas-confetti';
import api from '../services/api';

export default function ResultsPage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let retryCount = 0;
    const maxRetries = 3;

    const loadData = async () => {
      try {
        const { data } = await api.get(`/sessions/${sessionId}`);

        if (cancelled) return;

        // If session is not yet completed and we haven't exhausted retries,
        // wait and retry (analysis might still be running)
        if (data.session?.status !== 'completed' && retryCount < maxRetries) {
          retryCount++;
          setTimeout(loadData, 2000);
          return;
        }

        setSession(data.session);
        setAnswers(data.answers || []);
        setLoading(false);

        // Only fire confetti when we have real results
        if (data.answers && data.answers.length > 0) {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#1E40AF', '#43D9AD', '#FFB347']
          });
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError('Failed to load session results. Please try again.');
          setLoading(false);
        }
      }
    };

    if (sessionId) loadData();

    return () => { cancelled = true; };
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <p className="text-neutral-500 font-medium">Loading session results...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-medium">{error || 'Session not found.'}</p>
          <Link to="/dashboard">
            <Button variant="outline">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasAnswers = answers.length > 0;

  const chartData = answers.map((ans, i) => ({
    name: `Q${i + 1}`,
    score: ans.feedback?.score || 0
  }));

  const displayChartData = chartData.length > 0 ? chartData : [];

  // Find best and worst answers for summary cards
  const bestAnswer = hasAnswers
    ? answers.reduce((best, ans) => (ans.feedback?.score || 0) > (best.feedback?.score || 0) ? ans : best, answers[0])
    : null;
  const worstAnswer = hasAnswers
    ? answers.reduce((worst, ans) => (ans.feedback?.score || 0) < (worst.feedback?.score || 0) ? ans : worst, answers[0])
    : null;

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-8 pb-16 px-4">

      <Card className="p-10 text-center border-t-8 border-t-success relative overflow-hidden bg-white shadow-xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-success/10 to-transparent pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2 relative z-10">Session Complete!</h1>
        <p className="text-neutral-500 text-lg mb-8 relative z-10">Great job making it through. Here's your final assessment.</p>

        <div className="inline-block px-10 py-6 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-inner mb-6 relative z-10">
          <div className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-2">Overall average score</div>
          <div className="text-7xl font-display font-bold text-primary tracking-tight">
            {session.averageScore != null ? session.averageScore.toFixed(1) : '—'} <span className="text-4xl text-neutral-300 font-medium">/ 10</span>
          </div>
        </div>

        <div className="flex justify-center gap-10 text-neutral-600 font-medium relative z-10">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-neutral-900">{answers.length}</span>
            <span className="text-sm uppercase tracking-wide">Questions</span>
          </div>
          <div className="w-px bg-neutral-200" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-neutral-900 capitalize">{session.category || 'Interview'}</span>
            <span className="text-sm uppercase tracking-wide">Category</span>
          </div>
          {session.difficulty && (
            <>
              <div className="w-px bg-neutral-200" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-neutral-900 capitalize">{session.difficulty}</span>
                <span className="text-sm uppercase tracking-wide">Difficulty</span>
              </div>
            </>
          )}
        </div>
      </Card>

      {displayChartData.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 md:col-span-2 shadow-card">
            <h3 className="font-display font-semibold text-xl mb-6">Score Timeline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayChartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                  <YAxis hide domain={[0, 10]} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} />
                  <Bar dataKey="score" radius={[6, 6, 6, 6]}>
                    {displayChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score >= 8 ? '#43D9AD' : entry.score >= 5 ? '#FFB347' : '#FF6B6B'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="space-y-4">
            {bestAnswer?.feedback?.strengths?.[0] && (
              <Card className="p-5 bg-success/10 border-success/20 shadow-sm">
                <div className="text-sm font-bold text-success uppercase mb-2 flex items-center gap-1">Top Strength</div>
                <p className="text-[15px] text-neutral-800 font-medium leading-relaxed">
                  {bestAnswer.feedback.strengths[0]}
                </p>
              </Card>
            )}
            {worstAnswer?.feedback?.improvements?.[0] && (
              <Card className="p-5 bg-warning/10 border-warning/20 shadow-sm">
                <div className="text-sm font-bold text-warning uppercase mb-2 flex items-center gap-1">Focus Area</div>
                <p className="text-[15px] text-neutral-800 font-medium leading-relaxed">
                  {worstAnswer.feedback.improvements[0]}
                </p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Detailed per-question feedback */}
      {hasAnswers && (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-xl">Detailed Feedback</h3>
          {answers.map((ans, i) => {
            const fb = ans.feedback || {};
            const question = ans.questionId;
            const scoreColor = (fb.score || 0) >= 8 ? 'text-green-600' : (fb.score || 0) >= 5 ? 'text-amber-600' : 'text-red-500';

            return (
              <Card key={ans._id || i} className="p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <span className="text-xs font-bold text-neutral-400 uppercase">Question {i + 1}</span>
                    <p className="text-sm font-medium text-neutral-800 mt-1">
                      {question?.text || `Question ${i + 1}`}
                    </p>
                  </div>
                  <div className={`text-2xl font-bold ${scoreColor} shrink-0`}>
                    {fb.score || 0}<span className="text-sm text-neutral-400 font-normal">/10</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {fb.clarity && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium capitalize">
                      Clarity: {fb.clarity}
                    </span>
                  )}
                  {fb.relevance && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium capitalize">
                      Relevance: {fb.relevance}
                    </span>
                  )}
                  {fb.confidence && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium capitalize">
                      Confidence: {fb.confidence}
                    </span>
                  )}
                </div>

                {/* Summary */}
                {fb.summary && (
                  <p className="text-sm text-neutral-600 mb-3">{fb.summary}</p>
                )}

                {/* Your answer transcript */}
                {ans.transcript && ans.transcript !== 'No answer provided' && (
                  <div className="mb-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <span className="text-xs font-semibold text-neutral-400 uppercase block mb-1">Your Answer</span>
                    <p className="text-sm text-neutral-700 leading-relaxed">{ans.transcript}</p>
                  </div>
                )}

                {/* Strengths and Improvements */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {fb.strengths?.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-green-600 uppercase block mb-1">Strengths</span>
                      <ul className="space-y-1">
                        {fb.strengths.map((s, j) => (
                          <li key={j} className="text-sm text-neutral-700 flex items-start gap-1.5">
                            <span className="text-green-500 mt-0.5 shrink-0">+</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {fb.improvements?.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-amber-600 uppercase block mb-1">Improvements</span>
                      <ul className="space-y-1">
                        {fb.improvements.map((imp, j) => (
                          <li key={j} className="text-sm text-neutral-700 flex items-start gap-1.5">
                            <span className="text-amber-500 mt-0.5 shrink-0">-</span>
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Suggested answer */}
                {fb.suggestedAnswer && (
                  <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <span className="text-xs font-semibold text-primary uppercase block mb-1">Suggested Answer</span>
                    <p className="text-sm text-neutral-700 leading-relaxed">{fb.suggestedAnswer}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* No answers fallback */}
      {!hasAnswers && (
        <Card className="p-8 text-center shadow-sm">
          <p className="text-neutral-500">No detailed feedback available for this session. The analysis may still be processing.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-primary font-medium text-sm hover:underline"
          >
            Refresh to check again
          </button>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Link to="/dashboard" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full shadow-sm">Return to Dashboard</Button>
        </Link>
        <Link to="/history" className="w-full sm:w-auto">
          <Button size="lg" className="w-full shadow-card">View Full History</Button>
        </Link>
      </div>

    </div>
  );
}
