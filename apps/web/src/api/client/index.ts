import { boardApi } from "./workspace/board.api";
import { layoutApi } from "./workspace/layout.api";

export const server = {
    workspace: {
        board: boardApi,
        layout: layoutApi
    }
};