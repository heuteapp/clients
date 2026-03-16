import { useMemo } from "react";
import { AuthManager } from "@/src/ui/types/auth/auth.manager";
import { useAuthStore } from "@/src/stores/auth.store";
import { AuthState, AuthActions } from "@/src/core/types/auth/auth.store";

export function useAuthManager(): AuthManager {
    const { 
        accessToken, 
        profile, 
        signIn: localSignIn, 
        signOut: localSignOut, 
        hydrate: localHydrate 
    } = useAuthStore();

    const state: AuthState = useMemo(() => ({
        accessToken,
        profile,
    }), [accessToken, profile]);

    const actions: AuthActions = useMemo(() => ({
        signIn: (token: string, userProfile: any) => {
            localSignIn(token, userProfile)
        },
        signOut: () => {
            localSignOut();
        },
        hydrate: () => localHydrate(),
    }), [localSignIn, localSignOut, localHydrate]);

    return useMemo<AuthManager>(() => ({ state, actions }), [state, actions]);
}