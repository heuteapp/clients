import { useCreateCardState } from "../hooks/state/useCreateCardState";
import { useEditCardState } from "../hooks/state/useEditCardState";

export function WorkspaceDailyboardStateSideEffects() {
    useCreateCardState();
    useEditCardState();

    return null;
}