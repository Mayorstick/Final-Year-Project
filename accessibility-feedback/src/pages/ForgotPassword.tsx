import React from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    async function handleReset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setStatus("");
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setStatus("Password reset email sent. Check your inbox (and spam).");
        } catch (err: any) {
            setError(err?.message ?? "Could not send reset email. Try again.");
        } finally {
            setLoading(false);
        }
    }

    const inputClass =
        "mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
                <h1 className="text-3xl font-bold">Forgot password?</h1>
                <p className="text-slate-600 mt-2">
                    Enter your email and we’ll send you a reset link.
                </p>

                {error && (
                    <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {status && (
                    <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                        {status}
                    </div>
                )}

                <form className="mt-6 space-y-4" onSubmit={handleReset}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={inputClass}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Send reset link"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
}