import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

type NavbarProps = {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const linkBase =
    "px-2 py-1 font-medium text-slate-700 hover:text-blue-600 transition dark:text-slate-200 dark:hover:text-yellow-300";

const linkActive = "text-blue-600 underline underline-offset-8 dark:text-yellow-300";

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [avatarOpen, setAvatarOpen] = React.useState(false);

    const user = auth.currentUser;
    const initials =
        user?.displayName?.trim()?.charAt(0).toUpperCase() ||
        user?.email?.trim()?.charAt(0).toUpperCase() ||
        "U";

    async function handleLogout() {
        await signOut(auth);
        navigate("/login");
    }

    return (
        <header className="sticky top-0 z-50 bg-[#F4F7FC]/60 shadow-md backdrop-blur-sm dark:bg-slate-950/80">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                    Accessibility Explainer
                </div>

                <nav className="hidden md:flex items-center gap-10">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/mission"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                    >
                        Mission
                    </NavLink>

                    <NavLink
                        to="/personas"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                    >
                        Personas
                    </NavLink>

                    <NavLink
                        to="/resources"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                    >
                        Resources
                    </NavLink>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDarkMode((prev) => !prev)}
                        className="rounded-xl border bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        onClick={() => {
                            setMenuOpen((v) => !v);
                            setAvatarOpen(false);
                        }}
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-slate-700 dark:text-slate-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => {
                                setAvatarOpen((v) => !v);
                                setMenuOpen(false);
                            }}
                            className="w-10 h-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center shadow-sm"
                            aria-haspopup="menu"
                            aria-expanded={avatarOpen}
                        >
                            {initials}
                        </button>

                        {avatarOpen && (
                            <div
                                className="absolute right-0 mt-3 w-48 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700 shadow-lg overflow-hidden"
                                role="menu"
                            >
                                <div className="px-4 py-3 border-b dark:border-slate-700">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                        {user?.displayName || "User"}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {user?.email || ""}
                                    </p>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100"
                                    role="menuitem"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {menuOpen && (
                <nav className="md:hidden bg-[#F4F7FC]/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md flex flex-col items-center gap-4 py-4 border-t border-slate-200 dark:border-slate-800">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/mission"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Mission
                    </NavLink>
                    <NavLink
                        to="/personas"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Personas
                    </NavLink>
                    <NavLink
                        to="/resources"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Resources
                    </NavLink>
                </nav>
            )}
        </header>
    );
}