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

        const onSignInPage = pathname === "/workspace/sign-in";
        const onSignUpPage = pathname === "/workspace/sign-up";

        if (state.matches("unauthenticated") && pathname?.startsWith("/workspace")) {
            if (onSignInPage || onSignUpPage) {
                return;
            }

            router.push("/workspace/sign-in");
            return;
        }

        if(onSignInPage && isSigningUp) {
            router.push("/workspace/sign-up");
        }

        if(onSignUpPage && isSigningIn) {
            router.push("/workspace/sign-in");
        }
    }, [router, pathname, state]);

    return (
        <AuthContext.Provider value={{ state, send: authService.send }}>
            {children}
        </AuthContext.Provider>
    );
}