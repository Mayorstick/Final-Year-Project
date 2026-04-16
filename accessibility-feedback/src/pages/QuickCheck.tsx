import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";
import { QUICK_CHECKS } from "../data/quickChecks";
import { awardMissionCompletion } from "../utils/progressUpdate";

export default function QuickCheck() {
    const navigate = useNavigate();
    const { missionId } = useParams() as { missionId?: string };

    const { authUser, profile, loading, error } = useUserProfile();

    const [q1, setQ1] = React.useState("");
    const [q2, setQ2] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        setQ1("");
        setQ2("");
        setMessage("");
    }, [missionId]);

    if (loading) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Loading quick check...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    if (!missionId) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Missing mission id.</div>;
    }

    if (!authUser || !profile) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">No profile found.</div>;
    }

    const uid = authUser.uid;

    const qc = QUICK_CHECKS.find((m) => m.missionId === missionId);
    if (!qc) {
        return (
            <div className="p-6">
                <p className="text-slate-700 dark:text-slate-200">
                    No quick check found for this mission.
                </p>
                <button
                    className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    onClick={() => navigate("/mission")}
                >
                    Back to Missions
                </button>
            </div>
        );
    }

    const alreadyCompleted = (profile.completedMissions ?? []).includes(missionId);

    if (alreadyCompleted) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Already completed
                        </h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            You’ve already completed this mission’s quick check.
                        </p>
                        <button
                            className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                            onClick={() => navigate(`/mission/${missionId}/completed`)}
                        >
                            View Completion
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    async function handleSubmit() {
        setMessage("");

        if (!q1 || !q2) {
            setMessage("Please answer both questions.");
            return;
        }

        const q1Correct = q1 === qc.questions[0].correctId;
        const q2Correct = q2 === qc.questions[1].correctId;

        if (!q1Correct || !q2Correct) {
            setMessage("Not quite — review your answers and try again 🙂");
            return;
        }

        setSaving(true);
        try {
            const LEVEL_XP = 450;

            await awardMissionCompletion({
                uid,
                missionId,
                missionBonusXp: qc.missionBonusXp,
                prevMissionsCompleted: Number(profile.missionsCompleted ?? 0),
                prevXp: Number(profile.xp ?? 0),
                levelXpTarget: LEVEL_XP,
            });

            setMessage(`Mission complete! +${qc.missionBonusXp} XP 🎉`);

            setTimeout(() => {
                navigate(`/mission/${missionId}/completed`);
            }, 800);
        } catch (e: any) {
            setMessage(e?.message ?? "Failed to submit quick check.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <button
                        className="rounded-xl bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                        onClick={() => navigate(`/mission/${missionId}/issue/1`)}
                    >
                        ← Back to Issues
                    </button>

                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Quick Check •{" "}
                        <span className="font-semibold">
                            {qc.missionTitle}
                        </span>
                    </span>
                </div>

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Quick Knowledge Check
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Answer these 2 questions to finish the mission and earn your bonus reward.
                    </p>

                    <div className="mt-6">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            1) {qc.questions[0].prompt}
                        </h2>
                        <div className="mt-3 space-y-2">
                            {qc.questions[0].options.map((opt) => (
                                <label
                                    key={opt.id}
                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 ${q1 === opt.id
                                        ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900"
                                        : ""
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="q1"
                                        checked={q1 === opt.id}
                                        onChange={() => setQ1(opt.id)}
                                    />
                                    <span className="text-slate-800 dark:text-slate-200">
                                        {opt.text}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            2) {qc.questions[1].prompt}
                        </h2>
                        <div className="mt-3 space-y-2">
                            {qc.questions[1].options.map((opt) => (
                                <label
                                    key={opt.id}
                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 ${q2 === opt.id
                                        ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900"
                                        : ""
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="q2"
                                        checked={q2 === opt.id}
                                        onChange={() => setQ2(opt.id)}
                                    />
                                    <span className="text-slate-800 dark:text-slate-200">
                                        {opt.text}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {message && (
                        <p className="mt-5 text-sm text-blue-700 dark:text-blue-400">
                            {message}
                        </p>
                    )}

                    <button
                        disabled={saving}
                        onClick={handleSubmit}
                        className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-60"
                    >
                        {saving ? "Submitting..." : `Finish Mission (+${qc.missionBonusXp} XP)`}
                    </button>
                </div>
            </div>
        </div>
    );
}