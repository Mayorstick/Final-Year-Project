import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createUserDoc } from "../firebase/firestore";

function usePrefersReducedMotion(): boolean {
    const [reduced, setReduced] = React.useState(false);

    React.useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return reduced;
}

export default function Signup() {
    const navigate = useNavigate();
    const reducedMotion = usePrefersReducedMotion();

    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const inputClass =
        "mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500";

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCred.user, { displayName: fullName });

            await createUserDoc(userCred.user, fullName);
            await sendEmailVerification(userCred.user);

            navigate("/verify-email");
        } catch (err: any) {
            setError(err?.message ?? "Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row items-center justify-center px-4">
            <div className="flex-1 flex flex-col items-center justify-center">
                <div aria-hidden="true">
                    <DotLottieReact
                        src="https://lottie.host/1a161062-3515-4a3a-bb73-bbd1a29c594e/cvfyahufh6.lottie"
                        loop={!reducedMotion}
                        autoplay={!reducedMotion}
                        style={{ width: 400, height: 400 }}
                        tabIndex={-1}
                    />
                </div>

                <h1 className="text-4xl font-bold mt-4">Create Account</h1>
                <p className="text-slate-600 mt-2 text-center px-4">
                    Join and start improving web accessibility skills.
                </p>
            </div>

            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
                    <h2 className="text-3xl font-bold">Sign Up</h2>
                    <p className="text-slate-600 mt-2">Sign up to get started.</p>

                    {error && (
                        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="fullname" className="text-sm font-medium text-slate-700">
                                Full name
                            </label>
                            <input
                                id="fullname"
                                type="text"
                                placeholder="Your name"
                                className={inputClass}
                                autoComplete="name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className={inputClass}
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className={inputClass}
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 active:bg-yellow-600 transition disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Sign Up"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 active:bg-green-800 transition"
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}