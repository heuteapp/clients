import { SignInRequest, SignUpRequest } from "@/src/api/models/auth.request";
import { SignInResponse, SignUpResponse } from "@/src/api/models/auth.response";
import { server } from "@/src/api/server";
import { AuthState } from "@/src/core/types/auth/auth.state";
import { SignInActorEvents, SignUpActorEvents } from "@/src/types/states/auth/auth.actors";
import { fromPromise } from "xstate";

export const hydrateActor = fromPromise<AuthState | null>(async () => {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem("auth");
    if (!raw) return null;

    try {
        return JSON.parse(raw) as AuthState;
    } catch {
        return null;
    }
});

export const signInActor = fromPromise<SignInResponse, SignInRequest, SignInActorEvents>(async ({ input, emit }) => {
    try {
        const response = await server.auth.signIn(input);
        
        emit({ 
            type: 'SIGN_IN_SUCCESS', 
            accessToken: response.accessToken, 
            profile: response.profile 
        });
        
        return response;
    } 
    catch (err: any) {
        emit({ 
            type: 'SIGN_IN_FAILURE', 
            error: err?.message || "Unknown error from sign in" 
        });
        
        throw new Error(err?.message || "Unknown error from sign in");
    }
});

export const signUpActor = fromPromise<SignUpResponse, SignUpRequest, SignUpActorEvents>(async ({ input, emit }) => {
    try {
        const response = await server.auth.signUp(input);

        emit({ 
            type: 'SIGN_UP_AWAITING'
        });

        return response;
    }
    catch (err: any) {
        emit({ 
            type: 'SIGN_UP_FAILURE', 
            error: err?.message || "Unknown error from sign up" 
        });

        throw new Error(err?.message || "Unknown error from sign up");
    }
});