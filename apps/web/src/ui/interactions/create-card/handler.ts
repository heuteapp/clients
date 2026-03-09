import { BoardInteraction } from "@/src/core/domain/board/interaction/board.interaction.types"
import { CardCreateState } from "@/src/ui/sessions/board.session.types"

import { findSectionUnderPointer } from "./detector"
import { computeCardCreatePosition } from "./logic"
import { clearGridHover, setGridHover, setGhostCardPosition, clearGhostCard } from "./dom"
import { BoardRegistry } from "../../../core/domain/board/board.registry"
import { LayoutMeasurements } from "@/src/types/layout/dom"

export function handleCardCreateInteraction(
    root: HTMLDivElement,
    registry: BoardRegistry,
    measurements: LayoutMeasurements,
    interaction: BoardInteraction,
    state: CardCreateState) 
{
    const pointer = interaction.pointer
    if (!pointer) return

    const cellSize = measurements.cellSize.inner

    const result = findSectionUnderPointer(registry, pointer)

    if (!result) {
        interaction.updateCardCreate(null, null)
        clearGridHover(registry)
        
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

    clearGridHover(registry)
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
    registry: BoardRegistry,
    interaction: BoardInteraction
) {
    clearGridHover(registry);
    clearGhostCard(root);
    interaction.updateCardCreate(null, null);
}