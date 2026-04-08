import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { DoneActorEvent, ErrorActorEvent } from "xstate";

export type FetchSourcesEvents = FETCH_SOURCES_EVENT | DONE_FETCH_SOURCES_EVENT | ERROR_FETCH_SOURCES_EVENT;

export type FETCH_SOURCES_EVENT = { type: "FETCH_SOURCES", dailyboardPath: string };

export type DONE_FETCH_SOURCES_EVENT = DoneActorEvent<DailyboardResponse, "fetch-sources">;

export type ERROR_FETCH_SOURCES_EVENT = ErrorActorEvent<"fetch-sources">;

export type CreateCardEvents = CREATE_CARD_EVENT | CREATE_CARD_SUCCEEDED_EVENT | CREATE_CARD_FAILED_EVENT | CREATE_CARD_CANCELLED_EVENT;

export type CREATE_CARD_EVENT = { type: "CREATE_CARD" };

export type CREATE_CARD_SUCCEEDED_EVENT = { type: "CREATE_CARD_SUCCEEDED", placement: DailyboardCardPlacement };

export type CREATE_CARD_FAILED_EVENT = { type: "CREATE_CARD_FAILED" };

export type CREATE_CARD_CANCELLED_EVENT = { type: "CREATE_CARD_CANCELLED" };