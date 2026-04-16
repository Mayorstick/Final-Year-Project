import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUserProfile } from "../hooks/useUserProfile";
import type { GeneratedAIMission } from "../types/aiMission";

export default function ExplainFeedback() {
    const navigate = useNavigate();

    const [feedbackText, setFeedbackText] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [result, setResult] = React.useState<GeneratedAIMission | null>(null);
    const [savedMissionId, setSavedMissionId] = React.useState<string | null>(null);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null);
    const [noIssueMessage, setNoIssueMessage] = React.useState("");

    const { authUser } = useUserProfile();

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setSelectedImage(file);

        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreviewUrl(previewUrl);
        } else {
            setImagePreviewUrl(null);
        }
    }

    React.useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    async function handleGenerate() {
        setLoading(true);
        setError("");
        setResult(null);
        setSavedMissionId(null);
        setNoIssueMessage("");

        if (!feedbackText.trim() && !selectedImage) {
            setError("Please enter audit feedback or upload a screenshot.");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("feedbackText", feedbackText);

            if (selectedImage) {
                formData.append("screenshot", selectedImage);
            }

            const res = await fetch("https://final-year-project-production-b3ad.up.railway.app/generate-issue", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "Failed to generate explanation.");
            }

            const parsed = JSON.parse(data.raw) as GeneratedAIMission;

            if (data.noIssueFound) {
                setNoIssueMessage(
                    "No clear visible accessibility issue was found from this screenshot alone. Try uploading a screenshot of a webpage or interface, or paste audit feedback for a more accurate explanation."
                );
                setResult(null);
                return;
            }

            setResult(parsed);

            if (authUser) {
                const docRef = await addDoc(
                    collection(db, "users", authUser.uid, "aiIssues"),
                    {
                        createdAt: serverTimestamp(),
                        feedbackText,
                        generatedMission: parsed,
                        completed: false,
                    }
                );

                setSavedMissionId(docRef.id);
                navigate(`/ai-issues/${docRef.id}`);
            }
        } catch (err: any) {
            setError(err?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Explain My Audit Feedback
                </h1>

                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Paste accessibility feedback from tools like AXE, WAVE, Lighthouse, upload a screenshot, or use both.
                </p>

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="feedback"
                                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                            >
                                Audit feedback
                            </label>

                            <textarea
                                id="feedback"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                rows={10}
                                placeholder={`Example:
Buttons do not have an accessible name.
Low contrast text found.
Link text is not descriptive.`}
                                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="screenshot"
                                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                            >
                                Optional screenshot
                            </label>

                            <label
                                htmlFor="screenshot"
                                className="mt-3 flex min-h-65 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-blue-500 hover:bg-blue-50 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800"
                            >
                                <div>
                                    <p className="font-medium text-slate-800 dark:text-slate-100">
                                        Click to upload a screenshot
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        PNG, JPG or JPEG. You can submit with a screenshot only.
                                    </p>

                                    {selectedImage && (
                                        <p className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                                            Selected: {selectedImage.name}
                                        </p>
                                    )}
                                </div>
                            </label>

                            <input
                                id="screenshot"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                Upload a screenshot if you want the AI to analyze visible accessibility issues such as contrast, spacing, text size, or clutter.
                            </p>
                        </div>
                    </div>

                    {imagePreviewUrl && (
                        <div className="mt-6 rounded-2xl border bg-slate-50 p-3 dark:bg-slate-900 dark:border-slate-700">
                            <img
                                src={imagePreviewUrl}
                                alt="Selected screenshot preview"
                                className="max-h-80 w-full rounded-xl object-contain"
                            />
                        </div>
                    )}

                    {error && (
                        <p className="mt-4 text-sm text-red-600">{error}</p>
                    )}

                    {noIssueMessage && (
                        <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200">
                            <p className="font-semibold">No clear visible issue found</p>
                            <p className="mt-1">{noIssueMessage}</p>
                        </div>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={loading || (!feedbackText.trim() && !selectedImage)}
                        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "Generating..." : "Generate AI Mission"}
                    </button>
                </div>

                {result && (
                    <div className="mt-6 space-y-6">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                {result.title}
                            </h2>

                            {selectedImage && (
                                <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-200">
                                    AI analysis used your screenshot and audit feedback to detect visible accessibility issues.
                                </div>
                            )}

                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                This AI-generated mission was created from your submitted input.
                            </p>

                            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400 dark:border dark:border-slate-700">
                                <span className="font-semibold">Original feedback:</span>{" "}
                                {result.feedbackText || "Screenshot-only submission"}
                            </div>
                        </div>

                        {result.issues.map((issue, index) => (
                            <div
                                key={issue.id}
                                className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                        Issue {index + 1}: {issue.title}
                                    </h3>

                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        {issue.issueType}
                                    </span>
                                </div>

                                <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    What is the issue?
                                </h4>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    {issue.issueExplanation}
                                </p>

                                <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    Who is affected?
                                </h4>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                                    {issue.whoIsAffected.map((person) => (
                                        <li key={person}>{person}</li>
                                    ))}
                                </ul>

                                <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    Why it matters
                                </h4>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    {issue.whyItMatters}
                                </p>

                                <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                    How to fix it
                                </h4>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    {issue.howToFix.text}
                                </p>

                                {issue.howToFix.exampleCode && (
                                    <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
                                        <code>{issue.howToFix.exampleCode}</code>
                                    </pre>
                                )}
                            </div>
                        ))}

                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                Next step
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                This page shows a preview of the generated mission. Open the saved mission to complete it step by step.
                            </p>

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                {savedMissionId && (
                                    <button
                                        onClick={() => navigate(`/ai-issues/${savedMissionId}`)}
                                        className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                                    >
                                        Open Saved Mission
                                    </button>
                                )}

                                <button
                                    onClick={() => navigate("/my-ai-issues")}
                                    className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                                >
                                    Go to My AI Missions
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}