import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISSUES } from "../data/issue";
import { useUserProfile } from "../hooks/useUserProfile";
import HappyCycleDemo from "../components/demos/HappyCycleDemo";
import HappyCycleMission2Demo from "../components/demos/HappyCycleMission2Demo";
import LowVisionDemo from "../components/demos/LowVisionDemo";
import KeyboardDemo from "../components/demos/KeyboardDemo";
import KeyboardMission2Demo from "../components/demos/KeyboardMission2Demo";
import { awardIssueCompletion } from "../utils/progressUpdate";
import SunlightDemo from "../components/demos/SunlightDemo";

export default function MissionIssue() {
    const navigate = useNavigate();
    const { missionId, issueIndex } = useParams();

    const { authUser, profile, loading, error } = useUserProfile();

    const [selected, setSelected] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>("");
    const [saving, setSaving] = React.useState(false);

    if (loading) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    if (!profile || !authUser) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">No profile found.</div>;
    }

    if (!missionId) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Missing missionId.</div>;
    }

    const idx = Number(issueIndex || "1");
    const missionIssues = ISSUES.filter((i) => i.missionId === missionId);
    const current = missionIssues[idx - 1];

    if (!current) {
        return (
            <div className="p-6">
                <p className="text-slate-700 dark:text-slate-200">No issue found for this mission.</p>
                <button
                    className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    onClick={() => navigate("/mission")}
                >
                    Back to Missions
                </button>
            </div>
        );
    }

    const completedIssues: string[] = Array.isArray((profile as any).completedIssues)
        ? (profile as any).completedIssues
        : [];

    const alreadyCompletedThisIssue = completedIssues.includes(current.id);

    async function handleMarkUnderstood() {
        setMessage("");

        const chosen = current.options.find((o) => o.id === selected);
        if (!chosen) {
            setMessage("Please select an answer first.");
            return;
        }

        if (!chosen.correct) {
            setMessage("Not quite — try again 🙂");
            return;
        }

        setSaving(true);
        try {
            if (!alreadyCompletedThisIssue) {
                await awardIssueCompletion({
                    uid: authUser.uid,
                    issueId: current.id,
                    xpReward: current.xpReward,
                    prevTotalIssuesFixed: Number((profile as any).totalIssuesFixed ?? 0),
                });
            }

            setMessage(`Correct! +${current.xpReward} XP 🎉`);

            setTimeout(() => {
                navigate(`/mission/${missionId}/issue/${idx}/learn`);
            }, 400);
        } catch (e: any) {
            setMessage(e?.message ?? "Failed to update progress.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="app-page">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <button
                        className="app-secondary-btn"
                        onClick={() => navigate("/mission")}
                    >
                        ← Back
                    </button>

                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Issue <span className="font-semibold">{idx}</span> / {missionIssues.length}
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-6 lg:flex-row">
                    <div className="min-w-0 flex-1">
                        {missionId?.startsWith("lv-") ? (
                            <LowVisionDemo issueId={current.id} />
                        ) : missionId === "kb-1" ? (
                            <KeyboardDemo issueId={current.id} />
                        ) : missionId === "kb-2" ? (
                            <KeyboardMission2Demo issueId={current.id} />
                        ) : missionId === "sr-2" ? (
                            <HappyCycleMission2Demo issueId={current.id} />
                        ) : missionId === "sun-1" ? (
                            <SunlightDemo issueId={current.id} />
                        ) : (
                            <HappyCycleDemo issueId={current.id} />
                        )}
                    </div>

                    <div className="w-full shrink-0 lg:w-[380px]">
                        <div className="app-card">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold app-title">{current.title}</h3>
                                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                    +{current.xpReward} XP
                                </span>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    What is the issue?
                                </h4>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    {current.issueExplanation}
                                </p>
                                <hr className="my-4 border-slate-200 dark:border-slate-700" />
                            </div>

                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                                {current.question}
                            </p>

                            <div className="mt-4 space-y-3">
                                {current.options.map((o) => (
                                    <label
                                        key={o.id}
                                        className={[
                                            "flex cursor-pointer items-center gap-3 rounded-xl border p-3",
                                            "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800",
                                            selected === o.id ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900" : "",
                                        ].join(" ")}
                                    >
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={o.id}
                                            checked={selected === o.id}
                                            onChange={() => setSelected(o.id)}
                                        />
                                        <span className="text-slate-800 dark:text-slate-200">{o.text}</span>
                                    </label>
                                ))}
                            </div>

                            {message && <p className="mt-4 text-sm text-blue-700 dark:text-blue-400">{message}</p>}

                            <button
                                disabled={saving}
                                onClick={handleMarkUnderstood}
                                className="mt-5 w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Mark as understood"}
                            </button>

                            {alreadyCompletedThisIssue && (
                                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                    You already earned XP for this issue — you can still review the learning page.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}