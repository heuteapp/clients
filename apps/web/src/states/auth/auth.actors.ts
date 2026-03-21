import { SignInRequest, SignUpRequest } from "@/src/api/models/auth.request";
import { server } from "@/src/api/server";
import { AuthData } from "@/src/types/core/auth/auth.data";
import { SignInActorEvents, SignUpActorEvents } from "@/src/types/states/auth/auth.actors";
import { AuthRegistration } from "@/src/types/states/auth/auth.machine";
import { createCallback } from "@/src/utils/xstate/create-callback";
import { fromPromise } from "xstate";

export const hydrateAuthActor = fromPromise<
    AuthData | null
>(
    async () => {
        if (typeof window === "undefined") return null;

        const raw = localStorage.getItem("auth");
        if (!raw) {
            throw new Error("No auth data found in localStorage");
        }

        try {
            return JSON.parse(raw) as AuthData;
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
                    type: 'SIGN_UP_AWAITING',
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