import { useNavigate } from "react-router-dom";

type PersonaCard = {
    id: string;
    title: string;
    subtitle: string;
    avatarUrl?: string;
    status: "available" | "locked";
    ctaLabel: string;
    onClick?: () => void;
};

type Props = {
    activePersonaId: string | null;
    activePersonaName: string | null;
    activePersonaAvatarUrl?: string;
};

function PersonaCardItem({ card }: { card: PersonaCard }) {
    const isLocked = card.status === "locked";

    return (
        <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-3">
                <img
                    src={card.avatarUrl ?? "https://i.pravatar.cc/80?img=47"}
                    alt={`${card.title} avatar`}
                    className="h-10 w-10 rounded-full object-cover"
                />
                <div className="leading-tight">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {card.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {card.subtitle}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={card.onClick}
                disabled={isLocked}
                className={[
                    "w-full rounded-xl py-3 font-semibold transition",
                    isLocked
                        ? "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                        : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
                ].join(" ")}
            >
                {card.ctaLabel}
            </button>
        </div>
    );
}

export default function PersonaCardsRow({
    activePersonaId,
    activePersonaName,
    activePersonaAvatarUrl,
}: Props) {
    const navigate = useNavigate();

    if (!activePersonaId) {
        return (
            <div className="rounded-2xl border bg-white p-6 dark:bg-slate-800 dark:border-slate-700">
                <p className="font-semibold text-slate-700 dark:text-slate-200">
                    No persona selected yet.
                </p>
                <button
                    className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    onClick={() => navigate("/personas")}
                >
                    Select a Persona
                </button>
            </div>
        );
    }

    const subtitleMap: Record<string, string> = {
        screenReader: "Screen reader user",
        lowVision: "Low vision user",
        keyboard: "Keyboard-only user",
    };

    const card: PersonaCard = {
        id: activePersonaId,
        title: activePersonaName ?? "Active persona",
        subtitle: subtitleMap[activePersonaId] ?? activePersonaId,
        avatarUrl: activePersonaAvatarUrl,
        status: "available",
        ctaLabel: "View Mission",
        onClick: () => navigate("/mission"),
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            <PersonaCardItem card={card} />
        </div>
    );
}