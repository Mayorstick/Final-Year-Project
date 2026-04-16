

type Props = {
    issueId: string;
};

export default function SunlightDemo({ issueId }: Props) {
    const isContrastIssue = issueId === "sun-1-issue-1";
    const isButtonIssue = issueId === "sun-1-issue-2";

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
                    {/* Image with bright overlay */}
                    <div className="w-full shrink-0 lg:w-72">
                        <div className="relative h-44 overflow-hidden rounded-xl border bg-slate-200 dark:bg-slate-700 dark:border-slate-600">
                            <img
                                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=60"
                                alt="Bicycle product photo"
                                className="h-full w-full object-cover"
                            />

                            {/* fake sunlight glare */}
                            <div className="absolute inset-0 bg-white/25 pointer-events-none" />
                            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            Outdoor Summer Sale — 20% off All Bikes!
                        </h3>

                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Try viewing this page in bright light.
                        </p>

                        {/* Contrast issue */}
                        <div
                            className={[
                                "mt-4 rounded-xl border p-3",
                                isContrastIssue
                                    ? "ring-2 ring-yellow-300 border-yellow-400"
                                    : "border-slate-200 dark:border-slate-700",
                            ].join(" ")}
                        >
                            <p
                                className={[
                                    "text-sm",
                                    isContrastIssue
                                        ? "text-slate-300"
                                        : "text-slate-700 dark:text-slate-300",
                                ].join(" ")}
                            >
                                Free shipping on orders over £50. Returns accepted within 30 days.
                                Browse new arrivals and find your perfect ride today.
                            </p>

                            {isContrastIssue && (
                                <p className="mt-2 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                    <span aria-hidden>⚠</span>
                                    Low contrast becomes harder to read in bright sunlight.
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    City Cruiser
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                <button
                                    className={[
                                        "mt-2 w-full rounded-lg py-2 text-sm font-semibold",
                                        isButtonIssue
                                            ? "bg-slate-200 text-slate-500 border border-slate-300"
                                            : "bg-blue-600 text-white",
                                    ].join(" ")}
                                >
                                    Buy Now
                                </button>

                                {isButtonIssue && (
                                    <p className="mt-2 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                        <span aria-hidden>⚠</span>
                                        This button is too subtle and may be missed outdoors.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    Trail Blazer
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                            Bright environments can make weak contrast and subtle controls harder for anyone to use.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}