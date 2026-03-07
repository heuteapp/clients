import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";
import { BoardSession } from "./board.session";

export interface BoardInteraction {
    rootRef: React.RefObject<HTMLDivElement | null>;
    session: BoardSession
    startCardResize: (cardId: string, sectionId: string, pointer: Pointer, size: GridSize, resizeHandle: ResizeHandle) => void;
    startCardMove: (cardId: string, sectionId: string, pointer: Pointer, position: GridPosition) => void;
    endInteraction: () => void;
}
//

export function createBoardInteraction(rootRef: React.RefObject<HTMLDivElement | null>, session: BoardSession): BoardInteraction {

    const interaction: BoardInteraction = {
        rootRef,
        session,

        startCardMove(cardId, sectionId, pointer, position) {
            interaction.session.cardResize = null

            interaction.session.cardMove = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startPosition: position,
                currentSectionId: sectionId,
                currentPosition: position
            }
        },

        startCardResize(cardId, sectionId, pointer, size, handle) {
            interaction.session.cardMove = null

            interaction.session.cardResize = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startSize: size,
                currentSize: size,
                resizeHandle: handle
            }
        },

        endInteraction() {
            interaction.session.cardMove = null
            interaction.session.cardResize = null
            interaction.session.pointer = null
        }
    }

    return interaction
}