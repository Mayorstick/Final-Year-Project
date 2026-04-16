

type Props = {
    issueId: string;
};

export default function HappyCycleDemo({ issueId }: Props) {
    const isAltIssue = issueId === "sr-1-issue-1";
    const isCheckoutIssue = issueId === "sr-1-issue-2";

    return (
        <div className="rounded-xl border bg-slate-50 p-5 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Happy Cycle Co.
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <span>Shop</span>
                    <span>Deals</span>
                    <span>Contact</span>

                    <button
                        className={[
                            "relative rounded-lg border bg-white px-3 py-2 font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600",
                            isCheckoutIssue ? "ring-2 ring-yellow-300 border-yellow-400" : "",
                        ].join(" ")}
                        aria-label={isCheckoutIssue ? "" : "Checkout"}
                        title={isCheckoutIssue ? "Missing aria-label" : "Checkout"}
                    >
                        🛒

                        {isCheckoutIssue && (
                            <span className="absolute -top-8 -right-7 rounded-full border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-[11px] text-yellow-900">
                                ⚠ unlabeled
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="mt-4 rounded-xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-700">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full shrink-0 lg:w-72">
                        <div
                            className={[
                                "relative h-44 overflow-hidden rounded-xl border bg-slate-200 dark:bg-slate-700 dark:border-slate-600",
                                isAltIssue ? "ring-2 ring-yellow-300 border-yellow-400" : "",
                            ].join(" ")}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=60"
                                alt={isAltIssue ? "" : "Silver bicycle with brown seat and handlebars"}
                                className="h-full w-full object-cover"
                            />

                            {isAltIssue && (
                                <>
                                    <span className="absolute top-2 left-2 rounded-full border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-[11px] text-yellow-900">
                                        ⚠ Missing alt
                                    </span>
                                    <span className="absolute bottom-2 left-2 rounded border bg-white/90 px-2 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800/90 dark:text-slate-200 dark:border-slate-600">
                                        alt=""
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            Spring Sale - 20% off All Bikes!
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            ✅ Free shipping on orders over £50
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">City Cruiser</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>
                                <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm text-white">
                                    Add to Cart
                                </button>
                            </div>

                            <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">Trail Blazer</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>
                                <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm text-white">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                            ✅ Free shipping on orders over £50
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}