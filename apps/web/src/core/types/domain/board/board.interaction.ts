import { GridSize, Pointer } from "@/src/core/types/shared/common";
import { CardPositionInfo } from "@/src/core/types/shared/board";
import { Identifier } from "@/src/core/types/shared/data";
import { BoardBaseState, BoardSessionManager } from "./board.session";

export interface BoardBaseInteraction<
    TInteractionType extends BoardBaseInteractionTypeValues, 
    TInteractionCallbacks extends BoardBaseInteractionCallbacks<TInteractionType>> {

    pointer: Pointer | null;
    type: TInteractionType;
    callbacks: TInteractionCallbacks | null;
    session: BoardSessionManager;

    setCallbacks: (callbacks: TInteractionCallbacks | null) => void;
    getCurrentState: () => BoardBaseState | null;

    finishInteraction: () => void
}

export interface BoardBaseInteractionCallbacks<TInteractionType> {
    OnStart?: (type: TInteractionType, state: BoardBaseState) => void;
    OnUpdate?: (type: TInteractionType, state: BoardBaseState) => void;
    OnFinish?: (type: TInteractionType, state: BoardBaseState) => void;
}

//

export enum BoardBaseInteractionType {
    Idle = "idle",
    CardCreation = "creation",
    CardMovement = "movement",
    CardResize = "resize",
}

export type BoardBaseInteractionTypeValues = `${BoardBaseInteractionType}`;

//

export interface BoardUserInteraction extends BoardBaseInteraction<BoardUserInteractionType, BoardUserInteractionCallbacks> {
    startCardCreate: (
        size: GridSize
    ) => void

    updateCardCreation: (
        placement: CardPositionInfo | null
    ) => void

    startCardMovement: (
        cardId: Identifier,
        placement: CardPositionInfo
    ) => void

    updateCardMovement: (
        placement: CardPositionInfo | null
    ) => void
}

export enum BoardUserInteractionType {
    Idle = "idle",
    CardCreation = "creation",
    CardMovement = "movement",
    CardResize = "resize",
}

export interface BoardUserInteractionCallbacks extends BoardBaseInteractionCallbacks<BoardUserInteractionType> {

}