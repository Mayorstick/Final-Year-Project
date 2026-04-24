import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

type Persona = {
    id: "screenReader" | "lowVision" | "keyboard";
    name: string;
    description: string;
    avatarUrl: string;
};

const PERSONAS: Persona[] = [
    {
        id: "screenReader",
        name: "Amina",
        description: "Uses a screen reader to navigate forms, links, and headings.",
        avatarUrl: "https://i.pravatar.cc/100?img=47",
    },
    {
        id: "lowVision",
        name: "Daniel",
        description: "Needs strong contrast, readable text, and clear focus states.",
        avatarUrl: "https://i.pravatar.cc/100?img=12",
    },
    {
        id: "keyboard",
        name: "Sofia",
        description: "Navigates without a mouse using Tab/Shift+Tab and Enter.",
        avatarUrl: "https://i.pravatar.cc/100?img=32",
    },
];

export default function PersonaSelection() {
    const navigate = useNavigate();
    const [saving, setSaving] = React.useState<string | null>(null);
    const [error, setError] = React.useState("");

    async function selectPersona(p: Persona) {
        console.log("current user", auth.currentUser)
        setError("");
        setSaving(p.id);

        try {
            const user = auth.currentUser;
            if (!user) throw new Error("You are not logged in.");

            await updateDoc(doc(db, "users", user.uid), {
                activePersonaId: p.id,
                activePersonaName: p.name,
                activePersonaAvatarUrl: p.avatarUrl,
            });

            navigate("/dashboard"); 
        } catch (e: any) {
            setError(e?.message ?? "Failed to save persona.");
        } finally {
            setSaving(null);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold">Choose a Persona</h1>
                <p className="text-slate-600 mt-2">
                    Pick who you want to design for. Missions will match their needs.
                </p>

                {error && (
                    <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PERSONAS.map((p) => (
                        <div key={p.id} className="bg-white border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <img
                                    src={p.avatarUrl}
                                    alt={`${p.name} avatar`}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-xs text-slate-500">{p.id}</p>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 mt-4">{p.description}</p>

                            <button
                                onClick={() => selectPersona(p)}
                                disabled={saving === p.id}
                                className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                            >
                                {saving === p.id ? "Saving..." : `Select ${p.name}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
