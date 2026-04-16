export default function UnlabeledCheckoutButtonDemo() {
    return (
        <div className="rounded-xl border bg-slate-50 p-5 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Happy Cycle Co.
                </div>

                {/* Fake cart + checkout */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                        2 items
                    </span>

                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white"
                        aria-label="" // intentionally broken
                        title="(Broken) no accessible name"
                    >
                        🛒
                    </button>

                    <span className="ml-2 rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-900">
                        ⚠️ unlabeled button
                    </span>
                </div>
            </div>

            <div className="mt-5 rounded-xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-700">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    The checkout icon button has{" "}
                    <span className="font-semibold">no accessible name</span>.
                    Screen readers may announce it as “button” with no meaning.
                </p>

                <div className="mt-4 rounded-lg bg-slate-100 p-3 text-xs font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {"<button aria-label=\"\">🛒</button>"}
                </div>
            </div>
        </div>
    );
}