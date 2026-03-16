import { useMemo } from "react";
import { AuthStoreController } from "@/src/ui/types/auth/auth.store";
import { useAuthStore } from "@/src/stores/auth.store";
import { AuthState, AuthActions } from "@/src/core/types/auth/auth.store";

export function useAuthStoreController(): AuthStoreController {
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
        signIn: (accessToken, profile) => localSignIn(accessToken, profile),
        signOut: () => localSignOut(),
        hydrate: () => localHydrate()
    }), [localSignIn, localSignOut, localHydrate]);

    return useMemo<AuthStoreController>(() => ({ state, actions }), [state, actions]);
}