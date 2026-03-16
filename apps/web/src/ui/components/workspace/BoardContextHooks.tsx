import { useBoardMetricsObserver } from "@/src/ui/hooks/workspace/useBoardMetricsObserver";
import { useBoardPointerEvents } from "@/src/ui/hooks/workspace/useBoardPointerEvents";

export function BoardContextHooks() {
    useBoardMetricsObserver();
    useBoardPointerEvents();
    return null;
}