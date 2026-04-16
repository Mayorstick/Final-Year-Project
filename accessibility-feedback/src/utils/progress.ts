import { MISSIONS } from "../data/missions";
import { ISSUES } from "../data/issue";
import type { PersonaId } from "../data/missions";

type ProfileLike = {
  completedMissions?: string[];
  activePersonaId?: PersonaId | null;
};

export function getPersonaMissions(personaId: PersonaId) {
  return MISSIONS.filter((m) => m.personaId === personaId);
}

export function isMissionUnlocked(params: {
  missionId: string;
  personaId: PersonaId;
  completedMissions: string[];
}) {
  const { missionId, personaId, completedMissions } = params;

  const personaMissions = getPersonaMissions(personaId);
  const idx = personaMissions.findIndex((m) => m.id === missionId);

  // not found? lock it
  if (idx === -1) return false;

  // first mission always unlocked
  if (idx === 0) return true;

  // others unlocked only if previous mission completed
  const prevMissionId = personaMissions[idx - 1].id;
  return completedMissions.includes(prevMissionId);
}

export function getNextMissionId(profile: ProfileLike) {
  const personaId = profile.activePersonaId;
  if (!personaId) return null;

  const completedMissions = Array.isArray(profile.completedMissions)
    ? profile.completedMissions
    : [];

  const personaMissions = getPersonaMissions(personaId);

  for (const m of personaMissions) {
    const unlocked = isMissionUnlocked({
      missionId: m.id,
      personaId,
      completedMissions,
    });

    if (unlocked && !completedMissions.includes(m.id)) return m.id;
  }

  return null;
}

export function getIssueCountForMission(missionId: string) {
  return ISSUES.filter((i) => i.missionId === missionId).length;
}
