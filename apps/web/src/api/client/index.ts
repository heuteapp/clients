import { boardApi } from "./endpoints/workspace/board.api";
import { layoutApi } from "./endpoints/workspace/layout.api";

export const server = {
    workspace: {
        board: boardApi,
        layout: layoutApi
    }
};