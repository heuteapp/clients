import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types/shared/common";
import { BoardSession, BoardSessionUpdater, CardBaseState } from "@/src/ui/types/board/board.session";

export interface BoardInteraction {
    pointer: Pointer | null;
    eventType: BoardInteractionEventType | null;
    eventHandlers: BoardInteractionEventHandlers | null
    sessionRef: React.RefObject<BoardSession>;

    sessionUpdater: BoardSessionUpdater;
    setEventHandlers: (handlers: BoardInteractionEventHandlers | null) => void

    startCardCreate: (
        size: GridSize
    ) => void

    updateCardCreate: (
        sectionId: string | null,
        position: GridPosition | null
    ) => void

    startCardResize: (
        cardId: string,
        sectionId: string,
        pointer: Pointer,
        size: GridSize,
        resizeHandle: ResizeHandle
    ) => void

    startCardMove: (
        cardId: string,
        sectionId: string,
        pointer: Pointer,
        position: GridPosition
    ) => void

    executeInteraction: () => void

    successInteraction: () => void

    cancelInteraction: () => void

    throwInteraction: (error: Error) => void

    endInteraction: () => void

    //

    getCurrentState: () => CardBaseState | null
}

export interface BoardInteractionEventHandlers {
    OnStart: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnExecute: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnSuccess: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnCancel: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnThrow: (type: BoardInteractionEventType, state: CardBaseState, error: Error) => void;
    OnEnd: (type: BoardInteractionEventType) => void;
}

export type BoardInteractionEventType = "create" | "move" | "resize";