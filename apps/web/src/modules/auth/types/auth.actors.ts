import { SessionHydrateEvent, SessionRefreshEvent, SignInFailureEvent, SignInSuccessEvent } from "./auth.events.types";


export type SessionHydrateActorInput = void;

export type SessionHydrateActorEvent =
  | SessionHydrateEvent
  | SessionRefreshEvent;

export type SignInActorEvent = 
  | SignInSuccessEvent
  | SignInFailureEvent