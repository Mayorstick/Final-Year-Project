import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { PersonaId } from "../data/missions";
export type XpByPersona = {
    lowVision: number;
    screenReader: number;
    keyboard: number;

};

export type UserProfile = {
    displayName: string;
    email: string;
    xp: number;
    level: number;
    missionsCompleted: number;
    totalIssuesFixed: number;
    totalMissions: number;
    aiMissionsCompleted: number;

    activePersonaId: PersonaId | null;
    activePersonaName: string | null;
    activePersonaAvatarUrl?: string | null;

    completedMissions?: string[];
    completedIssues?: string[];
    badges?: string[];
    xpByPersona?: Partial<XpByPersona>;
};




const DEFAULT_PROFILE: UserProfile = {
    displayName: "",
    email: "",
    xp: 0,
    level: 1,
    missionsCompleted: 0,
    totalIssuesFixed: 0,
    totalMissions: 6,
    aiMissionsCompleted: 0,

    activePersonaId: null,
    activePersonaName: null,
    activePersonaAvatarUrl: null,

    completedMissions: [],
    completedIssues: [],
    badges: [],
    xpByPersona: {
        lowVision: 0,
        screenReader: 0,
        keyboard: 0,
    },
};

export function useUserProfile() {
    const [authUser, setAuthUser] = React.useState<User | null>(null);
    const [profile, setProfile] = React.useState<UserProfile | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");


    React.useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setAuthUser(u);

            if (!u) {
                setProfile(null);
                setError("");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            try {
                const snap = await getDoc(doc(db, "users", u.uid));

                if (!snap.exists()) {
                    setError("Profile not found in Firestore.");
                    setProfile(null);
                } else {
                    const data = snap.data() as Partial<UserProfile>;
                    setProfile({ ...DEFAULT_PROFILE, ...data });
                    console.log("PROFILE FROM FIRESTORE:", { ...DEFAULT_PROFILE, ...data });
                }
            } catch (e: any) {
                setError(e?.message ?? "Failed to load profile.");
                setProfile(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsub();
    }, []);

    return { authUser, profile, loading, error };

}