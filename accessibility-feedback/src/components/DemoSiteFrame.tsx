type DemoSiteFrameProps = {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
};

export default function DemoSiteFrame({
    title = "Happy Cycle Co.",
    subtitle = "Demo store preview",
    children,
}: DemoSiteFrameProps) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm min-h-[520px]">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-slate-900 break-words">
                        {title}
                    </h2>
                    <p className="text-sm text-slate-600 break-words">{subtitle}</p>
                </div>

                {/* Nav */}
                <nav
                    aria-label="Demo site navigation"
                    className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600"
                >
                    <button type="button" className="hover:underline">Shop</button>
                    <button type="button" className="hover:underline">Deals</button>
                    <button type="button" className="hover:underline">Contact</button>
                </nav>
            </div>

            {/* Body */}
            <div className="mt-5">{children}</div>
        </div>
    );
}