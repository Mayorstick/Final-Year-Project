import React from "react";
import { auth } from "../firebase/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState("");

    // ✅ If user already verified, auto-go dashboard
    React.useEffect(() => {
        if (auth.currentUser?.emailVerified) {
            navigate("/personaselection");
        }
    }, [navigate]);

    async function resendEmail() {
        if (!auth.currentUser) {
            setMessage("No user found. Please login again.");
            return;
        }
        await sendEmailVerification(auth.currentUser);
        setMessage("Verification email resent.");
    }

    async function checkVerification() {
        if (!auth.currentUser) {
            setMessage("No user found. Please login again.");
            return;
        }

        await auth.currentUser.reload();

        if (auth.currentUser.emailVerified) {
            navigate("/personas");
        } else {
            setMessage("Email not verified yet. Please check your inbox.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md border">
                <h1 className="text-2xl font-bold">Verify Your Email</h1>
                <p className="mt-3 text-slate-600">
                    A verification link has been sent to your email address.
                </p>

                {message && (
                    <div className="mt-4 text-sm text-blue-600">{message}</div>
                )}

                <div className="mt-6 space-y-3">
                    <button
                        onClick={checkVerification}
                        className="w-full bg-green-600 text-white py-3 rounded-xl"
                    >
                        I've Verified
                    </button>

                    <button
                        onClick={resendEmail}
                        className="w-full bg-yellow-400 py-3 rounded-xl"
                    >
                        Resend Email
                    </button>
                </div>
            </div>
        </div>
    );
}