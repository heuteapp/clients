import { serverApi } from "@/src/api/client/server";
import { BoardResponse } from "@/src/api/models/workspace/board.response";

export const boardApi = {
    getBoard: (categoryName: string) =>
        serverApi.get<BoardResponse>(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, events: any[]) =>
        serverApi.post(`/workspace/board/${categoryName}/events`, {
        events,
    }),
};