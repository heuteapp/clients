import { SignInRequest } from "@/src/api/models/requests/auth.request";
import { SessionHydrateFailureEvent, SessionHydrateSuccessEvent, SessionRefreshFailureEvent, SessionRefreshRequestEvent, SessionRefreshSuccessEvent, SignInFailureEvent, SignInSuccessEvent } from "./auth.events.types";
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