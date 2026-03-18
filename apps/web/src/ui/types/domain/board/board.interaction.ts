import { GridSize, Pointer } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { BoardBaseState } from "@/src/core/types/domain/board/board.session";
import { CardPositionInfo } from "@/src/core/types/shared/board";
import { BoardSessionManager } from "./board.session";
import { BoardUserInteractionCallbacks, BoardUserInteractionType } from "@/src/core/types/domain/board/board.interaction";

export interface BoardUserInteraction {
    pointer: Pointer | null;
    type: BoardUserInteractionType;
    callbacks: BoardUserInteractionCallbacks | null;
    session: BoardSessionManager

    //

    setCallbacks: (callbacks: BoardUserInteractionCallbacks | null) => void;

    //

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

    finishInteraction: () => void

    //

    getCurrentState: () => BoardBaseState | null
}