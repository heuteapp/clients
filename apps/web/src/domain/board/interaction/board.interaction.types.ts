import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/shared/types/common.types";
import { BoardSession, CardBaseState } from "../session/board.session.types";

export interface BoardInteraction {
    pointer: Pointer | null;
    eventType: BoardInteractionEventType | null;
    eventHandlers: BoardInteractionEventHandlers | null

    setSession: (updater: (prev: BoardSession) => BoardSession) => void
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

    endInteraction: () => void
}

export interface BoardInteractionEventHandlers {
    OnStart: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnEnd: (type: BoardInteractionEventType) => void;
}

export type BoardInteractionEventType = "create" | "move" | "resize";