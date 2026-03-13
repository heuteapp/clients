import { serverApi } from "@/src/api/client/server";
import { BoardResponse } from "@/src/api/models/workspace/board.response";
import { BoardEvent } from "@/src/core/types/domain/board/board.event";

export const boardApi = {
    getBoard: (categoryName: string) =>
        serverApi.get<BoardResponse>(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, { events }: { events: BoardEvent[] }) =>
        serverApi.post(`/workspace/board/${categoryName}/events`, {
        events,
    }),
};