import { GridSize, Pointer } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { CardBaseSession } from "@/src/core/types/domain/board/board.session";
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

    getCurrentState: () => CardBaseSession | null
}

export interface BoardInteractionEventHandlers {
    OnStart?: (type: BoardInteractionEventType, state: CardBaseSession) => void;
    OnUpdate?: (type: BoardInteractionEventType, state: CardBaseSession) => void;
    OnFinish?: (type: BoardInteractionEventType, state: CardBaseSession) => void;
}

export type BoardInteractionEventType = "creation" | "movement" | "resize";