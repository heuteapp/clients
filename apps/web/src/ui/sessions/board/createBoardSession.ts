import { BoardSession } from "../board.session.types";

export function createBoardSession(): BoardSession {
    return {
        pointerId: null,
        cardCreate: null,
        cardResize: null,
        cardMove: null,
    }
}