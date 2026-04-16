import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";

export async function createUserDoc(user: User, fullName: string) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) return;

  await setDoc(ref, {
    uid: user.uid,
    displayName: fullName,
    email: user.email,
    createdAt: serverTimestamp(),

    xp: 0,
    level: 1,
    missionsCompleted: 0,
    aiMissionsCompleted: 0,
    totalIssuesFixed: 0,
    totalMissions: 6,

    completedMissions: [],
    completedIssues: [],
    badges: [],

    activePersonaId: null,
    activePersonaName: null,
    activePersonaAvatarUrl: null,

    xpByPersona: {
      lowVision: 0,
      screenReader: 0,
      keyboard: 0,
    },
  });
}
