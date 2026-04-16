import React from "react";

type Props = {
    issueId: string; // "kb-2-issue-1" | "kb-2-issue-2"
};

export default function KeyboardMission2Demo({ issueId }: Props) {
    const isFocusMissing = issueId === "kb-2-issue-1";
    const isTrap = issueId === "kb-2-issue-2";

    const [open, setOpen] = React.useState(false);

    // ESC closes modal only in the "fixed" state
    React.useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape" && open && !isTrap) {
                setOpen(false);
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, isTrap]);

    return (
        <div className="rounded-xl bg-slate-50 p-5 border">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900">Happy Cycle Co.</div>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                    <a href="#" className="hover:underline focus-visible:ring-4 focus-visible:ring-blue-200 rounded">
                        Shop
                    </a>
                    <a href="#" className="hover:underline focus-visible:ring-4 focus-visible:ring-blue-200 rounded">
                        Deals
                    </a>
                    <a href="#" className="hover:underline focus-visible:ring-4 focus-visible:ring-blue-200 rounded">
                        Contact
                    </a>

                    {/* Focus issue: remove visible focus ring when active */}
                    <button
                        className={[
                            "rounded-lg px-3 py-2 border bg-white font-medium text-slate-800",
                            isFocusMissing ? "focus:outline-none" : "focus-visible:ring-4 focus-visible:ring-blue-200",
                        ].join(" ")}
                    >
                        Checkout
                    </button>
                </div>
            </div>

            {/* Main card */}
            <div className="mt-4 rounded-xl bg-white border p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full lg:w-72 shrink-0">
                        <div className="relative overflow-hidden rounded-xl border bg-slate-200 h-44">
                            <img
                                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=60"
                                alt="Bicycle product photo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-900">
                            Spring Sale — 20% off All Bikes!
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                            Tip: Use <span className="font-semibold">Tab</span> and{" "}
                            <span className="font-semibold">Shift+Tab</span>.
                        </p>

                        {/* Issue 1: missing focus styles */}
                        <div
                            className={[
                                "mt-4 rounded-xl border p-3",
                                isFocusMissing ? "ring-2 ring-yellow-300 border-yellow-400 bg-yellow-50/40" : "border-slate-200",
                            ].join(" ")}
                        >
                            <p className="font-semibold text-slate-900">Focus visibility</p>
                            <p className="mt-1 text-sm text-slate-700">
                                Try tabbing to the Checkout button in the top bar.
                            </p>

                            {isFocusMissing && (
                                <p className="mt-2 text-xs text-yellow-900 flex items-center gap-2">
                                    <span aria-hidden>⚠</span>
                                    Focus ring is missing — hard to see where you are.
                                </p>
                            )}
                        </div>

                        {/* Issue 2: modal / keyboard trap */}
                        <div
                            className={[
                                "mt-4 rounded-xl border p-3",
                                isTrap ? "ring-2 ring-yellow-300 border-yellow-400 bg-yellow-50/40" : "border-slate-200",
                            ].join(" ")}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="font-semibold text-slate-900">Promo modal</p>
                                    <p className="mt-1 text-sm text-slate-700">
                                        Open the modal and try to close it with keyboard.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setOpen(true)}
                                    className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold focus-visible:ring-4 focus-visible:ring-blue-200"
                                >
                                    Open modal
                                </button>
                            </div>

                            {isTrap && (
                                <p className="mt-2 text-xs text-yellow-900 flex items-center gap-2">
                                    <span aria-hidden>⚠</span>
                                    Trap: Close control isn’t reachable (and Escape doesn’t work).
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/30" onClick={() => !isTrap && setOpen(false)} />

                    <div
                        className="relative z-10 w-full max-w-md rounded-2xl bg-white border shadow-sm p-6"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Promo modal"
                    >
                        <h4 className="text-lg font-bold text-slate-900">Special Offer</h4>
                        <p className="mt-2 text-sm text-slate-700">
                            Keyboard users should be able to reach the close button and press Escape.
                        </p>

                        <div className="mt-5 flex items-center justify-end gap-3">
                            {/* In TRAP state: fake “close” that is NOT focusable */}
                            {isTrap ? (
                                <div
                                    className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 cursor-pointer"
                                    onClick={() => setOpen(false)}
                                // ❌ not focusable, no keyboard handler
                                >
                                    Close
                                </div>
                            ) : (
                                <button
                                    autoFocus
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 focus-visible:ring-4 focus-visible:ring-blue-200"
                                >
                                    Close
                                </button>
                            )}

                            <button className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold focus-visible:ring-4 focus-visible:ring-blue-200">
                                Continue
                            </button>
                        </div>

                        {!isTrap && (
                            <p className="mt-3 text-xs text-slate-500">
                                Tip: Press <span className="font-semibold">Esc</span> to close.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}