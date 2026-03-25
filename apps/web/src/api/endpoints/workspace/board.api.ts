import { serverApi } from "@/src/api/server";
import { BoardResponse } from "@/src/api/models/workspace/board.response";
import { BoardCommand } from "@/src/features/domain/board/types/board.command";

export const boardApi = {
    getBoard: (categoryName: string) =>
        serverApi.get<BoardResponse>(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, { commands }: { commands: BoardCommand[] }) =>
        serverApi.post(`/workspace/board/${categoryName}/commands`, {
        commands,
    }),
};