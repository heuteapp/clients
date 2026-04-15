import { SignInRequest, SignUpRequest } from "@/src/api/models/requests/auth.request";
import { AuthRegistration, AuthSession } from "./auth.types";

export type AuthEvent =
    | SessionHydrateEvent
    | SessionRefreshEvent
    | SignInEvent
    | SignUpEvent
    | SignOutEvent;

export type SessionHydrateEvent = 
    | { type: 'SESSION_HYDRATE_REQUEST'; }
    | { type: 'SESSION_HYDRATE_SUCCESS'; output: AuthSession; }
    | { type: 'SESSION_HYDRATE_FAILURE'; error: string; }

export type SessionRefreshEvent =
    | { type: 'SESSION_REFRESH_REQUEST'; input: AuthSession; }
    | { type: 'SESSION_REFRESH_SUCCESS'; output: AuthSession; }
    | { type: 'SESSION_REFRESH_FAILURE'; error: string; }

export type SignInEvent =
    | { type: 'SIGN_IN_REQUEST'; input: SignInRequest; }
    | { type: 'SIGN_IN_SUCCESS'; output: AuthSession; }
    | { type: 'SIGN_IN_FAILURE'; error: string; }

export type SignUpEvent =
    | { type: 'SIGN_UP_REQUEST'; input: SignUpRequest; }
    | { type: 'SIGN_UP_SUCCESS'; output: AuthRegistration; }
    | { type: 'SIGN_UP_FAILURE'; error: string; }

export type SignOutEvent =
    | { type: 'SIGN_OUT_REQUEST'; }