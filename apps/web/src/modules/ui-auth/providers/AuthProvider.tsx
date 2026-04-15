"use client";

import { useEffect, useState } from "react";
import { authService } from "@/src/modules/auth/state/auth.machine";
import { AuthContext } from "@/src/modules/ui-auth/contexts/auth.context";
import { usePathname, useRouter } from "next/navigation";
import { useAuthHashParams } from "@/src/modules/ui-auth/hooks/useAuthHashParams";
import { AuthProviderProps } from "@/src/modules/ui-auth/types/auth.props";

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const [state, setState] = useState(() => authService.getSnapshot());  
    const authHash = useAuthHashParams();

    const onSignInPage = pathname === "/workspace/sign-in";
    const onSignUpPage = pathname === "/workspace/sign-up";
    const onVerifycationPage = pathname === "/workspace/verification";

    useEffect(() => {
        setIsClient(true);
        authService.start();

        const subscription = authService.subscribe((newState) => {
            setState(newState);
        });
        
        return () =>  {
            subscription.unsubscribe();
            authService.stop(); 
        }
    }, []);

    /*useEffect(() => {
        const verify = async () => {
            if(!authHash || !authHash.refresh_token) {
                return;
            }

            try {
                await heuteApi.auth.refresh();

                const profile = await withAccessToken(authHash.access_token, async () => {
                    return await heuteApi.me.check();
                });

                if(!profile) {
                    throw new Error("Profil information could not be retrieved after email verification.");
                }

                authService.send({ 
                    type: "VERIFY_EMAIL_COMPLETED", 
                    accessToken: authHash.access_token,
                    profile
                });
            } catch (err) {
                console.error("Email verification errorı:", err);
            }
        };

        if(onVerifycationPage && isAwaitingVerification(state)) {
            verify();
        }
    }, [authHash?.access_token, authHash?.refresh_token, state]);

    useEffect(() => {
        if (isUnauthenticated(state) && pathname?.startsWith("/workspace")) {
            if (onSignInPage || onSignUpPage) {
                return;
            }

            window.location.href = "/workspace/sign-in";
            return;
        }

        if(isAuthenticated(state)) {
            if(onSignInPage || onSignUpPage || onVerifycationPage) {
                window.location.href = "/workspace/dailyboard";
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

                    if(onSignUpPage) {
                        router.push("/workspace/sign-in");
                    }
                    else {
                        window.location.href = "/workspace/sign-in";
                    }
                    return;
                }

                if(!onSignUpPage && isSigningUp(state)) {
                    if(onSignInPage) {
                        router.push("/workspace/sign-up");
                    }
                    else {
                        window.location.href = "/workspace/sign-up";
                    }
                    return;
                }

                if(!onVerifycationPage && isAwaitingVerification(state)) {
                    window.location.href = "/workspace/verification";
                    return;
                }
            }
        }

    }, [router, pathname, state]);*/

    return (
        <AuthContext.Provider value={{ state, send: authService.send }}>
            {isClient && JSON.stringify(state.value)}
            {children}
        </AuthContext.Provider>
    );
}