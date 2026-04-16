

type Props = {
    issueId: string; // "sr-2-issue-1" | "sr-2-issue-2"
};

export default function HappyCycleMission2Demo({ issueId }: Props) {
    const isUnclearLink = issueId === "sr-2-issue-1";
    const isEmptyLink = issueId === "sr-2-issue-2";

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            {/* Top store header */}
            <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Happy Cycle Co.
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <span>Shop</span>
                    <span>Deals</span>
                    <span>Contact</span>

                    <div className="relative inline-block">
                        <a
                            href="#"
                            className={[
                                "inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600",
                                isEmptyLink
                                    ? "ring-2 ring-yellow-300 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                                    : "",
                            ].join(" ")}
                            aria-label={isEmptyLink ? "" : "Checkout"}
                            title={isEmptyLink ? "Missing accessible name" : "Checkout"}
                        >
                            🛒
                            {!isEmptyLink && <span>Checkout</span>}
                        </a>

                        {isEmptyLink && (
                            <>
                                <span className="absolute -top-9 -right-2 rounded-full border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-[11px] text-yellow-900 shadow-sm">
                                    ⚠ empty
                                </span>

                                <span className="absolute -bottom-8 left-5 rounded border bg-white px-2 py-0.5 text-[11px] text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600">
                                    aria-label=""
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="mt-4 rounded-xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-700">
                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Product image */}
                    <div className="w-full shrink-0 lg:w-72">
                        <div className="relative h-44 overflow-hidden rounded-xl border bg-slate-200 dark:bg-slate-700 dark:border-slate-600">
                            <img
                                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=60"
                                alt="Silver bicycle with brown seat and handlebars"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Sale + products */}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            Spring Sale - 20% off All Bikes!
                        </h3>

                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            ✅ Free shipping on orders over £50
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* City Cruiser */}
                            <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    City Cruiser
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                {isUnclearLink ? (
                                    <>
                                        <a
                                            href="#"
                                            className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-yellow-400 bg-white py-2 text-sm font-semibold text-slate-900 ring-2 ring-yellow-300 dark:bg-slate-700 dark:text-slate-100 dark:border-yellow-400"
                                        >
                                            Click here
                                        </a>

                                        <p className="mt-2 flex items-center gap-2 text-xs text-yellow-900 dark:text-yellow-300">
                                            <span>⚠</span>
                                            Link text is unclear (“Click here”).
                                        </p>
                                    </>
                                ) : (
                                    <a
                                        href="#"
                                        className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-0.5 py-2.5 text-center text-sm font-semibold text-white"
                                    >
                                        View City Cruiser details
                                    </a>
                                )}
                            </div>

                            {/* Trail Blazer */}
                            <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                    Trail Blazer
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                                <a
                                    href="#"
                                    className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white"
                                >
                                    View Trail Blazer details
                                </a>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                            Looking for returns info?{" "}
                            <a
                                href="#"
                                className="font-semibold text-blue-700 underline dark:text-blue-400"
                            >
                                Read our returns policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}