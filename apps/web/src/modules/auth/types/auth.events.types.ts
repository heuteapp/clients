import { AuthSession } from "./auth.types";

export type AuthEvent =
    | SessionHydrateEvent
    | SessionRefreshEvent;

export type SessionHydrateEvent = 
    | { type: 'SESSION_HYDRATE_REQUEST'; }
    | { type: 'SESSION_HYDRATE_SUCCESS'; output: AuthSession; }
    | { type: 'SESSION_HYDRATE_FAILURE'; error: string; }

export type SessionRefreshEvent =
    | { type: 'SESSION_REFRESH_REQUEST'; input: AuthSession; }
    | { type: 'SESSION_REFRESH_SUCCESS'; output: AuthSession; }
    | { type: 'SESSION_REFRESH_FAILURE'; error: string; }