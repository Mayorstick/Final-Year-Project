import React from "react";
import { Navigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { onAuthStateChanged, } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    if (loading) {
        return <div className="p-6">Checking authentication...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}