import { SignInRequest } from "@/src/api/models/auth.request";
import { server } from "@/src/api/server";
import { fromPromise } from "xstate";

export const signInActor = fromPromise<unknown, SignInRequest>(async ({ input }) => {
    try {
        return await server.auth.signIn(input);
    } 
    catch (err: any) {
        throw new Error(err?.message || "Unknown error");
    }
});