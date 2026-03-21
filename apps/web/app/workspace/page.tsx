"use client";

import { authFacade } from "@/src/core/auth/auth.facade";

export default function WorkspacePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold">Welcome to your Workspace</h1>
            <div>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => authFacade.signOut()}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}