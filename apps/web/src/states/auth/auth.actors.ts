import { SignInRequest, SignUpRequest } from "@/src/api/models/auth.request";
import { SignInResponse, SignUpResponse } from "@/src/api/models/auth.response";
import { server } from "@/src/api/server";
import { AuthState } from "@/src/core/types/auth/auth.store";
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

export const signInActor = fromPromise<SignInResponse, SignInRequest>(async ({ input }) => {
    try {
        return await server.auth.signIn(input);
    } 
    catch (err: any) {
        throw new Error(err?.message || "Unknown error from sign in");
    }
});

export const signUpActor = fromPromise<SignUpResponse, SignUpRequest>(async ({ input }) => {
    try {
        return await server.auth.signUp(input);
    } 
    catch (err: any) {
        throw new Error(err?.message || "Unknown error from sign up");
    }
});