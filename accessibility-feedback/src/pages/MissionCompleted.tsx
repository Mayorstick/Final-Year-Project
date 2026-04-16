import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";
import { QUICK_CHECKS } from "../data/quickChecks";
import { db } from "../firebase/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";

export default function MissionCompleted() {
    const navigate = useNavigate();
    const { missionId } = useParams();

    const { authUser, profile, loading, error } = useUserProfile();

    const [confidence, setConfidence] = React.useState<number>(70);
    const [saving, setSaving] = React.useState(false);

    const [mounted, setMounted] = React.useState(false);
    const [xpShown, setXpShown] = React.useState(0);

    const qc = QUICK_CHECKS.find((m) => m.missionId === (missionId ?? ""));
    const missionTitle = qc?.missionTitle ?? "Mission complete!";
    const bonusXp = qc?.missionBonusXp ?? 0;

    React.useEffect(() => {
        requestAnimationFrame(() => setMounted(true));



        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => { });

        const duration = 1.5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            confetti({
                particleCount: 20,
                spread: 80,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if (!mounted) return;

        const duration = 800;
        const start = 0;
        const end = bonusXp;
        const t0 = performance.now();

        function tick(t: number) {
            const progress = Math.min(1, (t - t0) / duration);
            setXpShown(Math.round(start + (end - start) * progress));
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }, [mounted, bonusXp]);

    if (loading) return <div className="p-6 text-slate-900 dark:text-slate-100">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!profile || !authUser) return <div className="p-6 text-slate-900 dark:text-slate-100">No profile found.</div>;
    if (!missionId) return <div className="p-6 text-slate-900 dark:text-slate-100">Missing mission id.</div>;

    async function handleSubmit() {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => { });
        setSaving(true);
        try {
            const userRef = doc(db, "users", authUser.uid);

            await updateDoc(userRef, {
                lastMissionConfidence: confidence,
                lastMissionId: missionId,
                lastMissionConfidenceAt: serverTimestamp(),
            });

            navigate("/dashboard");
        } catch {
            navigate("/dashboard");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-6 py-10">
                <div
                    className={[
                        "rounded-2xl border bg-white p-8 shadow-sm transition-all duration-500 dark:bg-slate-800 dark:border-slate-700",
                        mounted
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-4 scale-[0.98] opacity-0",
                    ].join(" ")}
                >
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-2xl bg-green-200 blur-md animate-pulse" />
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                                    ✅
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                                    Well Done!
                                </h1>
                                <p className="mt-1 text-slate-600 dark:text-slate-400">
                                    You completed: <span className="font-semibold">{missionTitle}</span>
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="rounded-xl bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* LEFT */}
                        <div className="rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">💡</div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                    How confident do you feel about this topic now?
                                </h2>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                                    <span>Low</span>
                                    <span>High</span>
                                </div>

                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={confidence}
                                    onChange={(e) => setConfidence(Number(e.target.value))}
                                    className="mt-3 w-full"
                                />

                                <div className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    Confidence: <span className="font-semibold">{confidence}</span>/100
                                </div>

                                <p className="mt-4 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <span className="text-xl text-green-600">✅</span>
                                    Keep it — that is the answer
                                </p>
                            </div>

                            <button
                                disabled={saving}
                                onClick={handleSubmit}
                                className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Submit & Continue"}
                            </button>
                        </div>

                        {/* RIGHT */}
                        <div className="rounded-2xl border p-6 dark:border-slate-700 dark:bg-slate-900">
                            <p className="text-center text-2xl font-extrabold text-green-600 dark:text-green-400">
                                +{xpShown} XP earned
                            </p>

                            <div className="mt-6">
                                <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div
                                        className="h-full rounded-full bg-green-500 transition-all duration-700"
                                        style={{ width: mounted ? "66%" : "0%" }}
                                    />
                                </div>

                                <p className="mt-5 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    Level {profile.level}{" "}
                                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                                        Advocate
                                    </span>{" "}
                                    ⭐⭐⭐
                                </p>

                                <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                                    Total XP: <span className="font-semibold">{profile.xp}</span>
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/dashboard")}
                                className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}