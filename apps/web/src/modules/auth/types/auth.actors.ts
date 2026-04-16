import { SignInRequest, SignUpRequest } from "@/src/api/models/requests/auth.request";
import { SessionHydrateErrorEvent, SessionHydrateDoneEvent, SessionRefreshErrorEvent, SessionRefreshRequestEvent, SessionRefreshDoneEvent, SignInErrorEvent, SignInDoneEvent, SignUpErrorEvent, SignUpDoneEvent, VerifyEmailErrorEvent, VerifyEmailDoneEvent, VerifyEmailTimeoutEvent } from "./auth.events.types";
import { AuthRegistration, AuthSession } from "./auth.types";


export type SessionHydrateActorInput = void;

export type SessionHydrateActorEvent =
  | SessionHydrateDoneEvent
  | SessionHydrateErrorEvent
  | SessionRefreshRequestEvent;

//

export type SessionRefreshActorInput = AuthSession;

export type SessionRefreshActorEvent =
  | SessionRefreshDoneEvent
  | SessionRefreshErrorEvent;

//

export type SignInActorInput = SignInRequest;

export type SignInActorEvent = 
  | SignInDoneEvent
  | SignInErrorEvent

export type SignUpActorInput = SignUpRequest;

export type SignUpActorEvent = 
  | SignUpDoneEvent
  | SignUpErrorEvent

//

export type VerifyEmailActorInput = AuthRegistration;

export type VerifyEmailActorEvent = 
  | VerifyEmailDoneEvent
  | VerifyEmailErrorEvent
  | VerifyEmailTimeoutEvent
