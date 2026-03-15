import { useEffect, useRef } from "react"
import { BoardMetricsManager } from "@/src/ui/types/board/board.metrics"
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { updateBoardMetrics } from "@/src/ui/metrics/domain/board/update";
import { BoardMetricsValue } from "@/src/core/types/domain/board/board.metrics";

export function useBoardMetrics(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
) : BoardMetricsManager {

    const metrics = useRef<BoardMetricsValue>({
        layout: {
            spacing: {
                padding: 0,
            },
            sectionCount: {
                horizontal: 0,
                vertical: 0,
            },
            sectionValue: {
                spacing: {
                    padding: 0,
                },
                gridValue: {
                    spacing: {
                        padding: 0,
                    },
                    cellCount: {
                        horizontal: 0,
                        vertical: 0,
                    },
                    cellValue: {
                        size: {
                            full: 0,
                            inner: 0,
                            compact: 0,
                        }
                    },
                    size: {
                        width: 0,
                        height: 0
                    }
                },
                size: {
                    width: 0,
                    height: 0
                }
            },
            sectionContainerValue: {
                spacing: {
                    padding: 0,
                },
                size: {
                    width: 0,
                    height: 0
                }
            }
        }
    });

    useEffect(() => {
        const element = rootRef.current;
        if(!element) return;

        const observer = new ResizeObserver(() => {
            updateBoardMetrics(registry, metrics);
        })

        const mutationObserver = new MutationObserver(() => {
            updateBoardMetrics(registry, metrics);    
        })

        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [rootRef, registry])

    return metrics;
}