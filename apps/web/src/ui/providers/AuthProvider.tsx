"use client";

import { useEffect, useState } from "react";
import { authService } from "@/src/states/auth/auth.machine";
import { AuthContext } from "../contexts/auth.context";
import { usePathname, useRouter } from "next/dist/client/components/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [state, setState] = useState(() => authService.getSnapshot());
     
    useEffect(() => {
        authService.start();

        const subscription = authService.subscribe((newState) => {
            setState(newState);
        });
        
        return () =>  {
            subscription.unsubscribe();
            authService.stop(); 
        }
    }, []);

    useEffect(() => {
        const isAuthenticated = state.matches("authenticated");

        const isSigningIn = state.matches("signing in");
        const isSigningUp = state.matches("signing up") || state.matches("awaiting sign up");

        if (state.matches("unauthenticated") && pathname?.startsWith("/workspace")) {
            if (pathname === "/workspace/sign-in") {
                if (isSigningUp) {
                    router.push("/workspace/sign-up");
                }

                return;
            }

            if(pathname === "/workspace/sign-up") {
                if (isSigningIn) {
                    router.push("/workspace/sign-in");
                }

                return;
            }

            router.push("/workspace/sign-in");
        }
    }, [router, pathname, state]);

    return (
        <AuthContext.Provider value={{ state, send: authService.send }}>
            {children}
        </AuthContext.Provider>
    );
}