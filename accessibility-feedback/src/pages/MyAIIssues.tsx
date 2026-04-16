import React from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { useUserProfile } from "../hooks/useUserProfile";
import type { GeneratedAIMission } from "../types/aiMission";

type SavedAIMission = {
    id: string;
    createdAt?: any;
    feedbackText: string;
    completed: boolean;
    generatedMission: GeneratedAIMission;
};

export default function MyAIIssues() {
    const navigate = useNavigate();
    const { authUser, loading, error } = useUserProfile();

    const [missions, setMissions] = React.useState<SavedAIMission[]>([]);
    const [pageLoading, setPageLoading] = React.useState(true);
    const [pageError, setPageError] = React.useState("");

    React.useEffect(() => {
        async function loadMissions() {
            if (!authUser) {
                setPageLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "users", authUser.uid, "aiIssues"),
                    orderBy("createdAt", "desc")
                );

                const snap = await getDocs(q);

                const rows: SavedAIMission[] = snap.docs
                    .map((doc) => {
                        const data = doc.data() as any;

                        if (!data.generatedMission) {
                            return null;
                        }

                        return {
                            id: doc.id,
                            createdAt: data.createdAt,
                            feedbackText: data.feedbackText ?? "",
                            completed: Boolean(data.completed),
                            generatedMission: data.generatedMission as GeneratedAIMission,
                        };
                    })
                    .filter((row): row is SavedAIMission => row !== null);

                setMissions(rows);
            } catch (e: any) {
                setPageError(e?.message ?? "Failed to load AI missions.");
            } finally {
                setPageLoading(false);
            }
        }

        loadMissions();
    }, [authUser]);

    if (loading) return <div className="p-6 text-slate-900 dark:text-slate-100">Loading profile...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!authUser) return <div className="p-6 text-slate-900 dark:text-slate-100">You must be signed in.</div>;
    if (pageLoading) return <div className="p-6 text-slate-900 dark:text-slate-100">Loading AI missions...</div>;
    if (pageError) return <div className="p-6 text-red-600">{pageError}</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        My AI Missions
                    </h1>

                    <button
                        className="rounded-xl bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                        onClick={() => navigate("/resources")}
                    >
                        Back to Resources
                    </button>
                </div>

                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Review AI-generated accessibility missions created from pasted audit feedback.
                </p>

                {missions.length === 0 ? (
                    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                        <p className="text-slate-700 dark:text-slate-300">
                            No AI-generated missions yet.
                        </p>
                        <button
                            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            onClick={() => navigate("/explain-feedback")}
                        >
                            Create one now
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 space-y-4">
                        {missions.map((mission) => (
                            <div
                                key={mission.id}
                                className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                            {mission.generatedMission.title}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            {mission.generatedMission.issues.length} issues • Bonus XP{" "}
                                            {mission.generatedMission.quickCheck.missionBonusXp}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${mission.completed
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                            }`}
                                    >
                                        {mission.completed ? "Completed" : "Not completed"}
                                    </span>
                                </div>

                                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                                    {mission.generatedMission.issues[0]?.issueExplanation}
                                </p>

                                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400 dark:border dark:border-slate-700">
                                    <span className="font-semibold">Original feedback:</span>{" "}
                                    {mission.feedbackText}
                                </div>

                                <div className="mt-4">
                                    <button
                                        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                        onClick={() => navigate(`/ai-issues/${mission.id}`)}
                                    >
                                        Open Mission
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}