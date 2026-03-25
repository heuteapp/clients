import { serverApi } from "@/src/api/server";
import { BoardResponse } from "@/src/api/models/workspace/board.response";
import { BoardCommand } from "@/src/board/types/board.command.types";

export const boardApi = {
    getBoard: (categoryName: string) =>
        serverApi.get<BoardResponse>(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, { commands }: { commands: BoardCommand[] }) =>
        serverApi.post(`/workspace/board/${categoryName}/commands`, {
        commands,
    }),
};