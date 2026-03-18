import { BoardBaseState } from "./board.session";

export enum BoardInteractionType {
    Idle = "idle",
    CardCreation = "creation",
    CardMovement = "movement",
    CardResize = "resize",
}

export interface BoardInteractionCallbacks {
    OnStart?: (type: BoardInteractionType, state: BoardBaseState) => void;
    OnUpdate?: (type: BoardInteractionType, state: BoardBaseState) => void;
    OnFinish?: (type: BoardInteractionType, state: BoardBaseState) => void;
}