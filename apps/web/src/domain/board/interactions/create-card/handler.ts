import { LayoutRegistry } from "@/src/domain/layout/types/registry"
import { BoardInteraction } from "@/src/domain/board/interaction/board.interaction.types"
import { CardCreateState } from "@/src/domain/board/session/board.session.types"

import { findSectionUnderPointer } from "./detector"
import { computeCardCreatePosition } from "./logic"
import { clearGridHover, setGridHover, setGhostCardPosition, clearGhostCard } from "./dom"

export function handleCardCreateInteraction(
    root: HTMLDivElement,
    layoutRegistry: LayoutRegistry,
    interaction: BoardInteraction,
    state: CardCreateState) 
{
    const pointer = interaction.pointer
    if (!pointer) return

    // !! Hardcoded cell size
    const cellSize = 10; //layoutRegistry.measurements!.cellSize.inner

    const result = findSectionUnderPointer(layoutRegistry, pointer)

    if (!result) {
        interaction.updateCardCreate(null, null)
        clearGridHover(layoutRegistry)
        
        const width = state.startSize.colSpan * cellSize
        const height = state.startSize.rowSpan * cellSize

        setGhostCardPosition(
            root,
            pointer.x - width / 2,
            pointer.y - height / 2,
            width,
            height
        )

        return
    }

    const { section, rect } = result

    clearGridHover(layoutRegistry)
    setGridHover(section.grid!.ref!.current!)

    const sectionProps = section.props!

    const pos = computeCardCreatePosition({
        pointer,
        rectLeft: rect.left,
        rectTop: rect.top,
        cellSize,
        cardRows: state.startSize.rowSpan,
        cardCols: state.startSize.colSpan,
        sectionRowSpan: sectionProps.rowSpan,
        sectionColSpan: sectionProps.colSpan
    });

    const x = rect.left + (pos.colIndex - 1) * cellSize
    const y = rect.top + (pos.rowIndex - 1) * cellSize
    const width = state.startSize.colSpan * cellSize
    const height = state.startSize.rowSpan * cellSize

    setGhostCardPosition(
        root,
        x,
        y,
        width,
        height
    )

    interaction.updateCardCreate(sectionProps.id, pos)
}

export function endCardCreateInteraction(
    root: HTMLDivElement,
    layoutRegistry: LayoutRegistry,
    interaction: BoardInteraction
) {
    clearGridHover(layoutRegistry);
    clearGhostCard(root);
    interaction.updateCardCreate(null, null);
}