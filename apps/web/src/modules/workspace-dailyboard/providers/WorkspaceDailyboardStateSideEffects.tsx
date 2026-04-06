import { useCreateCardState } from "../hooks/state/useCreateCardState";

export function WorkspaceDailyboardStateSideEffects() {
    useCreateCardState();

    return null;
}