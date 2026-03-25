import { SignInRequest, SignUpRequest } from "@/src/api/models/auth.request";
import { server } from "@/src/api/server";
import { AuthSession } from "@/src/authentication/types/auth.types";
import { SignInActorEvents, SignUpActorEvents, VerifyEmailActorEvents } from "@/src/types/states/auth/auth.actors";
import { AuthRegistration } from "@/src/types/states/auth/auth.machine";
import { createCallback } from "@/src/authentication/utils/create-callback";
import { fromPromise } from "xstate";

export const hydrateAuthActor = fromPromise<
    AuthSession | null
>(
    async () => {
        if (typeof window === "undefined") return null;

        const raw = localStorage.getItem("auth");
        if (!raw) {
            throw new Error("No auth data found in localStorage");
        }

        try {
            return JSON.parse(raw) as AuthSession;
        } catch {
            throw new Error("Failed to parse auth data from localStorage");
        }
    }
);

export const hydrateRegistrationActor = fromPromise<
    AuthRegistration | null
>(
    async () => {
        if (typeof window === "undefined") return null;

        const raw = localStorage.getItem("registration");
        if (!raw) throw new Error("No registration data found in localStorage");

        try {
            return JSON.parse(raw) as AuthRegistration;
        } catch {
            throw new Error("Failed to parse registration data from localStorage");
        }
    }
);

export const signInActor = createCallback<
    SignInRequest, SignInActorEvents
>(
    ({ input, sendBack }) => {
        server.auth.signIn(input)
            .then(response => {
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

export const signUpActor = createCallback<
    SignUpRequest, SignUpActorEvents
>(
    ({ input, sendBack }) => {
        server.auth.signUp(input)
            .then(() => {
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

export const verifyEmailActor = createCallback<
    AuthRegistration | null, VerifyEmailActorEvents
>(
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

        if(Date.now() > registration.expiredAt) {
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

        const authData = JSON.parse(authRaw) as AuthSession;

        sendBack({ 
            type: 'VERIFY_EMAIL_SUCCESS',
            accessToken: authData.accessToken,
            profile: authData.profile,
        });
    }
);