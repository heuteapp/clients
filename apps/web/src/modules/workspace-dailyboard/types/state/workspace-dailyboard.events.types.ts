import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridPosition, GridSize, Pointer } from "@/src/modules/shared/types/common";
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
    | { type: "CARD_EDIT_REQUESTED"; cardKey: string }
    | EditPosCardEvent
    | { type: "CARD_EDIT_SUCCEEDED";}

export type EditPosCardEvent =
    | { type: "CARD_EDIT_POS_REQUESTED"; cardKey: string }
    | { type: "CARD_EDIT_POS_COMPLETED"; cardKey: string; position: GridPosition}
    | { type: "CARD_EDIT_POS_CANCELLED"; cardKey: string }