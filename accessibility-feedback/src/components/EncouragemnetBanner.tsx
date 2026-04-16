type Props = {
    text?: string;
};

export default function EncouragementBanner({
    text = "Great progress, keep building inclusive skills",
}: Props) {
    return (
        <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <p className="text-slate-900 dark:text-slate-100">
                <span className="font-semibold">Stats</span>{" "}
                <span className="text-slate-600 dark:text-slate-400">
                    {text}
                </span>
            </p>
        </div>
    );
}