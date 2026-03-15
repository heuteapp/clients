import { useMemo } from "react";
import { BoardMetricsManager } from "@/src/ui/types/board/board.metrics";

export function useBoardMetricsManager(): BoardMetricsManager {
    const metrics = useMemo<BoardMetricsManager>(() => {
        const obj: BoardMetricsManager = {
            current: {
                layout: {
                    sectionCount: {
                        horizontal: 0,
                        vertical: 0,
                    },
                    totalSpacing: {
                        horizontal: {
                            padding: 0,
                            margin: 0
                        },
                        vertical: {
                            padding: 0,
                            margin: 0
                        }
                    },
                    gridCellSize: {
                        total: 0,
                        inner: 0,
                        compact: 0
                    },
                    gridFullSize: {
                        width: 0,
                        height: 0
                    },
                    sectionContainerSize: {
                        width: 0,
                        height: 0
                    }
                }
            }
        };
        return obj;
    }, []);

    return metrics;
}