import React from "react";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    limit,
    where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUserProfile } from "../hooks/useUserProfile";

type Row = {
    uid: string;
    displayName: string;
    xp: number;
    level: number;
    missionsCompleted: number;
    activePersonaId?: string | null;
};

function rankIcon(rank: number) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
}

export default function Leaderboard() {
    const { profile, loading: profileLoading } = useUserProfile();

    const [rows, setRows] = React.useState<Row[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    const [mode, setMode] = React.useState<"overall" | "persona">("overall");

    React.useEffect(() => {
        let qRef: any;

        
        const personaId = profile?.activePersonaId ?? null;
        const usePersonaFilter = mode === "persona" && !!personaId;

        try {
            setLoading(true);
            setError("");

            if (usePersonaFilter) {

                qRef = query(
                    collection(db, "users"),
                    where("activePersonaId", "==", personaId),
                    orderBy("xp", "desc"),
                    limit(50)
                );
            } else {
                
                qRef = query(collection(db, "users"), orderBy("xp", "desc"), limit(50));
            }

       
            const unsub = onSnapshot(
                qRef,
                (snap) => {
                    const raw: Row[] = snap.docs.map((d) => {
                        const data = d.data() as any;
                        return {
                            uid: d.id,
                            displayName: data.displayName ?? data.fullName ?? "Anonymous",
                            xp: Number(data.xp ?? 0),
                            level: Number(data.level ?? 1),
                            missionsCompleted: Number(data.missionsCompleted ?? 0),
                            activePersonaId: data.activePersonaId ?? null,
                        };
                    });

                   
                    const unique = Array.from(new Map(raw.map((r) => [r.uid, r])).values());

                    setRows(unique); 
                    setLoading(false);
                },
                (err) => {
                    setError(err?.message ?? "Failed to load leaderboard.");
                    setLoading(false);
                }
            );

            return () => unsub();
        } catch (e: any) {
            setError(e?.message ?? "Failed to load leaderboard.");
            setLoading(false);
        }
    }, [mode, profile?.activePersonaId]);

    if (profileLoading) return <div className="p-6">Loading profile...</div>;
    if (loading) return <div className="p-6">Loading leaderboard...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    const personaId = profile?.activePersonaId ?? null;
    const personaDisabled = !personaId;

    return (
        <div className="min-h-screen text-slate-700 dark:text-slate-200">
            <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900  dark:text-white">Leaderboard</h1>

                    {/* Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setMode("overall")}
                            className={[
                                "rounded-xl px-4 py-2 text-sm font-semibold border",
                                mode === "overall"
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-800 border-slate-200",
                            ].join(" ")}
                        >
                            Overall
                        </button>

                        <button
                            onClick={() => setMode("persona")}
                            disabled={personaDisabled}
                            className={[
                                "rounded-xl px-4 py-2 text-sm font-semibold border",
                                personaDisabled
                                    ? "bg-slate-200 text-slate-500  dark:text-slate-400 border-slate-200 cursor-not-allowed"
                                    : mode === "persona"
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-slate-800 border-slate-200",
                            ].join(" ")}
                            title={personaDisabled ? "Select a persona first" : "Show my persona leaderboard"}
                        >
                            My Persona
                        </button>
                    </div>
                </div>

                {mode === "persona" && personaDisabled && (
                    <div className="mt-4 rounded-xl border bg-yellow-50 p-3 text-sm text-yellow-900">
                        Select a persona first to use “My Persona”.
                    </div>
                )}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-700">
                    {rows.length === 0 ? (
                        <div className="p-6 text-slate-600">No users found.</div>
                    ) : (
                        rows.map((r, i) => {
                            const rank = i + 1;
                            return (
                                <div
                                    key={r.uid}
                                    className="flex items-center justify-between border-b last:border-b-0 px-6 py-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 text-lg font-bold text-slate-900 dark:text-slate-100">
                                            {rankIcon(rank)}
                                        </div>

                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                                                {r.displayName}
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-100">
                                                Level {r.level} • {r.missionsCompleted} missions
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="font-semibold text-slate-900 dark:text-slate-100">{r.xp} XP</div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>


            </div>
        </div>
    );
}
