import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DoneActorEvent, ErrorActorEvent } from "xstate";
import { CardCreatePlaceInput, CardCreatePlacePayload } from "./workspace-dailyboard.types";

export type WorkspaceDailyboardEvent =
    | SourcesFetchEvent
    | CardCreateEvent

export type SourcesFetchEvent =
    | { type: "SOURCES_FETCH_REQUEST"; dailyboardPath: string }
    | DoneActorEvent<DailyboardResponse, "fetch-sources">
    | ErrorActorEvent<"fetch-sources">;

export type CardCreateEvent = 
    | CardCreateRequestEvent
    | CardCreateCancelEvent
    | CardCreatePlaceRequestEvent
    | CardCreatePlaceDoneEvent
    | CardCreatePlaceCancelEvent;

export type CardCreateRequestEvent = { type: "CARD_CREATE_REQUEST"; };

export type CardCreateCancelEvent = { type: "CARD_CREATE_CANCEL"; };

export type CardCreatePlaceRequestEvent = { type: "CARD_CREATE_PLACE_REQUEST"; input: CardCreatePlaceInput };

export type CardCreatePlaceDoneEvent = { type: "CARD_CREATE_PLACE_DONE"; payload: CardCreatePlacePayload };

export type CardCreatePlaceCancelEvent = { type: "CARD_CREATE_PLACE_CANCEL"; };