"use client";

import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";

export default function WorkspacePage() {
    const { send } = useAuthContext();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold">Welcome to your Workspace</h1>
            <div>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => send({ type: "SIGN_OUT" })}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}