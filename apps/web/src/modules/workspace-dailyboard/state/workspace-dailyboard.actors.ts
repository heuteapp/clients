import { heuteApi } from "@/src/api/heuteApi";
import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";
import { fromPromise } from "xstate";

export const fetchSourcesActor = fromPromise<
    DailyboardResponse | null,     
    { dailyboardPath: string }
>(
    async ({ input }) => {
        return await heuteApi.me.dailyboards.getDailyboard(input.dailyboardPath);
    }
);