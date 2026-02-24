import './how-it-works.css';

export default function HowItWorks() {
    return (
        <div className="hiw-wrapper" id="how-it-works">
            <section className="hiw-section">
                <div className="hiw-dot-grid" />
                <div className="hiw-blob hiw-blob-1" />
                <div className="hiw-blob hiw-blob-2" />
                <div className="hiw-blob hiw-blob-3" />

                <div className="hiw-content">
                    <div className="hiw-section-header">
                        <div className="hiw-section-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            How It Works
                        </div>
                        <h2 className="hiw-section-title">Three steps to a<br />better interview.</h2>
                        <p className="hiw-section-subtitle">No setup. No typing. Just speak — and get coached in real time.</p>
                    </div>

                    <div className="hiw-steps-horizontal">
                        {/* Step 1 */}
                        <div className="hiw-step-card">
                            <div className="hiw-step-left">
                                <div className="hiw-step-number">1</div>
                                <div className="hiw-icon-container">
                                    <svg viewBox="0 0 32 32" fill="none">
                                        <circle cx="16" cy="12" r="6" stroke="#7C5CFC" strokeWidth="2" />
                                        <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="24" cy="8" r="5" fill="rgba(124,92,252,0.1)" stroke="#7C5CFC" strokeWidth="1.5" />
                                        <path d="M22 8h4M24 6v4" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="hiw-step-body">
                                <h3 className="hiw-step-title">Choose Your Question</h3>
                                <p className="hiw-step-desc">Pick from curated questions across Technical, Behavioral, HR, and System Design — or let the app pick for you.</p>
                                <div className="hiw-preview-box hiw-question-preview">
                                    <div className="hiw-tag-row">
                                        <span className="hiw-q-tag hiw-technical">Technical</span>
                                        <span className="hiw-q-tag hiw-medium">Medium</span>
                                    </div>
                                    <div className="hiw-question-text">"What is the difference between var, let, and const in JavaScript?"</div>
                                    <div className="hiw-topic-tags">
                                        <span className="hiw-topic-tag">#javascript</span>
                                        <span className="hiw-topic-tag">#scope</span>
                                        <span className="hiw-topic-tag">#es6</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="hiw-step-card">
                            <div className="hiw-step-left">
                                <div className="hiw-step-number">2</div>
                                <div className="hiw-icon-container">
                                    <svg viewBox="0 0 32 32" fill="none">
                                        <rect x="11" y="4" width="10" height="16" rx="5" stroke="#10B981" strokeWidth="2" />
                                        <path d="M8 16a8 8 0 0016 0" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                        <line x1="16" y1="24" x2="16" y2="28" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M12 28h8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="16" cy="12" r="2" fill="rgba(16,185,129,0.25)" />
                                    </svg>
                                </div>
                            </div>
                            <div className="hiw-step-body">
                                <h3 className="hiw-step-title">Speak Your Answer</h3>
                                <p className="hiw-step-desc">Hit record and answer like you would in a real interview. No typing. The app listens and transcribes everything.</p>
                                <div className="hiw-preview-box hiw-recording-preview">
                                    <div className="hiw-rec-status">
                                        <div className="hiw-rec-dot" />
                                        <span className="hiw-rec-text">Recording... <span className="hiw-rec-time">0:18</span></span>
                                    </div>
                                    <div className="hiw-waveform">
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.1s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.2s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.3s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.15s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.25s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.35s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.05s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.4s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.12s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.28s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.08s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.32s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.18s' }} />
                                        <div className="hiw-wave-bar" style={{ animationDelay: '0.22s' }} />
                                    </div>
                                    <div className="hiw-stop-btn">
                                        <div className="hiw-stop-dot" />
                                        Tap to stop
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="hiw-step-card">
                            <div className="hiw-step-left">
                                <div className="hiw-step-number">3</div>
                                <div className="hiw-icon-container">
                                    <svg viewBox="0 0 32 32" fill="none">
                                        <path d="M16 4l3.09 6.26L26 11.27l-5 4.87 1.18 6.88L16 19.77l-6.18 3.25L11 16.14l-5-4.87 6.91-1.01L16 4z" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
                                        <circle cx="16" cy="14" r="3" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" strokeWidth="1" />
                                        <path d="M14 14l1.5 1.5L18 13" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="hiw-step-body">
                                <h3 className="hiw-step-title">Get Coached Instantly</h3>
                                <p className="hiw-step-desc">Receive a full breakdown — clarity, confidence, relevance, strengths, improvements, and a suggested ideal answer.</p>
                                <div className="hiw-preview-box hiw-feedback-preview">
                                    <div className="hiw-score-row">
                                        <div className="hiw-score-ring">
                                            <svg viewBox="0 0 48 48">
                                                <circle className="hiw-ring-bg" cx="24" cy="24" r="20" />
                                                <circle className="hiw-ring-fill" cx="24" cy="24" r="20" />
                                            </svg>
                                            <div className="hiw-score-value">8<span>/10</span></div>
                                        </div>
                                        <span className="hiw-score-label">Overall Score</span>
                                    </div>
                                    <div className="hiw-feedback-items">
                                        <div className="hiw-feedback-item hiw-strength">
                                            <svg viewBox="0 0 16 16" fill="none">
                                                <rect x="1" y="1" width="14" height="14" rx="4" fill="rgba(16,185,129,0.1)" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Clear explanation of concepts
                                        </div>
                                        <div className="hiw-feedback-item hiw-strength">
                                            <svg viewBox="0 0 16 16" fill="none">
                                                <rect x="1" y="1" width="14" height="14" rx="4" fill="rgba(16,185,129,0.1)" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Good use of real-world examples
                                        </div>
                                        <div className="hiw-feedback-item hiw-improve">
                                            <svg viewBox="0 0 16 16" fill="none">
                                                <circle cx="8" cy="8" r="6.5" fill="rgba(245,158,11,0.08)" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M8.5 5.5L11 8l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Add edge case handling
                                        </div>
                                    </div>
                                    <div className="hiw-rating-tags">
                                        <span className="hiw-rating-tag hiw-clarity">Clarity: Good</span>
                                        <span className="hiw-rating-tag hiw-confidence">Conf: High</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
