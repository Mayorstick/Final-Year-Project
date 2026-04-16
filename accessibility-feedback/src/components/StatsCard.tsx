type StatsCardProps = {
    missionsCompleted: number;
    totalMissions: number;
    issuesResolved: number;
    aiMissionsCompleted: number;
    activePersonaName: string | null;
    activePersonaAvatarUrl?: string | null;
};

export default function StatsCard({
    missionsCompleted,
    totalMissions,
    issuesResolved,
    activePersonaName,
    aiMissionsCompleted,
    activePersonaAvatarUrl,
}: StatsCardProps) {
    const rowClass = "flex items-center justify-between";
    const labelClass = "font-semibold text-slate-800 dark:text-slate-200";
    const valueClass = "font-semibold text-slate-900 dark:text-slate-100";

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Stats
            </h3>

            <div className="mt-5 space-y-5">
                <div className={rowClass}>
                    <span className={labelClass}>Missions Completed</span>
                    <span className={valueClass}>
                        {missionsCompleted}/{totalMissions}
                    </span>
                </div>

                <div className={rowClass}>
                    <span className={labelClass}>Issues Resolved</span>
                    <span className={valueClass}>{issuesResolved}</span>
                </div>

                <div className="flex justify-between">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        AI Missions Completed
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {aiMissionsCompleted}
                    </p>
                </div>

                <div className={rowClass}>
                    <span className={labelClass}>Active Persona</span>
                    <span className={valueClass}>
                        {activePersonaName ?? "No Persona"}
                    </span>
                </div>

                {activePersonaAvatarUrl && (
                    <div className="mt-4 flex justify-center">
                        <img
                            src={activePersonaAvatarUrl}
                            alt={activePersonaName ?? "persona"}
                            className="h-12 w-12 rounded-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}