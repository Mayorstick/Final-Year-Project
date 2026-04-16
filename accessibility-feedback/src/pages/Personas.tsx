import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";

type Persona = {
    id: string;
    name: string;
    tag: string;
    description: string;
    avatarUrl: string;
    videoUrl?: string;
    scenario?: string;
    challenge?: string;
    learningPoint?: string;
};

const PERSONAS: Persona[] = [
    {
        id: "screenReader",
        name: "Amina",
        tag: "Screen reader user",
        description:
            "Navigates the web using a screen reader. Needs proper labels, headings, and meaningful alt text.",
        avatarUrl: "https://i.pravatar.cc/150?img=47",
        videoUrl: "/videos/amina-screenreader.mp4",
        scenario:
            "Amina explores a website using a screen reader and depends on spoken feedback to understand buttons, links, and page structure.",
        challenge:
            "If labels are unclear or headings are missing, the content becomes confusing and harder to navigate.",
        learningPoint:
            "Screen reader users rely on meaningful labels, alt text, and clear page structure to understand content.",
    },
    {
        id: "lowVision",
        name: "Moses",
        tag: "Low vision user",
        description:
            "Needs readable text, strong contrast, resizable UI, and clear focus states.",
        avatarUrl: "https://i.pravatar.cc/150?img=12",
        videoUrl: "/videos/moses-lowvision.mp4",
        scenario:
            "Moses reads websites with enlarged text and depends on clear contrast and spacing to follow information comfortably.",
        challenge:
            "If text is too small or colours blend together, reading important content becomes tiring and frustrating.",
        learningPoint:
            "Low vision users need readable text, strong contrast, and layouts that still work clearly when zoomed.",
    },
    {
        id: "keyboard",
        name: "Tola",
        tag: "Keyboard-only user",
        description:
            "Navigates without a mouse. Needs logical tab order and visible focus.",
        avatarUrl: "https://i.pravatar.cc/150?img=20",
        videoUrl: "/videos/tola-keyboard.mp4",
        scenario:
            "Tola is completing a website form using only the keyboard. She moves through buttons, links, and fields without using a mouse.",
        challenge:
            "If focus indicators are missing or the tab order jumps around, she can lose track of where she is on the page.",
        learningPoint:
            "Keyboard users depend on visible focus states and logical tab order to navigate confidently.",
    },
    {
        id: "sunlight",
        name: "Jake",
        tag: "Situational: bright sunlight",
        description:
            "Uses a phone outdoors in bright sunlight. Needs strong contrast, clear buttons, and readable text.",
        avatarUrl: "https://i.pravatar.cc/150?img=33",
        videoUrl: "/videos/jake-sunlight.mp4",
        scenario:
            "Jake is checking a website outside on a sunny day, but glare makes the screen harder to read.",
        challenge:
            "If contrast is weak or buttons are too subtle, important content becomes difficult to see.",
        learningPoint:
            "Situational barriers like sunlight can make low-contrast interfaces hard for anyone to use.",
    },

];

export default function Personas() {
    const navigate = useNavigate();
    const { profile, loading, error } = useUserProfile();

    const [savingId, setSavingId] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState("");

    if (loading) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Loading personas…</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    if (!profile) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">No profile data.</div>;
    }

    const activeId = profile.activePersonaId;

    async function setActivePersona(persona: Persona) {
        const user = auth.currentUser;
        if (!user) return;

        setMessage("");
        setSavingId(persona.id);

        try {
            await updateDoc(doc(db, "users", user.uid), {
                activePersonaId: persona.id,
                activePersonaName: persona.name,
                activePersonaAvatarUrl: persona.avatarUrl,
            });

            setMessage(`Active persona set to ${persona.name}.`);
            navigate("/dashboard");
        } catch (e: any) {
            setMessage(e?.message ?? "Failed to update persona.");
        } finally {
            setSavingId(null);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Choose a Persona
                        </h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Select a user type to experience accessibility issues from their perspective.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl border bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                        Back to Dashboard
                    </button>
                </div>

                {message && (
                    <div className="mt-6 rounded-xl border bg-white p-4 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                        {message}
                    </div>
                )}

                <div className="mt-8 space-y-6">
                    {PERSONAS.map((p) => {
                        const isActive = p.id === activeId;
                        const isSaving = savingId === p.id;
                        const isEnhanced =
                            !!p.videoUrl || !!p.scenario || !!p.challenge || !!p.learningPoint;

                        return (
                            <div
                                key={p.id}
                                className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700 ${isActive ? "ring-2 ring-blue-500" : ""
                                    }`}
                            >
                                {isEnhanced && p.videoUrl && (
                                    <div className="mb-4 overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-900 dark:border-slate-700">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="aspect-video w-full object-cover"
                                        >
                                            <source src={p.videoUrl} type="video/mp4" />
                                        </video>
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <img
                                        src={p.avatarUrl}
                                        alt={`${p.name} avatar`}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                            {p.name}{" "}
                                            {isActive && (
                                                <span className="ml-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                                    ACTIVE
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {p.tag}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                    {p.description}
                                </p>

                                {isEnhanced && (
                                    <>
                                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:bg-slate-900 dark:border-slate-700">
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                                Scenario
                                            </p>
                                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                                {p.scenario}
                                            </p>
                                        </div>

                                        <div className="mt-3 rounded-xl border border-yellow-200 bg-yellow-50 p-3 dark:bg-yellow-900/20 dark:border-yellow-700">
                                            <p className="text-xs font-bold uppercase tracking-wide text-yellow-800 dark:text-yellow-300">
                                                Challenge
                                            </p>
                                            <p className="mt-1 text-sm text-yellow-900 dark:text-yellow-200">
                                                {p.challenge}
                                            </p>
                                        </div>

                                        <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3 dark:bg-blue-900/20 dark:border-blue-700">
                                            <p className="text-xs font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300">
                                                What this teaches
                                            </p>
                                            <p className="mt-1 text-sm text-blue-900 dark:text-blue-200">
                                                {p.learningPoint}
                                            </p>
                                        </div>
                                    </>
                                )}

                                <button
                                    onClick={() => setActivePersona(p)}
                                    disabled={isSaving}
                                    className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${isActive
                                        ? "cursor-default bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        } ${isSaving ? "opacity-60" : ""}`}
                                >
                                    {isActive
                                        ? "Selected"
                                        : isSaving
                                            ? "Saving…"
                                            : isEnhanced
                                                ? `Experience ${p.name}'s Perspective`
                                                : "Select Persona"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}