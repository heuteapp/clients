import { BoardInteraction } from "@/src/ui/types/board/board.interaction"

import { findSectionUnderPointer } from "./detector"
import { computeCardCreatePosition } from "./logic"
import { clearGridHover, setGridHover, setGhostCardPosition, clearGhostCard } from "./dom"
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetrics } from "@/src/ui/types/board/board.metrics";
import { BoardSessionState, CardCreationSession } from "@/src/core/types/domain/board/board.session";

export function handleCardCreateInteraction(
    root: HTMLDivElement,
    registry: BoardRegistry,
    sessionRef: React.RefObject<BoardSessionState>,
    metrics: BoardMetrics,
    interaction: BoardInteraction,
    state: CardCreationSession) 
{
    const pointer = interaction.pointer
    if (!pointer) return

    const metricsValue = metrics.current;
    if (!metricsValue) return;

    const session = sessionRef.current;
    if (!session) return

    const cellSize = metricsValue.layout.gridCellSize.inner

    const result = findSectionUnderPointer(registry, pointer)

    if (!result) {
        interaction.updateCardCreation(null)
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

    interaction.updateCardCreation({
        sectionId: sectionProps.id,
        position: pos
    })
}

export function endCardCreateInteraction(
    root: HTMLDivElement,
    registry: BoardRegistry,
    interaction: BoardInteraction
) {
    clearGridHover(registry);
    clearGhostCard(root);
    interaction.updateCardCreation(null);
}