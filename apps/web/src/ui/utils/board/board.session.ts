import { BoardSession } from "@/src/ui/types/board/board.session";

export function createBoardSession(): BoardSession {
    return {
        pointerId: null,
        cardCreate: null,
        cardResize: null,
        cardMove: null,
    }
}