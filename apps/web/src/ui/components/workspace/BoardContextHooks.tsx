import { useBoardMetricsObserver } from "@/src/ui/hooks/core/domain/useBoardMetricsObserver";
import { useBoardPointerEvents } from "@/src/ui/hooks/core/domain/useBoardPointerEvents";

export function BoardContextHooks() {
    useBoardMetricsObserver();
    useBoardPointerEvents();
    return null;
}