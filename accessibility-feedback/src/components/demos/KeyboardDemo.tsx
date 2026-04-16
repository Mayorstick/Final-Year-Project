

type Props = {
    issueId: string; // "kb-1-issue-1" | "kb-1-issue-2"
};

export default function KeyboardDemo({ issueId }: Props) {
    const isNonFocusableIssue = issueId === "kb-1-issue-1";
    const isTabOrderIssue = issueId === "kb-1-issue-2";

    return (
        <div className="rounded-xl border bg-slate-50 p-5 dark:bg-slate-800 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Happy Cycle Co.
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <a href="#" className="hover:underline">
                        Shop
                    </a>
                    <a href="#" className="hover:underline">
                        Deals
                    </a>
                    <a href="#" className="hover:underline">
                        Contact
                    </a>

                    <button className="rounded-lg border bg-white px-3 py-2 font-medium text-slate-800 focus-visible:ring-4 focus-visible:ring-blue-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
                        Checkout
                    </button>
                </div>
            </div>

            {/* Main card */}
            <div className="mt-4 rounded-xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-700">
                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Image */}
                    <div className="w-full shrink-0 lg:w-72">
                        <div className="relative h-44 overflow-hidden rounded-xl border bg-slate-200 dark:bg-slate-700 dark:border-slate-600">
                            <img
                                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=60"
                                alt="Bicycle product photo"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            Spring Sale — 20% off All Bikes!
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Tip: Try tabbing through the controls.
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Issue 2: Wrong tab order */}
                            <div
                                className={[
                                    "rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700",
                                    isTabOrderIssue ? "ring-2 ring-yellow-300 border-yellow-400" : "",
                                ].join(" ")}
                            >
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    City Cruiser
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                <div className="mt-3 flex flex-col gap-2">
                                    <a
                                        href="#"
                                        tabIndex={isTabOrderIssue ? 3 : undefined}
                                        className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-slate-800 focus-visible:ring-4 focus-visible:ring-blue-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                                    >
                                        View details
                                    </a>

                                    <button
                                        tabIndex={isTabOrderIssue ? 1 : undefined}
                                        className="rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white focus-visible:ring-4 focus-visible:ring-blue-200"
                                    >
                                        Add to Cart
                                    </button>

                                    <button
                                        tabIndex={isTabOrderIssue ? 2 : undefined}
                                        className="rounded-lg border bg-white py-2 text-sm font-semibold text-slate-800 focus-visible:ring-4 focus-visible:ring-blue-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                                    >
                                        Save
                                    </button>
                                </div>

                                {isTabOrderIssue && (
                                    <p className="mt-3 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                        <span aria-hidden>⚠</span>
                                        Focus jumps around because tabIndex is misused. Fix DOM order instead.
                                    </p>
                                )}
                            </div>

                            {/* Issue 1: Can't reach with Tab */}
                            <div
                                className={[
                                    "rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700",
                                    isNonFocusableIssue ? "ring-2 ring-yellow-300 border-yellow-400" : "",
                                ].join(" ")}
                            >
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    Trail Blazer
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                {isNonFocusableIssue ? (
                                    <>
                                        <div
                                            className="mt-3 w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white"
                                            onClick={() => { }}
                                        >
                                            Add to Cart
                                        </div>

                                        <p className="mt-3 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                            <span aria-hidden>⚠</span>
                                            This “button” is a div, so keyboard users can’t tab to it.
                                        </p>
                                    </>
                                ) : (
                                    <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white focus-visible:ring-4 focus-visible:ring-blue-200">
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                            Keyboard users rely on <span className="font-semibold">Tab</span>,{" "}
                            <span className="font-semibold">Shift+Tab</span>, and{" "}
                            <span className="font-semibold">Enter/Space</span>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}