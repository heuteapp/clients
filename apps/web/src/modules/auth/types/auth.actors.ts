import { SignInRequest } from "@/src/api/models/requests/auth.request";
import { SessionHydrateEvent, SessionRefreshEvent, SignInFailureEvent, SignInSuccessEvent } from "./auth.events.types";


export type SessionHydrateActorInput = void;

export type SessionHydrateActorEvent =
  | SessionHydrateEvent
  | SessionRefreshEvent;

//

export type SignInActorInput = SignInRequest;

export type SignInActorEvent = 
  | SignInSuccessEvent
  | SignInFailureEvent