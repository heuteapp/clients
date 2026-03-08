import { LayoutRegistry } from "@/src/domain/layout/layout.registry"
import { BoardInteraction } from "@/src/domain/board/interaction/board.interaction.types"
import { CardCreateState } from "@/src/domain/board/session/board.session.types"

import { findSectionUnderPointer } from "./create-card.detecter"
import { computeCardCreatePosition } from "./create-card.logic"
import { clearGridHover, setGridHover, setGhostCardPosition } from "./create-card.dom"

export function handleCardCreateInteraction(
    root: HTMLDivElement,
    layoutRegistry: LayoutRegistry,
    interaction: BoardInteraction,
    state: CardCreateState) 
{
    const pointer = interaction.pointer
    if (!pointer) return

    const cellSize = layoutRegistry.measurements!.cellSize.inner

    const result = findSectionUnderPointer(layoutRegistry, pointer)

    if (!result) {
        interaction.updateCardCreate(null, null)
        clearGridHover(layoutRegistry)
        
        const width = state.startSize.colSpan * cellSize
        const height = state.startSize.rowSpan * cellSize

        setGhostCardPosition(
            root,
            pointer.x - width / 2,
            pointer.y - height / 2
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
    })

    interaction.updateCardCreate(sectionProps.id, pos)
}