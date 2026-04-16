import BadgesCard from "../components/BadgesCard";
import ContinueJourneyCard from "../components/ContinueJoruneyCard";
import ProgressCard from "../components/ProgressCard";
import StatsCard from "../components/StatsCard";
import PersonaCardsRow from "../components/PersonaCardRow";
import EncouragementBanner from "../components/EncouragemnetBanner";
import { getNextMissionId } from "../utils/progress";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";

export default function Dashboard() {
    const { profile, loading, error } = useUserProfile();
    const navigate = useNavigate();

    if (loading) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    if (!profile) {
        return <div className="p-6 text-slate-900 dark:text-slate-100">No profile data.</div>;
    }

    const personaName = profile.activePersonaName ?? "Not selected";
    const personaAvatar = profile.activePersonaAvatarUrl ?? undefined;

    const XP_TARGET = 450;
    const nextMissionId = getNextMissionId(profile);

    const hasPersona = Boolean(profile.activePersonaId);
    const hasStartedMission = (profile.completedMissions?.length ?? 0) > 0;
    const hasNextMission = Boolean(nextMissionId);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* LEFT */}
                    <div className="space-y-6 lg:col-span-2">
                        <ProgressCard
                            levelLabel={`Level ${profile.level}`}
                            xpCurrent={profile.xp}
                            xpTarget={XP_TARGET}
                            totalMissionsDone={profile.missionsCompleted}
                            totalMissions={profile.totalMissions}
                            activePersonaName={personaName}
                            activePersonaAvatarUrl={personaAvatar}
                        />

                        <div className="flex justify-end">
                            <button
                                className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                onClick={() => navigate("/leaderboard")}
                            >
                                View Leaderboard 🏆
                            </button>
                        </div>

                        <ContinueJourneyCard
                            missionTitle={
                                !hasPersona
                                    ? "Choose your persona to begin"
                                    : hasNextMission
                                        ? hasStartedMission
                                            ? "Continue your journey"
                                            : "Start your first mission"
                                        : "All missions complete 🎉"
                            }
                            personaLine={
                                !hasPersona
                                    ? "Select a persona to unlock missions"
                                    : `Persona: ${personaName}`
                            }
                            avatarUrl={personaAvatar}
                            buttonLabel={
                                !hasPersona
                                    ? "Select Persona"
                                    : hasNextMission
                                        ? hasStartedMission
                                            ? "Continue Mission →"
                                            : "Start Mission →"
                                        : "Completed"
                            }
                            disabled={hasPersona && !hasNextMission}
                            onContinue={() => {
                                if (!hasPersona) {
                                    navigate("/personas");
                                    return;
                                }

                                if (!nextMissionId) return;

                                navigate(`/mission/${nextMissionId}/issue/1`);
                            }}
                        />

                        <PersonaCardsRow
                            activePersonaId={profile.activePersonaId}
                            activePersonaName={profile.activePersonaName}
                            activePersonaAvatarUrl={profile.activePersonaAvatarUrl ?? undefined}
                        />

                        <EncouragementBanner />
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        <BadgesCard
                            items={[
                                {
                                    title: "First Fix Permit",
                                    status: profile.totalIssuesFixed > 0 ? "earned" : "locked",
                                },
                                {
                                    title: "Code Contributor",
                                    status: profile.totalIssuesFixed >= 5 ? "earned" : "locked",
                                },
                                {
                                    title: "Mission Master",
                                    status: profile.missionsCompleted >= 3 ? "earned" : "locked",
                                },
                                {
                                    title: "AI Explorer",
                                    status: profile.aiMissionsCompleted >= 3 ? "earned" : "locked",
                                },
                            ]}
                        />

                        <StatsCard
                            missionsCompleted={profile.missionsCompleted}
                            totalMissions={profile.totalMissions}
                            issuesResolved={profile.totalIssuesFixed}
                            aiMissionsCompleted={profile.aiMissionsCompleted}
                            activePersonaName={profile.activePersonaName}
                            activePersonaAvatarUrl={profile.activePersonaAvatarUrl ?? undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}