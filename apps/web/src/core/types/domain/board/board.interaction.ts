import { Pointer } from "@/src/core/types/shared/common";
import { BoardBaseState, BoardSessionManager } from "./board.session";

export interface BoardBaseInteraction<
    TInteractionType, 
    TInteractionCallbacks extends BoardBaseInteractionCallbacks<TInteractionType>> {
        
    pointer: Pointer | null;
    type: TInteractionType;
    callbacks: TInteractionCallbacks | null;
    session: BoardSessionManager;

    setCallbacks: (callbacks: TInteractionCallbacks | null) => void;
}

export interface BoardBaseInteractionCallbacks<TInteractionType> {
    OnStart?: (type: TInteractionType, state: BoardBaseState) => void;
    OnUpdate?: (type: TInteractionType, state: BoardBaseState) => void;
    OnFinish?: (type: TInteractionType, state: BoardBaseState) => void;
}

//

export enum BoardUserInteractionType {
    Idle = "idle",
    CardCreation = "creation",
    CardMovement = "movement",
    CardResize = "resize",
}

export interface BoardUserInteractionCallbacks extends BoardBaseInteractionCallbacks<BoardUserInteractionType> {

}