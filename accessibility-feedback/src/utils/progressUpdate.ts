import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { MISSIONS } from "../data/missions";
import type { PersonaId } from "../data/missions";
export type BadgeId =
  | "first-fix-permit"
  | "code-contributor"
  | "mission-master";

type AwardBadgesParams = {
  totalIssuesFixedAfter?: number;
  missionsCompletedAfter?: number;
};

export function computeBadgesToAdd(params: AwardBadgesParams): BadgeId[] {
  const badges: BadgeId[] = [];

  const fixed = params.totalIssuesFixedAfter ?? 0;
  const missions = params.missionsCompletedAfter ?? 0;

  if (fixed >= 1) badges.push("first-fix-permit");
  if (fixed >= 5) badges.push("code-contributor");
  if (missions >= 3) badges.push("mission-master");

  return badges;
}

export async function awardIssueCompletion(params: {
  uid: string;
  issueId: string;
  xpReward: number;
  prevTotalIssuesFixed: number;
}) {
  const { uid, issueId, xpReward, prevTotalIssuesFixed } = params;

  const newTotalIssuesFixed = prevTotalIssuesFixed + 1;
  const badgesToAdd = computeBadgesToAdd({
    totalIssuesFixedAfter: newTotalIssuesFixed,
  });

  const userRef = doc(db, "users", uid);

  const payload: any = {
    xp: increment(xpReward),
    totalIssuesFixed: increment(1),
    completedIssues: arrayUnion(issueId),
  };

  if (badgesToAdd.length) payload.badges = arrayUnion(...badgesToAdd);

  await updateDoc(userRef, payload);
}

type Params = {
  uid: string;
  missionId: string;
  missionBonusXp: number;
  prevMissionsCompleted: number;
  prevXp: number;
  levelXpTarget: number;
};

export async function awardMissionCompletion(params: Params) {
  const { uid, missionId, missionBonusXp, prevXp, levelXpTarget } = params;

  // ✅ Find personaId from the missionId
  const mission = MISSIONS.find((m) => m.id === missionId);
  const personaId: PersonaId | null = mission?.personaId ?? null;

  const newXp = prevXp + missionBonusXp;
  const newLevel = Math.floor(newXp / levelXpTarget) + 1;

  const userRef = doc(db, "users", uid);

  const updatePayload: any = {
    xp: newXp,
    level: newLevel,
    missionsCompleted: increment(1),
    completedMissions: arrayUnion(missionId),
  };

  // ✅ NEW: add persona XP if we can identify persona
  if (personaId) {
    updatePayload[`xpByPersona.${personaId}`] = increment(missionBonusXp);
  }

  await updateDoc(userRef, updatePayload);
}
