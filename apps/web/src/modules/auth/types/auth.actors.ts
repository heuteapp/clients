import { SignInRequest, SignUpRequest } from "@/src/api/models/requests/auth.request";
import { SessionHydrateFailureEvent, SessionHydrateSuccessEvent, SessionRefreshFailureEvent, SessionRefreshRequestEvent, SessionRefreshSuccessEvent, SignInFailureEvent, SignInSuccessEvent, SignUpFailureEvent, SignUpSuccessEvent } from "./auth.events.types";
import { AuthSession } from "./auth.types";


export type SessionHydrateActorInput = void;

export type SessionHydrateActorEvent =
  | SessionHydrateSuccessEvent
  | SessionHydrateFailureEvent
  | SessionRefreshRequestEvent;

//

export type SessionRefreshActorInput = AuthSession;

export type SessionRefreshActorEvent =
  | SessionRefreshSuccessEvent
  | SessionRefreshFailureEvent;

//

export type SignInActorInput = SignInRequest;

export type SignInActorEvent = 
  | SignInSuccessEvent
  | SignInFailureEvent

export type SignUpActorInput = SignUpRequest;

export type SignUpActorEvent = 
  | SignUpSuccessEvent
  | SignUpFailureEvent