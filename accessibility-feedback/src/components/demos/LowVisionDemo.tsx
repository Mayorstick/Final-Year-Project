

type Props = {
    issueId: string;
};

export default function LowVisionDemo({ issueId }: Props) {
    const isContrastIssue = issueId === "lv-1-issue-1";
    const isSmallTextIssue = issueId === "lv-1-issue-2";
    const isLineHeightIssue = issueId === "lv-2-issue-1";
    const isSpacingIssue = issueId === "lv-2-issue-2";

    const highlight =
        isContrastIssue || isSmallTextIssue || isLineHeightIssue || isSpacingIssue;

    return (
        <div className="rounded-xl border bg-slate-50 p-5 dark:bg-slate-800 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Happy Cycle Co.
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <span>Shop</span>
                    <span>Deals</span>
                    <span>Contact</span>

                    <button className="rounded-lg border bg-white px-3 py-2 font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
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

                        {/* Info block */}
                        <div
                            className={[
                                "mt-2 rounded-xl border p-3 dark:border-slate-700",
                                highlight
                                    ? "ring-2 ring-yellow-300 border-yellow-400"
                                    : "border-slate-200",
                            ].join(" ")}
                        >
                            <p
                                className={[
                                    isSmallTextIssue ? "text-[10px]" : "text-sm",
                                    isContrastIssue
                                        ? "text-slate-300"
                                        : "text-slate-700 dark:text-slate-300",
                                    isLineHeightIssue ? "leading-none" : "leading-relaxed",
                                ].join(" ")}
                            >
                                Free shipping on orders over £50. Returns accepted within 30 days.
                                New arrivals every week — find your perfect fit today.
                            </p>

                            {isContrastIssue && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                    <span aria-hidden>⚠</span>
                                    Low contrast text is hard to read.
                                </div>
                            )}

                            {isSmallTextIssue && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                    <span aria-hidden>⚠</span>
                                    Text size is too small to read comfortably.
                                </div>
                            )}

                            {isLineHeightIssue && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                    <span aria-hidden>⚠</span>
                                    Line spacing is too tight.
                                </div>
                            )}
                        </div>

                        {/* Products */}
                        <div
                            className={[
                                "mt-4 grid grid-cols-1 sm:grid-cols-2",
                                isSpacingIssue ? "gap-1" : "gap-4",
                            ].join(" ")}
                        >
                            <div
                                className={[
                                    "rounded-xl border bg-white dark:bg-slate-800 dark:border-slate-700",
                                    isSpacingIssue ? "p-2" : "p-3",
                                ].join(" ")}
                            >
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    City Cruiser
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white">
                                    Add to Cart
                                </button>
                            </div>

                            <div
                                className={[
                                    "rounded-xl border bg-white dark:bg-slate-800 dark:border-slate-700",
                                    isSpacingIssue ? "p-2" : "p-3",
                                ].join(" ")}
                            >
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    Trail Blazer
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {isSpacingIssue && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                <span aria-hidden>⚠</span>
                                Elements are too close together.
                            </div>
                        )}

                        {/* Tip */}
                        <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                            Tip: Good contrast + readable text size + spacing improves usability.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}