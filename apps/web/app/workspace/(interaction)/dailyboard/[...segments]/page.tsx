"use client";

import { useDailyboardDataStore } from "@/src/heute-store/stores/dailyboard.store";
import { useLayoutDataStore } from "@/src/heute-store/stores/layout.stores";
import { DailyboardRoot } from "@/src/modules/ui-dailyboard/components/DailyboardRoot";
import { useWorkspaceDailyboardContext } from "@/src/modules/workspace-dailyboard/hooks/useWorkspaceDailyboardContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function WorkspaceDailyboardPage() {
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata!;
    const { getMeDailyboard } = useDailyboardDataStore();
    const { getGlobalLayout } = useLayoutDataStore();

    const dailyboard = getMeDailyboard(categoryPath, date!);

    if(!dailyboard) {
        return (
            <CircularProgress />
        )
    }

    const layout = getGlobalLayout(dailyboard.layoutName, dailyboard.layoutVersion);

    if(!layout) {
        return (
            <CircularProgress />
        )
    }

    return (
        <DailyboardRoot data={dailyboard} />
    )
}