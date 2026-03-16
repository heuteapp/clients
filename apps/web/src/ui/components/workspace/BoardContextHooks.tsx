import { useBoardMetricsObserver } from "@/src/ui/hooks/board/useBoardMetricsObserver";
import { useBoardPointerEvents } from "@/src/ui/hooks/board/useBoardPointerEvents";

export function BoardContextHooks() {
    useBoardMetricsObserver();
    useBoardPointerEvents();
    return null;
}