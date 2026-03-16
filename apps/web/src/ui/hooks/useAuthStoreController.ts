import { useEffect, useRef } from "react";
import { AuthStoreController, AuthStoreContent } from "@/src/ui/types/auth/auth.store";
import { useAuthStore } from "@/src/stores/auth.store";

export function useAuthStoreController(): AuthStoreController {
    const {
        accessToken,
        profile,
        signIn,
        signOut,
        hydrate
    } = useAuthStore();

    const controllerRef = useRef<AuthStoreContent | null>(null);

    useEffect(() => {
        controllerRef.current = {
            accessToken,
            profile,
            signIn,
            signOut,
            hydrate
        };
    }, [accessToken, profile, signIn, signOut, hydrate]);

    return controllerRef;
}