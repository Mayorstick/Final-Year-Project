import React from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { useUserProfile } from "../hooks/useUserProfile";
import type { GeneratedAIMission } from "../types/aiMission";
import { motion, AnimatePresence } from "framer-motion";

type SavedAIMissionDoc = {
    feedbackText: string;
    completed: boolean;
    generatedMission: GeneratedAIMission;
};

type ViewStep = "issue-1" | "issue-2" | "quick-check" | "completed";
type IssueLessonStep = "what" | "who" | "why" | "fix" | "quiz";

export default function AIIssueDetail() {
    const navigate = useNavigate();
    const { issueId } = useParams();
    const { authUser, profile, loading, error } = useUserProfile();

    const [docData, setDocData] = React.useState<SavedAIMissionDoc | null>(null);
    const [pageLoading, setPageLoading] = React.useState(true);
    const [pageError, setPageError] = React.useState("");

    const [step, setStep] = React.useState<ViewStep>("issue-1");

    const [selectedIssueAnswer, setSelectedIssueAnswer] = React.useState("");
    const [issueMessage, setIssueMessage] = React.useState("");
    const [wrongAttempts, setWrongAttempts] = React.useState(0);

    const [q1, setQ1] = React.useState("");
    const [q2, setQ2] = React.useState("");
    const [quickCheckMessage, setQuickCheckMessage] = React.useState("");
    const [quickCheckAttempts, setQuickCheckAttempts] = React.useState(0);

    const [saving, setSaving] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const [lessonStep, setLessonStep] = React.useState<IssueLessonStep>("what");

    function handleNextLessonStep() {
        if (lessonStep === "what") setLessonStep("who");
        else if (lessonStep === "who") setLessonStep("why");
        else if (lessonStep === "why") setLessonStep("fix");
        else if (lessonStep === "fix") setLessonStep("quiz");
    }

    function handlePrevLessonStep() {
        if (lessonStep === "quiz") setLessonStep("fix");
        else if (lessonStep === "fix") setLessonStep("why");
        else if (lessonStep === "why") setLessonStep("who");
        else if (lessonStep === "who") setLessonStep("what");
    }

    React.useEffect(() => {
        async function loadMission() {
            if (!authUser || !issueId) {
                setPageLoading(false);
                return;
            }

            try {
                const ref = doc(db, "users", authUser.uid, "aiIssues", issueId);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    setPageError("AI mission not found.");
                    return;
                }

                const data = snap.data() as SavedAIMissionDoc;

                if (!data.generatedMission) {
                    setPageError("This AI mission uses an old format. Please generate a new one.");
                    return;
                }

                setDocData(data);
                setCompleted(Boolean(data.completed));

                if (data.completed) {
                    setStep("completed");
                }
            } catch (e: any) {
                setPageError(e?.message ?? "Failed to load AI mission.");
            } finally {
                setPageLoading(false);
            }
        }

        loadMission();
    }, [authUser, issueId]);

    if (loading) return <div className="p-6 text-slate-900 dark:text-slate-100">Loading profile...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!authUser) return <div className="p-6 text-slate-900 dark:text-slate-100">You must be signed in.</div>;
    if (!profile) return <div className="p-6 text-slate-900 dark:text-slate-100">No profile found.</div>;
    if (pageLoading) return <div className="p-6 text-slate-900 dark:text-slate-100">Loading AI mission...</div>;
    if (pageError) return <div className="p-6 text-red-600">{pageError}</div>;
    if (!docData) return <div className="p-6 text-slate-900 dark:text-slate-100">No AI mission found.</div>;

    const mission = docData.generatedMission;

    if (
        !mission ||
        !Array.isArray(mission.issues) ||
        mission.issues.length < 2 ||
        !mission.quickCheck ||
        !Array.isArray(mission.quickCheck.questions) ||
        mission.quickCheck.questions.length < 2
    ) {
        return <div className="p-6 text-red-600">This AI mission is incomplete or invalid.</div>;
    }

    const issue1 = mission.issues[0];
    const issue2 = mission.issues[1];
    const currentIssue = step === "issue-1" ? issue1 : issue2;

    const baseXp = Number(mission.quickCheck.missionBonusXp ?? 20);
    const previewPenalty = quickCheckAttempts * 5;
    const previewXp = Math.max(0, baseXp - previewPenalty);

    function resetIssueSelection() {
        setSelectedIssueAnswer("");
        setIssueMessage("");
        setLessonStep("what");
        setWrongAttempts(0);
    }

    function handleIssueCheck() {
        if (step !== "issue-1" && step !== "issue-2") return;

        const chosen = currentIssue.options.find(
            (opt) => opt.id === selectedIssueAnswer
        );

        if (!chosen) {
            setIssueMessage("Please select an answer first.");
            return;
        }

        if (!chosen.correct) {
            setWrongAttempts((prev) => prev + 1);
            setIssueMessage(
                chosen.feedback || "Not quite — try again. (-5 XP penalty applied)"
            );
            return;
        }

        if (step === "issue-1") {
            setIssueMessage(chosen.feedback || "Correct! Moving to Issue 2...");
            setTimeout(() => {
                setStep("issue-2");
                resetIssueSelection();
            }, 1000);
        } else {
            setIssueMessage(chosen.feedback || "Correct! Moving to Quick Check...");
            setTimeout(() => {
                setStep("quick-check");
                resetIssueSelection();
            }, 1000);
        }
    }

    async function handleQuickCheckSubmit() {
        const qc = mission.quickCheck;

        if (!q1 || !q2) {
            setQuickCheckMessage("Please answer both questions.");
            return;
        }

        const q1Correct = q1 === qc.questions[0].correctId;
        const q2Correct = q2 === qc.questions[1].correctId;

        if (!q1Correct || !q2Correct) {
            setQuickCheckAttempts((prev) => prev + 1);
            setQuickCheckMessage(
                "Not quite — review your answers and try again. (-5 XP penalty applied)"
            );
            return;
        }

        if (completed) {
            setQuickCheckMessage("Already completed. XP has already been awarded.");
            return;
        }

        if (!authUser || !issueId) {
            setQuickCheckMessage("Unable to update progress.");
            return;
        }

        try {
            setSaving(true);

            const aiMissionRef = doc(db, "users", authUser.uid, "aiIssues", issueId);
            const userRef = doc(db, "users", authUser.uid);

            const LEVEL_XP = 450;
            const prevXp = Number(profile.xp ?? 0);
            const penalty = quickCheckAttempts * 5;
            const bonusXp = Math.max(0, baseXp - penalty);
            const newXp = prevXp + bonusXp;
            const newLevel = Math.floor(newXp / LEVEL_XP) + 1;

            const newAiMissionCount = (profile.aiMissionsCompleted ?? 0) + 1;
            const unlockedAIBadge =
                newAiMissionCount >= 3 && profile.aiMissionsCompleted < 3;

            await updateDoc(aiMissionRef, {
                completed: true,
            });

            await updateDoc(userRef, {
                xp: increment(bonusXp),
                totalIssuesFixed: increment(mission.issues.length),
                aiMissionsCompleted: increment(1),
                level: newLevel,
            });

            setCompleted(true);

            let message = `Mission completed! +${bonusXp} XP 🎉`;

            if (quickCheckAttempts > 0) {
                message += ` (${quickCheckAttempts * 5} XP penalty for retries)`;
            }

            if (unlockedAIBadge) {
                message += " New badge unlocked: AI Explorer 🧠";
            }

            setQuickCheckMessage(message);
            setStep("completed");
        } catch (e: any) {
            setQuickCheckMessage(e?.message ?? "Failed to save mission completion.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        AI Mission
                    </h1>

                    <button
                        className="rounded-xl bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                        onClick={() => navigate("/my-ai-issues")}
                    >
                        Back to My AI Missions
                    </button>
                </div>

                <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold">{mission.title}</span>
                </div>

                {step !== "completed" && (
                    <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        {step === "issue-1" && "Issue 1 of 2"}
                        {step === "issue-2" && "Issue 2 of 2"}
                        {step === "quick-check" && "Quick Check"}
                    </div>
                )}

                {(step === "issue-1" || step === "issue-2") && (
                    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                {currentIssue.title}
                            </h2>
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                {currentIssue.issueType}
                            </span>
                        </div>

                        <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Lesson step:{" "}
                            <span className="font-semibold">
                                {lessonStep === "what" && "What is the issue?"}
                                {lessonStep === "who" && "Who is affected?"}
                                {lessonStep === "why" && "Why it matters"}
                                {lessonStep === "fix" && "How to fix it"}
                                {lessonStep === "quiz" && "Quick question"}
                            </span>
                        </div>

                        <div className="mt-3 flex gap-2">
                            {(["what", "who", "why", "fix", "quiz"] as IssueLessonStep[]).map((s) => (
                                <div
                                    key={s}
                                    className={`h-2 w-10 rounded-full ${lessonStep === s ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
                                        }`}
                                />
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={lessonStep}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.25 }}
                                className="mt-6"
                            >
                                {lessonStep === "what" && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                            What is the issue?
                                        </h4>
                                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                            {currentIssue.issueExplanation}
                                        </p>
                                    </div>
                                )}

                                {lessonStep === "who" && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                            Who is affected?
                                        </h4>
                                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                            {currentIssue.whoIsAffected.map((person) => (
                                                <li key={person}>{person}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {lessonStep === "why" && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                            Why it matters
                                        </h4>
                                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                            {currentIssue.whyItMatters}
                                        </p>
                                    </div>
                                )}

                                {lessonStep === "fix" && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                            How to fix it
                                        </h4>
                                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                            {currentIssue.howToFix.text}
                                        </p>

                                        {currentIssue.howToFix.exampleCode && (
                                            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
                                                <code>{currentIssue.howToFix.exampleCode}</code>
                                            </pre>
                                        )}
                                    </div>
                                )}

                                {lessonStep === "quiz" && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                            Quick question
                                        </h4>
                                        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {currentIssue.question}
                                        </p>

                                        <div className="mt-3 space-y-3">
                                            {currentIssue.options.map((option) => (
                                                <label
                                                    key={option.id}
                                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${selectedIssueAnswer === option.id
                                                            ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900"
                                                            : "border-slate-200 dark:border-slate-700"
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`issue-${step}`}
                                                        value={option.id}
                                                        checked={selectedIssueAnswer === option.id}
                                                        onChange={() => setSelectedIssueAnswer(option.id)}
                                                    />
                                                    <span className="text-slate-800 dark:text-slate-200">
                                                        {option.text}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>

                                        <button
                                            onClick={handleIssueCheck}
                                            className="mt-4 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-500"
                                        >
                                            Check Answer
                                        </button>

                                        {issueMessage && (
                                            <p className="mt-4 text-sm text-blue-700 dark:text-blue-400">
                                                {issueMessage}
                                            </p>
                                        )}

                                        {wrongAttempts > 0 && (
                                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                Wrong attempts: {wrongAttempts} (−{wrongAttempts * 5} XP)
                                            </p>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-8 flex items-center justify-between">
                            <button
                                onClick={handlePrevLessonStep}
                                disabled={lessonStep === "what"}
                                className="rounded-xl bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                            >
                                Back
                            </button>

                            {lessonStep !== "quiz" && (
                                <button
                                    onClick={handleNextLessonStep}
                                    className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {step === "quick-check" && (
                    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {mission.quickCheck.missionTitle}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Answer both questions to complete this AI mission and earn{" "}
                            <span className="font-semibold">{previewXp} XP</span>.
                        </p>

                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                1) {mission.quickCheck.questions[0].prompt}
                            </h3>
                            <div className="mt-3 space-y-2">
                                {mission.quickCheck.questions[0].options.map((option) => (
                                    <label
                                        key={option.id}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${q1 === option.id
                                                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900"
                                                : "border-slate-200 dark:border-slate-700"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="q1"
                                            checked={q1 === option.id}
                                            onChange={() => setQ1(option.id)}
                                        />
                                        <span className="text-slate-800 dark:text-slate-200">
                                            {option.text}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                2) {mission.quickCheck.questions[1].prompt}
                            </h3>
                            <div className="mt-3 space-y-2">
                                {mission.quickCheck.questions[1].options.map((option) => (
                                    <label
                                        key={option.id}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${q2 === option.id
                                                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900"
                                                : "border-slate-200 dark:border-slate-700"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="q2"
                                            checked={q2 === option.id}
                                            onChange={() => setQ2(option.id)}
                                        />
                                        <span className="text-slate-800 dark:text-slate-200">
                                            {option.text}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleQuickCheckSubmit}
                            disabled={saving}
                            className="mt-6 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                        >
                            {saving ? "Saving..." : `Complete AI Mission (+${previewXp} XP)`}
                        </button>

                        {quickCheckMessage && (
                            <p className="mt-4 text-sm text-blue-700 dark:text-blue-400">
                                {quickCheckMessage}
                            </p>
                        )}

                        {quickCheckAttempts > 0 && (
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                Wrong attempts: {quickCheckAttempts} (−{quickCheckAttempts * 5} XP)
                            </p>
                        )}
                    </div>
                )}

                {step === "completed" && (
                    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            AI Mission Completed 🎉
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            You completed this AI-generated mission and earned{" "}
                            <span className="font-semibold">{previewXp} XP</span>.
                        </p>

                        <button
                            onClick={() => navigate("/my-ai-issues")}
                            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Back to My AI Missions
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}