import { UserButton, useUser } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const { user } = useUser();
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
        <header className="flex items-center justify-between py-4 border-b border-neutral-200 mb-8 w-full sticky top-0 bg-neutral-100/80 backdrop-blur-md z-40">
            <div className="flex items-center gap-4">
                {!isDashboard && (
                    <Link to="/dashboard" className="flex items-center gap-2 mr-4">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">IC</div>
                        <span className="font-display font-semibold text-lg hidden sm:block">InterviewCoach</span>
                    </Link>
                )}
                {isDashboard && user && (
                    <h1 className="font-display font-semibold text-2xl text-neutral-900">
                        Hello, {user.firstName || 'Candidate'} 👋
                    </h1>
                )}
            </div>

            <div className="flex items-center gap-4">
                <Link to="/history" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors hidden sm:block">History</Link>
                <Link to="/profile" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors hidden sm:block">Profile</Link>
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-white shadow-sm" } }} />
            </div>
        </header>
    );
}
