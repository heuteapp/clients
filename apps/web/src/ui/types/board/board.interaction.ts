import { GridSize, Pointer } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { SessionBaseState } from "@/src/core/types/domain/board/board.session";
import { CardPositionInfo } from "@/src/core/types/shared/board";
import { BoardSession } from "./board.session";
import { BoardInteractionCallbacks, BoardInteractionType } from "@/src/core/types/domain/board/board.interaction";

export interface BoardInteraction {
    pointer: Pointer | null;
    type: BoardInteractionType;
    callbacks: BoardInteractionCallbacks | null;
    session: BoardSession

    //

    setCallbacks: (callbacks: BoardInteractionCallbacks | null) => void;

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

    finishInteraction: () => void

    //

    getCurrentState: () => SessionBaseState | null
}