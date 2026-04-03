"use client";

import { useDailyboardStore } from "@/src/heute-store/stores/dailyboard.store";
import { DailyboardRoot } from "@/src/modules/ui-dailyboard/components/DailyboardRoot";
import { useWorkspaceDailyboardContext } from "@/src/modules/workspace-dailyboard/hooks/useWorkspaceDailyboardContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function WorkspaceDailyboardPage() {
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata;
    const { getMeDailyboard } = useDailyboardStore();

    const dailyboard = getMeDailyboard(categoryPath, date!);

    if(!dailyboard) {
        return (
            <CircularProgress />
        )
    }

    return (
        <DailyboardRoot id={categoryPath} data={dailyboard} />
    )
}