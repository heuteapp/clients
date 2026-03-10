import { SessionBaseState } from "./board.session";

export enum BoardInteractionType {
    Idle = "idle",
    CardCreation = "creation",
    CardMovement = "movement",
    CardResize = "resize",
}

export interface BoardInteractionCallbacks {
    OnStart?: (type: BoardInteractionType, state: SessionBaseState) => void;
    OnUpdate?: (type: BoardInteractionType, state: SessionBaseState) => void;
    OnFinish?: (type: BoardInteractionType, state: SessionBaseState) => void;
}