import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { DoneActorEvent } from "xstate";

export type FETCH_SOURCES_EVENT = { type: "FETCH_SOURCES", dailyboardPath: string };

export type DONE_FETCH_SOURCES_EVENT = DoneActorEvent<DailyboardResponse, "fetch-sources">;