import { authApi } from "./endpoints/auth.api";
import { boardApi } from "./endpoints/workspace/board.api";
import { layoutApi } from "./endpoints/workspace/layout.api";

export const server = {
    auth: authApi,
    workspace: {
        board: boardApi,
        layout: layoutApi
    }
};