export default function MockQuestionCard() {
    return (
        <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-neutral-100 border-l-4 border-l-primary p-4 text-left w-full mt-6 relative" aria-hidden="true">
            <div className="flex gap-2 items-center mb-3 text-[10px] font-semibold tracking-wide uppercase">
                <span className="bg-primary text-white px-2 py-0.5 rounded flex items-center gap-1">🏷️ Technical</span>
                <span className="text-neutral-500 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-neutral-300" /> Medium</span>
            </div>

            <p className="font-display font-semibold text-neutral-900 text-sm leading-snug mb-4">
                "What is the difference between var, let, and const in JavaScript?"
            </p>

            <div className="flex gap-1.5 flex-wrap">
                <span className="text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">#javascript</span>
                <span className="text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">#scope</span>
                <span className="text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">#es6</span>
            </div>
        </div>
    );
}
