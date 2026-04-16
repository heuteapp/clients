import { SignInRequest, SignUpRequest } from "@/src/api/models/requests/auth.request";
import { AuthRegistration, AuthSession } from "./auth.types";

export type AuthEvent =
    | RedirectEvent
    | SessionHydrateEvent
    | SessionRefreshEvent
    | SignInEvent
    | SignUpEvent
    | VerifyEmailEvent
    | SignOutEvent;

//

export type RedirectEvent = { type: 'REDIRECT_REQUEST'; }

export type SessionHydrateEvent = 
    | SessionHydrateRequestEvent
    | SessionHydrateDoneEvent
    | SessionHydrateErrorEvent;

export type SessionHydrateRequestEvent = { type: 'SESSION_HYDRATE_REQUEST'; }
export type SessionHydrateDoneEvent = { type: 'SESSION_HYDRATE_DONE'; output: AuthSession; }
export type SessionHydrateErrorEvent = { type: 'SESSION_HYDRATE_ERROR'; error: string; }

//

export type SessionRefreshEvent =
    | SessionRefreshRequestEvent
    | SessionRefreshDoneEvent
    | SessionRefreshErrorEvent;

export type SessionRefreshRequestEvent = { type: 'SESSION_REFRESH_REQUEST'; input: AuthSession; }
export type SessionRefreshDoneEvent = { type: 'SESSION_REFRESH_DONE'; output: AuthSession; }
export type SessionRefreshErrorEvent = { type: 'SESSION_REFRESH_ERROR'; error: string; }

//

export type SignInEvent =
    | SignInRequestEvent
    | SignInDoneEvent
    | SignInErrorEvent;

export type SignInRequestEvent = { type: 'SIGN_IN_REQUEST'; input: SignInRequest; }
export type SignInDoneEvent = { type: 'SIGN_IN_DONE'; output: AuthSession; }
export type SignInErrorEvent = { type: 'SIGN_IN_ERROR'; error: string; }

//

export type SignUpEvent =
    | SignUpRequestEvent
    | SignUpDoneEvent
    | SignUpErrorEvent;

export type SignUpRequestEvent = { type: 'SIGN_UP_REQUEST'; input: SignUpRequest; }
export type SignUpDoneEvent = { type: 'SIGN_UP_DONE'; output: AuthRegistration; }
export type SignUpErrorEvent = { type: 'SIGN_UP_ERROR'; error: string; }

//

export type VerifyEmailEvent =
    | VerifyEmailRequestEvent
    | VerifyEmailConfirmEvent
    | VerifyEmailAssumeEvent
    | VerifyEmailDoneEvent
    | VerifyEmailTimeoutEvent
    | VerifyEmailErrorEvent;

export type VerifyEmailRequestEvent = { type: 'VERIFY_EMAIL_REQUEST'; }

export type VerifyEmailConfirmEvent = { type: 'VERIFY_EMAIL_CONFIRM'; output: AuthSession; }

export type VerifyEmailAssumeEvent = { type: 'VERIFY_EMAIL_ASSUME'; error?: string; }

export type VerifyEmailDoneEvent = { type: 'VERIFY_EMAIL_DONE'; output: AuthSession; }

export type VerifyEmailTimeoutEvent = { type: 'VERIFY_EMAIL_TIMEOUT'; email: string; }

export type VerifyEmailErrorEvent = { type: 'VERIFY_EMAIL_ERROR'; error: string; }


//

export type SignOutEvent =
    | SignOutRequestEvent

export type SignOutRequestEvent = { type: 'SIGN_OUT_REQUEST'; }