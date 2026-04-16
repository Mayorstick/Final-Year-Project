type ProgressCardProps = {
    levelLabel: string;
    xpCurrent: number;
    xpTarget: number;
    totalMissionsDone: number;
    totalMissions: number;
    activePersonaName: string;
    activePersonaAvatarUrl?: string;
};

export default function ProgressCard({
    levelLabel,
    xpCurrent,
    xpTarget,
    totalMissionsDone,
    totalMissions,
    activePersonaName,
    activePersonaAvatarUrl,
}: ProgressCardProps) {
    const safeTarget = xpTarget > 0 ? xpTarget : 1;
    const xpIntoLevel = ((xpCurrent % safeTarget) + safeTarget) % safeTarget;
    const progressPct = Math.min(100, Math.round((xpIntoLevel / safeTarget) * 100));

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                        <span className="text-2xl text-slate-700 dark:text-slate-200" aria-hidden="true">
                            ★
                        </span>
                    </div>

                    <div className="w-full">
                        <p id="xp-label" className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Progress/XP indicator
                        </p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            {levelLabel}
                        </p>

                        <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div
                                className="h-4 rounded-full bg-blue-500 transition-all duration-500"
                                style={{ width: `${progressPct}%` }}
                                role="progressbar"
                                aria-labelledby="xp-label"
                                aria-valuenow={xpIntoLevel}
                                aria-valuemin={0}
                                aria-valuemax={safeTarget}
                                aria-valuetext={`${xpIntoLevel} out of ${safeTarget} XP`}
                            />
                        </div>

                        <div className="mt-2 flex justify-end text-xs text-slate-500 dark:text-slate-400">
                            {xpIntoLevel}/{safeTarget}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-10 md:justify-end md:gap-14">
                    <div className="text-right">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Total Missions</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {totalMissionsDone}/{totalMissions}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Current Active Persona
                            </p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {activePersonaName}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                            {activePersonaAvatarUrl ? (
                                <img
                                    src={activePersonaAvatarUrl}
                                    alt={`${activePersonaName} avatar`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span
                                    className="text-sm font-semibold text-slate-600 dark:text-slate-200"
                                    aria-hidden="true"
                                >
                                    {activePersonaName.slice(0, 1).toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}