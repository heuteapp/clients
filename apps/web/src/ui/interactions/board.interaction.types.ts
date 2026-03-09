import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types/shared/common";
import { CardBaseState } from "@/src/ui/sessions/board/states";
import { BoardSessionUpdater } from "../sessions/board";

export interface BoardInteraction {
    pointer: Pointer | null;
    eventType: BoardInteractionEventType | null;
    eventHandlers: BoardInteractionEventHandlers | null

    setSession: BoardSessionUpdater;
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