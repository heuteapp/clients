import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridSize } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";
import { DoneActorEvent, ErrorActorEvent } from "xstate";

export type FetchSourcesEvents = FETCH_SOURCES_REQUESTED_EVENT | DONE_FETCH_SOURCES_EVENT | ERROR_FETCH_SOURCES_EVENT;

export type FETCH_SOURCES_REQUESTED_EVENT = { type: "FETCH_SOURCES_REQUESTED", dailyboardPath: string };

export type DONE_FETCH_SOURCES_EVENT = DoneActorEvent<DailyboardResponse, "fetch-sources">;

export type ERROR_FETCH_SOURCES_EVENT = ErrorActorEvent<"fetch-sources">;

export type CreateCardEvents = CREATE_CARD_REQUESTED_EVENT | CREATE_CARD_SUCCEEDED_EVENT | CREATE_CARD_CANCELLED_EVENT;

export type CREATE_CARD_REQUESTED_EVENT = { type: "CREATE_CARD_REQUESTED", cardSize: GridSize };

export type CREATE_CARD_SUCCEEDED_EVENT = { type: "CREATE_CARD_SUCCEEDED", categoryPath: string, date: YYMMDDDate, placement: DailyboardCardPlacement };

export type CREATE_CARD_CANCELLED_EVENT = { type: "CREATE_CARD_CANCELLED" };