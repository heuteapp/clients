import { BoardBaseState } from "./board.session";

export enum BoardUserInteractionType {
    Idle = "idle",
    CardCreation = "creation",
    CardMovement = "movement",
    CardResize = "resize",
}

export interface BoardUserInteractionCallbacks {
    OnStart?: (type: BoardUserInteractionType, state: BoardBaseState) => void;
    OnUpdate?: (type: BoardUserInteractionType, state: BoardBaseState) => void;
    OnFinish?: (type: BoardUserInteractionType, state: BoardBaseState) => void;
}