import { useEffect, useRef } from "react";
import { AuthManager, AuthManagerRef } from "@/src/ui/types/auth/auth.manager";
import { server } from "@/src/api/server";
import { SignInRequest } from "@/src/api/models/auth.request";
import { useAuthStore } from "@/src/stores/auth.store";

export function useAuthManager(): AuthManagerRef {
    const store = useAuthStore();
    const { 
        signIn: storeSignIn, 
        signOut: storeSignOut, 
        hydrate: storeHydrate
    } = store;

    const managerRef = useRef<AuthManager | null>(null);

    useEffect(() => {
        managerRef.current = {
            signIn: async (request: SignInRequest) => {
                await server.auth.signIn(request)
                    .then(response => {
                        const { accessToken, profile } = response.data;
                        storeSignIn(accessToken, profile);

                        if(typeof window !== "undefined") {
                            window.location.href = "/workspace/board/mihr";
                        }
                    })
                    .catch(error => {
                        console.error("Sign-in failed:", error);
                        throw error;
                    });
            },
            signUp: async (request) => {
                await server.auth.signUp(request)
                    .catch(error => {
                        console.error("Sign-up failed:", error);
                        throw error;
                    });
            },
            signOut: async () => {
                storeSignOut();
                if(typeof window !== "undefined") {
                    window.location.href = "/workspace/sign-in";
                }
            },
            hydrate: async () => {
                storeHydrate();
            }
        };
    }, [store]);

    return managerRef;
}