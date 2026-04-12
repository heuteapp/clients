import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridSize } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";
import { DoneActorEvent, ErrorActorEvent } from "xstate";

export type FetchSourcesEvent =
    | { type: "SOURCES_FETCH_REQUESTED"; dailyboardPath: string }
    | DoneActorEvent<DailyboardResponse, "fetch-sources">
    | ErrorActorEvent<"fetch-sources">;

export type CreateCardEvent =
    | { type: "CARD_CREATE_REQUESTED"; cardSize: GridSize }
    | {
        type: "CARD_CREATE_SUCCEEDED";
        categoryPath: string;
        date: YYMMDDDate;
        placement: DailyboardCardPlacement;
        }
    | { type: "CARD_CREATE_CANCELLED" };

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