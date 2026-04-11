import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridPosition, GridSize } from "@/src/modules/shared/types/common";
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

export type EditCardEvent =
    | { type: "CARD_EDIT_REQUESTED"; categoryPath: string, date: YYMMDDDate, cardKey: string }
    | EditPosCardEvent
    | EditSizeCardEvent
    | { type: "CARD_EDIT_CONFIRMED"; }
    | { type: "CARD_EDIT_CANCELLED"; }

export type EditPosCardEvent =
    | { type: "CARD_EDIT_POS_REQUESTED"; }
    | { type: "CARD_EDIT_POS_COMPLETED"; placement: DailyboardCardPlacement }
    | { type: "CARD_EDIT_POS_CANCELLED"; }

export type EditSizeCardEvent =
    | { type: "CARD_EDIT_SIZE_REQUESTED"; }
    | { type: "CARD_EDIT_SIZE_COMPLETED"; size: GridSize}
    | { type: "CARD_EDIT_SIZE_CANCELLED"; }