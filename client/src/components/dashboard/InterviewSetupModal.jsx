import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CATEGORIES = ['Technical', 'Behavioral', 'HR', 'System Design'];
const DIFFICULTIES = ['Easy — Warmup', 'Medium — Standard', 'Hard — Senior'];

export default function InterviewSetupModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleStart = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/sessions', {
                title: title || `${category} Round`,
                category: category.toLowerCase(),
                difficulty: difficulty.split(' ')[0].toLowerCase(),
                totalQuestions: 5
            });
            navigate(`/interview/${data.session._id}`);
        } catch (err) {
            console.error(err);
            setError('Failed to start session. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configure Session">
            <div className="flex gap-2 justify-center mb-6">
                {[1, 2, 3].map((s) => (
                    <div key={s} className={`w-2 h-2 rounded-full ${s <= step ? 'bg-primary' : 'bg-neutral-200'}`} />
                ))}
            </div>

            <div className="mt-4">
                {step === 1 && (
                    <div className="space-y-4">
                        <h4 className="font-medium text-neutral-900 mb-2">What type of interview are you preparing for?</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {CATEGORIES.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c)}
                                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all
                    ${category === c ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-neutral-200 text-neutral-700 hover:border-primary/50'}
                  `}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <h4 className="font-medium text-neutral-900 mb-2">Select difficulty level:</h4>
                        <div className="flex flex-col gap-3">
                            {DIFFICULTIES.map(d => (
                                <button
                                    key={d}
                                    onClick={() => setDifficulty(d)}
                                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left
                    ${difficulty === d ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-neutral-200 text-neutral-700 hover:border-primary/50'}
                  `}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h4 className="font-medium text-neutral-900 mb-2">Give this session a name (optional):</h4>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Google Frontend Round 2"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 shadow-input focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-neutral-900"
                        />
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-between items-center">
                {step > 1 ? (
                    <Button variant="ghost" onClick={() => setStep(s => s - 1)}>Back</Button>
                ) : (
                    <div /> // Spacer
                )}

                {step < 3 ? (
                    <Button onClick={() => setStep(s => s + 1)} disabled={step === 1 && !category || step === 2 && !difficulty}>
                        Next
                    </Button>
                ) : (
                    <div className="flex flex-col items-end">
                        <Button onClick={handleStart} disabled={loading} className="w-full sm:w-auto">
                            {loading ? 'Starting...' : 'Start Session →'}
                        </Button>
                        {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
                    </div>
                )}
            </div>
        </Modal>
    );
}
