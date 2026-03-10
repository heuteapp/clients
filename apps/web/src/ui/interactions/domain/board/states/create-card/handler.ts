import { findSectionUnderPointer } from "@/src/ui/interactions/domain/layout/layout.detector"
import { clearGridHover, setGridHover, setGhostCardPosition, clearGhostCard } from "@/src/ui/interactions/domain/board/board.dom"
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { calculateCardPositionByPointer } from "@/src/ui/interactions/domain/board/board.calc";
import { useBoardStore } from "@/src/stores/board.store";

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
        const x = pointer.x - width / 2
        const y = pointer.y - height / 2

        setGhostCardPosition(
            root,
            { x, y, width, height }
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
        { x, y, width, height }
    )

    interaction.updateCardCreation({
        sectionId: sectionProps.id,
        position: pos
    })
}

export function finishCardCreationState(context: BoardContextValue) {
    finalizeCardCreationState(context);
    cleanupCardCreationState(context);
}

export function finalizeCardCreationState(context : BoardContextValue) {
    const { registry, session, actions } = context;

    const { createCard } = actions;

    const cardCreationState = session.current.cardCreation!;
    const currentPlacement = cardCreationState.currentPlacement;

    if(currentPlacement) {
        const section = registry.getLayoutSection(currentPlacement.sectionId);
        if(!section) return;

        createCard({
            placement: {
                sectionName: section.props!.name,
                position: {
                    colIndex: currentPlacement.position.colIndex,
                    rowIndex: currentPlacement.position.rowIndex,
                    colSpan: cardCreationState.startSize.colSpan,
                    rowSpan: cardCreationState.startSize.rowSpan,
                }
            }
        })
    }
}

export function cleanupCardCreationState(context : BoardContextValue) {
    const { registry, rootRef, interaction } = context;

    const root = rootRef.current
    if (!root) return

    clearGridHover(registry);
    clearGhostCard(root);
    interaction.updateCardCreation(null);
}