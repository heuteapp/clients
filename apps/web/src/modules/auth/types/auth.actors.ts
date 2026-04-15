import { SessionHydrateEvent, SessionRefreshEvent } from "./auth.events.types";


export type SessionHydrateActorInput = void;

export type SessionHydrateActorEvent =
  | SessionHydrateEvent
  | SessionRefreshEvent;