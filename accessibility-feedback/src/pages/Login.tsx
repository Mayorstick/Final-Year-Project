import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";


function usePrefersReducedMotion() {
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

export default function Login() {
    const reducedMotion = usePrefersReducedMotion();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const inputClass =
        "mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500";
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/personas");
        } catch (err: any) {
            setError(err?.message ?? "Login failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row items-center justify-center px-4">
            {/* Left - Decorative Animation */}
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

                <h1 className="text-4xl font-bold mt-4">Welcome!</h1>
                <p className="text-slate-600 mt-2 text-center px-4">
                    Learn to make the web accessible for everyone.
                </p>
            </div>


            {/* Right - Login Form */}
            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
                    <h2 className="text-3xl font-bold">Welcome Back!</h2>
                    <p className="text-slate-600 mt-2">
                        Login to continue learning about web accessibility.
                    </p>
                    {error && (
                        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 active:bg-green-800      
                             transition"
                            disabled={loading}


                        >

                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <div className="flex flex-col items-center gap-2 mt-2 text-sm text-slate-600">

                            <button type="button" className="text-blue-600 hover:underline" onClick={() => navigate("/forgot-password")}>
                                Forgot Password?
                            </button>
                            <p>Don’t have an account?</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 active:bg-yellow-600 transition"
                        >
                            Sign Up
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
}