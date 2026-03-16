"use client";

import { AuthContext } from "@/src/ui/contexts/auth.context";
import { useAuthRuntime } from "../hooks/useAuthRuntime";
import { AuthProviderProps } from "../types/auth/auth.props";

export function AuthProvider({ children }: AuthProviderProps) {
    const context = useAuthRuntime();

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}