import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridSize } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";
import { DoneActorEvent, ErrorActorEvent } from "xstate";

export type FetchSourcesEvent =
  | { type: "FETCH_SOURCES_REQUESTED"; dailyboardPath: string }
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