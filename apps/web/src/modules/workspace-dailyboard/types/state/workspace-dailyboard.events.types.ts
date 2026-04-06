import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DoneActorEvent, ErrorActorEvent } from "xstate";

export type FetchSourcesEvents = FETCH_SOURCES_EVENT | DONE_FETCH_SOURCES_EVENT | ERROR_FETCH_SOURCES_EVENT;

export type FETCH_SOURCES_EVENT = { type: "FETCH_SOURCES", dailyboardPath: string };

export type DONE_FETCH_SOURCES_EVENT = DoneActorEvent<DailyboardResponse, "fetch-sources">;

export type ERROR_FETCH_SOURCES_EVENT = ErrorActorEvent<"fetch-sources">;

export type NewCardEvents = NEW_CARD_EVENT | NEW_CARD_SUCCEEDED_EVENT | NEW_CARD_FAILED_EVENT | NEW_CARD_CANCELLED_EVENT;

export type NEW_CARD_EVENT = { type: "NEW_CARD" };

export type NEW_CARD_SUCCEEDED_EVENT = { type: "NEW_CARD_SUCCEEDED" };

export type NEW_CARD_FAILED_EVENT = { type: "NEW_CARD_FAILED" };

export type NEW_CARD_CANCELLED_EVENT = { type: "NEW_CARD_CANCELLED" };