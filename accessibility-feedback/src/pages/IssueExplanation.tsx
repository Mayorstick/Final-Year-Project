
import { useNavigate, useParams } from "react-router-dom";
import { ISSUES } from "../data/issue";

import HappyCycleDemo from "../components/demos/HappyCycleDemo";
import LowVisionDemo from "../components/demos/LowVisionDemo";
import KeyboardDemo from "../components/demos/KeyboardDemo";
import HappyCycleMission2Demo from "../components/demos/HappyCycleMission2Demo";
import KeyboardMission2Demo from "../components/demos/KeyboardMission2Demo";
import SunlightDemo from "../components/demos/SunlightDemo";

export default function IssueExplanation() {
    const navigate = useNavigate();
    const { missionId, issueIndex } = useParams();

    if (!missionId) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Missing missionId.</div>;
    }

    const idx = Number(issueIndex || "1");
    const missionIssues = ISSUES.filter((i) => i.missionId === missionId);
    const current = missionIssues[idx - 1];

    if (!current) {
        return (
            <div className="p-6">
                <p className="text-slate-700 dark:text-slate-200">No explanation found.</p>
                <button
                    className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    onClick={() => navigate("/mission")}
                >
                    Back to Missions
                </button>
            </div>
        );
    }

    const isLastIssue = idx === missionIssues.length;

    function handleNext() {
        if (isLastIssue) {
            navigate(`/mission/${missionId}/quick-check`);
        } else {
            navigate(`/mission/${missionId}/issue/${idx + 1}`);
        }
    }

    return (
        <div className="app-page">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <button
                        className="app-secondary-btn"
                        onClick={() => navigate(`/mission/${missionId}/issue/${idx}`)}
                    >
                        ← Back to question
                    </button>

                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Learning <span className="font-semibold">{idx}</span> / {missionIssues.length}
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
                            <h2 className="text-xl font-bold app-title">
                                {current.title}
                            </h2>

                            <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                What is the issue?
                            </h4>
                            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                {current.issueExplanation}
                            </p>

                            <hr className="my-4 border-slate-200 dark:border-slate-700" />

                            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                Who is affected?
                            </h4>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                                {current.whoIsAffected.map((a) => (
                                    <li key={a}>{a}</li>
                                ))}
                            </ul>

                            <hr className="my-4 border-slate-200 dark:border-slate-700" />

                            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                Why it matters
                            </h4>
                            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                {current.whyItMatters}
                            </p>

                            <hr className="my-4 border-slate-200 dark:border-slate-700" />

                            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                How to fix it
                            </h4>
                            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                {current.howToFix.text}
                            </p>

                            {current.howToFix.exampleCode && (
                                <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
                                    <code>{current.howToFix.exampleCode}</code>
                                </pre>
                            )}

                            <button
                                onClick={handleNext}
                                className="mt-5 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                            >
                                {isLastIssue ? "Continue" : "Next Issue"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}