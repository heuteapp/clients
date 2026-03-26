import { serverApi } from "@/src/modules/api/server";
import { BoardResponse } from "@/src/modules/api/models/workspace/board.response";
import { BoardCommand } from "@/src/modules/board/types/board.command.types";

export const boardApi = {
    getBoard: (categoryName: string) =>
        serverApi.get<BoardResponse>(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, { commands }: { commands: BoardCommand[] }) =>
        serverApi.post(`/workspace/board/${categoryName}/commands`, {
        commands,
    }),
};