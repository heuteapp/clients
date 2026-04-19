import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridSize } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";
import { DoneActorEvent, ErrorActorEvent } from "xstate";

export type WorkspaceDailyboardEvent =
    | SourcesFetchEvent
    | CardCreateEvent
    | EditCardEvent
    | CardPlaceEvent;

export type SourcesFetchEvent =
    | { type: "SOURCES_FETCH_REQUEST"; dailyboardPath: string }
    | DoneActorEvent<DailyboardResponse, "fetch-sources">
    | ErrorActorEvent<"fetch-sources">;

export type CardCreateEvent = 
    | CardCreateRequestEvent
    | CardCreatePlaceRequestEvent
    | CardCreatePlaceDoneEvent
    | CardCreatePlaceCancelEvent;

export type CardCreateRequestEvent = { type: "CARD_CREATE_REQUEST"; };

export type CardCreatePlaceRequestEvent = { type: "CARD_CREATE_PLACE_REQUEST"; cardSize: GridSize };

export type CardCreatePlaceDoneEvent = { type: "CARD_CREATE_PLACE_DONE"; categoryPath: string; date: YYMMDDDate; placement: DailyboardCardPlacement };

export type CardCreatePlaceCancelEvent = { type: "CARD_CREATE_PLACE_CANCEL"; };

//

export type EditCardEvent =
    | { type: "CARD_EDIT_REQUESTED"; categoryPath: string, date: YYMMDDDate, cardKey: string }
    | { type: "CARD_EDIT_CONFIRMED"; }
    | { type: "CARD_EDIT_CANCELLED"; }

export type CardPlaceEvent =
    | { type: "CARD_PLACE_REQUESTED"; categoryPath: string, date: YYMMDDDate, cardKey: string }
    | CardPlaceRepositionEvent
    | CardPlaceResizeEvent
    | { type: "CARD_PLACE_CONFIRMED"; }
    | { type: "CARD_PLACE_CANCELLED"; }

export type CardPlaceRepositionEvent =
    | { type: "CARD_PLACE_REPOSITION_REQUESTED"; }
    | { type: "CARD_PLACE_REPOSITION_COMPLETED"; placement: DailyboardCardPlacement }
    | { type: "CARD_PLACE_REPOSITION_CANCELLED"; }

export type CardPlaceResizeEvent =
    | { type: "CARD_PLACE_RESIZE_REQUESTED"; }
    | { type: "CARD_PLACE_RESIZE_COMPLETED"; placement: DailyboardCardPlacement}
    | { type: "CARD_PLACE_RESIZE_CANCELLED"; }