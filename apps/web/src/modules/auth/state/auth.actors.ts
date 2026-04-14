import { SignInRequest, SignUpRequest } from "@/src/api/models/requests/auth.request";
import { heuteApi } from "@/src/api/heuteApi";
import { AuthSession } from "@/src/modules/auth/types/auth.types";
import { SignInActorEvents, SignUpActorEvents, VerifyEmailActorEvents } from "@/src/modules/auth/types/auth.actors";
import { AuthRegistration } from "@/src/modules/auth/types/auth.types";
import { createCallback } from "@/src/modules/auth/utils/create-callback";
import { fromPromise } from "xstate";
import { withAccessToken } from "@/src/api/token.helper";

export const hydrateAuthActor = fromPromise<AuthSession | null>(      
    async () => {
        if (typeof window === "undefined") return null;

        const raw = localStorage.getItem("auth");
        if (!raw) {
            return null; // Hata fırlatma, null dön
        }

        let authSession: AuthSession;
        try {
            authSession = JSON.parse(raw) as AuthSession;
        } catch {
            localStorage.removeItem("auth");
            return null;
        }

        const accessToken = authSession.accessToken;
        
        if (!accessToken) {
            localStorage.removeItem("auth");
            return null;
        }

        try {
            const profile = await withAccessToken(accessToken, async () => {
                return await heuteApi.me.check();
            });
            
            if (!profile) {
                throw new Error("Profile not found");
            }
            
            return {
                ...authSession,
                profile,
            };
        } catch (error: any) {
            console.error("Token validation failed:", error);
            
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                try {
                    console.log("Attempting to refresh token...");
                    const { accessToken: newAccessToken } = await heuteApi.auth.refresh();
                    
                    const profile = await withAccessToken(newAccessToken, async () => {
                        return await heuteApi.me.check();
                    });
                    
                    if (profile) {
                        const newSession = {
                            accessToken: newAccessToken,
                            profile,
                        };
                        localStorage.setItem("auth", JSON.stringify(newSession));
                        console.log("Token refresh successful");
                        return newSession;
                    }
                } catch (refreshError: any) {
                    console.error("Refresh failed:", refreshError);
                    localStorage.removeItem("auth");
                    return null;
                }
            }
            
            localStorage.removeItem("auth");
            return null;
        }
    }
);

export const hydrateRegistrationActor = fromPromise<AuthRegistration | null>(
    async () => {
        if (typeof window === "undefined") return null;

        const raw = localStorage.getItem("registration");
        if (!raw) return null;

        try {
            return JSON.parse(raw) as AuthRegistration;
        } catch {
            localStorage.removeItem("registration");
            return null;
        }
    }
);

export const signInActor = createCallback<SignInRequest, SignInActorEvents>(
    ({ input, sendBack }) => {
        heuteApi.auth.signIn(input)
            .then(response => {
                const session = {
                    accessToken: response.accessToken,
                    profile: response.profile,
                };
                localStorage.setItem("auth", JSON.stringify(session));
                
                sendBack({ 
                    type: 'SIGN_IN_SUCCESS',
                    accessToken: response.accessToken,
                    profile: response.profile,
                });
            })
            .catch((err: any) => {
                sendBack({ 
                    type: 'SIGN_IN_FAILURE', 
                    error: err?.message || "Unknown error from sign in" 
                });
            });
    }
);

export const signUpActor = createCallback<SignUpRequest, SignUpActorEvents>(
    ({ input, sendBack }) => {
        heuteApi.auth.signUp(input)
            .then((response) => {
                const registration: AuthRegistration = {
                    email: input.email,
                    expiredAt: Date.now() + 24 * 60 * 60 * 1000,
                };
                localStorage.setItem("registration", JSON.stringify(registration));
                
                sendBack({ 
                    type: 'SIGN_UP_SUCCESS',
                    email: input.email,
                });
            })
            .catch((err: any) => {
                sendBack({ 
                    type: 'SIGN_UP_FAILURE', 
                    error: err?.message || "Unknown error from sign up" 
                });
            });
    }
);

export const verifyEmailActor = createCallback<AuthRegistration | null, VerifyEmailActorEvents>(
    ({ input, sendBack }) => {
        const registration = input;

        if (!registration) {
            sendBack({ 
                type: 'VERIFY_EMAIL_FAILED', 
                error: "No registration data available for verification" 
            });
            return;
        }

        if (typeof window === "undefined") {
            sendBack({ 
                type: 'VERIFY_EMAIL_FAILED', 
                error: "Verification can only be performed in the browser" 
            });
            return;
        }

        if (Date.now() > registration.expiredAt) {
            localStorage.removeItem("registration");
            sendBack({ 
                type: 'VERIFY_EMAIL_EXPIRED', 
                email: registration.email,
            });
            return;
        }

        const authRaw = localStorage.getItem("auth");
        if (!authRaw) {
            sendBack({ 
                type: 'VERIFY_EMAIL_FAILED', 
                error: "No auth data found in localStorage for verification" 
            });
            return;
        }

        let authData: AuthSession;
        try {
            authData = JSON.parse(authRaw) as AuthSession;
        } catch {
            sendBack({ 
                type: 'VERIFY_EMAIL_FAILED', 
                error: "Failed to parse auth data" 
            });
            return;
        }

        if (!authData.accessToken || !authData.profile) {
            sendBack({ 
                type: 'VERIFY_EMAIL_FAILED', 
                error: "Invalid auth data: missing token or profile" 
            });
            return;
        }

        localStorage.removeItem("registration");

        sendBack({ 
            type: 'VERIFY_EMAIL_SUCCESS',
            accessToken: authData.accessToken,
            profile: authData.profile,
        });
    }
);