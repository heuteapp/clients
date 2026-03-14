import { serverApi } from "@/src/api/client/server";
import { BoardResponse } from "@/src/api/models/workspace/board.response";
import { BoardCommand } from "@/src/core/types/domain/board/board.command";

export const boardApi = {
    getBoard: (categoryName: string) =>
        serverApi.get<BoardResponse>(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, { events }: { events: BoardCommand[] }) =>
        serverApi.post(`/workspace/board/${categoryName}/events`, {
        events,
    }),
};