import { useEffect, useRef } from "react"
import { BoardMetrics } from "@/src/ui/types/board/board.dom"
import { updateBoardMetrics } from "@/src/ui/dom/sync/board/updateBoardMetrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";

export function useBoardMetrics(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
) : React.RefObject<BoardMetrics> {

    const metricsRef = useRef<BoardMetrics>({
        layoutSectionsCount: {
            horizontal: 0,
            vertical: 0
        },
        layoutGridCellsCount: {
            horizontal: 0,
            vertical: 0
        },
        layoutGridCellSize: {
            full: 0,
            inner: 0,
            compact: 0
        },
        layoutGridSize: {
            width: 0,
            height: 0
        },
        layoutSectionContainerSize: {
            width: 0,
            height: 0
        }
    });

    useEffect(() => {
        const element = rootRef.current;
        if(!element) return;

        const observer = new ResizeObserver(() => {
            updateBoardMetrics(registry, metricsRef);
        })

        const mutationObserver = new MutationObserver(() => {
            updateBoardMetrics(registry, metricsRef);    
        })

        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [rootRef, registry])

    return metricsRef;
}