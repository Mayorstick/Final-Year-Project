export default function MissingAltTextDemo() {
    return (
        <div className="rounded-xl border bg-slate-50 p-5 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex gap-6">
                {/* Product image */}
                <div className="relative h-40 w-56 overflow-hidden rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700">
                    <img
                        src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=60"
                        alt="" // ❌ Missing alt text
                        className="h-full w-full object-cover"
                    />

                    {/* Warning badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        <span aria-hidden>⚠️</span>
                        <span>Missing alt</span>
                    </div>

                    {/* alt indicator */}
                    <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800/90 dark:text-slate-200">
                        alt=""
                    </div>
                </div>

                {/* Product info */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Spring Sale - 20% off All Bikes!
                    </h3>

                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        ✅ Free shipping on orders over £50
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                        <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                                City Cruiser
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                            <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm text-white">
                                Add to Cart
                            </button>
                        </div>

                        <div className="rounded-xl border bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                                Trail Blazer
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">£49</p>

                            <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm text-white">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-xl border bg-white p-4 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                ✅ Free shipping on orders over £50
            </div>
        </div>
    );
}