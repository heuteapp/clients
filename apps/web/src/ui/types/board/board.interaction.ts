import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { BoardSessionState, BoardSessionUpdater, CardBaseSession } from "@/src/core/types/domain/board/board.session";

export interface BoardInteraction {
    pointer: Pointer | null;
    eventType: BoardInteractionEventType | null;
    eventHandlers: BoardInteractionEventHandlers | null
    sessionRef: React.RefObject<BoardSessionState>;

    sessionUpdater: BoardSessionUpdater;
    setEventHandlers: (handlers: BoardInteractionEventHandlers | null) => void

    startCardCreate: (
        size: GridSize
    ) => void

    updateCardCreate: (
        sectionId: Identifier | null,
        position: GridPosition | null
    ) => void

    startCardResize: (
        cardId: Identifier,
        sectionId: Identifier,
        pointer: Pointer,
        size: GridSize,
        resizeHandle: ResizeHandle
    ) => void

    startCardMove: (
        cardId: Identifier,
        sectionId: Identifier,
        pointer: Pointer,
        position: GridPosition
    ) => void

    finishInteraction: () => void

    //

    getCurrentState: () => CardBaseSession | null
}

export interface BoardInteractionEventHandlers {
    OnStart?: (type: BoardInteractionEventType, state: CardBaseSession) => void;
    OnFinish?: (type: BoardInteractionEventType, state: CardBaseSession) => void;
}

export type BoardInteractionEventType = "create" | "move" | "resize";