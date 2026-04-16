import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";
import { getPersonaMissions, isMissionUnlocked } from "../utils/progress";

export default function Missions() {
    const navigate = useNavigate();
    const { profile, loading, error } = useUserProfile();

    if (loading) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Loading missions...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    if (!profile) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">No profile found.</div>;
    }

    const personaId = profile.activePersonaId;

    if (!personaId) {
        return (
            <div className="app-page">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="app-card">
                        <p className="text-slate-700 dark:text-slate-200">
                            No persona selected yet.
                        </p>
                        <button
                            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            onClick={() => navigate("/personas")}
                        >
                            Select a Persona
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const completedMissions = profile.completedMissions ?? [];
    const personaMissions = getPersonaMissions(personaId);

    return (
        <div className="app-page">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold app-title">Choose a Mission</h1>
                    <button
                        className="app-secondary-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                </div>

                <p className="mt-2 app-muted">
                    Showing missions for:{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {personaId}
                    </span>
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {personaMissions.map((mission) => {
                        const unlocked = isMissionUnlocked({
                            missionId: mission.id,
                            personaId,
                            completedMissions,
                        });

                        const completed = completedMissions.includes(mission.id);

                        return (
                            <div
                                key={mission.id}
                                className={`app-card ${!unlocked ? "opacity-60" : ""}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold app-title">
                                            {mission.title}
                                        </h2>
                                        <p className="mt-1 text-sm app-muted">
                                            {mission.description}
                                        </p>
                                    </div>

                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        +{mission.xpReward} XP
                                    </span>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {mission.issueTypes.map((t) => (
                                        <span
                                            key={t}
                                            className="app-chip"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5">
                                    {completed ? (
                                        <button
                                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                                            onClick={() => navigate(`/mission/${mission.id}/completed`)}
                                        >
                                            View Completed
                                        </button>
                                    ) : unlocked ? (
                                        <button
                                            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                                            onClick={() => navigate(`/mission/${mission.id}/issue/1`)}
                                        >
                                            Start Mission
                                        </button>
                                    ) : (
                                        <button
                                            className="app-disabled-btn"
                                            disabled
                                        >
                                            Locked
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}