import { BoardInteraction } from "@/src/ui/types/board/board.interaction"

import { findSectionUnderPointer } from "@/src/ui/interactions/domain/layout/layout.detector"
import { clearGridHover, setGridHover, setGhostCardPosition, clearGhostCard } from "@/src/ui/interactions/domain/board/board.dom"
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { calculateCardPositionByPointer } from "../../board.calc";

export function handleCardCreateInteraction(context: BoardContextValue) 
{
    const { rootRef, registry, session, interaction, metrics } = context;

    const state = session.current.cardCreation
    if (!state) return

    const root = rootRef.current
    if (!root) return

    const pointer = interaction.pointer
    if (!pointer) return

    const metricsValue = metrics.current;
    if (!metricsValue) return;

    const cellSize = metricsValue.layout!.gridCellSize.inner
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

    const localPointer = {
        x: pointer.x - rect.left,
        y: pointer.y - rect.top
    }

    const pos = calculateCardPositionByPointer(
        localPointer,
        cellSize,
        state.startSize,
        {
            colSpan: sectionProps.colSpan,
            rowSpan: sectionProps.rowSpan
        }
    );

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