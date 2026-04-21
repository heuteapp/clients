"use client";

import { useCreatingCardState } from "../hooks/state/useCreatingCardState";
import { useEditCardState } from "../hooks/state/useEditCardState";

export function WorkspaceDailyboardStateSideEffects() {
    useCreatingCardState();
    //useEditCardState();

    return null;
}