import { CardCreateState, CardResizeState, CardMoveState } from "./states";

export interface BoardSession {
    pointerId?: number | null;
    cardCreate: CardCreateState | null;
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
}