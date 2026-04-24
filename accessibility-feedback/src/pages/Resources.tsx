import { useNavigate } from "react-router-dom";

export default function Resources() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Learning & AI Tools
                </h1>

                <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
                    Use AI-powered explanations and saved issues to better understand
                    accessibility problems beyond the built-in missions.
                </p>

                {/* AI TOOLS SECTION */}
                <div className="mt-8">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        AI Tools
                    </h2>

                    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Explain Feedback */}
                        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-slate-800 dark:border-slate-700">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Explain Audit Feedback
                            </h3>

                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Paste feedback from Lighthouse, axe, WAVE or tutor comments.
                                Get a plain-language explanation, user impact summary,
                                and a learning question.
                            </p>

                            <button
                                onClick={() => navigate("/explain-feedback")}
                                className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Open Tool
                            </button>
                        </div>

                        {/* My AI Issues */}
                        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-slate-800 dark:border-slate-700">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                My AI Issues
                            </h3>

                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Review and revisit accessibility issues you previously
                                generated and saved. Continue learning at your own pace.
                            </p>

                            <button
                                onClick={() => navigate("/my-ai-issues")}
                                className="mt-4 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"
                            >
                                View Issues
                            </button>
                        </div>
                    </div>
                </div>

                {/* Future expansion placeholder */}
                <div className="mt-12 rounded-2xl border bg-indigo-50 p-6 dark:bg-indigo-900/20 dark:border-indigo-700">
                    <h3 className="font-semibold text-indigo-900 dark:text-indigo-300">
                        More coming soon
                    </h3>
                    
                </div>
            </div>
        </div>
    );
}
