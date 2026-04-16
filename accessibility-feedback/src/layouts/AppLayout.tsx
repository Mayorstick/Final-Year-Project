import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import React from "react";
import WordExplainer from "../components/WordExplainer";

export default function AppLayout() {
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
        }
    }, []);

    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="max-w-6xl mx-auto px-6 py-6">
                <Outlet />
            </main>
            <WordExplainer />
        </div>
    );
}