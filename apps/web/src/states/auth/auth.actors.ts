import { SignInRequest, SignUpRequest } from "@/src/api/models/auth.request";
import { server } from "@/src/api/server";
import { fromPromise } from "xstate";

export const signInActor = fromPromise<unknown, SignInRequest>(async ({ input }) => {
    try {
        return await server.auth.signIn(input);
    } 
    catch (err: any) {
        throw new Error(err?.message || "Unknown error from sign in");
    }
});

export const signUpActor = fromPromise<unknown, SignUpRequest>(async ({ input }) => {
    try {
        return await server.auth.signUp(input);
    } 
    catch (err: any) {
        throw new Error(err?.message || "Unknown error from sign up");
    }
});