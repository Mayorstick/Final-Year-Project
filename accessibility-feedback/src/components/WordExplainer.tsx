import React from "react";

export default function WordExplainer() {
    const [tooltip, setTooltip] = React.useState<{
        word: string;
        x: number;
        y: number;
        explanation: string;
        loading: boolean;
    } | null>(null);

    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    async function explainWord(word: string, x: number, y: number) {
        if (!word || word.length < 3) return;

        setTooltip({ word, x, y, explanation: "", loading: true });

        try {
            const res = await fetch("https://final-year-project-production-b3ad.up.railway.app/explain-word", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ word }),
            });
            const data = await res.json();
            setTooltip((prev) => prev ? { ...prev, explanation: data.explanation, loading: false } : null);
        } catch {
            setTooltip((prev) => prev ? { ...prev, explanation: "Could not load explanation.", loading: false } : null);
        }
    }

    React.useEffect(() => {
        let touchTimer: ReturnType<typeof setTimeout> | null = null;

        function handleSelectionChange() {
            const selection = window.getSelection();
            const word = selection?.toString().trim();

            if (!word || word.split(" ").length > 3 || word.length < 3) return;

            const range = selection?.getRangeAt(0);
            const rect = range?.getBoundingClientRect();
            if (!rect) return;

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                explainWord(word, rect.left + rect.width / 2, rect.bottom + window.scrollY);
            }, 300);
        }

        function handleClick(e: MouseEvent | TouchEvent) {
            const target = e.target as HTMLElement;
            if (!target.closest("#word-explainer-tooltip")) {
                setTooltip(null);
            }
        }

        function handleTouchEnd() {
            if (touchTimer) clearTimeout(touchTimer);
            touchTimer = setTimeout(() => {
                handleSelectionChange();
            }, 400);
        }

        document.addEventListener("mouseup", handleSelectionChange);
        document.addEventListener("touchend", handleTouchEnd);
        document.addEventListener("click", handleClick);
        document.addEventListener("touchstart", handleClick as any);

        return () => {
            document.removeEventListener("mouseup", handleSelectionChange);
            document.removeEventListener("touchend", handleTouchEnd);
            document.removeEventListener("click", handleClick);
            document.removeEventListener("touchstart", handleClick as any);
        };
    }, []);

    if (!tooltip) return null;

    return (
        <div
            id="word-explainer-tooltip"
            style={{
                position: "fixed",
                top: Math.min(tooltip.y + 12, window.innerHeight - 180),
                left: Math.min(tooltip.x, window.innerWidth - 280),
                zIndex: 9999,
                width: 260,
            }}
            className="rounded-2xl border bg-white shadow-xl p-4 dark:bg-slate-800 dark:border-slate-700"
        >
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    💬 "{tooltip.word}"
                </p>
                <button
                    onClick={() => setTooltip(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                >
                    ✕
                </button>
            </div>
            {tooltip.loading ? (
                <div className="space-y-2 animate-pulse">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
            ) : (
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {tooltip.explanation}
                </p>
            )}
        </div>
    );
}
