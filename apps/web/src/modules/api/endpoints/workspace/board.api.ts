import { serverApi } from "@/src/modules/api/server";
import { DailyboardResponse } from "@/src/modules/api/models/workspace/dailyboard.response";
import { DailyboardCommand } from "@/src/modules/dailyboard/types/dailyboard.command.types";

export const dailyboardApi = {
    getDailyboard: (categoryName: string) =>
        serverApi.get<DailyboardResponse>(`/workspace/dailyboard/${categoryName}`),

    postEvents: (categoryName: string, { commands }: { commands: DailyboardCommand[] }) =>
        serverApi.post(`/workspace/dailyboard/${categoryName}/commands`, {
        commands,
    }),
};