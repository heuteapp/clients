import { BoardSession } from "./BoardSession";

export function createBoardSession(): BoardSession {
    return {
        pointerId: null,
        cardCreate: null,
        cardResize: null,
        cardMove: null,
    }
}