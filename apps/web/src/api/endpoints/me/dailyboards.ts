import { heuteClient } from "@/src/api/heuteClient";
import { DailyboardResponse } from "@/src/api/models/responses/dailyboard.response";

export const dailyboards = {
    getDailyboard : (path: string) => 
        heuteClient.get<DailyboardResponse>(`/me/dailyboards/${encodeURIComponent(path)}`).then(res => res.data)
};