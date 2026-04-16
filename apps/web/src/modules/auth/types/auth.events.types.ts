import { SignInRequest, SignUpRequest } from "@/src/api/models/requests/auth.request";
import { AuthRegistration, AuthSession } from "./auth.types";

export type AuthEvent =
    | RedirectEvent
    | SessionHydrateEvent
    | SessionRefreshEvent
    | SignInEvent
    | SignUpEvent
    | SignOutEvent;

//

export type RedirectEvent = { type: 'REDIRECT_REQUEST'; }

export type SessionHydrateEvent = 
    | SessionHydrateRequestEvent
    | SessionHydrateSuccessEvent
    | SessionHydrateFailureEvent;

export type SessionHydrateRequestEvent = { type: 'SESSION_HYDRATE_REQUEST'; }
export type SessionHydrateSuccessEvent = { type: 'SESSION_HYDRATE_SUCCESS'; output: AuthSession; }
export type SessionHydrateFailureEvent = { type: 'SESSION_HYDRATE_FAILURE'; error: string; }

//

export type SessionRefreshEvent =
    | SessionRefreshRequestEvent
    | SessionRefreshSuccessEvent
    | SessionRefreshFailureEvent;

export type SessionRefreshRequestEvent = { type: 'SESSION_REFRESH_REQUEST'; input: AuthSession; }
export type SessionRefreshSuccessEvent = { type: 'SESSION_REFRESH_SUCCESS'; output: AuthSession; }
export type SessionRefreshFailureEvent = { type: 'SESSION_REFRESH_FAILURE'; error: string; }

//

export type SignInEvent =
    | SignInRequestEvent
    | SignInSuccessEvent
    | SignInFailureEvent;

export type SignInRequestEvent = { type: 'SIGN_IN_REQUEST'; input: SignInRequest; }
export type SignInSuccessEvent = { type: 'SIGN_IN_SUCCESS'; output: AuthSession; }
export type SignInFailureEvent = { type: 'SIGN_IN_FAILURE'; error: string; }

//

export type SignUpEvent =
    | SignUpRequestEvent
    | SignUpSuccessEvent
    | SignUpFailureEvent;

export type SignUpRequestEvent = { type: 'SIGN_UP_REQUEST'; input: SignUpRequest; }
export type SignUpSuccessEvent = { type: 'SIGN_UP_SUCCESS'; output: AuthRegistration; }
export type SignUpFailureEvent = { type: 'SIGN_UP_FAILURE'; error: string; }

//

export type SignOutEvent =
    | SignOutRequestEvent

export type SignOutRequestEvent = { type: 'SIGN_OUT_REQUEST'; }