type ContinueJourneyCardProps = {
    missionTitle: string;
    personaLine: string;
    avatarUrl?: string;
    onContinue?: () => void;
    buttonLabel?: string;
    disabled?: boolean;
};

export default function ContinueJourneyCard({
    missionTitle,
    personaLine,
    avatarUrl,
    onContinue,
    buttonLabel = "Continue Mission →",
    disabled = false,
}: ContinueJourneyCardProps) {
    return (
        <div className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between dark:bg-slate-800 dark:border-slate-700">
            <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Continue Your Journey
                </h2>

                <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-200 shrink-0 dark:bg-slate-700">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Persona avatar"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                U
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {missionTitle}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {personaLine}
                        </p>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={onContinue}
                disabled={disabled}
                className={`w-full rounded-full px-8 py-3 font-semibold transition md:w-auto ${disabled
                    ? "cursor-not-allowed bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                    }`}
            >
                {buttonLabel}
            </button>
        </div>
    );
}