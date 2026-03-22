"use client";

import { useEffect, useState } from "react";
import { authService, isUnauthenticated, isSigningIn, isSigningUp, isAwaitingVerification, isAuthenticated, isVerifySuccessed } from "@/src/states/auth/auth.machine";
import { AuthContext } from "../contexts/auth.context";
import { usePathname, useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { send } from "process";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [state, setState] = useState(() => authService.getSnapshot());
    const searchParams = useSearchParams();

    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");

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
        if (tokenHash && type === "email" && isAwaitingVerification(state)) {
            authService.send({ 
                type: "VERIFY_EMAIL_COMPLETED", 
                accessToken: tokenHash,
                profile: null!
            });
        }
    }, [tokenHash, type, state]);

    useEffect(() => {
        const onSignInPage = pathname === "/workspace/sign-in";
        const onSignUpPage = pathname === "/workspace/sign-up";
        const onVerifycationPage = pathname === "/workspace/verification";

        if (isUnauthenticated(state) && pathname?.startsWith("/workspace")) {
            if (onSignInPage || onSignUpPage) {
                return;
            }

            router.push("/workspace/sign-in");
            return;
        }

        if(isAuthenticated(state)) {
            if(onSignInPage || onSignUpPage || onVerifycationPage) {
                router.push("/workspace");
                return;
            }
        }
        else {
            if(isVerifySuccessed(state) && !onVerifycationPage) {
                authService.send({ type: "VERIFY_EMAIL_FINISHED" });
                return;
            }

            if(pathname?.startsWith("/workspace")) {
                if(!onSignInPage && isSigningIn(state)) {
                    router.push("/workspace/sign-in");
                    return;
                }

                if(!onSignUpPage && isSigningUp(state)) {
                    router.push("/workspace/sign-up");
                    return;
                }

                if(!onVerifycationPage && isAwaitingVerification(state)) {
                    router.push("/workspace/verification");
                    return;
                }
            }
        }

    }, [router, pathname, state]);

    return (
        <AuthContext.Provider value={{ state, send: authService.send }}>
            {children}
        </AuthContext.Provider>
    );
}