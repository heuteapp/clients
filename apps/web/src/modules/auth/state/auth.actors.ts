import { heuteApi } from "@/src/api/heuteApi";
import { SessionHydrateActorInput, SessionHydrateActorEvent, SignInActorEvent, SignInActorInput, SessionRefreshActorInput, SessionRefreshActorEvent, SignUpActorEvent, SignUpActorInput, VerifyEmailActorEvent, VerifyEmailActorInput } from "../types/auth.actors";
import { createCallback } from "../utils/create-callback";
import { AuthRegistration, AuthSession } from "../types/auth.types";

export const hydrateSessionActor = createCallback<SessionHydrateActorInput, SessionHydrateActorEvent>(
    ({ input, sendBack }) => {
        if (typeof window === "undefined") {
            return sendBack({ 
                type: 'SESSION_HYDRATE_ERROR',
                error: "Session hydration can only be performed in the browser",
            });
        }

        const raw = localStorage.getItem("session");
        if (!raw) {
            return sendBack({ 
                type: 'SESSION_HYDRATE_ERROR',
                error: "No session data found in localStorage",
            });
        }
        
        const sessionData = JSON.parse(raw) as AuthSession;

        heuteApi.me.check()

        .then(profile => {
            return sendBack({ 
                type: 'SESSION_HYDRATE_DONE',
                payload: {
                    ...sessionData,
                    profile: profile!
                },
            });
        })

        .catch(error => {
            const newSessionHeader = error.response.headers["x-new-auth-session"];
            
            if (newSessionHeader) {
                const newSession = JSON.parse(newSessionHeader as string);

                return sendBack({ 
                    type: "SESSION_REFRESH_REQUEST",
                    input: newSession
                });
            }

            return sendBack({ 
                type: 'SESSION_HYDRATE_ERROR',
                error: error?.message || "Failed to hydrate session",
            });
        });
    }
);

export const refreshSessionActor = createCallback<SessionRefreshActorInput, SessionRefreshActorEvent>(
    ({ input, sendBack }) => {
        heuteApi.me.check()

        .then(profile => {
            const newSession = {
                ...input,
                profile: profile!,
            };

            return sendBack({ 
                type: 'SESSION_REFRESH_DONE',
                payload: newSession,
            });
        })

        .catch(error => {
            return sendBack({ 
                type: 'SESSION_REFRESH_ERROR',
                error: error?.message || "Failed to refresh session",
            });
        });
    }
);

export const signInActor = createCallback<SignInActorInput, SignInActorEvent>(
    ({ input, sendBack }) => {
        heuteApi.auth.signIn(input)
            .then(response => {
                const session = {
                    accessToken: response.accessToken,
                    profile: response.profile,
                };
                localStorage.setItem("session", JSON.stringify(session));
                
                sendBack({ 
                    type: 'SIGN_IN_DONE',
                    payload: session,
                });
            })
            .catch(error => {
                sendBack({ 
                    type: 'SIGN_IN_ERROR', 
                    error: error?.message || "Unknown error from sign in" 
                });
            });
    }
);

export const signUpActor = createCallback<SignUpActorInput, SignUpActorEvent>(
    ({ input, sendBack }) => {
        heuteApi.auth.signUp(input)
            .then(_ => {
                const registration : AuthRegistration = {
                    email: input.email,
                    expiredAt: 20 * 60 * 1000,
                };
                
                sendBack({ 
                    type: 'SIGN_UP_DONE',
                    payload: registration,
                });
            })
            .catch(error => {
                sendBack({ 
                    type: 'SIGN_UP_ERROR', 
                    error: error?.message || "Unknown error from sign up" 
                });
            });
    }
);

export const verifyEmailActor = createCallback<VerifyEmailActorInput, VerifyEmailActorEvent>(
    ({ input, sendBack }) => {
        const registration = input;

        if (!registration) {
            sendBack({ 
                type: 'VERIFY_EMAIL_ERROR', 
                error: "No registration data available for verification" 
            });
            return;
        }

        if (typeof window === "undefined") {
            sendBack({ 
                type: 'VERIFY_EMAIL_ERROR', 
                error: "Verification can only be performed in the browser" 
            });
            return;
        }

        if (Date.now() > registration.expiredAt) {
            localStorage.removeItem("registration");
            sendBack({ 
                type: 'VERIFY_EMAIL_EXPIRED'
            });
            return;
        }

        const authRaw = localStorage.getItem("auth");
        if (!authRaw) {
            sendBack({ 
                type: 'VERIFY_EMAIL_ERROR', 
                error: "No auth data found in localStorage for verification" 
            });
            return;
        }

        let authData: AuthSession;
        try {
            authData = JSON.parse(authRaw) as AuthSession;
        } catch {
            sendBack({ 
                type: 'VERIFY_EMAIL_ERROR', 
                error: "Failed to parse auth data" 
            });
            return;
        }

        if (!authData.accessToken || !authData.profile) {
            sendBack({ 
                type: 'VERIFY_EMAIL_ERROR', 
                error: "Invalid auth data: missing token or profile" 
            });
            return;
        }

        sendBack({ 
            type: 'VERIFY_EMAIL_DONE',
            payload: authData,
        });
    }
);