import { Link } from 'react-router-dom';
import { useAuth, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Button } from '../components/ui/Button';
import HowItWorks from '../components/landing/HowItWorks';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { HeroHighlight, Highlight } from '../components/ui/hero-highlight';

export default function LandingPage() {
    const { isSignedIn } = useAuth();

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col relative overflow-hidden">
            <header className="flex items-center justify-between p-6 max-w-[1100px] w-full mx-auto relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">IC</div>
                    <span className="font-display font-semibold text-xl">InterviewCoach</span>
                </div>
                <nav>
                    {isSignedIn ? (
                        <Link to="/dashboard">
                            <Button>Go to Dashboard</Button>
                        </Link>
                    ) : (
                        <div className="flex gap-4">
                            <SignInButton mode="modal">
                                <Button variant="ghost">Log In</Button>
                            </SignInButton>
                        </div>
                    )}
                </nav>
            </header>

            <HeroHighlight containerClassName="flex-1 w-full" className="flex flex-col items-center justify-center text-center px-4 w-full h-full py-12 md:py-24">
                <main className="flex flex-col items-center justify-center w-full z-10 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light rounded-full blur-3xl -z-10 opacity-70"></div>

                    <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 max-w-3xl">
                        Practice out loud. <br />
                        <Highlight className="text-white px-2 pb-2">Get coached in real time.</Highlight>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mb-10">
                        Speak your answers, get AI-powered feedback on clarity, confidence, and relevance — instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-3xl mx-auto px-4">
                        {isSignedIn ? (
                            <Link to="/dashboard" className="w-full sm:w-auto block">
                                <HoverBorderGradient
                                    containerClassName="w-full sm:w-fit rounded-full shadow-xl mx-auto"
                                    as="button"
                                    className="bg-white text-black font-semibold text-base px-8 py-4"
                                >
                                    Start Practicing &rarr;
                                </HoverBorderGradient>
                            </Link>
                        ) : (
                            <div className="w-full sm:w-auto block">
                                <SignUpButton mode="modal">
                                    <div className="w-full cursor-pointer">
                                        <HoverBorderGradient
                                            containerClassName="w-full sm:w-fit rounded-full shadow-xl mx-auto"
                                            as="button"
                                            className="bg-white text-black font-semibold text-base px-8 py-4"
                                        >
                                            Start Practicing Free &rarr;
                                        </HoverBorderGradient>
                                    </div>
                                </SignUpButton>
                            </div>
                        )}
                        <a href="#how-it-works" onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                        }} className="w-full sm:w-auto block">
                            <HoverBorderGradient
                                containerClassName="w-full sm:w-fit rounded-full shadow-xl mx-auto"
                                as="button"
                                className="bg-white text-[#1E40AF] font-semibold text-base px-8 py-4"
                            >
                                See how it works
                            </HoverBorderGradient>
                        </a>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-neutral-700 bg-white/60 px-6 py-3 rounded-full shadow-sm backdrop-blur-sm border border-white">
                        <span className="flex items-center gap-1">🎙️ Voice-first</span>
                        <span className="text-neutral-200 hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">🤖 AI Feedback</span>
                        <span className="text-neutral-200 hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">📊 Track Progress</span>
                    </div>
                </main>
            </HeroHighlight>

            <HowItWorks />

            <footer className="py-8 text-center text-neutral-700 text-sm relative z-10 bg-[#EEF0FF]">
                <p>Used by 2,000+ candidates preparing for top tech companies</p>
            </footer>
        </div>
    );
}
