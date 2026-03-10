import { GridSize, Pointer } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { CardBaseState } from "@/src/core/types/domain/board/board.session";
import { CardPositionInfo } from "@/src/core/types/shared/board";
import { BoardSession } from "./board.session";

export interface BoardInteraction {
    pointer: Pointer | null;
    eventType: BoardInteractionEventType | null;
    eventHandlers: BoardInteractionEventHandlers | null
    session: BoardSession

    setEventHandlers: (handlers: BoardInteractionEventHandlers | null) => void

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

    getCurrentState: () => CardBaseState | null
}

export interface BoardInteractionEventHandlers {
    OnStart?: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnUpdate?: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnFinish?: (type: BoardInteractionEventType, state: CardBaseState) => void;
}

export type BoardInteractionEventType = "creation" | "movement" | "resize";