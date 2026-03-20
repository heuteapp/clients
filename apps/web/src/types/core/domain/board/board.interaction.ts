import { GridSize, Pointer } from "@/src/types/shared/core/common";
import { CardPositionInfo } from "@/src/types/shared/core/board";
import { Identifier } from "@/src/types/shared/core/data";
import { BoardBaseSessionManager, BoardBaseSessionUpdater, BoardBaseSessionValue, BoardBaseState, BoardUserSessionManager, BoardUserSessionUpdater, BoardUserSessionValue } from "./board.session";

export interface BoardBaseInteraction<
    TSessionValue extends BoardBaseSessionValue,
    TSessionUpdater extends BoardBaseSessionUpdater<TSessionValue>,
    TSessionManager extends BoardBaseSessionManager<TSessionValue, TSessionUpdater>,
    TInteractionType extends BoardBaseInteractionTypeValues, 
    TInteractionCallbacks extends BoardBaseInteractionCallbacks<TInteractionType>
> {
    pointer: Pointer | null;
    type: TInteractionType;
    callbacks: TInteractionCallbacks | null;
    session: TSessionManager;

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

export interface BoardUserInteraction extends BoardBaseInteraction<
    BoardUserSessionValue,
    BoardUserSessionUpdater,
    BoardUserSessionManager,
    BoardUserInteractionType, 
    BoardUserInteractionCallbacks
> {
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