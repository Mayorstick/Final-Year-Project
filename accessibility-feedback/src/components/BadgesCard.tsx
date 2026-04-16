type BadgeItem = {
    title: string;
    status: "earned" | "locked";
};

type BadgesCardProps = {
    items: BadgeItem[];
};

export default function BadgesCard({ items }: BadgesCardProps) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Badges
            </h3>

            <div className="mt-5 space-y-6">
                {items.map((b) => (
                    <div key={b.title} className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                            className={[
                                "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                                b.status === "earned"
                                    ? "bg-yellow-100 dark:bg-yellow-900/30"
                                    : "bg-slate-100 dark:bg-slate-700",
                            ].join(" ")}
                            aria-hidden="true"
                        >
                            <span className="text-xl">
                                {b.status === "earned" ? "🏅" : "🔒"}
                            </span>
                        </div>

                        {/* Text */}
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                                {b.title}{" "}
                                {b.status === "earned" && (
                                    <span className="font-normal text-slate-500 dark:text-slate-400">
                                        Earned
                                    </span>
                                )}
                            </p>

                            {b.status === "locked" && (
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Locked
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}