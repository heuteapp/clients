import { heuteApi } from "@/src/api/heuteApi";
import { SessionHydrateActorInput, SessionHydrateActorEvent, SignInActorEvent, SignInActorInput } from "../types/auth.actors";
import { createCallback } from "../utils/create-callback";
import { AuthSession } from "../types/auth.types";

export const hydrateSessionActor = createCallback<SessionHydrateActorInput, SessionHydrateActorEvent>(
    ({ input, sendBack }) => {
        if (typeof window === "undefined") {
            return sendBack({ 
                type: 'SESSION_HYDRATE_FAILURE',
                error: "Session hydration can only be performed in the browser",
            });
        }

        const raw = localStorage.getItem("session");
        if (!raw) {
            return sendBack({ 
                type: 'SESSION_HYDRATE_FAILURE',
                error: "No session data found in localStorage",
            });
        }
        
        const sessionData = JSON.parse(raw) as AuthSession;

        heuteApi.me.check()

        .then(profile => {
            return sendBack({ 
                type: 'SESSION_HYDRATE_SUCCESS',
                output: {
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

            localStorage.removeItem("session");
            return sendBack({ 
                type: 'SESSION_HYDRATE_FAILURE',
                error: error?.message || "Failed to hydrate session",
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
                    type: 'SIGN_IN_SUCCESS',
                    output: session,
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