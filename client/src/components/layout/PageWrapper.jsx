import Navbar from './Navbar';

export default function PageWrapper({ children }) {
    return (
        <div className="bg-neutral-100 text-neutral-700 font-sans min-h-screen">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-2 flex flex-col h-full">
                <Navbar />
                <main className="flex-1 w-full pb-20 sm:pb-8">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-neutral-200 flex items-center justify-around sm:hidden z-50 px-2 pb-safe">
                <a href="/dashboard" className="p-2 text-primary flex flex-col items-center">
                    <span className="text-xs font-semibold mt-1">Dash</span>
                </a>
                <a href="/history" className="p-2 text-neutral-500 flex flex-col items-center">
                    <span className="text-xs font-semibold mt-1">History</span>
                </a>
                <a href="/profile" className="p-2 text-neutral-500 flex flex-col items-center">
                    <span className="text-xs font-semibold mt-1">Profile</span>
                </a>
            </div>
        </div>
    );
}
